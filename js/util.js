function pauseMenu() {
	var menu = h.rectangle(200, 500, "white");
	menuTitle = h.text("Pause", "38px puzzler", "black");

	statusButton = h.text("Status", "30px puzzler", "black");
	statusButton.x = 50; 
	statusButton.y = 50; 
	h.makeInteractive(statusButton);
    statusButton.press = function () {
		keys = Array.from( h.player.stat.keys());
		values = Array.from(h.player.stat.values());
		stats = [];
		for (let i=0; i<keys.length; i++){
			stats.push({
				name: keys[i] + " " + values[i], 
				value: values[i],
				description: "Buncha words",
				type: 'stat'
			});
		}
		createListMenu(stats);
	}

	questsButton = h.text("Quests", "30px puzzler", "black");
	questsButton.x = 50; 
	questsButton.y = 100; 
	h.makeInteractive(questsButton);
    questsButton.press = function () {
		activeQuests = [];
        for (var i=0; i<h.player.quests.length; i++){
			if (h.player.quests[i].active){
                activeQuests.push(h.player.quests[i]);
			}
		}
		if(0 < activeQuests.length){
            createListMenu(activeQuests);
		}
    }

	saveButton = h.text("Save Game", "30px puzzler", "black");
	saveButton.x = 50; 
	saveButton.y = 150; 
	h.makeInteractive(saveButton);
    saveButton.press = function () {
        saveGame();
		saveText = h.text("Game Saved!", "30px puzzler", "green");
		saveText.y = 470;
		popUp(saveText);
    }

	skillsButton = h.text("Skills", "30px puzzler", "black");
	skillsButton.x = 50; 
	skillsButton.y = 200; 
	h.makeInteractive(skillsButton);
    skillsButton.press = function () {
		var skillList = h.player.skills;
		createListMenu(skillList);
    }

	h.menuGroup = h.group(menu, menuTitle, statusButton, questsButton, saveButton, skillsButton);
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


function spawnInstructions() {
	let menuTitle = button(0, 0, "==Instructions==\n\nWASD Keys to\nmove.\n\nMouse to \ninteract.\n\n'c' to talk \nwith NPCs\n\n'space' to open\n menu.\n\n\n Click to \nClose", 200, 500);
	menuTitle.text.style.fontSize = "12px";
	menuTitle.press = function () {
		cleanup([menuTitle]);
	}
}


function createListMenu(list){
	let skillsMenu = h.rectangle(150, 512, 'white');
	for(var i=0; i<list.length; i++){
        boxText = h.text(list[i].name, "20px puzzler", "black");
		boxText.interact = true;
		boxText.y = 50 * i;
		boxText.x = 10;
		boxText.description = list[i].description;
		boxText.type = list[i].type;
		boxText.effect = list[i].effect;
		skillsMenu.addChild(boxText);
		boxText.press = function() {
			if(blurb_group != null){
				blurb_group.x += 5000;
  			    h.remove(blurb_group);
				blurb_group = null;
			}
            var box =  h.rectangle(350, 512, 'white');
			var blurb = h.text(this.description, "18px puzzler", "black");
			blurb_group = h.group(box, blurb);
			blurb_group.x = 120;
			if (boxText.type == 'skill'){
				var invokeSkillEffect=h.text("ACTIVATE", "18px puzzler", "black",80,100);
				invokeSkillEffect.interact = true;
				invokeSkillEffect.press = function(){
					boxText.effect();
				}
				blurb_group.addChild(invokeSkillEffect);
			}
		}			
	}

	var quitButton = h.text("Quit", "20px puzzler", "black");
	quitButton.y = 50 * list.length;
	quitButton.interact = true;
	skillsMenu.addChild(quitButton);
	quitButton.press = function() {
		if(blurb_group != null){
			blurb_group.x += 5000;
			h.remove(blurb_group);
			blurb_group = null;
	    }
		skillsMenu.x += 50000;
		if(skillsMenu != null){
  		    h.remove(skillsMenu);
		}
	}
}


function startDialog(trigger){
	var dialogueArray = trigger.dialog;
	h.player.talking = true;
	var dialogBox = createDialogBox();
	// Add speaker's name tag.
	dialogBox.Tag.text.text = trigger.name;
	// Show first Dialog output before automatically adding.
	var dialogueIncrement = 0;
	dialogBox.Text.text = dialogueArray[dialogueIncrement];
	dialogueIncrement++;

	dialogBox.Next.press = () => {
		// If there is no more dialog, cleanup.
		if (dialogueIncrement >= dialogueArray.length){
			cleanup(dialogBox.children);
			cleanup(dialogBox);
			h.player.talking = false;
		} else {
			// Otherwise replace the current text with the next section.
			if (typeof dialogueArray[dialogueIncrement] === 'string'){
				dialogBox.Text.text = dialogueArray[dialogueIncrement];
			// Else it's a function and we invoke it.
			}else{
				dialogueArray[dialogueIncrement]();
			}
			dialogueIncrement++;
		}
	}
}

function toggleOffScreen(objectToToggle){
	if(typeof objectToToggle.offScreen == 'undefined'){
		objectToToggle.offScreen = objectToToggle.x;
		objectToToggle.x = objectToToggle.offScreen + 10000;
	} else {
		if(objectToToggle.offScreen == objectToToggle.x){
			objectToToggle.x = objectToToggle.offScreen + 10000;
		} else {
			objectToToggle.x = objectToToggle.offScreen;
		}
	}
}


function createDialogBox(){
	var dialogBox = button(0, 415, "", 505, 110);
	dialogBox.Text = h.text("", "20px puzzler", "black");
	dialogBox.Text.style = fontStyle;
	dialogBox.Text.fontSize = 4;
	dialogBox.Text.x = 0;
	dialogBox.Text.y = -15;
	//dialogBox.Text.text = "test";
	dialogBox.Text.pivotX = dialogBox.Text.pivotY = 0.5;
	dialogBox.Next = button(dialogBox.width/2 - 50, dialogBox.height/2 - 40, "");
	dialogBox.Tag = button(-dialogBox.width/2, -dialogBox.height/2 - 30, "", 150, 28);
	dialogBox.Tag.text.fontSize = 4;
	dialogBox.addChild(dialogBox.Text, dialogBox.Next, dialogBox.Tag);
	return dialogBox;
}


function initKeyboard() {
	speed = 16;//h.player.width;
    let leftArrow = h.keyboard(37),
    upArrow = h.keyboard(38),
    rightArrow = h.keyboard(39),
    downArrow = h.keyboard(40),
    wKey = h.keyboard(87),
    sKey = h.keyboard(83),
    dKey = h.keyboard(68),
    aKey = h.keyboard(65),
    space = h.keyboard(32);
	dialogue = h.keyboard(67);


	dialogue.press = () => {
		for (i=0; i < h.map.triggers.length; i++) {
			let trigger = h.map.layer.triggers[i];
			if (checkTriggerCollision(trigger) && !h.player.talking && trigger.type == "npc"){
				startDialog(h.map.layer.triggers[i]);
			}
		}
	}

	/* Disabling for now because it's confusing.
    space.press = () => {
        h.menuGroup.toggle();
    }*/

    aKey.press = () => {
		h.leftArrowPressed = true;
    };
	aKey.release = () => {
		h.leftArrowPressed = false;
    };
	leftArrow.press = () => {
		h.leftArrowPressed = true;
    };
	leftArrow.release = () => {
		h.leftArrowPressed = false;
    };

    dKey.press = () => {
		h.rightArrowPressed = true;
	};
	dKey.release = () => {
		h.rightArrowPressed = false;
	};	
    rightArrow.press = () => {
		h.rightArrowPressed = true;
	};
	rightArrow.release = () => {
		h.rightArrowPressed = false;
	};

    wKey.press = () => {
		h.upArrowPressed = true;
    };
	wKey.release = () => {
		h.upArrowPressed = false;
    };
    upArrow.press = () => {
		h.upArrowPressed = true;
    };
	upArrow.release = () => {
		h.upArrowPressed = false;
    };
	
    sKey.press = () => {
		h.downArrowPressed = true;
    };
	sKey.release = () => {
		h.downArrowPressed = false;
	}
	downArrow.press = () => {
		h.downArrowPressed = true;
    };
	downArrow.release = () => {
		h.downArrowPressed = false;
	}
}


function handleKeyboard(){
	if(h.downArrowPressed == true){
        var newLocation = {x: h.player.x, y: h.player.y+speed, width: 16, height: 16};
		wouldCollide = checkCollision(h.map.layer, newLocation);
        if (!h.player.tweening && !h.inCombat && !wouldCollide && !h.player.talking){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y+speed, 8, "linear");
            tween.onComplete = () =>  {
				h.player.tweening = false;
				h.player.directionFacingBox.x = h.player.x;
				h.player.directionFacingBox.y = h.player.y + 16;
				resolveMove();
			}
			h.map.y -= speed * 2;
			h.camera.centerOver(h.player);
		} else {
			h.player.directionFacingBox.x = h.player.x;
			h.player.directionFacingBox.y = h.player.y + 16;
		}
		checkQuests();
    }

	if(h.upArrowPressed == true){
		// Check if moving to this square would cause collision and prevent it.
		var newLocation = {x: h.player.x, y: h.player.y-speed, width: 16, height: 16};
		wouldCollide = checkCollision(h.map.layer, newLocation);
        if (!h.player.tweening && !h.inCombat && !wouldCollide && !h.player.talking){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x, h.player.y-speed, 8, "linear");
            tween.onComplete = () =>  {
				h.player.tweening = false;
				h.player.directionFacingBox.x = h.player.x;
				h.player.directionFacingBox.y = h.player.y - 16;
				h.camera.centerOver(h.player);
				resolveMove();
			}
			h.map.y += speed * 2;
			h.camera.centerOver(h.player);			
		} else {
			h.player.directionFacingBox.x = h.player.x;
			h.player.directionFacingBox.y = h.player.y - 16;
		}
		checkQuests();
	}

	if(h.leftArrowPressed == true){
		// Check if moving to this square would cause collision and prevent it.
		var newLocation = {x: h.player.x-speed, y: h.player.y, width: 16, height: 16};
		wouldCollide = checkCollision(h.map.layer, newLocation);
        if (!h.player.tweening && !h.inCombat && !wouldCollide && !h.player.talking){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x-speed, h.player.y, 8, "linear");
            tween.onComplete = () =>  {
				h.player.tweening = false;
				h.player.directionFacingBox.x = h.player.x - 16;
				h.player.directionFacingBox.y = h.player.y;
				resolveMove();
			}
            // Multiple by 2 because duck is a child of map which is scaled x2.
			h.map.x += speed * 2;
			h.camera.centerOver(h.player);			
        } else {
			h.player.directionFacingBox.x = h.player.x - 16;
			h.player.directionFacingBox.y = h.player.y;
		}
	}

	if(h.rightArrowPressed == true){
		// Check if moving to this square would cause collision and prevent it.
		var newLocation = {x: h.player.x+speed, y: h.player.y, width: 16, height: 16};
		wouldCollide = checkCollision(h.map.layer, newLocation);
        if (!h.player.tweening && !h.inCombat && !wouldCollide && !h.player.talking){
            h.player.tweening = true;
            tween = h.slide(h.player, h.player.x+speed, h.player.y, 8, "linear");
            tween.onComplete = () =>  {
				h.player.tweening = false;
				h.player.directionFacingBox.x = h.player.x + 16;
				h.player.directionFacingBox.y = h.player.y;
				resolveMove();
			}
			h.map.x -= speed * 2;
			h.camera.centerOver(h.player);
        } else {
			h.player.directionFacingBox.x = h.player.x + 16;
			h.player.directionFacingBox.y = h.player.y;
		}
	}
	// Player location is helpful.
	//console.log(h.player.x/16+", "+h.player.y/16);
}


