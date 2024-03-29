function updateHealth(menu){
    menu.playerHealth.text = "Player Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health");
    menu.enemyHealth.text = "Enemy Health:\n " + h.combatTurn.enemies[0].stat.get("health") + " / " + h.combatTurn.enemies[0].stat.get("max_health");
    menu.enemyName.text = h.combatTurn.enemies[0].name;
	menu.enemyType.text = "Type: " + h.combatTurn.enemies[0].type;
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
	combatMenu.lastSong = h.music.music.source;
	h.music.pause();
	h.music.setSong("res/songs/dungeon_theme.mp3");
    h.combatTurn = initCombatTurn(combatMenu, undefined);
	combatMenu.skillsMenu.drawSkills();
    updateHealth(combatMenu);
}


function spawnCombatMenu(){
	
	var menu = h.rectangle(512, 512, color.background);
	menu.skillsMenu = skillsMenu();
	menu.lastSong = h.music.music.source;

	menu.enemyName = h.text("Enemy Name:\n");
	menu.enemyName.style = fontStyle;
    menu.enemyName.y = 10;
    menu.enemyName.x = 270;
    
	menu.enemyType = h.text("Enemy Type:\n");
	menu.enemyType.style = fontStyle;
	menu.enemyType.y = 30;
	menu.enemyType.x = 270;

    menu.enemyHealth = h.text("Enemy Health:\n " + 0/0);
	menu.enemyHealth.style = fontStyle;
    menu.enemyHealth.y = 50;
    menu.enemyHealth.x = 270;

	menu.yourName = h.text("Duckman");
	menu.yourName.style = fontStyle;
    menu.yourName.y = 10;

	menu.deck = h.sprite("res/images/deck.png");
    menu.deck.x = 5;
    menu.deck.y = 260;
	menu.deck.scale.x = menu.deck.scale.y = 3.5;

    menu.playerHealth = h.text("Your Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health"));
	menu.playerHealth.style = fontStyle;
	menu.playerHealth.y = 30;

	menu.combatLog = new spawnDialogBox();
	menu.combatLog.y = 250;
	menu.combatLog.Text.text = "Select your next move.."
	menu.addChild(menu.enemyName, menu.enemyHealth, menu.enemyType, menu.playerHealth, menu.combatLog, menu.yourName, menu.deck);
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
			updateKills(currentFoe);
			cleanupCombat(menu);
			return false;
		}
		currentFoe.doTurn();
		updateHealth(menu);
		if (h.player.stat.get("current_health") <= 0) {
			h.remove(combatTurn.enemies[0]);
			cleanupCombat(menu);
			gameOver();
			return false;
		}
		return true;
	}
	return combatTurn;
}


function rollAttackChance(){
    // If no enemies we just don't do combat.
	if (h.map.layer.enemies.length > 0){
		if(h.player.encounter_Chance >= 100){
			getAttacked();
			h.player.encounter_Chance = 0;
		} else {
			h.player.encounter_Chance = h.player.encounter_Chance + h.randomInt(11, 18);
		}
	}
}

function updateKills(currentFoe){
	h.player.killed.total += 1;
	if (h.player.killed[currentFoe.type] != undefined) {
		h.player.killed[currentFoe.type] += 1;
	}	
}


function skillsMenu(){
	var skillDeck = h.player.skills;
	var runSkill = createSkill("Run","Flee to fight again another day.", 0, Run, 0, 100,7);
	var menu = h.rectangle(1, 1, color.background);
	menu.x = -25;
	menu.y = 150;
	menu.runnable = true;
	menu.drawSkills = function() {
		// Shuffle and pick only 3 skills a round. Plus the run skill!
		var skills = shuffleArray(skillDeck).slice(0, 3);
		h.sound("res/sounds/draw_card.wav").play();
		h.activeSkills = [];

		if(menu.runnable){
			skills.push(runSkill);
		};

		for (var i=0; i<skills.length; i++) {
			var desc = skills[i].name + "" + "\n\nCHANCE:\n" + skills[i].accuracy + "%" + "\n\nDMG:"+ skills[i].damage + "+" + h.player.stat.get("strength"); ;
			
			// add buttons to global array for numerical keypress
			var btn = spawnCard(skills[i]);
			h.activeSkills.push(btn);

			// a really dumb if statement
			if(i === 1 || i === 2 ){
				btn.y = -32 + h.canvas.height * 0.55;
			} else {
				btn.y = h.canvas.height * 0.55;
			}
			btn.x = 110+(120*i);

			//h.slide(btn, 100+(120*i), h.canvas.height * 0.55, 3, "decelerationCubed");
			menu.addChild(btn);
			// Rotate cards slightly.
			btn.rotation = -0.33 + (i * 0.2);
			btn.effect = skills[i].effect;
			btn.damage = skills[i].damage;
			btn.name = skills[i].name;
			btn.desc = skills[i].description;
			btn.accuracy = skills[i].accuracy;

			btn.press = function() {
				menu.clear();
				var successful = rollHitChance(this.accuracy);
				if(successful){
					h.sound("res/sounds/hitHurt.wav").play();
					this.effect();					
					if(this.name != "Run"){
						// Need to come back and fix enemies if we are only going to do singles.
						var enemy = h.combatTurn.enemies[0];
						damageDone = (this.damage + h.player.stat.get("strength"));
						if(h.player.status["rage"]){
							damageDone = Math.round((damageDone * 1.5));
						}
						if(this.name != "Heal"){
							h.combatTurn.menu.combatLog.Text.text = "You hit for " + (this.damage + h.player.stat.get("strength"));
							enemy.stat.set("health", enemy.stat.get("health") - damageDone); 
							h.shake(enemy, 0.09, true);
						} else {
							h.combatTurn.menu.combatLog.Text.text = "You healed!";
						}
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
	h.player.status["rage"] = false;
	h.player.status["protected"] = false;
	cleanup(combatMenu.children);
	cleanup(combatMenu);
	h.inCombat = false;
	for(currentStatus in h.player.status){
		h.player.status[currentStatus] = false;
	}
	checkQuests();
	h.music.pause();
	h.music.setSong(combatMenu.lastSong);
}