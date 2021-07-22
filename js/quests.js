function createQuest(name, desc, goal, effect){
	var quest = {};
	quest.type = 'quest';
	quest.active = true;
	quest.name = name;
	quest.desc = desc;
	quest.goal = goal;
	quest.effect = effect;
	quest.validate = function(){
		if (goal()){
			effect();
			this.active = false;
		}
	};
	return quest;
}

function goalKillThreeSlimes(){
    // todo
	return true;
}

function effectKillThreeSlimes(){
	gainExperience(100);
	console.log("Quest 'Kill Three Slimes' Complete");
}