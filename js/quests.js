function createQuest(name, desc, goal, effect){
	popUp(button(0, 0, "New Quest Started!"));
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
			popUp(button(0, 0, "Quest Complete!"));
			this.active = false;
		}
	};
	h.player.quests.push(quest);
}


function startKillThreeSlimesQuest(){
	
    createQuest('Slime Hunt','Kill 3 slimes.',goalKillThreeSlimes,effectKillThreeSlimes);
}
function goalKillThreeSlimes(){
	if (h.player.killed.slimes > 2){
		gainExperience(100);
		return true;
	}
	return false;
}
function effectKillThreeSlimes(){
	gainExperience(100);
	console.log("Quest 'Kill Three Slimes' Complete");
}


function startKillAligatorBoss(){
    createQuest('Slime Hunt','Kill 3 slimes.',
	function(){
		if (h.player.killed.AligatorBoss > 0){
			return true;
		}
		return false;
	},function(){
		gainExperience(500);
	});
}
