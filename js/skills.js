function createSkill(name,descrip,level,effect,damage,accuracy){
	var skill = {};
	skill.type = 'skill';
	skill.name = name;
	skill.description = descrip;
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
  	    createSkill("Peck","A basic melee attack using a beak", 1, Peck, 2, 95),
	    createSkill("Shield","A basic defensive move halving enemy damage", 1, Float, 1, 100),
	    createSkill("Duck Kick","A special magic attack that deals damage and lowers enemy accuracy", 1, Duster, 4, 85),
		createSkill("Peck","A basic melee attack using a beak", 1, Peck, 2, 95),
	    createSkill("Float","A basic defensive move halving enemy damage", 1, Float, 0, 100),
	    createSkill("Duster","A special magic attack that deals damage and lowers enemy accuracy", 1, Duster, 4, 85)
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