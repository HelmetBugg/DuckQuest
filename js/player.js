function initplayer() {
    if (h.player == null) {
        //h.player = h.sprite("res/images/duckman.png");
		filmStrip = h.filmstrip("res/images/Player0.png", 16, 16);
		h.player = h.sprite(filmStrip[103]);
    }
    h.player.directionFacingBox = h.rectangle(16, 16, "white", "black", 0, 0, 0);
    h.player.directionFacingBox.visible = false;
	let stat = new Map();
	stat.set("experience", 0);
	stat.set("next_level", 14);
	stat.set("level", 1);	
	stat.set("strength", 5);
	stat.set("max_health", 100);
	stat.set("current_health", 50);
	stat.set("intelligence", 5);
	h.player.encounter_Chance = 0;
	h.player.killed = {
		"total": 0,
		"slime": 0,
		"AligatorBoss": 0,
		"SpiderBoss": 0,
		"DragonFlyBoss": 0,
		"SnakeBoss": 0,
		"ClownFishBoss": 0,
		"Gooseman": 0,
		"Goosedora": 0
	};
	h.player.status = {
		"protected": false,
		"rage": false
	};
	h.player.stat = stat;
	h.player.skills = [];
	h.player.quests = [];
	h.player.tweening = false;

	// Kick off default quests
	startKillAligatorBoss();
	startClownFishQuest();
	startDragonflyQuest();

	h.player.checkQuests = function(questName){
		for (let i=0; i < h.player.quests.length; i++)   {
			if (h.player.quests[i].name == questName && h.player.quests[i].active){	
				return true;
			}
		}
		return false;
	}

    h.player.henshin = function () {
        sentai = true
		h.player.stat.set("max_health",40000);
		h.player.stat.set("strength",40000);
		levelUp();
		h.player.tint = 0xff1808;
    }
}