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
    combatMenu.runButton.press = () =>  {
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
    }
}


function spawnCombatMenu(){
	var menu = h.rectangle(500, 250, color.background);
	menu.runButton = button(0, 200, "Run");
	menu.attackButton = button(100, 200, "Attack");
	menu.skillsButton = button(255, 200, "Skills");
	menu.skillsButton.interact = false;
	menu.skillsButton.alpha = 0.5;

	menu.enemyName = h.text("Enemy Name:\n");
	menu.enemyName.style = fontStyle;
    menu.enemyName.y = 20;
    menu.enemyName.x = 270;

    menu.enemyHealth = h.text("Enemy Health:\n " + 0/0);
	menu.enemyHealth.style = fontStyle;
    menu.enemyHealth.y = 50;
    menu.enemyHealth.x = 270;

    menu.playerHealth = h.text("Player Health:\n " + h.player.stat.get("current_health") + " / " + h.player.stat.get("max_health"));
	menu.playerHealth.style = fontStyle;
	menu.playerHealth.y = 50;

	var combatLog = new createDialogBox();

	menu.children = [menu.runButton, menu.attackButton, menu.skillsButton, menu.enemyName, menu.enemyHealth, menu.playerHealth, combatLog];

	

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
			//var tween = h.fadeOut(combatTurn.enemies[0]);
			//tween.onComplete = () => {
				h.remove(combatTurn.enemies[0]);
				combatTurn.enemies.pop();
			//}
		}			
		if (combatTurn.enemies.length < 1){
			return false;
		}
		return true;
	}
	return combatTurn;
}


function cleanupCombat(combatMenu){
	//var tween = h.fadeOut(combatMenu, 8);
	//tween.onComplete = () => {
		cleanup(combatMenu.children);
		cleanup(combatMenu);
		h.inCombat = false;
		checkQuests();
		
	//}
}