function resolveMove(){
	// This fixes being attacked while moving onto teleporters which looks glitchy.
	if (!teleportCollisionCheck()){
		checkQuests();
		rollAttackChance();
	}
}


function teleportCollisionCheck() {
	for(i=0; i<h.map.layer.triggers.length; i++){
		if(h.map.layer.triggers[i].type == "teleporterTile"){
			if(h.hitTestRectangle(h.player, h.map.layer.triggers[i])){
				spawnTeleporterChoice(h.map.layer.triggers[i].destination);
				return true;
			}
		}
	}
	return false;
}


function initplayer() {
	h.player = h.sprite("res/images/duckman.png");
	h.player.directionFacingBox = h.rectangle(16, 16, "white", "black", 0, 0, 0);
    h.player.directionFacingBox.visible = false;
	let stat = new Map();
	stat.set("experience", 0);
	stat.set("next_level", 7);
	stat.set("level", 1);	
	stat.set("strength", 5);
	stat.set("max_health", 100);
	stat.set("current_health", 50);
	stat.set("intelligence", 5);
	h.player.stat = stat;
	h.player.skills = [];
	h.player.quests = [];
	h.player.tweening = false;
	h.player.doTurn = () =>{
		currentEnemy = h.combatTurn.enemies[0];
		currentEnemy.stat.set('health', 
		currentEnemy.stat.get('health') - stat.get("strength"));
		damageText = h.text("-" + stat.get("strength"), "25px puzzler", "red");
		damageText.x = currentEnemy.x;
		damageText.y = currentEnemy.y - 16;
		popUp(damageText,850);
		h.shake(currentEnemy);
	};
}


