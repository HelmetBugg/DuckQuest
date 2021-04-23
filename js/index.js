// https://www.html5gamedevs.com/topic/28648-disable-sprite-smoothing/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let thingsToLoad = [
    "res/maps/fantasy.json",
    "res/images/fantasy.png",
    "res/images/goose.png",
    "res/images/duckman.png",
    "res/images/Slime0.png"    
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
    h.world = h.makeTiledWorld(
        "res/maps/fantasy.json",
        "res/images/fantasy.png"
    );
    h.camera = h.worldCamera(h.world, h.world.worldWidth, h.world.worldHeight);
    title = h.text("Version " + version, "18px puzzler", "red");
    title.y = 490;
	initplayer();
	var objectsLayer = h.world.getObject("objects");
	objectsLayer.addChild(h.player);
	h.player.collisionArea = { x: 0, y: 0, width: h.player.width, height: h.player.height};
    pauseMenu();
    initKeyboard();
    h.camera.centerOver(h.player);
	h.itemsLayer = h.world.getObject("items");
	items = h.itemsLayer.children.slice(0);
	h.itemsMapArray = h.world.getObject("items").data;
	//console.log(items);
    h.enemy_list = h.filmstrip("res/images/Slime0.png", 16, 16);
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
    runButton.y = 200;
   // h.makeInteractive(runButton);
    runButton.interact = true;

    fightButton = h.text("FIGHT", "30px puzzler", "black");
    fightButton.x = 200;
    fightButton.y = 200;
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
}

function play() {
    h.camera.follow(h.player);
	var playerVsItems = h.hitTestTile(h.player, h.itemsMapArray, 0, h.world, "every");
	//console.log(h.player, h.itemsMapArray, 0, h.world, "every");
	if (!playerVsItems.hit) {
		console.log("SpaceDudes");
	}
}

