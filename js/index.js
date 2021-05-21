// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/images/goose.png",
    "res/images/duckman.png",
    "res/images/Slime0.png", 
    "res/maps/1_lvl_map.png"  
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 15;
version = 0.4;
h.scaleToWindow();
h.start();

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
    loadButton = h.text("Load Game", "30px puzzler", "black");
    loadButton.x = 100;
    loadButton.y = 300;
    startButton.press = function() {
        this.interact = false;
        newGame();
    }
    loadButton.press = function() {
        console.log("Loads your game");
    }
}

function newGame() {
    title = h.text("Version " + version, "18px puzzler", "white");
    title.y = 490;
    // Make the space around the map black.
    h.backgroundColor = 0x000000;
    initMap();
	initplayer();
    //checkDebugCollision(h.map.layer);
    // Making the player a child of the map for easy movement.
    h.map.addChild(h.player);
    h.map.addChild(h.player.directionFacingBox);
    h.player.x = h.map.layer.player_spawn_x;
    h.player.y = h.map.layer.player_spawn_y;
    // Centering camera over player with map offset.
    h.camera.x = h.player.x;
    h.camera.y = h.player.y;
    pauseMenu();
    initKeyboard();
    h.enemy_list = h.filmstrip("res/images/Slime0.png", 16, 16);
	h.inCombat = false;
    h.state = play;
}

function rollAttackChance(){
    if(Math.floor(Math.random() * 5) == 1){
        getAttacked();
    }
}

function getAttacked() {
	h.inCombat = true;
    combatScreen = h.rectangle(500, 250, 'white');

    runButton = h.text("RUN", "30px puzzler", "black");
    runButton.x = 100;
    runButton.y = 200;
    runButton.interact = true;

    fightButton = h.text("FIGHT", "30px puzzler", "black");
    fightButton.x = 200;
    fightButton.y = 200;
    fightButton.interact = true;

    h.enemyHealth = h.text("Enemy Health: " + 0/0, "20px puzzler", "black");
    h.enemyHealth.y = 50;
    h.playerHealth = h.text("Player Health: " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health"), "20px puzzler", "black");
    h.playerHealth.y = 100;

    h.combatGroup = h.group(combatScreen, runButton, fightButton, h.enemyHealth, h.playerHealth);
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
}

function updateHealth(){
    h.playerHealth.text = "Player Health: " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health");
    h.enemyHealth.text = "Enemy Health: " + combatTurn.enemies[0].stat.get("health") + " / " + combatTurn.enemies[0].stat.get("max_health")
}

function cleanupCombat(){
    children = h.combatGroup.children;
    for (var i=0; i<children.length; i++){
        children[i].interact = false;
    }
    h.remove(h.combatGroup);
	h.inCombat = false;
}

function play() {
}

