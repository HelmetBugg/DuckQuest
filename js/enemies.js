
function enemy(name, sprite_url, x, y, health, damage){
	let sprite = h.sprite(sprite_url);
    //sprite.scale.x = sprite.scale.y = 0.8;
    sprite.name = name;
    sprite.health = health;
	sprite.damage = damage;

    sprite.doTurn = function(){
        console.log("enemy turn");
        h.shake(this, 0.05, true);
        console.log(h.player.stat.get("health")-1);
        h.combatTurn.nextTurn();
    }
    return sprite;
}

function createGoose(){
	return enemy("goose", "res/images/goose.png", 10, 10, 10, 10);
}