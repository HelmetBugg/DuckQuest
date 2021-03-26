let thingsToLoad = [
    "res/images/goose.png"
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 30;
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
    console.log(Object.keys(h));
    world = h.rectangle(500, 500, "grey");
    h.camera = h.worldCamera(world, 280, 280, h.canvas);
    title = h.text("Duck Quest", "38px puzzler", "red");
    h.stage.putCenter(title);
    title.pivotX = title.pivotY = 0.5;
    playButton = h.text("Play", "38px puzzler", "red");
    playButton.x = 400;
    playButton.y = 350;
    h.player = h.rectangle(32, 32, "black");
    h.player.speed = 5;
    h.player.x = h.player.y = 256;
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

    leftArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x-32, h.player.y, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
        }
    };

    rightArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x+32, h.player.y, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
        }
    };

    upArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y-32, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
        }
    };

    downArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y+32, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
        }
    };
}

function play() {
    //h.camera.follow(h.player);
    h.camera.centerOver(h.player);
}
