function flattenQuests() {
    var currentQuests = [];
    for (let i in h.player.quests) {
        currentQuests.push({
            "name": h.player.quests[i].name,
            "active": h.player.quests[i].active
        });
    }
    return currentQuests;
}

function unFlattenQuests(quests) {
    for (let i in quests) {
        questMap[quests[i].name]();
        // Set quest as active/deactive.
        h.player.quests[i].active = quests[i].active
    }
}

function pauseMenu() {
    var menu = createMenu(0, 0, 240, 505);
    menuTitle = h.text("Pause", fontStyle.font, color.text);
    menuTitle.x = 20;
    menuTitle.y = 20;

    statusButton = new button(50, 50, "Status");
    statusButton.press = function () {
        keys = Array.from(h.player.stat.keys());
        values = Array.from(h.player.stat.values());
        stats = [];
        for (let i = 0; i < keys.length; i++) {
            stats.push({
                name: keys[i] + " " + values[i],
                value: values[i],
                description: "Buncha words",
                type: 'stat'
            });
        }
        createListMenu(stats);
    }

    questsButton = new button(50, 100, "Quest");
    questsButton.press = function () {
        activeQuests = [];
        for (var i = 0; i < h.player.quests.length; i++) {
            if (h.player.quests[i].active) {
                activeQuests.push(h.player.quests[i]);
            }
        }
        if (0 < activeQuests.length) {
            createListMenu(activeQuests);
        }
    }

    saveButton = new button(50, 150, "Save Game");
    saveButton.press = function () {
        saveGame();
        saveText = h.text("Game Saved!", "30px puzzler", "green");
        saveText.y = 470;
        popUp(saveText);
    }

    skillsButton = new button(50, 200, "Skills");
    skillsButton.press = function () {
        createListMenu(h.player.skills);
    }

    pauseButton = new button(240, 0, "Menu");
    pauseButton.press = function () {
        h.menuGroup.toggle();
    }

    h.menuGroup = h.group(menu, menuTitle, statusButton, questsButton, saveButton, skillsButton, pauseButton);
    h.menuGroup.togglebutton = pauseButton;
    h.menuGroup.hidden = false;
    h.stage.putCenter(h.menuGroup);
    h.menuGroup.x = -248;

    h.menuGroup.toggle = function () {
        if (!h.menuGroup.tweening) {
            if (this.hidden) {
                h.menuGroup.tweening = true;
                tween = h.slide(this, -248, 0, 10, "linear");
                tween.onComplete = () => {
                    this.hidden = false;
                    h.menuGroup.tweening = false;
                }
            } else {
                this.hidden = true;
                h.menuGroup.tweening = true;
                tween = h.slide(this, 0, 0, 10, "linear");
                tween.onComplete = () => {
                    h.menuGroup.tweening = false;
                }
            }
        }
    }
}

function makeHelpButton() {
    h.helpButton = new button(410, 0, "Help");
    h.helpButton.press = function () {
        if (!h.instructionsVisible) {
            spawnInstructions();
        }
    }
}

function createListMenu(list) {
    var leftMargin = 20;
    let skillsMenu = createMenu(h.menuGroup.width - h.menuGroup.togglebutton.width, 0, 250, 505);
    skillsMenu.pivotY = skillsMenu.pivotX = 0;

    descriptionText = h.text("", "10px Press Start 2p", color.text);
    descriptionText.x += 250;
    descriptionText.y = 50 * (list.length + 1);
    descriptionText.style.wordWrap = true;
    descriptionText.style.wordWrapWidth = 250;

    for (var i = 0; i < list.length; i++) {
        boxText = h.text(list[i].name, "10px Press Start 2p", color.text);
        boxText.interact = true;
        boxText.y = 25 * (i + 1);
        boxText.x = leftMargin;
        boxText.description = list[i].description;
        boxText.type = list[i].type;
        boxText.effect = list[i].effect;
        skillsMenu.addChild(boxText);
        boxText.over = function() {
			descriptionText.text = this.description;
	    }
    }
    

    var closeButton = button(leftMargin, 50 * list.length, "Close");
    skillsMenu.addChild(closeButton);
    closeButton.press = function () {
        skillsMenu.x += 50000;
        if (skillsMenu != null) {
            h.remove(skillsMenu);
            h.remove(descriptionText);
        }
    }
}

function startDialog(trigger) {
    var dialogueArray = trigger.dialog;
    let optionalSprite = h.sprite("");
    var dialogBox = spawnDialogBox();
    
    dialogBox.Tag.text.text = trigger.name;
    var dialogueIncrement = -1;
    dialogueIncrement++;
    h.dialogBox = dialogBox;

    dialogBox.Next.press = () => {
        // If there is no more dialog, cleanup.
        if (dialogueIncrement >= dialogueArray.length) {
            cleanup(dialogBox.children);
            cleanup(dialogBox);
            cleanup(optionalSprite);
            h.player.talking = false;
        } else {
            // Otherwise replace the current text with the next section.
            if (typeof dialogueArray[dialogueIncrement] === 'string') {
                // If it has a collon it has an image to go with it.
                if (dialogueArray[dialogueIncrement].includes(":")){
                    var subStringArray = dialogueArray[dialogueIncrement].split(":");
                    optionalSprite.setTexture(PIXI.Texture.from(subStringArray[0]));
                    dialogBox.Text.text = subStringArray[1];
                } else {
                    dialogBox.Text.text = dialogueArray[dialogueIncrement];
                }
            // Else it's a function and we invoke it.
            } else {
                dialogueArray[dialogueIncrement]();
                dialogueIncrement++;
                dialogBox.Next.press();
            }
            dialogueIncrement++;
        }
    }
    dialogBox.Next.press();
}

