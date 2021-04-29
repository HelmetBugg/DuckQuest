function pauseMenu() {
	menu = h.rectangle(200, 500, "white");
	menuTitle = h.text("Pause", "38px puzzler", "black");

	statusButton = h.text("Status", "30px puzzler", "black");
	statusButton.x = 50; 
	statusButton.y = 50; 
	h.makeInteractive(statusButton);
    statusButton.press = function () {
        console.log("statusbutton pressed");
    }

	questsButton = h.text("Quests", "30px puzzler", "black");
	questsButton.x = 50; 
	questsButton.y = 100; 
	h.makeInteractive(questsButton);
    questsButton.press = function () {
        console.log("questsbutton pressed");
    }

	spellsButton = h.text("Spells", "30px puzzler", "black");
	spellsButton.x = 50; 
	spellsButton.y = 150; 
	h.makeInteractive(spellsButton);
    spellsButton.press = function () {
        console.log("spellsbutton pressed");
    }

	quitButton = h.text("Quit", "30px puzzler", "black");
	quitButton.x = 50; 
	quitButton.y = 200; 
	h.makeInteractive(quitButton);
    quitButton.press = function () {
        console.log("YOU CAN NEVER QUIT!");
    }

	h.menuGroup = h.group(menu, menuTitle, statusButton, questsButton, spellsButton, quitButton);
	h.menuGroup.visible = false;
	h.stage.putCenter(h.menuGroup);	
	h.slide(h.menuGroup, -514, 0, 30, "decelerationCubed");

	h.menuGroup.toggle = function(){
		if(!h.menuGroup.tweening){
			if (this.visible){
				h.menuGroup.tweening = true;
				tween = h.slide(this, -514, 0, 30, "decelerationCubed");
				tween.onComplete = () => {
					this.visible = false;
					h.menuGroup.tweening = false;
				}
			} else {
				this.visible = true;
				h.menuGroup.tweening = true;
				tween = h.slide(this, 0, 0, 30, "decelerationCubed");
				tween.onComplete = () => {
					h.menuGroup.tweening = false;
				}
			}
		}
	}	
}


function initKeyboard() {
	speed = 16;//h.player.width;
    let leftArrow = h.keyboard(37),
    upArrow = h.keyboard(38),
    rightArrow = h.keyboard(39),
    downArrow = h.keyboard(40),
    space = h.keyboard(32);
    h.player.tweening = false;

    space.press = () => {
        h.menuGroup.toggle();
    }

    leftArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x-speed, h.player.y, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
            // Multiple by 2 because duck is a child of map which is scaled x2.
			h.camera.x -= speed * 2;
			rollAttackChance();
        }
    };

    rightArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x+speed, h.player.y, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
			h.camera.x += speed * 2;
            rollAttackChance();
        }
    };

    upArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y-speed, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
			h.camera.y -= speed * 2;
            rollAttackChance();
		}
    };

    downArrow.press = () => {
        if (!h.player.tweening){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y+speed, 20, "decelerationCubed");
            tween.onComplete = () => h.player.tweening = false;
			h.camera.y += speed * 2;
            rollAttackChance();
		}
    };
}


function initplayer() {
	h.player = h.sprite("res/images/duckman.png");
	//h.player.scale.x = h.player.scale.y = 2;
	h.player.x = h.player.y = 159;	
	let stat = new Map();
	stat.set("experience", 0);
	stat.set("next_level", 7);
	stat.set("level", 1);	
	stat.set("strength", 5);
	stat.set("max_health", 100);
	stat.set("current_health", 100);
	stat.set("intelligence", 5);
	h.player.stat = stat;

	h.player.doTurn = function(){
		console.log("player turn");
	}
}

function gainExperience(experience){
	current_experience = h.player.stat.get("experience");
    h.player.stat.set("experience", current_experience + experience);

	// check for level ups here.
	if (h.player.stat.get("experience") >= h.player.stat.get("next_level")){

		current_level = h.player.stat.get("level");
		h.player.stat.set("level", current_level + 1);
		
		current_str = h.player.stat.get("strength");
		h.player.stat.set("strength", current_str + h.randomInt(3,5));
		
		current_maxhealth = h.player.stat.get("max_health");
		h.player.stat.set("max_health", current_maxhealth + h.randomInt(5,8));
		
		current_intel = h.player.stat.get("intelligence");
		h.player.stat.set("intelligence", current_intel + h.randomInt(2,4));
		
		// Set the next goal post.
		current_level = h.player.stat.get("next_level");
		h.player.stat.set("next_level", (current_level + 2) * 2);
	}
}

function initCombatTurn(){
    combatTurn = {};
	test_enemy = enemy_from_list("slime", h.randomInt(8, 10), 10, 10, 10, 10);
	combatTurn.enemies = [test_enemy];
    combatTurn.currentParticipant = 0;
	combatTurn.nextTurn = function(){
		if (combatTurn.currentParticipant >= combatTurn.enemies.length){
			combatTurn.currentParticipant = 0;
			h.player.doTurn();
		} else {
			//combatTurn.enemies[0].doTurn();
			combatTurn.currentParticipant++;
		}

		if (test_enemy.stat.get("health") <= 0){
			gainExperience(test_enemy.stat.get("experience"));
			h.remove(combatTurn.enemies[0]);
			combatTurn.enemies.pop();
		}			
		if (combatTurn.enemies.length < 1){
			return false;
		}
		return true;
	}
	return combatTurn;
}