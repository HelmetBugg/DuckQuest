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
    align: "center"
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
