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
  	    createSkill("Peck","A basic melee attack using a beak", 1, Peck, 4, 95),
	    createSkill("Shield","A basic defensive move halving enemy damage", 1, Float, 2, 100),
	    createSkill("Duck Kick","A special magic attack that deals damage and lowers enemy accuracy", 1, Duster, 8, 85),
	    createSkill("Float","A basic defensive move halving enemy damage", 1, Float, 2, 100),
	    createSkill("Duster","A special magic attack that deals damage and lowers enemy accuracy", 2, Duster, 4, 85),
	    createSkill("Sword\nAttack","A basic defensive move halving enemy damage", 2, Float, 2, 90),
	    createSkill("Feign","Low power attack that never misses.", 3, Float, 2, 100),
	    createSkill("Rage","Damages extra based on current health.", 3, Float, 2, 80)
	];
}

function Peck() {
	chance = h.randomInt(0,10);
	if (chance > 4){
		console.log("peck");	
	}
}

function Float() {
	chance = h.randomInt(0,10);
	if (chance > 4){
		console.log("float");	
	}
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

function rollHitChance(accuracy){
	var outcome = h.randomInt(0, 100);
	if(accuracy >= outcome){
		return true;
	}
	return false;
}
