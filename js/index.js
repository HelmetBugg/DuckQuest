// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/images/goose.png",
    "res/images/duckman.png",
    "res/images/Slime0.png", 
    "res/maps/1_lvl_map.png",
    "res/images/Elemental0.png",
    "res/images/plant1.png",
    "res/maps/SkyCliffs.png",
    "res/maps/map_collisions_1.bmp",
    "res/maps/overworld_collision.bmp",
    "res/maps/overworld_map.png",
    "res/images/Player0.png",
	"res/maps/village_collisions.bmp",
    "res/maps/empty_collisions.bmp",
    "res/maps/skycliffscollisions.bmp",
    "res/maps/alligator_hideout_collisions.bmp",
    "res/maps/new_swamp_map_collisions.bmp",
    "res/maps/new_swamp_map.png",
    "res/maps/aligator_hideout.png",
    "res/maps/spider_cave_collisions.bmp",
    "res/maps/spider_cave.png",
	"res/images/Misc0.png",
    "res/fonts/PressStart.ttf"
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 30;
version = 0.6;
h.scaleToWindow();
h.start();
var blurb_group;


function load() {
    //Display the file currently being loaded
    console.log(`loading: ${h.loadingFile}`);
    //Display the percentage of files currently loaded
    console.log(`progress: ${h.loadingProgress}`);
    h.loadingBar();
}


function setup() {
    title = h.text("Duck\n    Quest", "50px Press Start 2P", "purple");
    title.font = fontStyle.font;
    title.x =  title.y = 35;
    let startButton = button(100, 200, "New Game");
    startButton.press = function() {
        // Just to hide the button after click.
        newGame(false);
    }
    let loadButton = button(100, 320, "Load Game");
    if(localStorage.getItem('duckQuest') != null){
        loadButton.interact = true;
    } else {
        loadButton.interact = false;
        loadButton.alpha = 0.5;
    }
    loadButton.press = function() {
        loadButton.x = -5000;
        newGame(true);
    }
    h.destroy = h.group(loadButton, startButton, title);
}


/*
// Takes a bool to determine if game data should be loaded after init. 
*/
function newGame(load_data) {
    h.destroy.x = -50000;
    h.remove(h.destroy);
    // Make the space around the map black.
    h.backgroundColor = 0x000000;
    initMap(maps[1]);
	initplayer();
    initSkills();
    // Making the player a child of the map for easy movement.
    h.map.addChild(h.player);
    h.map.addChild(h.player.directionFacingBox);
    h.player.x = h.player.directionFacingBox.x = h.map.layer.player_spawn_x;
    h.player.y = h.player.directionFacingBox.y = h.map.layer.player_spawn_y;
    pauseMenu();
    initKeyboard();
    makeHelpButton();
	h.inCombat = false;
    // Must happen before camera is centered.
    if (load_data){
        loadGame();
    } else{
		spawnInstructions();
	}
    h.camera.centerOver(h.player);
    h.state = play;
}


function play() {
    handleKeyboard();
}


function gameOver() {
    h.rectangle(h.canvas.width, h.canvas.height, "black", "black", 0, 0, 0);
    title = h.text("You Died", "90px puzzler", "red");
    h.stage.putCenter(title);
    h.pause();
	
	let startButton = button(100, 300, "New Game");
    startButton.press = function() {
        // Just to hide the button after click.
        h.resume();
        newGame(false);
    }
    let loadButton = button(250, 300, "Load Game");
    if(localStorage.getItem('duckQuest') != null){
        loadButton.interact = true;
    } else {
        loadButton.interact = false;
        loadButton.alpha = 0.5;
    }
    loadButton.press = function() {
        h.resume();
        loadButton.x = -5000;
        newGame(true);
    }
    h.destroy = h.group(loadButton, startButton, title);
}


function saveGame(){
	let data = JSON.stringify({
		x: h.player.x,
		y: h.player.y,
		level: h.player.stat.get("level"),
		next_level: h.player.stat.get("next_level"),
		experience: h.player.stat.get("experience"),
		strength: h.player.stat.get("strength"),
		intelligence: h.player.stat.get("intelligence"),
		max_health: h.player.stat.get("max_health"),
		current_health: h.player.stat.get("current_health"),
		map: h.map.layer.name,
        killed: h.player.killed,
        quests: flattenQuests(),
        skills: h.player.skills
	});
	localStorage.setItem('duckQuest', data);
	console.log("Saving Game.. ");// + localStorage.getItem('duckQuest'));
}


// Loading a game file. 
function loadGame(){
	let data = JSON.parse(localStorage.getItem('duckQuest'));
    h.player.stat.level = data.level;
    h.player.stat.next_level = data.next_level;
    h.player.stat.experience = data.experience;
	h.player.stat = data.strength;
	h.player.stat = data.intelligence;
	h.player.stat = data.max_health;
	h.player.stat = data.current_health;
    h.player.killed = data.killed;
    h.player.quests = [];
    h.player.skills = data.skills;
    unFlattenQuests(data.quests);

    var targetMap = findMapByName(data.map);
    initMap(targetMap);
    h.player.x = data.x;
    h.player.y = data.y;

	let stat = new Map();
	stat.set("experience", data.experience);
	stat.set("next_level", data.next_level);
	stat.set("level", data.level);	
	stat.set("strength", data.strength);
	stat.set("max_health", data.max_health);
	stat.set("current_health", data.current_health);
	stat.set("intelligence", data.intelligence);
	h.player.stat = stat;
	
	console.log("Game Loaded.. ");// + data.x);
}
