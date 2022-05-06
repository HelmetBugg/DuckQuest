function initKeyboard() {
	speed = 16;
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
	oneKey = h.keyboard(49);
	twoKey = h.keyboard(50);
	threeKey = h.keyboard(51);
	fourKey = h.keyboard(52);

	dialogue.press = () => {
		if (h.player.talking) {
			h.dialogBox.Next.press();
		} else {
			for (i=0; i < h.map.triggers.length; i++) {
				let trigger = h.map.layer.triggers[i];
				if (checkTriggerCollision(trigger) && !h.player.talking && trigger.type == "npc"){
					if (trigger.questTriggers == undefined || h.player.checkQuests('Kill Lord Gator')  == true){
					startDialog(h.map.layer.triggers[i]);
					}	
				}
			}
		}
	}

	// Disabling for now because it's confusing.
    space.press = () => {
        h.menuGroup.toggle();
    }
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

	oneKey.press = () => {
		h.oneKeyPressed = true;
    };
	oneKey.release = () => {
		h.oneKeyPressed = false;
    };
	twoKey.press = () => {
		h.twoKeyPressed = true;
    };
	twoKey.release = () => {
		h.twoKeyPressed = false;
    };
	threeKey.press = () => {
		h.threeKeyPressed = true;
    };
	threeKey.release = () => {
		h.threeKeyPressed = false;
    };
	fourKey.press = () => {
		h.fourKeyPressed = true;
    };
	fourKey.release = () => {
		h.fourKeyPressed = false;
    };
}


function handleKeyboard(){
	if(h.player.tweening){
		return;
	}
	if(h.downArrowPressed){
		// Check if moving to this square would cause collision and prevent it.
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

			tween2 = h.slide(h.map,h.map.x, h.map.y-(speed),4,"linear");
		} else {
			h.player.directionFacingBox.x = h.player.x;
			h.player.directionFacingBox.y = h.player.y + 16;
		}
		checkQuests();
    }

	if(h.upArrowPressed){
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
				
				resolveMove();
			}

			tween2 = h.slide(h.map,h.map.x, h.map.y+(speed),4,"linear");		
		} else {
			h.player.directionFacingBox.x = h.player.x;
			h.player.directionFacingBox.y = h.player.y - 16;
		}
		checkQuests();
	}

	if(h.leftArrowPressed){
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

			tween2 = h.slide(h.map,h.map.x+(speed), h.map.y,4,"linear");			
        } else {
			h.player.directionFacingBox.x = h.player.x - 16;
			h.player.directionFacingBox.y = h.player.y;
		}
	}

	if(h.rightArrowPressed){
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

			tween2 = h.slide(h.map,h.map.x-(speed), h.map.y,4,"linear");
        } else {
			h.player.directionFacingBox.x = h.player.x + 16;
			h.player.directionFacingBox.y = h.player.y;
		}
	}

	if(h.oneKeyPressed && h.inCombat){
		h.activeSkills[0].press();
	}

	if(h.twoKeyPressed && h.inCombat){
		h.activeSkills[1].press();
	}

	if(h.threeKeyPressed && h.inCombat){
		h.activeSkills[2].press();
	}

	if(h.fourKeyPressed && h.inCombat){
		h.activeSkills[3].press();
	}

	// Player location is helpful.
	//console.log(h.player.x/16+", "+h.player.y/16);
}