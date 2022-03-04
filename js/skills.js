function createSkill(name,description,level,effect,damage,accuracy){
	var skill = {};
	skill.type = 'skill';
	skill.name = name;
	skill.description = description;
	skill.level = level;
	skill.effect = effect;
	skill.damage = damage;
	skill.accuracy = accuracy;
	return skill;
}

function checkSkills(level){
	accumSkills = [];
    for (var i=0; i<h.globalSkills.length; i++){
        if (h.globalSkills[i].level <= level){
            accumSkills.push(h.globalSkills[i]);
		}
	}
	return accumSkills;
}
function initSkills(){
	h.globalSkills = [
  	    createSkill("Peck", "A basic melee attack using a beak", 1, Peck, 4, 90),
	    createSkill("Heal", "Heal between 10 - 20 + your level in HP", 3, Heal, 0, 95),
	    createSkill("Duck Kick", "A special magic attack that deals damage and lowers enemy accuracy", 1, genericSkill, 8, 85),
	    createSkill("Float", "Protects you from half of enemy damage for encounter.", 1, Float, 5, 95),
	    //createSkill("Duster", "A special magic attack that deals damage and lowers enemy accuracy", 2, Duster, 4, 85),
	    createSkill("Sword\nAttack", "A basic defensive move halving enemy damage", 2, genericSkill, 2, 90),
	    createSkill("Feign", "Low power attack that never misses.", 3, genericSkill, 3, 100),
	    createSkill("Rage", "Take more damage and deal more damage for encounter.", 4, Rage, 2, 80)
	];
}

function genericSkill(){
    console.log("skill used");
}

function Rage(){
	h.player.status["rage"] = true;
}

function Peck() {
	chance = h.randomInt(0,10);
	if (chance > 4){
		console.log("peck");	
	}
}

function Float() {
	console.log("float");
	h.player.status["protected"]= true;
	
}

function Duster() {
	chance = h.randomInt(0,10);
	if (chance > 4){
		console.log("dust");	
	}
}

function Heal() {
	healing = h.randomInt(10,20)*h.player.stat.get("level");
	playerHealth = h.player.stat.get("current_health");
	newHealth = Math.min((playerHealth + healing),h.player.stat.get("max_health"));
	h.player.stat.set("current_health", newHealth);
}

function Run(){
	cleanupCombat(h.combatTurn.menu);
	for(var i=0; i<h.combatTurn.enemies.length; i++){
		h.remove(h.combatTurn.enemies[i]);
	}
}

function rollHitChance(accuracy) {
	var outcome = h.randomInt(0, 100);
	if(accuracy >= outcome){
		return true;
	}
	return false;
}
