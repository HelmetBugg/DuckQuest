
function enemy_from_list(name, index, x, y, health, damage){
    let sprite = h.sprite(h.enemy_list[index]);
    return enemy(name, sprite, x, y, health, damage);
}

function enemy(name, sprite_url, x, y, health, damage){
	let sprite = h.sprite(sprite_url);
    return enemy(name, sprite, x, y, health, damage);
}

function enemy(name, sprite, x, y, health, damage){
    let E_stat = new Map();
    
    E_stat.set("strength", damage);
	E_stat.set("health", health);
	E_stat.set("intelligence", 5);
    sprite.scale.x = sprite.scale.y = 4;
    sprite.x = 150;
    sprite.y = 100;
    sprite.name = name;
    sprite.stat = E_stat;

    sprite.doTurn = function(){
        h.combatTurn.nextTurn();
        console.log("enemy turn");
        h.shake(this, 0.05, true);
        currentHP = h.player.stat.get("health")-E_stat.get('strength');
        console.log(currentHP);
        h.player.stat.set('health', currentHP);
    }
    return sprite;
}

function createGoose(){
	return enemy("goose", "res/images/goose.png", 10, 10, 10, 10);
}