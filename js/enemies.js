function createEnemy(jsoninput){
	filmStrip = h.filmstrip(jsoninput.sprite, 16, 16);
	sprite = h.sprite(filmStrip[jsoninput.index]);
	return enemy(jsoninput.name, sprite, jsoninput.health, jsoninput.damage);
}

function enemy(name, sprite, health, damage) {
    let stat = new Map();
    stat.set("strength", damage);
    stat.set("health", health);
    stat.set("max_health", health);
    stat.set("intelligence", 5);
    stat.set("experience", 5);
    sprite.scale.x = sprite.scale.y = 6;
    sprite.pixotX = 1;
    sprite.x = 330;
    sprite.y = 75;
    sprite.name = name;
    sprite.stat = stat;
    // Highly convuluted, need to come back and fix this up.
    sprite.doTurn = function () {
        if (h.randomInt(0, 100) < 80) {
            currentHP = h.player.stat.get("current_health") - stat.get('strength');
            damageAnimation();
            h.combatTurn.menu.combatLog.Text.text = "Enemy hit for "+ stat.get('strength');
            h.player.stat.set('current_health', currentHP);
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


function AlligatorBossFight(){
    h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    var boss = new createEnemy({
        "name": "Al-ligator",
        "sprite": "res/images/Player0.png",
        "health": 250,
        "damage": 40,
        "index": 112
    });
    h.combatTurn = initCombatTurn(combatMenu, boss);
    combatMenu.skillsMenu.runnable = false;
	combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}
