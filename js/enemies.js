function enemy(name, sprite, x, y, health, damage){
	let sprite = h.sprite(sprite);
    //sprite.scale.x = sprite.scale.y = 0.8;
    sprite.name = name;
    sprite.health = health;
	sprite.damage = damage;
    return sprite;
}

function createGoose(){
	return enemy("goose", "res/images/goose.png", 10, 10, 10, 10);
}


