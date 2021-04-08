let thingsToLoad = [
    "res/images/goose.png"
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
    //console.log(Object.keys(h));
    world = h.rectangle(500, 500, "grey");
    h.camera = h.worldCamera(world, 280, 280, h.canvas);
    title = h.text("Version " + version, "18px puzzler", "red");
    h.stage.putCenter(title);
    title.pivotX = title.pivotY = 0.5;
	initplayer();
    pauseMenu();
    initKeyboard();
    h.camera.centerOver(h.player);
    h.state = play;
}

function initKeyboard() {
    let leftArrow = h.keyboard(37),
    upArrow = h.keyboard(38),
    rightArrow = h.keyboard(39),
    downArrow = h.keyboard(40),
    space = h.keyboard(32);
    h.player.tweening = false;

    space.press = () => {
        h.menuGroup.toggle();
    }

    leftArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x-32, h.player.y, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
            rollAttackChance();
        }
    };

    rightArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x+32, h.player.y, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
            rollAttackChance();
        }
    };

    upArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y-32, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
            rollAttackChance();
        }
    };

    downArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y+32, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
            rollAttackChance();
        }
    };
}

function rollAttackChance(){
    if(Math.floor(Math.random() * 5) == 1){
        getAttacked();
    }
}

function getAttacked() {
    console.log("got attacked");
    combatScreen = h.rectangle(500, 250, 'white');

    combatTurn = [h.player];
    combatTurn.push(createGoose());

    runButton = h.text("RUN", "30px puzzler", "black");
    runButton.x = 100;
    runButton.y = 100;
    h.makeInteractive(runButton);

    h.combatGroup = h.group(combatScreen, runButton);
    runButton.press = function() {
        h.remove(h.combatGroup);
    }
}

function play() {
    //h.camera.follow(h.player);
    h.camera.centerOver(h.player);
}
