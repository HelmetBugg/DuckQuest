function createQuest(name, desc, goal, effect){
	var quest = {};
	quest.type = 'quest';
	quest.active = true;
	quest.name = name;
	quest.description = desc;
	quest.goal = goal;
	quest.effect = effect;
	quest.isComplete = function(){
		if (goal()){
			effect();
			this.active = false;
		}
	};
	h.player.quests.push(quest);
}

function startKillThreeSlimesQuest(){
	popUp(button(0, 0, "New Quest Started!"));
    createQuest('Slime Hunt','Kill 3 slimes.',goalKillThreeSlimes,effectKillThreeSlimes);
}

function goalKillThreeSlimes(){
	if (h.player.killed.slimes > 2){
		popUp(button(0, 0, "Quest Complete!"));
		gainExperience(100);
		return true;
	}
	return false;
}

function effectKillThreeSlimes(){
	gainExperience(100);
	console.log("Quest 'Kill Three Slimes' Complete");
}

function killAlligatorBoss(){
	getAttacked();
}