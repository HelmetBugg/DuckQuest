maps = [{
    "name": "village_map",
	"id": 0,
    "sprite": "res/maps/village_map.png",
    "collisionMap": "res/maps/village_collisions.bmp",
    "enemies": [],
    "player_spawn_x": 640,
    "player_spawn_y": 400,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 45,
    "tilesHigh": 45,
    "triggers": [{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 560,
        "y": 576,
        "width": 16,
        "height": 16,
        "destination": "overworld_map"
    }]
  },{
    "name": "overworld_map",
	"id": 0,
    "sprite": "res/maps/overworld_map.png",
    "collisionMap": "res/maps/overworld_collision.bmp",
    "enemies": [{
            "name": "Slimon",
            "sprite": "res/images/Slime0.png",
            "health": 20,
            "damage": 5,
            "index": 9
        },{
            "name": "Slimeer",
            "sprite": "res/images/Slime0.png",
            "health": 30,
            "damage": 5,
            "index": 8
        },{
            "name": "Clyde",
            "sprite": "res/images/Slime0.png",
            "health": 25,
            "damage": 5,
            "index": 10
        }
    ],
    "player_spawn_x": 512,
    "player_spawn_y": 368,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 45,
    "tilesHigh": 45,
    "triggers": [{
        "id": 3,
        "name": "concernedFisherman",
        "type": "NPC",
        "visible": true,
        "x": 384,
        "y": 256,
        "width": 16,
        "height": 16,        
        "dialog": ["I am very concerned."],
        "spriteSheet" : "res/images/Player0.png"
    }, {
        "id": 4,
        "name": "turtleTrader",
        "type": "NPC",
        "visible": true,
        "x": 144,
        "y": 256,
        "width": 16,
        "height": 16,
        "dialog": [],
        "spriteSheet" : "res/images/Player0.png"
    },{
            "id": 6,
            "name": "teleporterTown",
            "rotation": 0,
            "type": "teleporterTile",
            "visible": true,
            "x": 496,
            "y": 288,
            "width": 16,
            "height": 16,
            "destination": "village_map"
        },{
            "id": 6,
            "name": "teleporterDungeon",
            "rotation": 0,
            "type": "teleporterTile",
            "visible": true,
            "x": 208,
            "y": 64,
            "width": 16,
            "height": 16,
            "destination": "alligator_hideout"
        }
    ]
},{
    "name": "map_2",
	"id": 1,
    "sprite": "res/maps/1_lvl_map.png",
    "collisionMap": "res/maps/map_collisions_1.bmp",
    "enemies": [{
            "name": "Slimon",
            "sprite": "res/images/Slime0.png",
            "health": 100,
            "damage": 5,
            "index": 9
        }, {
            "name": "Slimeer",
            "sprite": "res/images/Slime0.png",
            "health": 100,
            "damage": 5,
            "index": 8
        }, {
            "name": "Clyde",
            "sprite": "res/images/Slime0.png",
            "health": 100,
            "damage": 5,
            "index": 10
        }
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
            "dialog": ["Hail, traveler!", "I was wondering if I could ask of you a favor?\nRecently the number of local slimes has been increasing.Could I trouble you to slay some?", startKillThreeSlimesQuest, 'Zounds! There are still good people in this realm.']
        }, {
            "height": 48.5148514851485,
            "id": 6,
            "name": "teleporterOne",
            "rotation": 0,
            "type": "teleporterTile",
            "visible": true,
            "width": 47.5247524752475,
            "x": 300,
            "y": 300,
            "destination": {}
        }
    ]
},{
    "name": "alligator_hideout",
	"id": 0,
    "sprite": "res/maps/aligator_hideout.png",
    "collisionMap": "res/maps/village_collisions.bmp",
    "enemies": [{
        "name": "Swamper",
        "sprite": "res/images/Player0.png",
        "health": 100,
        "damage": 5,
        "index": 112
    },{
        "name": "GoonScale",
        "sprite": "res/images/Player0.png",
        "health": 100,
        "damage": 6,
        "index": 113
    },{
        "name": "Brocodile",
        "sprite": "res/images/Player0.png",
        "health": 110,
        "damage": 7,
        "index": 114
    },{
        "name": "Krush",
        "sprite": "res/images/Player0.png",
        "health": 120,
        "damage": 8,
        "index": 115
    }],
    "player_spawn_x": 560,
    "player_spawn_y": 576,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 45,
    "tilesHigh": 45,
    "triggers": [{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 576,
        "y": 576,
        "width": 16,
        "height": 16,
        "destination": "overworld_map"
    }]
}];
