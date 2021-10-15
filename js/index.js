// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/images/goose.png",
    "res/images/duckman.png",
    "res/images/Slime0.png", 
    "res/maps/1_lvl_map.png",
    "res/images/Elemental0.png",
    "res/images/plant1.png",
    "res/maps/map_collisions_1.bmp",
    "res/maps/overworld_collision.bmp",
    "res/maps/overworld_map.png",
    "res/images/Player0.png",
	"res/maps/village_collisions.bmp"
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 15;
version = 0.6;
h.scaleToWindow();
h.start();
var skills_menu, blurb_group;

function load() {
    //Display the file currently being loaded
    console.log(`loading: ${h.loadingFile}`);
    //Display the percentage of files currently loaded
    console.log(`progress: ${h.loadingProgress}`);
    h.loadingBar();
}

function setup() {
    title = h.text("Duck Quest", "50px puzzler", "purple");
    title.x = 35;
    title.y = 35;
    startButton = h.text("New Game", "30px puzzler", "black");
    startButton.x = 100;
    startButton.y = 200;
    startButton.interact = true;
    startButton.press = function() {
        // Just to hide the button after click.
        newGame(false);
    }
    loadButton = h.text("Load Game", "30px puzzler", "black");
    if(localStorage.getItem('duckQuest') != null){
        loadButton.interact = true;
        //console.log(loadButton);
    } else {
        loadButton.alpha = 0.5;
    }
    loadButton.x = 100;
    loadButton.y = 300;
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
    title = h.text("Version " + version, "18px puzzler", "white");
    title.y = 490;
    // Make the space around the map black.
    h.backgroundColor = 0x000000;
    initMap(maps[1]);
    initSkills();
	initplayer();
    // Making the player a child of the map for easy movement.
    h.map.addChild(h.player);
    h.map.addChild(h.player.directionFacingBox);
    h.player.x = h.player.directionFacingBox.x = h.map.layer.player_spawn_x;
    h.player.y = h.player.directionFacingBox.y = h.map.layer.player_spawn_y;
    pauseMenu();
    initKeyboard();
    h.enemy_list = h.filmstrip("res/images/Slime0.png", 16, 16);
	h.inCombat = false;

    // Must happen before camera is centered.
    if (load_data){
        loadGame();
    } 

    h.camera.centerOver(h.player);
    h.state = play;
}

function rollAttackChance(){
    if(Math.floor(Math.random() * 5) == 1){
        //getAttacked();
    }
}

function getAttacked() {
	h.inCombat = true;
    combatScreen = h.rectangle(500, 250, 'white');

    runButton = h.text("RUN", "30px puzzler", "black");
    runButton.x = 50;
    runButton.y = 200;
    runButton.interact = true;

    fightButton = h.text("FIGHT", "30px puzzler", "black");
    fightButton.x = 150;
    fightButton.y = 200;
    fightButton.interact = true;

    skillButton = h.text("SKILLS", "30px puzzler", "black");
    skillButton.x = 300;
    skillButton.y = 200;
    skillButton.interact = true;

    h.enemyName = h.text("Enemy", "20px puzzler", "black");
    h.enemyName.y = 20;
    h.enemyName.x = 270;

    h.enemyHealth = h.text("Enemy Health: " + 0/0, "20px puzzler", "black");
    h.enemyHealth.y = 50;
    h.enemyHealth.x = 270;

    h.playerHealth = h.text("Player Health: " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health"), "20px puzzler", "black");
    h.playerHealth.y = 50;

    h.combatGroup = h.group(combatScreen, runButton, fightButton,skillButton, h.enemyHealth, h.playerHealth, h.enemyName);
    h.combatTurn = initCombatTurn();
    updateHealth();
    runButton.press = function() {
        cleanupCombat();
        for(var i=0; i<h.combatTurn.enemies.length; i++){
            h.remove(combatTurn.enemies[i]);
        }
    }
    fightButton.press = function() {
        updateHealth();
		h.player.doTurn();
		updateHealth();
        stillFighting = combatTurn.enemies[0].doTurn();		
		if (!stillFighting){
            cleanupCombat();
		}
    }
    skillButton.press = function() {
		createListMenu(h.player.skills);
    }
}

function updateHealth(){
    h.playerHealth.text = "Player Health: " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health");
    h.enemyHealth.text = "Enemy Health: " + combatTurn.enemies[0].stat.get("health") + " / " + combatTurn.enemies[0].stat.get("max_health");
    h.enemyName.text = combatTurn.enemies[0].name;
}

function cleanupCombat(){
    children = h.combatGroup.children;
    for (var i=0; i<children.length; i++){
        children[i].interact = false;
    }
    h.remove(h.combatGroup);
	h.inCombat = false;
    checkQuests();
}

function play() {
    handleKeyboard();
}

