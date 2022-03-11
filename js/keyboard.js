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

	dialogue.press = () => {
		if (h.player.talking) {
			h.dialogBox.Next.press();
		} else {
			for (i=0; i < h.map.triggers.length; i++) {
				let trigger = h.map.layer.triggers[i];
				if (checkTriggerCollision(trigger) && !h.player.talking && trigger.type == "npc"){
					startDialog(h.map.layer.triggers[i]);
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
}


function handleKeyboard(){
	if(h.player.tweening){
		return;
	}
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