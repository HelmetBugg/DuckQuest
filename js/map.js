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
    initMap(test_map1);
	console.log("1");
}

function transitionMap2() {
    initMap(test_map2);
	console.log("2");
}

function transitionMap3() {
    initMap(test_map3);
	console.log("3");
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

test_map1 = {
    "name": "map_1",
    "sprite": "res/maps/1_lvl_map.png",
    "collisionMap": "res/maps/map_collisions_1.bmp",
    "enemies": [{
            "name": "Slimon",
            "sprite": "res/images/Slime0.png",
            "health": 10,
            "damage": 5,
            "index": 9,
        }, {
            "name": "Slimeer",
            "sprite": "res/images/Slime0.png",
            "health": 10,
            "damage": 5,
            "index": 8,
        }, {
            "name": "Clyde",
            "sprite": "res/images/Slime0.png",
            "health": 10,
            "damage": 5,
            "index": 10,
        },
    ],
    "player_spawn_x": 255,
    "player_spawn_y": 255,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 30,
    "tilesHigh": 30,
    "triggers": [{
            "height": 48.5148514851485,
            "id": 3,
            "name": "lizard_wall_npc",
            "rotation": 0,
            "type": "",
            "visible": false,
            "width": 47.5247524752475,
            "x": 432,
            "y": 16,
            "dialog": ["lizard_dialogue_1", "lizard_dialogue_2", "lizard_dialogue_3"]
        }, {
            "id": 4,
            "name": "sage_npc",
            "rotation": 0,
            "type": "",
            "visible": false,
            "width": 16,
            "height": 16,
            "x": 370,
            "y": 320,
            "dialog": ["Hail, traveler!", "I was wondering if I could ask of you a favor?\nRecently the number of local slimes has been increasing.\nCould I trouble you to slay some?", startKillThreeSlimesQuest, 'Zounds! There are still good people in this realm.']
        }, {
            "height": 13.8613861386139,
            "id": 5,
            "name": "ninja_guy_dan_npc",
            "rotation": 0,
            "type": "",
            "visible": false,
            "width": 16,
            "x": 448,
            "y": 240,
            "dialog": ["ninja_dialogue_1", "ninja_dialogue_2", "ninja_dialogue_3"]
        }, {
            "height":48.5148514851485,
            "id":6,
            "name":"teleporterOne",
            "rotation":0,
            "type":"teleporterTile",
            "visible":true,
            "width":47.5247524752475,
            "x":300,
            "y":300,
            "destination":transitionMap2
           }
    ]
};

test_map2 = {
    "name": "map_1",
    "sprite": "res/maps/2_lvl_map.png",
    "collisionMap": "res/maps/map_collisions_1.bmp",
    "enemies": [{
            "name": "Silverleaf",
            "sprite": "res/images/plant1.png",
            "health": 10,
            "damage": 30,
            "index": 0,
        }, {
            "name": "Barkbreath",
            "sprite": "res/images/plant1.png",
            "health": 12,
            "damage": 25,
            "index": 8,
        }, {
            "name": "Forest Shrieker",
            "sprite": "res/images/Elemental0.png",
            "health": 20,
            "damage": 10,
            "index": 27,
        },
    ],
    "player_spawn_x": 16,
    "player_spawn_y": 16,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 15,
    "tilesHigh": 15,
    "triggers": []
};

test_map3 = {
    "name": "map_1",
    "sprite": "res/maps/3_lvl_map.png",
    "collisionMap": "res/maps/map_collisions_1.bmp",
    "enemies": [{
            "name": "Roper",
            "sprite": "res/images/plant1.png",
            "health": 75,
            "damage": 10,
            "index": 1,
        }, {
            "name": "Rolf",
            "sprite": "res/images/Elemental0.png",
            "health": 45,
            "damage": 15,
            "index": 8,
        }, {
            "name": "Herald",
            "sprite": "res/images/Elemental0.png",
            "health": 65,
            "damage": 15,
            "index": 34,
        },
    ],
    "player_spawn_x": 16,
    "player_spawn_y": 16,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 15,
    "tilesHigh": 15,
    "triggers": []
};
