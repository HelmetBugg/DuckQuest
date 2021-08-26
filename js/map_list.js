maps = [{
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
},{
    "name": "map_1",
    "sprite": "res/maps/1_lvl_map.png",
    "collisionMap": "res/maps/map_collisions_1.bmp",
    "enemies": [{
            "name": "Slimon",
            "sprite": "res/images/Slime0.png",
            "health": 10,
            "damage": 5,
            "index": 9
        }, {
            "name": "Slimeer",
            "sprite": "res/images/Slime0.png",
            "health": 10,
            "damage": 5,
            "index": 8
        }, {
            "name": "Clyde",
            "sprite": "res/images/Slime0.png",
            "health": 10,
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
}];
