// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/images/goose.png",
    "res/images/duckman.png",
    "res/images/Slime0.png", 
    "res/maps/1_lvl_map.png",
    "res/images/Elemental0.png",
    "res/images/plant1.png",
    "res/images/Misc1.png",
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
    "res/maps/Tent.png",
    "res/maps/TentCollisions.bmp",
    "res/maps/maze.png",
    "res/maps/maze_collisions.bmp",
    "res/maps/courtyard.png",
    "res/maps/courtyard_collisions.bmp",
    "res/maps/throne_room.png",
    "res/maps/throne_room_collisions_small2.bmp",
    "res/fonts/PressStart.ttf",
    "res/images/card_icons.png",
    "res/images/panel_1.bmp",
    "res/images/panel_2.bmp",

    "res/sounds/damage.wav",
    "res/sounds/death.wav",
    "res/sounds/draw_card.wav",
    "res/sounds/hitHurt.wav",
    "res/sounds/level_up.wav",
    "res/sounds/powerUp.wav",
    "res/sounds/prompt.wav",
    "res/sounds/random.wav",
    "res/sounds/synth.wav",
    "res/sounds/tone.wav",
    "res/sounds/wonder.wav",
    "res/sounds/QuestUpdate.wav",
    "res/sounds/enemy_attack.wav",
    "res/songs/mystery_theme.wav",
    "res/songs/alligator_hideout_theme.mp3",
    "res/songs/circus_tent_theme.wav",
    "res/songs/dungeon_theme.mp3",
    "res/songs/goosemans_theme.wav",
    "res/songs/village.wav",
    "res/songs/traveling.wav",
    "res/songs/main_theme.wav"    
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 30;
version = 0.6;
h.scaleToWindow();
h.start();
var blurb_group;
var sentai = false;


function load() {
    //Display the file currently being loaded
    console.log(`loading: ${h.loadingFile}`);
    //Display the percentage of files currently loaded
    console.log(`progress: ${h.loadingProgress}`);
    h.loadingBar();
}


function setup() {
    h.rectangle(h.canvas.width, h.canvas.height, "black");
    title = h.text("Duck  \n Quest", "75px Press Start 2P", "Red");
    title.font = fontStyle.font;
    title.x = 35;
    title.y = 135;
    let startButton = button((h.canvas.width/2)-70, (h.canvas.height/2)+100, "Start");
    startButton.press = function() {
        introduction();
    }

    h.music = new MusicHandler();
    h.destroy = h.group(startButton, title);
}


function introduction(){
    h.music.pause();
    h.music.setSong("res/songs/goosemans_theme.wav");
    h.destroy.x = -50000;
    h.remove(h.destroy);
    h.rectangle(h.canvas.width, h.canvas.height, "black")
    var trigger = {
        "name":"Gooseman",
        "dialog": ["res/images/panel_1.bmp:Hold him...", "How the mighty have fallen, Duckman.", "res/images/panel_2.bmp:Now, be one with the pond you love so much.", "So long... Duckman.", newGameDefault]
    }
    startDialog(trigger);
}


function newGameDefault(){
    newGame(false);
}


/*
// Takes a bool to determine if game data should be loaded after init. 
*/
function newGame(load_data) {
    // Make the space around the map black.
    h.backgroundColor = 0x000000;
	initplayer();
    initMap(maps[1]);
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
    h.sound("res/sounds/death.wav").play();
    title = h.text("Goose'd", "45px puzzler", "red");
    h.stage.putCenter(title);
	
	let startButton = button(100, 300, "Revive");
    startButton.press = function() {
        // Just to hide the button after click.
        initMap(maps[0]);
        fullHeal();
        h.remove(title);
        cleanup(startButton);
        h.state = play;
    }
    /*let loadButton = button(250, 300, "Load Game");
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
    }*/
    
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
