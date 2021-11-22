"use strict"
const color = {
    "background": "green",
    "border": "black",
    "text": "black"
};

const fontStyle = {
    fill: "black", 
    font: "26px Press Start 2P"
};


function button(x, y, text, width=undefined, height=undefined){
    let btn;
    if(height == undefined && width == undefined){
        width = 28 * (text.length + 2);
        height = 28 * 2;
    }
    btn = h.rectangle(width, height, color.background, color.border, 8, x, y);
    btn.pivotX = btn.pivotY = 0.5;
    btn.text = h.text(text);
    btn.text.style = fontStyle;
    btn.text.pivotX = btn.text.pivotY = 0.5;
    btn.addChild(btn.text);
    btn.text.x = btn.text.y = 0;
    h.makeInteractive(btn);
    return btn;
}
