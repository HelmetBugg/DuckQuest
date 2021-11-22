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
	let menuTitle = button(0, 0, "==Instructions==\n\nArrow Keys to\nmove.\n\n'z' to interact\n\n'space' to open\n menu.\n\n Close", 200, 500);
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


function startDialog(dialogueArray){
	h.player.talking = true;
	createDialogBox();
	//fence post first dialog spawn
	toggleOffScreen(h.player.dialogueBoxNext);
	recursiveTextFadeIn(dialogueArray[0], h.player.dialogueBoxText, 1);
	h.dialogueIncrement=1;
	h.player.dialogueBoxNext.interact = true;
	h.player.dialogueBoxNext.press = function() {
		// If there is no more dialog, clear increment, remove text box.
		if (h.dialogueIncrement >= dialogueArray.length){
			h.dialogueIncrement = 1;
			h.remove(h.player.dialogueGroup);
			h.player.talking = false;
		// Otherwise replace the current text with the next section.
		} else {
			if (typeof dialogueArray[h.dialogueIncrement] === 'string'){
				toggleOffScreen(h.player.dialogueBoxNext);
				recursiveTextFadeIn(dialogueArray[h.dialogueIncrement], h.player.dialogueBoxText, 1);
			}
			else{
				// This is broken need to come fix.
			//	spawnChoiceButton(dialogueArray[h.dialogueIncrement],function(){console.log("no")});
				dialogueArray[h.dialogueIncrement]();
				
			}
			h.dialogueIncrement++;
		}
	}
}

function toggleOffScreen(objectToToggle){
	if(typeof objectToToggle.offScreen == 'undefined'){
		objectToToggle.offScreen = objectToToggle.x;
		objectToToggle.x = objectToToggle.offScreen + 1000;
	} else {
		if(objectToToggle.offScreen == objectToToggle.x){
			objectToToggle.x = objectToToggle.offScreen + 1000;
		} else {
			objectToToggle.x = objectToToggle.offScreen;
		}
	}
}

function createDialogBox(){
	dialogueBox = h.rectangle(512, 150, 'white');
	dialogueBoxText = h.text("", "20px puzzler", "black");
	dialogueBoxNext = h.text(">>", "20px puzzler", "black");
	dialogueBox.x = 0;
	dialogueBox.y = 362;
	dialogueBoxText.x = 0;
	dialogueBoxText.y = 362;
	dialogueBoxNext.y = 490;
	dialogueBoxNext.x = 490;
	h.player.dialogueBoxNext = dialogueBoxNext;	
	h.player.dialogueBoxText = dialogueBoxText;
	h.player.dialogueGroup = h.group(dialogueBox, dialogueBoxText, dialogueBoxNext);
}


function recursiveTextFadeIn(finalText, dialogueBoxText, currentLength){
	if(currentLength > finalText.length){
		toggleOffScreen(h.player.dialogueBoxNext);
		return;
	}
	dialogueBoxText.text = finalText.substring(0, currentLength);
	h.wait(30, () => recursiveTextFadeIn(finalText, dialogueBoxText, currentLength + 1));
}


function initKeyboard() {
	speed = 16;//h.player.width;
    let leftArrow = h.keyboard(37),
    upArrow = h.keyboard(38),
    rightArrow = h.keyboard(39),
    downArrow = h.keyboard(40),
    space = h.keyboard(32);
	dialogue = h.keyboard(90);
    h.player.tweening = false;
	//h.camera = h.map;

	dialogue.press = () => {
		for (i=0; i < h.map.triggers.length; i++) {
			if (checkTriggerCollision(h.map.layer.triggers[i]) && !h.player.talking){
				// rename less inane.
				let dialogueArray = h.map.layer.triggers[i].dialog;
				startDialog(dialogueArray);
			}
		}
	}
    space.press = () => {
        h.menuGroup.toggle();
    }
    leftArrow.press = () => {
		h.leftArrowPressed = true;
    };
	leftArrow.release = () => {
		h.leftArrowPressed = false;
    };
    rightArrow.press = () => {
		h.rightArrowPressed = true;
	};
	rightArrow.release = () => {
		h.rightArrowPressed = false;
	};
    upArrow.press = () => {
		h.upArrowPressed = true;
    };
	upArrow.release = () => {
		h.upArrowPressed = false;
    };
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
	teleportCollisionCheck();
	checkQuests();
	rollAttackChance();
}


function teleportCollisionCheck() {
	for(i=0; i<h.map.layer.triggers.length; i++){
		if(h.map.layer.triggers[i].type == "teleporterTile"){
			if(h.hitTestRectangle(h.player, h.map.layer.triggers[i])){
				spawnTeleporterChoice(h.map.layer.triggers[i].destination);
			}
		}
	}
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
	//initSkills();

	h.player.doTurn = function(){
		console.log("player turn");
		currentEnemy = h.combatTurn.enemies[0];
		currentEnemy.stat.set('health', 
		currentEnemy.stat.get('health') - stat.get("strength"));
		damageText = h.text("-" + stat.get("strength"), "25px puzzler", "red");
		damageText.x = currentEnemy.x;
		damageText.y = currentEnemy.y - 16;
		popUp(damageText);
	    h.shake(currentEnemy);
	}
}


function gainExperience(experience){
	current_experience = h.player.stat.get("experience");
    h.player.stat.set("experience", current_experience + experience);

	experienceGainBox = h.rectangle(250, 100, "white");
	experienceGainText = h.text("You have gained:\n" + experience + " experience.",
	"20px puzzler","black");
	h.stage.putCenter(experienceGainBox);
	experienceGainBox.putCenter(experienceGainText);
	popUp(h.group(experienceGainBox, experienceGainText));

	// check for level ups here.
	if (h.player.stat.get("experience") >= h.player.stat.get("next_level")){
		levelUp();
	}
}


function levelUp(){
	current_level = h.player.stat.get("level");
	h.player.stat.set("level", current_level + 1);
	
	strengthIncrease = h.randomInt(3,5);
	current_str = h.player.stat.get("strength");
	h.player.stat.set("strength", current_str + strengthIncrease);
	
	healthIncrease = h.randomInt(5,8);
	current_maxhealth = h.player.stat.get("max_health");
	h.player.stat.set("max_health", current_maxhealth + healthIncrease);
	h.player.stat.set("current_health", current_maxhealth + healthIncrease);
	
	intelligenceIncrease = h.randomInt(2,4);
	current_intel = h.player.stat.get("intelligence");
	h.player.stat.set("intelligence", current_intel + intelligenceIncrease);
	
	// Set the next goal post.
	current_level = h.player.stat.get("next_level");
	h.player.stat.set("next_level", (current_level + 2) * 2);

	h.player.skills = checkSkills(h.player.stat.get("level"));

	levelGainBox = h.rectangle(250, 500, "white");
	levelGainText = h.text("You have gained a level!\nStats increased:\n" +
	"Strength: " + current_str + " + " + strengthIncrease +
	"\nMax Health: " + current_maxhealth + " + " + healthIncrease +
	"\nIntelligence: " + current_intel + " + " + intelligenceIncrease,
	"20px puzzler","black");
	h.stage.putCenter(levelGainBox);
	levelGainBox.putCenter(levelGainText);
	
	popUp(h.group(levelGainBox, levelGainText));
}


// Takes in an element, waits X time and then fades and removes it.
function popUp(element, timeInNS=2000){
	h.wait(timeInNS, function() {
		tween = h.slide(element, -514, 0, 30, "decelerationCubed");
		tween.onComplete = () => {
			h.remove(element);
		}
	});
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
		console.log("NOPE");
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