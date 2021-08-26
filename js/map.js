function initMap(json_input) {
    if (h.map != undefined) {
        h.map.removeChild(h.player);
        h.remove(h.map);
        h.map = h.sprite(json_input.sprite);
        h.map.triggers = [];
        h.map.addChild(h.player);
        h.camera = h.worldCamera(h.map, h.canvas.width * 20, h.canvas.height * 20);
        h.map.layer = json_input;
        h.map.layer.triggers.forEach(placeTrigger);
        h.player.x = h.player.directionFacingBox.x = h.map.layer.player_spawn_x;
        h.player.y = h.player.directionFacingBox.y = h.map.layer.player_spawn_y;
        h.map.tileCollisions = loadMapCollisions(json_input.collisionMap, json_input.tilesWide, json_input.tilesHigh);
        h.camera.centerOver(h.player);
    } else {
        h.map = h.sprite(json_input.sprite);
        h.map.triggers = [];
        h.camera = h.worldCamera(h.map, h.canvas.width * 20, h.canvas.height * 20);
        h.map.layer = json_input;
        h.map.layer.triggers.forEach(placeTrigger);
        h.map.tileCollisions = loadMapCollisions(json_input.collisionMap, json_input.tilesWide, json_input.tilesHigh);
    }
}

function loadMapCollisions(image, width, height){
    var canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    ctx.drawImage(img, 0, 0);
    var imgd = ctx.getImageData(0, 0, 30, 30);
    var pix = [];
    // 120 is 30 length by 4 values per pixel; RBG and Alpha.
    for (var i=0; i<imgd.data.length; i+=4*width) {
        row = []
        for (var j=0; j<4*height; j+=4) {
            row.push(255 - imgd.data[j+i]);
        }
        pix.push(row);
    }
    console.log(pix);
    return pix;
}

function transitionMap1() {
    initMap(maps[0]);
}

function transitionMap2() {
    initMap(maps[1]);
}

function transitionMap3() {
    initMap(maps[2]);
}

function placeTrigger(object, index) {
    trigger = h.rectangle(16, 16, "blue", "black", 0, 0, 0);
    h.map.addChild(trigger);
    trigger.x = object.x;
    trigger.y = object.y;
    trigger.dialog = object.dialog;
    if (!object.visible) {
        trigger.visible = false;
    }
    h.map.triggers.push(trigger);
}

function checkTriggerCollision(trigger, index) {
    if (h.hitTestRectangle({
            x: h.player.directionFacingBox.x,
            y: h.player.directionFacingBox.y,
            width: h.player.directionFacingBox.width,
            height: h.player.directionFacingBox.height
        }, trigger)) {
        return true;
    }
    return false;
}

function checkDebugCollision(map) {
    for (let i = 0; i < map.tilesWide; i++) {
        for (let j = 0; j < map.tilesHigh; j++) {
            let color = "blue";
            if (map.tileCollisions[j][i]) {
                color = "red";
            }
            let collisionDebug = h.rectangle(map.tileWidth, map.tileHeight, color, "black", 1, map.tileWidth * i, map.tileHeight * j);
            collisionDebug.alpha = 0.5;
            h.map.addChild(collisionDebug);
        }
    }
}

function checkCollision(map, location) {
    for (let i = 0; i <= map.tilesWide; i++) {
        for (let j = 0; j <= map.tilesHigh; j++) {
            var tileCollision = {
                x: map.tileWidth * i,
                y: map.tileHeight * j,
                width: map.tileWidth,
                height: map.tileHeight
            }
            if (h.hitTestRectangle(location, tileCollision) && h.map.tileCollisions[j][i] != 0) {
                return true;
            }
        }
    }
    return false;
}