function gainExperience(experience){
	current_experience = h.player.stat.get("experience");
    h.player.stat.set("experience", current_experience + experience);
	var experienceGainBox = createMenu(0, 0, 265, 100);
	var experienceGainText = h.text("You have gained:\n" + experience + " experience.");
	experienceGainText.style = fontStyle;
	experienceGainBox.putCenter(experienceGainText);
	popUp(h.group(experienceGainBox, experienceGainText));

	if (h.player.stat.get("experience") >= h.player.stat.get("next_level")){
		levelUp();
	}
}


function levelUp(){
	var current_level = h.player.stat.get("level");
	h.player.stat.set("level", current_level + 1);
	
	var strengthIncrease = h.randomInt(3, 5);
	current_str = h.player.stat.get("strength");
	h.player.stat.set("strength", current_str + strengthIncrease);
	
	var healthIncrease = h.randomInt(5, 8);
	current_maxhealth = h.player.stat.get("max_health");
	h.player.stat.set("max_health", current_maxhealth + healthIncrease);
	h.player.stat.set("current_health", current_maxhealth + healthIncrease);
	
	var intelligenceIncrease = h.randomInt(2, 4);
	current_intel = h.player.stat.get("intelligence");
	h.player.stat.set("intelligence", current_intel + intelligenceIncrease);
	
	// Set the next goal post.
	current_level = h.player.stat.get("next_level");
	h.player.stat.set("next_level", (current_level + 2) * 2);
	h.player.skills = checkSkills(h.player.stat.get("level"));

	var levelGainBox = createMenu(0, 100, 265, 300);
	var levelGainText = h.text("Congrats, you\nleveled up!\n\nNew Stats:\n" +
	"STR: " + current_str + " + " + strengthIncrease +
	"\nHP: " + current_maxhealth + " + " + healthIncrease +
	"\nINT: " + current_intel + " + " + intelligenceIncrease);
	levelGainText.style = fontStyle;

	levelGainBox.putCenter(levelGainText);
	popUp(h.group(levelGainBox, levelGainText));
}


