function enemy_from_list(name, index, x, y, health, damage) {
    let sprite = h.sprite(h.enemy_list[index]);
    return enemy(name, sprite, x, y, health, damage);
}

function createEnemy(jsoninput){
	
	filmStrip= h.filmstrip(jsoninput.sprite, 16, 16);
	sprite= h.sprite(filmStrip[jsoninput.index]);
	return enemy(jsoninput.name, sprite, jsoninput.health, jsoninput.damage);
	
}

function enemy(name, sprite, health, damage) {
    let stat = new Map();

    stat.set("strength", damage);
    stat.set("health", health);
    stat.set("max_health", health);
    stat.set("intelligence", 5);
    stat.set("experience", 5);
    sprite.scale.x = sprite.scale.y = 4;
    sprite.x = 350;
    sprite.y = 80;
    sprite.name = name;
    sprite.stat = stat;
    sprite.doTurn = function () {
        if (h.combatTurn.enemies[0].stat.get("health") <= 0) {
            gainExperience(currentFoe.stat.get("experience"));
            h.remove(combatTurn.enemies[0]);
            combatTurn.enemies.pop();
            return false;
        }
        console.log("enemy turn");
        h.shake(this, 0.05, true);

        if (h.randomInt(0, 100) < 80) {
            currentHP = h.player.stat.get("current_health") - stat.get('strength');
            h.player.stat.set('current_health', currentHP);

            if (currentHP <= 0) {
                h.state = gameOver;
            }

        } else {
            miss = h.text("Enemy has missed!", "25px puzzler", "red");
			popUp(miss, 200);
        }

        return true;

    }
    return sprite;
}

function gameOver() {
    h.rectangle(h.canvas.width, h.canvas.height, "black", "black", 0, 0, 0);
    title = h.text("You Died", "90px puzzler", "red");
    h.stage.putCenter(title);
    h.pause();
}

function createGoose() {
    return enemy("goose", "res/images/goose.png", 10, 10, 10, 10);
}
