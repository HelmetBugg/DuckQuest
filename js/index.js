// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/maps/fantasy.json",
    "res/images/fantasy.png",
    "res/images/goose.png",
    "res/images/duckman.png"    
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 30;
version = 0.3;
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
    world = h.makeTiledWorld(
        "res/maps/fantasy.json",
        "res/images/fantasy.png"
    );
    h.camera = h.worldCamera(world, world.worldWidth, world.worldHeight);
    title = h.text("Version " + version, "18px puzzler", "red");
    title.y = 490;
	initplayer();
    pauseMenu();
    initKeyboard();
    h.camera.centerOver(h.player);
    h.state = play;
}

function rollAttackChance(){
    if(Math.floor(Math.random() * 5) == 1){
        getAttacked();
    }
}

function getAttacked() {
    console.log("got attacked");
    combatScreen = h.rectangle(500, 250, 'white');

    runButton = h.text("RUN", "30px puzzler", "black");
    runButton.x = 100;
    runButton.y = 100;
   // h.makeInteractive(runButton);
    runButton.interact = true;

    fightButton = h.text("FIGHT", "30px puzzler", "black");
    fightButton.x = 200;
    fightButton.y = 100;
   // h.makeInteractive(fightButton);
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
}

function play() {
    h.camera.follow(h.player);
}