// Takes in an element, waits X time and then fades and removes it.
function popUp(element, timeInNS=3000){
	h.wait(timeInNS, function() {
		tween = h.slide(element, -514, 0, 30, "decelerationCubed");
		tween.onComplete = () => {
			h.remove(element);
		}
	});
	h.makeInteractive(element);
	element.press = () =>{
		tween = h.slide(element, -514, 0, 30, "decelerationCubed");
		tween.onComplete = () => {
			h.remove(element);
		}
	};
}


function spawnChoiceButton(text1="Yes", text2="No"){
	var menu = button(0, 100, "Would you like\n   to travel to?", 400, 80);
	menu.interactive = false;
	var button1Text = button(0, 40, text1);
	menu.addChild(button1Text);
	var button2Text = button(0, 80, text2);
	menu.addChild(button2Text);
	var container = {
		"menu": menu,
		"title": menu.text,
		"button1": button1Text,
		"button2": button2Text
	}
	return container;
}


function spawnTeleporterChoice(destination){
	var choiceMenu = spawnChoiceButton();
	var contents = [choiceMenu.menu, choiceMenu.title, choiceMenu.button1, choiceMenu.button2];
	choiceMenu.title.text = "Would you like to \ntravel to " + destination + "?";
    choiceMenu.button1.press = function() {
		let map = findMapByName(destination);
        initMap(map);
		cleanup(contents);
    }
    choiceMenu.button2.press = function() {
		cleanup(contents);
    }
}


function checkQuests(){
    for(var i=0; i < h.player.quests.length; i++){
		if (h.player.quests[i].active){
			h.player.quests[i].isComplete();
		}
	}
}


function cleanup(input){
	if(Array.isArray(input)){
		for (i=0; i<input.length; i=i+1){
			input[i].x += 20000;
			h.remove(input[i]);
		}
	} else {
		input.x += 20000;
		h.remove(input);		
	}
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
	newArray = array;
	newArray.sort(() => Math.random() - 0.5);
	return newArray;
}

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
