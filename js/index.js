let thingsToLoad = [
    "res/images/goose.png"
];

let g = hexi(512, 512, setup, thingsToLoad, load);
g.fps = 30;
g.scaleToWindow();
g.start();

function load() {
    //Display the file currently being loaded
    console.log(`loading: ${g.loadingFile}`);
    //Display the percentage of files currently loaded
    console.log(`progress: ${g.loadingProgress}`);
    g.loadingBar();
}

function setup() {
    title = g.text("Duck Quest", "38px puzzler", "red");
    g.stage.putCenter(title);
    title.pivotX = title.pivotY = 0.5;
    playButton = g.text("Play", "38px puzzler", "red");
    playButton.x = 400;
    playButton.y = 350;

    // Start the main game loop.
    g.state = play;
}

function play() {
}
