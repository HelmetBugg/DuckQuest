class MusicHandler {
	constructor(){
		this.music = h.sound("res/sounds/damage.wav");
		this.fadeTime = 2;
		this.music.loop = true;
	}

	setSong(song){
		this.music.fadeOut(this.fadeTime);
		this.music = h.sound(song);
		this.music.loop = true;
		this.play();
	}

	play(){
		this.music.play();
	}

	pause(){
		this.music.pause();
	}
};