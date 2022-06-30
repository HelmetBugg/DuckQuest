var questMap = {
	"Kill Lord Gator": startKillAligatorBoss,
	"Slime Hunt": startKillThreeSlimesQuest,
	"Kill Nemo": startClownfishQuest,
	"Kill Dragonfly": startDragonflyQuest,
	"Alternate Revenue Streams": startClearCavesForRat,
	"Kill Gooseman": startGoosemanQuest
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
			quest.active = false;
			effect();
			popUp(button(100, 0, "Quest Complete!"), 5000);
			
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
		checkGoosemanQuest();
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


function startClownFishQuest() {
    createQuest('Kill Nemo','Clownfish needs ded. Kill they butt.',
	function(){
		if (h.player.killed.ClownFishBoss > 0) {
			return true;
		}
		return false;
	}, function () {
		gainExperience(1000);
		checkGoosemanQuest();
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
		console.log("Dragonfly exp.");
		gainExperience(800);
		checkGoosemanQuest();
	});
}


function startGoosemanQuest() {
	createQuest('Kill Gooseman', 'Kill Gooseman, save the pond.',
	function(){
		if (h.player.killed.Gooseman > 0) {
			return true;
		}
		return false;
	}, function () {
		// Teleport to the saved version of townville.
		//initMap(maps[11]);
		gainExperience(0);
		startGoosedoraQuest();
		
	});
}


function checkGoosemanQuest(){
	// Check to make sure you completed the three original kill quests you started with, trigger new quest.
	if (!h.player.checkQuests("Kill Dragonfly") && !h.player.checkQuests("Kill Nemo") && !h.player.checkQuests("Kill Lord Gator")){
		startGoosemanQuest();
	}
}

function startGoosedoraQuest() {
	createQuest('Kill Goosedora', 'Kill Goosedora, save the pond.',
	function(){
		if (h.player.killed.Goosedora > 0) {
			return true;
		}
		return false;
	}, function () {
		// Teleport to the saved version of townville.
		initMap(maps[11]);
	});
}