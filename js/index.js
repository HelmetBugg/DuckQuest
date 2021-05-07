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
    title = h.text("Version " + version, "18px puzzler", "white");
    title.y = 490;
    // Make the space around the map black.
    h.backgroundColor = 0x000000;
    initMap();
	initplayer();


    // Making the player a child of the map for easy movement.
    h.map.addChild(h.player);
    h.map.addChild(h.player.directionFacingBox);
    // Centering camera over player with map offset.

    h.player.x = h.map.layer.player_spawn_x;//start_x;
    h.player.y = h.map.layer.player_spawn_y;

    
	h.camera.x = h.player.x/2;
    h.camera.y = h.player.y/2;
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
    //console.log("got attacked");
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

    h.combatGroup = h.group(combatScreen, runButton, fightButton);
    h.combatTurn = initCombatTurn();

    runButton.press = function() {
        cleanupCombat();
        for(var i=0; i<h.combatTurn.enemies.length; i++){
            h.remove(combatTurn.enemies[i])
        }
    }

    fightButton.press = function() {
        h.player.doTurn();
        stillFighting = combatTurn.enemies[0].doTurn();
        //stillFighting = h.combatTurn.nextTurn();
		if (!stillFighting){
            cleanupCombat();
		}
    }
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
    h.map.triggers.forEach(checkTriggerCollision);
}

