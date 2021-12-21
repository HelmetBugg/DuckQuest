function updateHealth(menu){
    menu.playerHealth.text = "Player Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health");
    menu.enemyHealth.text = "Enemy Health:\n " + combatTurn.enemies[0].stat.get("health") + " / " + combatTurn.enemies[0].stat.get("max_health");
    menu.enemyName.text = combatTurn.enemies[0].name;
}


function damageAnimation(){
    var damageFlash = h.rectangle(500, 400, 'red');
    damageFlash.alpha = h.player.stat.get("current_health") / h.player.stat.get("max_health");
    tween = h.fadeOut(damageFlash, 60);    
    tween.onComplete = () => {
        h.remove(damageFlash);       
    }
}


function getAttacked() {
	h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    h.combatTurn = initCombatTurn(combatMenu);
	combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}


function spawnCombatMenu(){
	var menu = h.rectangle(500, 400, color.background);
	menu.skillsMenu = skillsMenu();
	
	menu.enemyName = h.text("Enemy Name:\n");
	menu.enemyName.style = fontStyle;
    menu.enemyName.y = 10;
    menu.enemyName.x = 270;

    menu.enemyHealth = h.text("Enemy Health:\n " + 0/0);
	menu.enemyHealth.style = fontStyle;
    menu.enemyHealth.y = 30;
    menu.enemyHealth.x = 270;

    menu.playerHealth = h.text("Player Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health"));
	menu.playerHealth.style = fontStyle;
	menu.playerHealth.y = 30;

	//var combatLog = new createDialogBox();
	menu.addChild(menu.enemyName, menu.enemyHealth, menu.playerHealth);
	return menu;
}


function initCombatTurn(menu){
    combatTurn = {};
	currentFoe = createEnemy(h.map.layer.enemies[h.randomInt(0,h.map.layer.enemies.length-1)]);
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

	menu.drawSkills = function() {
		// Shuffle and pick only 3 skills a round.
		var skills = shuffleArray(skillDeck).slice(0, 3);
		skills.push(runSkill);
		for (var i=0; i<skills.length; i++) {
			var desc = skills[i].name + " DMG:"+ skills[i].damage + " CHANCE:" + skills[i].accuracy + "%";
			var btn = button(-500, 185 + (50 * i), desc);
			h.slide(btn, h.canvas.width/2, btn.y, 30, "decelerationCubed");
			menu.addChild(btn);

			btn.effect = skills[i].effect;
			btn.damage = skills[i].damage;
			btn.name = skills[i].name;
			btn.press = function() {
				menu.clear();
				var attack = h.text("You hit for " + this.damage, "16px Press Start 2P", "red");
				popUp(attack, 1800);
				this.effect();
				if(this.name != "Run"){
					// Need to come back and fix enemies if we are only going to do singles.
					var enemy = h.combatTurn.enemies[0];
					enemy.stat.set("health", enemy.stat.get("health") - this.damage); 
					h.shake(enemy, 0.09, true);
					sleep(1800).then(() => {
						var combatNotDone = combatTurn.nextTurn();
						if (combatNotDone){
							menu.drawSkills(enemy);
						}
					});
				}
			}
		}
	}	

	menu.clear = function(){
		//cleanup(menu.children);
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