var questMap = {
	"Kill Lord Gator": startKillAligatorBoss,
	"Slime Hunt": startKillThreeSlimesQuest,
	"Kill Nemo": startClownfishQuest,
	"Kill Dragonfly": startDragonflyQuest,
	"Alternate Revenue Streams": startClearCavesForRat
};


function createQuest(name, desc, goal, effect){
	popUp(button(100, 0, "New Quest Started!"), 5000);
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
			popUp(button(100, 0, "Quest Complete!"), 5000);
			quest.active = false;
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
    createQuest('Kill Lord Gator','Liberate the sewers from lord Gator',
	function(){
		if (h.player.killed.AligatorBoss > 0){
			return true;
		}
		return false;
	},function(){
		gainExperience(500);
	});
}


function startClearCavesForRat() {
	createQuest('Alternate Revenue Streams', 'Rativan wants to expand out from sundries.  Clear out wildlife from a cave for payment and a discount on future spelunking tours (he says).',
		function () {
			if (h.player.killed.SpiderBoss > 0) {
				return true;
			}
			return false;
		}, function () {
			gainExperience(300);
		});
}


function startClownfishQuest() {
    createQuest('Kill Nemo','Clownfish needs ded. Kill they butt.',
	function(){
		if (h.player.killed.ClownFishBoss > 0) {
			return true;
		}
		return false;
	}, function () {
		gainExperience(1000);
	});
}


function startDragonflyQuest() {
	createQuest('Kill Dragonfly', 'Do the dragonfly dirty.',
	function(){
		if (h.player.killed.DragonFlyBoss > 0) {
			return true;
		}
		return false;
	}, function () {
		gainExperience(800);
	});
}


