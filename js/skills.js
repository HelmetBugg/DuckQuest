function createSkill(name,descrip,level,effect,damage,accuracy){
	var skill = {};
	skill.type = 'skill';
	skill.name = name;
	skill.desc = descrip;
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
	    createSkill("Float","A basic defensive move halving enemy damage", 1, Float, 2, 100),
	];
}

function Peck() {
	chance = h.randomInt(0,10);
	if (chance > 4){
		console.log("peck");	
	}
}

function Float() {
	console.log("float");
	h.player.status["protected"]
}

function Duster() {
	chance = h.randomInt(0,10);
	if (chance > 4){
		console.log("dust");	
	}
}

function Run(){
	cleanupCombat(h.combatTurn.menu);
	for(var i=0; i<h.combatTurn.enemies.length; i++){
		h.remove(h.combatTurn.enemies[i]);
	}
}

function rollHitChance(accuracy) {

	var outcome = h.randomInt(0, 100);
	console.log(" Roll passed in:"+ accuracy)
	console.log(" Roll:" + outcome)
	console.log(Boolean(accuracy >= outcome) + "True or False?")
	if(accuracy >= outcome){
		return true;
	}
	return false;
}
