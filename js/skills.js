//JEXXT

function createSkill(name,descrip,level,effect){
	var skill = {};
	skill.name = name;
	skill.descrip = descrip;
	skill.level = level;
	skill.effect = effect;
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
  	    createSkill("Peck","A basic melee attack using a beak", 2, console.log("Peck")),
	    createSkill("Float","A basic defensive move halving enemy damage", 5, console.log("Float")),
	    createSkill("Duster","A special magic attack that deals damage and lowers enemy accuracy", 7, console.log("Duster")),
	];
}
