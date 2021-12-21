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
    sprite.scale.x = sprite.scale.y = 5;
    sprite.pixotX = 1;
    sprite.x = 340;
    sprite.y = 85;
    sprite.name = name;
    sprite.stat = stat;
    // Highly convuluted, need to come back and fix this up.
    sprite.doTurn = function () {
        if (h.randomInt(0, 100) < 80) {
            currentHP = h.player.stat.get("current_health") - stat.get('strength');

            damageAnimation();
            var attack = h.text("Enemy hit for " + stat.get('strength'), "16px Press Start 2P", "red");
			popUp(attack, 1800);
            h.player.stat.set('current_health', currentHP);
        } else {
            var miss = h.text("Enemy has missed!", "16px Press Start 2P", "red");
			popUp(miss, 1800);
        }
        return true;
    }
    return sprite;
}



function createGoose() {
    return enemy("goose", "res/images/goose.png", 10, 10, 10, 10);
}