function toggleOffScreen(objectToToggle) {
    if (typeof objectToToggle.offScreen == 'undefined') {
        objectToToggle.offScreen = objectToToggle.x;
        objectToToggle.x = objectToToggle.offScreen + 10000;
    } else {
        if (objectToToggle.offScreen == objectToToggle.x) {
            objectToToggle.x = objectToToggle.offScreen + 10000;
        } else {
            objectToToggle.x = objectToToggle.offScreen;
        }
    }
}

function resolveMove() {
    // This fixes being attacked while moving onto teleporters which looks glitchy.
    if (!teleportCollisionCheck()) {
        checkQuests();
        rollAttackChance();
    }
}

function teleportCollisionCheck() {
    for (i = 0; i < h.map.layer.triggers.length; i++) {
        if (h.map.layer.triggers[i].type == "teleporterTile") {
            if (h.hitTestRectangle(h.player, h.map.layer.triggers[i])) {
                spawnTeleporterChoice(h.map.layer.triggers[i].destination, h.map.layer.triggers[i].spawn);
                return true;
            }
        }
    }
    return false;
}



function gainExperience(experience) {
    var current_experience = h.player.stat.get("experience");
    h.player.stat.set("experience", current_experience + experience);
    var experienceGainBox = createMenu(0, 0, 265, 100);
    var experienceGainText = h.text("You have gained:\n" + experience + " experience.");
    experienceGainText.style = fontStyle;
    experienceGainBox.putCenter(experienceGainText);
    popUp(h.group(experienceGainBox, experienceGainText));
    if (h.player.stat.get("experience") >= h.player.stat.get("next_level")) {
        levelUp();
    }
}

function levelUp() {
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

    // Reset EXP.
    h.player.stat.set("experience", 0);
    var levelGainBox = createMenu(0, 100, 360, 400);
    levelGainBox.addChild(createCardSelectionBox());

    var levelGainText = h.text("Congrats, you\nleveled up!\n\nNew Stats:\n" +
            "STR: " + current_str + " + " + strengthIncrease +
            "\nHP: " + current_maxhealth + " + " + healthIncrease +
            "\nINT: " + current_intel + " + " + intelligenceIncrease);
    levelGainText.style = fontStyle;

    levelGainBox.addChild(levelGainText);

    levelGainText.position.x = -125;
    levelGainText.position.y = -188;

   h.sound("res/sounds/level_up.wav").play();
}

function createCardSelectionBox() {
    newSkill = shuffleArray(h.globalSkills)
    cardChoiceOne = spawnCard(newSkill[0]);
    cardChoiceTwo = spawnCard(newSkill[1]);
    cardChoiceMenu = createMenu(-160, -75, 320, 250);

    cardChoiceMenu.addChild(cardChoiceOne);
    cardChoiceMenu.addChild(cardChoiceTwo);
    cardChoiceTitle = h.text("Choose a new card");
    cardChoiceMenu.addChild(cardChoiceTitle);
    cardChoiceTitle.position.x = -90;
    cardChoiceTitle.position.y = -100;
    cardChoiceTitle.style = fontStyle;
    cardChoiceTitle.style.fontSize = "12px";

    cardChoiceOne.x = -80;
    cardChoiceOne.y = 20;
    cardChoiceTwo.x = cardChoiceOne.x + cardChoiceOne.width + 10;
    cardChoiceTwo.y = 20;

    cardChoiceOne.press = () => {
        h.player.skills.push(newSkill[0]);
        cleanup(cardChoiceMenu.parent);
    };
    cardChoiceTwo.press = () => {
        h.player.skills.push(newSkill[1]);
        cleanup(cardChoiceMenu.parent);
    };

    return cardChoiceMenu;
}

// Takes in an element, waits X time and then fades and removes it.
function popUp(element, timeInNS = 4500) {
    h.wait(timeInNS, function () {
        tween = h.slide(element, -514, 0, 30, "decelerationCubed");
        tween.onComplete = () => {
            h.remove(element);
        }
    });
    h.makeInteractive(element);
    element.press = () => {
        tween = h.slide(element, -514, 0, 30, "decelerationCubed");
        tween.onComplete = () => {
            h.remove(element);
        }
    };
}

function spawnTeleporterChoice(destination, spawn) {
    var choiceMenu = spawnChoiceButton();
    var contents = [choiceMenu.menu, choiceMenu.title, choiceMenu.button1, choiceMenu.button2];
    choiceMenu.title.text = "Would you like to \ntravel to " + destination + "?";
    choiceMenu.button1.press = function () {
        let map = findMapByName(destination);
        map.player_spawn_x = spawn.x;
        map.player_spawn_y = spawn.y;
        initMap(map);
		h.sound("res/sounds/tone.wav").play();
        cleanup(contents);
    }
    choiceMenu.button2.press = function () {
        cleanup(contents);
    }
}

function checkQuests() {
    for (var i = 0; i < h.player.quests.length; i++) {
        if (h.player.quests[i].active) {
            h.player.quests[i].isComplete();
        }
    }
}

function cleanup(input) {
    if (Array.isArray(input)) {
        for (i = 0; i < input.length; i = i + 1) {
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

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function GoosemanCastleBoatman(){
    spawnTeleporterChoice("Courtyard", {'x': 336, 'y': 416});
}

function fullHeal(){
	h.player.stat.set("current_health", h.player.stat.get("max_health"));
}

function theEndDrop(){
    var endText = h.text("The End", fontStyle.font, color.text);
    endText.text.fontize = 26;
    endText.pivotX = endText.pivotY = 0.5;
    endText.x = h.canvas.width/2;
    endText.y = -50;
    h.slide(endText, h.canvas.height/2,  h.canvas.width/2, 180);
}

