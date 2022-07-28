"use strict"
const color = {
    "background": "green",
    "border": "black",
    "text": "black"
};

const fontStyle = {
    fill: "black", 
    font: "16px Press Start 2P",
    size: 14,
    align: "center",
    wordWrapWidth: 490,
    wordWrap: true
};


function button(x, y, text, width=undefined, height=undefined){
    let btn;
    if(height == undefined && width == undefined){
        width = (fontStyle.size + 2) * (text.length + 2);
        height = (fontStyle.size + 2) * 2;
    }
    btn = h.rectangle(width, height, color.background, color.border, 6, x, y);
    btn.pivotX = btn.pivotY = 0.5;
    btn.text = h.text(text);
    btn.text.style = fontStyle;
    btn.text.pivotX = btn.text.pivotY = 0.5;
    btn.addChild(btn.text);
    btn.text.x = btn.text.y = 0;
    h.makeInteractive(btn);
    return btn;
}


function createMenu(x, y, width=undefined, height=undefined){
    let menu = h.rectangle(width, height, color.background, color.border, 8, x, y);
    menu.pivotX = menu.pivotY = 0.5;
    menu.autoSize = function(){
        let largestWidth = this.width;
        for(var i=0; i<this.children.length; i++){
            console.log(this.children[i].width);
            if (this.children[i].width > largestWidth){
                largestWidth = this.children[i].width;
            }
        }
        this.width = largestWidth + Math.floor(largestWidth * 0.2);
    };
    return menu;
}


function spawnDialogBox(){
	var dialogBox = button(0, 415, "", 505, 110);
	dialogBox.Text = h.text("", "20px puzzler", "black");
	dialogBox.Text.style = fontStyle;
	dialogBox.Text.fontSize = 4;
	dialogBox.Text.x = 0;
	dialogBox.Text.y = -15;
	dialogBox.Text.pivotX = dialogBox.Text.pivotY = 0.5;
	dialogBox.Next = button(dialogBox.width/2 - 50, dialogBox.height/2 - 50, ">>");
	dialogBox.Tag = button(-dialogBox.width/2, -dialogBox.height/2 - 30, "", 150, 28);
	dialogBox.Tag.text.fontSize = 4;
	dialogBox.addChild(dialogBox.Text, dialogBox.Next, dialogBox.Tag);
	return dialogBox;
}


function spawnInstructions() {
	let menuTitle = button(0, 0, "==Instructions==\n\nWASD Keys to\nmove.\n\nMouse to \ninteract.\n\n'c' to talk \nwith NPCs\n\n'space' to open\n menu.\n\n\n Click to \nClose", 200, 500);
	menuTitle.text.style.fontSize = "12px";
	menuTitle.press = function () {
		cleanup([menuTitle]);
	}
}


function spawnChoiceButton(text1="Yes", text2="No"){
    h.sound("res/sounds/prompt.wav").play();
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


function spawnCard(skill){
    var cardWidth = 135;
    var cardHeight = 180;
    var desc =  
        "\nCHANCE: " + skill.accuracy + 
        "%" + "\n\nDAMAGE: "+ skill.damage + "+" + 
        h.player.stat.get("strength"); 

    var btn = button(0, 0, desc, cardWidth, cardHeight);
    btn.text.style.fontSize = "10px";
    btn.text.y = 45;

    btn.title = h.text(skill.name);
    btn.title.style = fontStyle;
    btn.title.style.fontSize = "12px";
    btn.title.position.x = -(cardWidth/2) + 10;
    btn.title.position.y = -(cardHeight/2) + 10;
    btn.addChild(btn.title);

    filmStrip = h.filmstrip("res/images/card_icons.png", 100, 80);
    var portrait = h.sprite(filmStrip[skill.spriteIndex]);
    portrait.x = -(cardWidth/2) + 15;
    portrait.y = -(cardHeight/2) + 35;
    btn.addChild(portrait);
    return btn;
}