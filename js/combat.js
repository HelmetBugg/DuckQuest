function updateHealth(menu){
    menu.playerHealth.text = "Player Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health");
    menu.enemyHealth.text = "Enemy Health:\n " + combatTurn.enemies[0].stat.get("health") + " / " + combatTurn.enemies[0].stat.get("max_health");
    menu.enemyName.text = combatTurn.enemies[0].name;
}


function damageAnimation(){
    var damageFlash = h.rectangle(500, 250, 'red');
    damageFlash.alpha = h.player.stat.get("current_health") / h.player.stat.get("max_health");
    tween = h.fadeOut(damageFlash, 10);    
    tween.onComplete = () => {
        h.remove(damageFlash);       
    }
}


function getAttacked() {
	h.inCombat = true;
    var combatMenu = spawnCombatMenu();
    h.combatTurn = initCombatTurn();
    updateHealth(combatMenu);
    /*combatMenu.runButton.press = () =>  {
        cleanupCombat(combatMenu);
        for(var i=0; i<h.combatTurn.enemies.length; i++){
            h.remove(combatTurn.enemies[i]);
        }
    }
	
    combatMenu.attackButton.press = () =>  {
		this.interactive = false;
        updateHealth(combatMenu);
		h.player.doTurn();
		updateHealth(combatMenu);
		stillFighting = combatTurn.enemies[0].doTurn();		
		if (!stillFighting){
			cleanupCombat(combatMenu);
		}
		this.interactive = true;
	}

    combatMenu.skillsButton.press = () =>  {
		createListMenu(h.player.skills);
    }*/
}


function spawnCombatMenu(){
	var menu = h.rectangle(500, 250, color.background);



	/*menu.runButton = button(0, 200, "Run");
	menu.attackButton = button(100, 200, "Attack");
	menu.skillsButton = button(255, 200, "Skills");
	menu.skillsButton.interact = false;
	menu.skillsButton.alpha = 0.5;
	*/
	menu.skillsMenu= skillsMenu();
	
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

	var combatLog = new createDialogBox();
	menu.addChild(menu.enemyName, menu.enemyHealth, menu.playerHealth, combatLog);
	return menu;
}


function initCombatTurn(){
    combatTurn = {};
	currentFoe = createEnemy(h.map.layer.enemies[h.randomInt(0,h.map.layer.enemies.length-1)]);
	combatTurn.enemies = [currentFoe];
    combatTurn.currentParticipant = 0;
	combatTurn.nextTurn = function(){
		if (combatTurn.currentParticipant >= combatTurn.enemies.length){
			combatTurn.currentParticipant = 0;
		} else {
			combatTurn.currentParticipant++;
		}
		if (currentFoe.stat.get("health") <= 0){
			gainExperience(currentFoe.stat.get("experience"));
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


function cleanupCombat(combatMenu){
	cleanup(combatMenu.children);
	cleanup(combatMenu);
	h.inCombat = false;
	checkQuests();
}

function skillsMenu(){
	
	var skills = checkSkills(h.player.stat.get("level"));
	var menu = h.rectangle(1, 1, color.background);
	menu.x = -50;

	for (i=0; i <  skills.length; i++) {
		var desc = skills[i].name + " DMG:"+ skills[i].damage + " CHANCE:" + skills[i].accuracy;
		menu.addChild(button(50,175+50*i, desc));
		

		
		
	}



}