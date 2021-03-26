function pauseMenu() {
	menu = h.rectangle(250, 500, "white");
	menuTitle = h.text("Pause", "38px puzzler", "black");
	h.menuGroup = h.group(menu, menuTitle);
	h.stage.putCenter(h.menuGroup);	

}