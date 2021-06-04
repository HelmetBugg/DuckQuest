//JEXXT

function createSkill(name,descrip,level,effect){
	var skill = {};
	skill.name = name;
	skill.descrip = descrip;
	skill.level = level;
	skill.effect = effect;
	
	return skill;
	
}


function initSkills(){
	return [
	createSkill("Peck","A basic melee attack using a beak", 2, console.log("Peck")),
	createSkill("Float","A basic defensive move halving enemy damage", 5, console.log("Float")),
	createSkill("Duster","A special magic attack that deals damage and lowers enemy accuracy", 7, console.log("Duster")),
	];
	
}
