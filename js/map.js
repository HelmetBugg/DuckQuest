function initMap(json_input) {
    if (h.map != undefined) {
        h.map.removeChild(h.player);
        h.remove(h.menuGroup);
        h.remove(h.helpButton);
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
        pauseMenu();
        makeHelpButton();
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
    var imgd = ctx.getImageData(0, 0, width, height);
    var pix = [];
    // 120 is 30 length by 4 values per pixel; RBG and Alpha.
    for (var i=0; i<imgd.data.length; i+=4*width) {
        row = []
        for (var j=0; j<4*height; j+=4) {
            row.push(255 - imgd.data[j+i]);
        }
        pix.push(row);
    }
    return pix;
}


function placeTrigger(object, index) {
    if(object.type == "npc"){
        filmStrip = h.filmstrip(object.spriteSheet, 16, 16);
        trigger = h.sprite(filmStrip[object.id]);
    } else {
        trigger = h.rectangle(16, 16, "black", "black", 0, 0, 0);
    }
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


function debugCollisions(map){
    // Check bitmap tiles for walls and boundaries
    for (let i = 0; i < map.tilesWide; i++) {
        for (let j = 0; j < map.tilesHigh; j++) {
            if (h.map.tileCollisions[j][i] != 0) {
                var tangle = h.rectangle(16, 16, "red", "red", 0, map.tileWidth * i, map.tileHeight * j);
                tangle.alpha = 0.5;
                h.map.addChild(tangle);
            }
        }
    }
}


function checkCollision(map, location) {
    // Check bitmap tiles for walls and boundaries
    if (h.map.tileCollisions[location.y/16][location.x/16] != 0) {
        return true;
    }
    // Check Trigger collisions for NPCs
    for(var j=0; j<map.triggers.length; j++){
        if(map.triggers[j].type == "npc" && h.hitTestRectangle(location, map.triggers[j])){
            return true;
        }
    }
    return false;
}


function findMapByName(target){
    for(var i=0; i<maps.length; i++){
        if(maps[i].name == target){
            return maps[i];
        }
    }
    return null;
}