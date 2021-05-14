function initMap(){
	h.map = h.sprite("res/maps/1_lvl_map.png");
    h.map.scale.x = h.map.scale.y = 2;
	h.map.triggers = [];
    h.camera =  h.worldCamera(h.map, h.map.width*2, h.map.height*2);
	/// Later layer will be passed as a param, we can make it load different maps that way.
	h.map.layer = test_layer;
	h.map.layer.triggers.forEach(placeTrigger);
	//h.map.start_x = 150;
	//h.map.start_y = 300;

}

function placeTrigger(object, index){
	trigger = h.rectangle(16, 16, "blue", "black", 0, 0, 0);
	h.map.addChild(trigger);
	trigger.x = object.x;
	trigger.y = object.y;
	if (!object.visible){
        trigger.visible = false;
	}
	h.map.triggers.push(trigger);
}

function checkTriggerCollision(trigger, index){
    if(h.hitTestRectangle({x: h.player.directionFacingBox.x, y: h.player.directionFacingBox.y, width: h.player.directionFacingBox.width, height: h.player.directionFacingBox.height}, trigger)){
		
        return true;
	}
    return false;
}

test_layer = 
    {
     "name":"map_1",
     "player_spawn_x": 256,
     "player_spawn_y": 256,
    "triggers":[
    {
     "height":48.5148514851485,
     "id":3,
     "name":"lizard_wall_npc",
     "rotation":0,
     "type":"",
     "visible":false,
     "width":47.5247524752475,
     "x":432,
     "y":16
    }, 
    {
     "height":17.3267326732673,
     "id":4,
     "name":"sage_npc",
     "rotation":0,
     "type":"",
     "visible":false,
     "width":17.3267326732673,
     "x":370,
     "y":320
    }, 
    {
     "height":13.8613861386139,
     "id":5,
     "name":"ninja_guy_dan_npc",
     "rotation":0,
     "type":"",
     "visible":false,
     "width":16,
     "x":448,
     "y":240
    }]
};