// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/images/goose.png",
    "res/images/duckman.png",
    "res/images/Slime0.png", 
    "res/maps/1_lvl_map.png"  
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 30;
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
    let map = h.sprite("res/maps/1_lvl_map.png");
    map.scale.x = map.scale.y = 2;
    h.camera =  h.worldCamera(map, map.width*2, map.height*2);
    title = h.text("Version " + version, "18px puzzler", "white");
    title.y = 490;
    // Make the space around the map black.
    h.backgroundColor = 0x000000;
	initplayer();
    // Making the player a child of the map.
    map.addChild(h.player);
    //h.player.collisionArea = { x: 0, y: 0, width: h.player.width, height: h.player.height};
    // Centering camera over player with map offset.
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
    console.log("got attacked");
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
        h.combatTurn.enemies[0].stat.set('health', 
            h.combatTurn.enemies[0].stat.get('health')-1);
        h.shake(combatTurn.enemies[0]);
        stillFighting = h.combatTurn.nextTurn();
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
}

