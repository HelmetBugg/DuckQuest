maps = [{
    "name": "Pondville",
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
        "id": 28, 
        "name": "Rocky",
        "type": "npc",
        "visible": true,
        "x": 528,
        "y": 320,
        "width": 16,
        "height": 16,        
        "dialog": ["Duckman, you're alive dude!", "Wh-what has Gooseman done to you?", "He's clipped your wings and cut your feet webs!?", "I see.. you won't be able to swim or fly again.", "But at least you came back with your life."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 29, 
        "name": "James",
        "type": "npc",
        "visible": true,
        "x": 608,
        "y": 160,
        "width": 16,
        "height": 16,        
        "dialog": ["..."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 24, 
        "name": "Jim",
        "type": "npc",
        "visible": true,
        "x": 624,
        "y": 448,
        "width": 16,
        "height": 16,        
        "dialog": ["It's unbelievable what Gooseman's done..", "He's left so many from our village dead in his quest to take over the pond.", "So many that we've started burying people outside the walls.", "My Brother James is out there now.", "Please stop him Duckman, not for me, but.. for them."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 70, 
        "name": "Mayor D.",
        "type": "npc",
        "visible": true,
        "x": 336,
        "y": 272,
        "width": 16,
        "height": 16,        
        "dialog": ["I am very concerned...", "The Goose Gang...", "has taken over...", "the Pond...", "Please.. ", "Save us Duckman!"],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 2,
        "name": "Croaky",
        "type": "npc",
        "visible": true,
        "x": 528,
        "y": 464,
        "width": 16,
        "height": 16,        
        "dialog": ["Fa-lalala~", "Tra-lalala", "OH, did you enjoy my song?", "Kill three slimes for me and I'll sing you something new!", startKillThreeSlimesQuest],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 11,
        "name": "IsoKid",
        "type": "npc",
        "visible": true,
        "x": 544,
        "y": 128,
        "width": 16,
        "height": 16,        
        "dialog": ["I've been searching for monster friends in the grass all day!", "I hope I can find a \nshiny one!"],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 35,
        "name": "Rattavan",
        "type": "npc",
        "visible": true,
        "x": 336,
        "y": 448,
        "width": 16,
        "height": 16,        
        "dialog": ["Welcome to Rattavan's Gently \nUsed Fine Goods!", "No Refunds kid.", "Hey kid, buisiness has been slow.  Why don't you go uh... clean out the cave to the east.","I might be able to sell the local yuppies some spelunking tours.","How about it?","...","You dont talk much do ya?", startClearCavesForRat],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 672,
        "y": 336,
        "width": 16,
        "height": 16,
        "destination": "Overworld",
        "spawn": {"x": 496, "y": 304}
    }]
  },{
    "name": "Overworld",
	"id": 0,
    "sprite": "res/maps/overworld_map.png",
    "collisionMap": "res/maps/overworld_collision.bmp",
    "enemies": [{
            "name": "Slimon",
            "sprite": "res/images/Slime0.png",
            "health": 20,
            "damage": 5,
            "type": "slime",
            "index": 9
        },{
            "name": "Slimeer",
            "sprite": "res/images/Slime0.png",
            "health": 30,
            "damage": 5,
            "type": "slime",
            "index": 8
        },{
            "name": "Clyde",
            "sprite": "res/images/Slime0.png",
            "health": 25,
            "damage": 5,
            "type": "slime",
            "index": 10
        },{
            "name": "Thrombosteve",
            "sprite": "res/images/Slime0.png",
            "health": 35,
            "damage": 6,
            "type": "slime",
            "index": 5
        },{
            "name": "Dry Eye Guy",
            "sprite": "res/images/Slime0.png",
            "health": 30,
            "damage": 5,
            "type": "slime",
            "index": 16
        },{
            "name": "Green Blite",
            "sprite": "res/images/Slime0.png",
            "health": 25,
            "damage": 4,
            "type": "slime",
            "index": 32
        }
    ],
    "player_spawn_x": 512,
    "player_spawn_y": 368,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 45,
    "tilesHigh": 45,
    "triggers": [{
        "id": 4,
        "name": "turtleTrader",
        "type": "npc",
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
        "destination": "Pondville",
        "spawn": {"x": 624, "y": 336}
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
        "destination": "Alligator Hideout",
        "spawn": {"x": 592, "y": 640}
    },{
        "id": 6,
        "name": "teleporterCave",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 624,
        "y": 128,
        "width": 16,
        "height": 16,
        "destination": "Spider Cave",
        "spawn": {"x": 192, "y": 368}
    },{
        "id": 6,
        "name": "teleporterBog",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 96,
        "y": 608,
        "width": 16,
        "height": 16,
        "destination": "Bog",
        "spawn": {"x": 640, "y": 640}
    },{
        "id": 7,
        "name": "teleporterTent",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 528,
        "y": 448,
        "width": 16,
        "height": 16,
        "destination": "Tent",
        "spawn": {"x": 144, "y": 288}
    }]
},{
    "name": "Alligator Hideout",
	"id": 0,
    "sprite": "res/maps/aligator_hideout.png",
    "collisionMap": "res/maps/alligator_hideout_collisions.bmp",
    "enemies": [{
        "name": "Swamper",
        "sprite": "res/images/Player0.png",
        "health": 100,
        "damage": 5,
        "type": "reptile",
        "index": 112
    },{
        "name": "GoonScale",
        "sprite": "res/images/Player0.png",
        "health": 100,
        "damage": 6,
        "type": "reptile",
        "index": 113
    },{
        "name": "Brocodile",
        "sprite": "res/images/Player0.png",
        "health": 110,
        "damage": 7,
        "type": "reptile",
        "index": 114
    },{
        "name": "Krush",
        "sprite": "res/images/Player0.png",
        "health": 120,
        "damage": 8,
        "type": "reptile",
        "index": 115
    }],
    "player_spawn_x": 560,
    "player_spawn_y": 576,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 45,
    "tilesHigh": 45,
    "triggers": [{
        "id": 112, 
        "name": "Bossman",
        "type": "npc",
        "visible": true,
        "x": 480,
        "y": 352,
        "width": 16,
        "height": 16,        
        "dialog": ["...hahaha. Wait who is this guy?", "You've come to challenge.. ME?", AlligatorBossFight],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 113,
        "name": "Swampy",
        "type": "npc",
        "visible": true,
        "x": 576,
        "y": 544,
        "width": 16,
        "height": 16,        
        "dialog": ["zzzZZZzzz.."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 113,
        "name": "Stinky",
        "type": "npc",
        "visible": true,
        "x": 560,
        "y": 400,
        "width": 16,
        "height": 16,        
        "dialog": ["Move along little duck.."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 113,
        "name": "Butch",
        "type": "npc",
        "visible": true,
        "x": 320,
        "y": 336,
        "width": 16,
        "height": 16,        
        "dialog": ["Move along little duck.."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 560,
        "y": 672,
        "width": 16,
        "height": 16,
        "destination": "Overworld",
        "spawn": {"x": 208, "y": 80}
    }]
},{
    "name": "Spider Cave",
	"id": 0,
    "sprite": "res/maps/spider_cave.png",
    "collisionMap": "res/maps/spider_cave_collisions.bmp",
    "enemies": [{
        "name": "Peter",
        "sprite": "res/images/Misc0.png",
        "health": 100,
        "damage": 5,
        "type": "reptile",
        "index": 41
    },{
        "name": "Ben",
        "sprite": "res/images/Misc0.png",
        "health": 100,
        "damage": 6,
        "type": "reptile",
        "index": 42
    },{
        "name": "Gwen",
        "sprite": "res/images/Misc0.png",
        "health": 110,
        "damage": 7,
        "type": "reptile",
        "index": 43
    },{
        "name": "Miles",
        "sprite": "res/images/Misc0.png",
        "health": 120,
        "damage": 8,
        "type": "reptile",
        "index": 40
    }],
    "player_spawn_x": 560,
    "player_spawn_y": 576,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 15,
    "tilesHigh": 25,
    "triggers": [{
        "id": 44, 
        "name": "Spider Queen",
        "type": "npc",
        "visible": true,
        "x": 160,
        "y": 80,
        "width": 16,
        "height": 16,        
        "dialog": ["Hiiiissss...", SpiderBossFight],
        "spriteSheet" : "res/images/Misc0.png"
    },{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 208,
        "y": 368,
        "width": 16,
        "height": 16,
        "destination": "Overworld",
        "spawn": {"x": 624, "y": 144}
    }]
 
 },{
    "name": "Alligator Hideout",
	"id": 0,
    "sprite": "res/maps/aligator_hideout.png",
    "collisionMap": "res/maps/alligator_hideout_collisions.bmp",
    "enemies": [{
        "name": "Swamper",
        "sprite": "res/images/Player0.png",
        "health": 100,
        "damage": 5,
        "type": "reptile",
        "index": 112
    },{
        "name": "GoonScale",
        "sprite": "res/images/Player0.png",
        "health": 100,
        "damage": 6,
        "type": "reptile",
        "index": 113
    },{
        "name": "Brocodile",
        "sprite": "res/images/Player0.png",
        "health": 110,
        "damage": 7,
        "type": "reptile",
        "index": 114
    },{
        "name": "Krush",
        "sprite": "res/images/Player0.png",
        "health": 120,
        "damage": 8,
        "type": "reptile",
        "index": 115
    }],
    "player_spawn_x": 560,
    "player_spawn_y": 576,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 45,
    "tilesHigh": 45,
    "triggers": [{
        "id": 112, 
        "name": "Bossman",
        "type": "npc",
        "visible": true,
        "x": 480,
        "y": 352,
        "width": 16,
        "height": 16,        
        "dialog": ["...hahaha. Wait who is this guy?", "You've come to challenge.. ME?", AlligatorBossFight],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 113,
        "name": "Swampy",
        "type": "npc",
        "visible": true,
        "x": 576,
        "y": 544,
        "width": 16,
        "height": 16,        
        "dialog": ["zzzZZZzzz.."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 113,
        "name": "Stinky",
        "type": "npc",
        "visible": true,
        "x": 560,
        "y": 400,
        "width": 16,
        "height": 16,        
        "dialog": ["Move along little duck.."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 113,
        "name": "Butch",
        "type": "npc",
        "visible": true,
        "x": 320,
        "y": 336,
        "width": 16,
        "height": 16,        
        "dialog": ["Move along little duck.."],
        "spriteSheet" : "res/images/Player0.png"
    },{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 560,
        "y": 672,
        "width": 16,
        "height": 16,
        "destination": "Overworld",
        "spawn": {"x": 208, "y": 80}
    }]
},{
    "name": "Bog",
    "id": 0,
    "sprite": "res/maps/new_swamp_map.png",
    "collisionMap": "res/maps/new_swamp_map_collisions.bmp",
    "enemies": [{
        "name": "Sky Swipe",
        "sprite": "res/images/Misc0.png",
        "health": 100,
        "damage": 6,
        "type": "reptile",
        "index": 28
    },{
        "name": "Skeeter",
        "sprite": "res/images/Misc0.png",
        "health": 120,
        "damage": 8,
        "type": "reptile",
        "index": 27
    },{
        "name": "Jabberwalker",
        "sprite": "res/images/Misc0.png",
        "health": 120,
        "damage": 8,
        "type": "reptile",
        "index": 12
    }],
    "player_spawn_x": 560,
    "player_spawn_y": 576,
    "tileWidth": 16,
    "tileHeight": 16,
    "tilesWide": 64,
    "tilesHigh": 64,
    "triggers": [{
        "id": 6,
        "name": "teleporterOverworld",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 640,
        "y": 656,
        "width": 16,
        "height": 16,
        "destination": "Overworld",
        "spawn": {"x": 96, "y": 608}
    },{
        "id": 6,
        "name": "teleporterSkycliffs",
        "rotation": 0,
        "type": "teleporterTile",
        "visible": true,
        "x": 144,
        "y": 144,
        "width": 16,
        "height": 16,
        "destination": "Sky Cliffs",
        "spawn": {"x": 144, "y": 48}
    }]
    },{
        "name": "Sky Cliffs",
        "id": 0,
        "sprite": "res/maps/SkyCliffs.png",
        "collisionMap": "res/maps/skycliffscollisions.bmp",
        "enemies": [
        {
            "name": "Sky Swipe",
            "sprite": "res/images/Misc0.png",
            "health": 100,
            "damage": 6,
            "type": "reptile",
            "index": 28
        },{
            "name": "Swipe Larva",
            "sprite": "res/images/Misc0.png",
            "health": 110,
            "damage": 7,
            "type": "reptile",
            "index": 20
        },{
            "name": "Skeeter",
            "sprite": "res/images/Misc0.png",
            "health": 120,
            "damage": 8,
            "type": "reptile",
            "index": 27
        }],
        "player_spawn_x": 640,
        "player_spawn_y": 350,
        "tileWidth": 16,
        "tileHeight": 16,
        "tilesWide": 64,
        "tilesHigh": 64,
        "triggers": [{
            "id": 6,
            "name": "teleporterOverworld",
            "rotation": 0,
            "type": "teleporterTile",
            "visible": true,
            "x": 560,
            "y": 672,
            "width": 16,
            "height": 16,
            "destination": "Overworld",
            "spawn": {"x": 208, "y": 80}
        },{
            "id": 6,
            "name": "teleporterSkyway",
            "rotation": 0,
            "type": "teleporterTile",
            "visible": true,
            "x": 144,
            "y": 32,
            "width": 16,
            "height": 16,
            "destination": "Bog",
            "spawn": {"x": 144, "y": 160}
        },{
            "id": 7, 
            "name": "Oda",
            "type": "npc",
            "visible": true,
            "x": 800,
            "y": 384,
            "spriteSheet" : "res/images/Misc0.png",
            "index" : 7,
            "width": 32,
            "height": 32,        
            "dialog": ["You are here to challenge the great hunter Oda!?", "You sad fool.", "Prepare to be.... Hunted!",
            " ", "Listen Its great hunter Oda not great poet.", DragonFlyBoss]
        }]
    },{
        "name": "Tent",
        "id": 0,
        "sprite": "res/maps/Tent.png",
        "collisionMap": "res/maps/TentCollisions.bmp",
        "enemies": [],
        "player_spawn_x": 640,
        "player_spawn_y": 350,
        "tileWidth": 16,
        "tileHeight": 16,
        "tilesWide": 64,
        "tilesHigh": 64,
        "triggers": [{
            "id": 6,
            "name": "teleporterOverworld",
            "rotation": 0,
            "type": "teleporterTile",
            "visible": true,
            "x": 128,
            "y": 160,
            "width": 128,
            "height": 32,
            "destination": "Maze",
            "spawn": {"x": 208, "y": 80}
        },{
            "id": 7, 
            "name": "Oda",
            "type": "npc",
            "visible": true,
            "x": 800,
            "y": 384,
            "spriteSheet" : "res/images/Misc0.png",
            "index" : 7,
            "width": 32,
            "height": 32,        
            "dialog": ["You are here to challenge the great hunter Oda!?", "You sad fool.", "Prepare to be.... Hunted!",
            " ", "Listen Its great hunter Oda not great poet.", DragonFlyBoss]
        }]
    }
];
