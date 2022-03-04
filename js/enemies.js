function createEnemy(jsoninput) {
    filmStrip = h.filmstrip(jsoninput.sprite, 16, 16);
    sprite = h.sprite(filmStrip[jsoninput.index]);
    return enemy(jsoninput.name, sprite, jsoninput.health, jsoninput.damage, jsoninput.type);
}

function enemy(name, sprite, health, damage, type) {
    h.player.talking = false;
    h.player.tweening = false;
    h.inCombat = false;
    let stat = new Map();
    stat.set("strength", damage);
    stat.set("health", health);
    stat.set("max_health", health);
    var expReward = Math.round((health + damage) / 6);
    stat.set("experience", expReward);
    sprite.type = type;
    sprite.scale.x = sprite.scale.y = 6;
    sprite.pixotX = 1;
    sprite.x = 330;
    sprite.y = 75;
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

function createGoose() {
    return enemy("goose", "res/images/goose.png", 10, 10, 10, 10);
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
