function createEnemy(jsoninput) {
    var width = (jsoninput.width) ? jsoninput.width : 16;
    var height = (jsoninput.height) ? jsoninput.height : 16;

    filmStrip = h.filmstrip(jsoninput.sprite, height, width);
    sprite = h.sprite(filmStrip[jsoninput.index]);
    return enemy(jsoninput.name, sprite, jsoninput.health, jsoninput.damage, jsoninput.type);
}


function enemy(name, sprite, health, damage, type) {
    h.player.talking = false;
    h.player.tweening = false;
    let stat = new Map();
    stat.set("strength", damage);
    stat.set("health", health);
    stat.set("max_health", health);
    var expReward = Math.round((health + damage) / 6);
    stat.set("experience", expReward);
    sprite.type = type;
    sprite.scale.x = sprite.scale.y = 6;
    sprite.pivotX = sprite.pivotY = 0.5;
    sprite.x = 390;
    sprite.y = 135;
    sprite.name = name;
    sprite.stat = stat;
    // Highly convuluted, need to come back and fix this up.
    sprite.doTurn = function () {
        if (h.randomInt(0, 100) < 80) {
            currentHP = h.player.stat.get("current_health");
            damageAnimation();
			damageTaken = stat.get('strength');
            if (h.player.status["protected"]) {
                damageTaken = Math.round(damageTaken / 2);
				popUp(button(0, 0, "Protected!"));
            }
            if(h.player.status["rage"]){
                damageTaken = Math.round(damageTaken * 1.2);
            }
            h.combatTurn.menu.combatLog.Text.text = "Enemy hit for " + damageTaken;
            h.player.stat.set('current_health', currentHP - damageTaken);
        } else {
            h.combatTurn.menu.combatLog.Text.text = "Enemy missed!";
        }
        return true;
    }
    return sprite;
}

function AlligatorBossFight() {
    h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    var boss = new createEnemy({
        "name": "Al-ligator",
        "sprite": "res/images/Player0.png",
        "health": 250,
        "damage": 40,
        "index": 112,
        "type": "AligatorBoss"
    });
    h.combatTurn = initCombatTurn(combatMenu, boss);
    combatMenu.skillsMenu.runnable = false;
    combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}

function SpiderBossFight() {
    h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    var boss = new createEnemy({
        "name": "Spider Queen",
        "sprite": "res/images/Misc0.png",
        "health": 350,
        "damage": 50,
        "index": 44,
        "type": "SpiderBoss"
    });
    h.combatTurn = initCombatTurn(combatMenu, boss);
    combatMenu.skillsMenu.runnable = false;
    combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}

function DragonFlyBoss() {
    h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    var boss = new createEnemy({
        "name": "Great Hunter Oda",
        "sprite": "res/images/Misc0.png",
        "health": 400,
        "damage": 60,
        "index": 7,
        "type": "DragonFlyBoss", 
        "width" : 32,
        "height" : 32 
    });
    h.combatTurn = initCombatTurn(combatMenu, boss);
    combatMenu.skillsMenu.runnable = false;
    combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}

function ClownFishBoss() {
    h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    var boss = new createEnemy({
        "name": "Jasper",
        "sprite": "res/images/Player0.png",
        "health": 650,
        "damage": 120 ,
        "index": 7,
        "type": "ClownFishBoss", 
        "width" : 16,
        "height" : 16 
    });
    h.combatTurn = initCombatTurn(combatMenu, boss);
    combatMenu.skillsMenu.runnable = false;
    combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}