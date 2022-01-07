function updateHealth(menu){
    menu.playerHealth.text = "Player Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health");
    menu.enemyHealth.text = "Enemy Health:\n " + h.combatTurn.enemies[0].stat.get("health") + " / " + h.combatTurn.enemies[0].stat.get("max_health");
    menu.enemyName.text = h.combatTurn.enemies[0].name;
}

function damageAnimation(){
    var damageFlash = h.rectangle(512, 512, 'red');
    damageFlash.alpha = h.player.stat.get("current_health") / h.player.stat.get("max_health");
    tween = h.fadeOut(damageFlash, 60);    
    tween.onComplete = () => {
        h.remove(damageFlash);       
    }
	return tween;
}

function getAttacked() {
	h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    h.combatTurn = initCombatTurn(combatMenu, undefined);
	combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}

function spawnCombatMenu(){
	var menu = h.rectangle(512, 512, color.background);
	menu.skillsMenu = skillsMenu();

	menu.enemyName = h.text("Enemy Name:\n");
	menu.enemyName.style = fontStyle;
    menu.enemyName.y = 10;
    menu.enemyName.x = 270;

    menu.enemyHealth = h.text("Enemy Health:\n " + 0/0);
	menu.enemyHealth.style = fontStyle;
    menu.enemyHealth.y = 30;
    menu.enemyHealth.x = 270;

	menu.yourName = h.text("Duckman");
	menu.yourName.style = fontStyle;
    menu.yourName.y = 10;

    menu.playerHealth = h.text("Your Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health"));
	menu.playerHealth.style = fontStyle;
	menu.playerHealth.y = 30;

	menu.combatLog = new createDialogBox();
	menu.combatLog.y = 250;
	menu.combatLog.Text.text = "Select your next move.."
	menu.addChild(menu.enemyName, menu.enemyHealth, menu.playerHealth, menu.combatLog, menu.yourName);
	return menu;
}


function initCombatTurn(menu, currentFoe){
    var combatTurn = {};
	if (currentFoe == undefined){
		currentFoe = createEnemy(h.map.layer.enemies[h.randomInt(0,h.map.layer.enemies.length-1)]);
	} 
	combatTurn.enemies = [currentFoe];
    combatTurn.currentParticipant = 0;
	combatTurn.menu = menu;
	// The Combat Loop.
	combatTurn.nextTurn = function(){
		updateHealth(menu);
		// Check if battle is over.
		if (currentFoe.stat.get("health") <= 0){
			h.remove(combatTurn.enemies[0]);
			gainExperience(currentFoe.stat.get("experience"));
			cleanupCombat(menu);
			return false;
		}
		currentFoe.doTurn();
		updateHealth(menu);
		if (h.player.stat.get("current_health") <= 0) {
			h.state = gameOver;
		}
		return true;
	}
	return combatTurn;
}


function skillsMenu(){
	var skillDeck = checkSkills(h.player.stat.get("level"));
	var runSkill = createSkill("Run","Flee to fight again another day.", 0, Run, 0, 100);
	var menu = h.rectangle(1, 1, color.background);
	menu.x = -25;
	menu.y = 150;
	menu.runnable = true;
	menu.drawSkills = function() {
		// Shuffle and pick only 3 skills a round. Plus the run skill!
		var skills = shuffleArray(skillDeck).slice(0, 3);
		if(menu.runnable){
			skills.push(runSkill);
		};

		for (var i=0; i<skills.length; i++) {
			var desc = skills[i].name + "" + "\n\nCHANCE:\n" + skills[i].accuracy + "%" + "\n\nDMG:"+ skills[i].damage + "+" + h.player.stat.get("strength"); ;
			var btn = button(-500, 250, desc, 155, 180);
			h.slide(btn, 105+(120*i), h.canvas.height * 0.55, 3, "decelerationCubed");
			menu.addChild(btn);
			btn.effect = skills[i].effect;
			btn.damage = skills[i].damage;
			btn.name = skills[i].name;
			btn.desc = skills[i].desc;
			btn.accuracy = skills[i].accuracy;

			btn.press = function() {
				menu.clear();
				var successful = rollHitChance(this.accuracy);
				if(successful){
					this.effect();
					h.combatTurn.menu.combatLog.Text.text = "You hit for " + (this.damage + h.player.stat.get("strength"));
					if(this.name != "Run"){
						// Need to come back and fix enemies if we are only going to do singles.
						var enemy = h.combatTurn.enemies[0];
						enemy.stat.set("health", enemy.stat.get("health") - (this.damage + h.player.stat.get("strength"))); 
						h.shake(enemy, 0.09, true);
						sleep(1800).then(() => {
							var combatNotDone = h.combatTurn.nextTurn();
							if (combatNotDone){
								menu.drawSkills(enemy);
							}
						});
					}
				} else {
					h.combatTurn.menu.combatLog.Text.text = "Your attack missed.";
					sleep(1800).then(() => {
						var combatNotDone = h.combatTurn.nextTurn();
						if (combatNotDone){
							menu.drawSkills(enemy);
						}
					});
				}
			}

			btn.over = function() {
				var parent = this.parent;
				parent.removeChild(this);
				parent.addChild(this);
				h.combatTurn.menu.combatLog.Text.text = this.desc;
			}
		}
	}	

	menu.clear = function(){
		for (var i=0; i<menu.children.length; i++) {
			menu.children[i].x += 5000;
		}
		menu.children = [];
	}

	return menu;
}


function cleanupCombat(combatMenu){
	combatMenu.skillsMenu.clear();
	cleanup(combatMenu.children);
	cleanup(combatMenu);
	h.inCombat = false;
	checkQuests();
}