function pauseMenu() {
	menu = h.rectangle(250, 500, "white");
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

	h.menuGroup.toggle = function(){
		if (this.visible){
			h.slide(this, -514, 0, 30, "decelerationCubed");
		    this.visible = false;
		} else {
			h.slide(this, 0, 0, 30, "decelerationCubed");
			this.visible = true;
		}
	}
}