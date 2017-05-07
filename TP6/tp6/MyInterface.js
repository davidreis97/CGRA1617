/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light0');
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	this.gui.add(this.scene.clock, 'clockRunning');

	this.gui.add(this.scene, 'currSubmarineAppearance', [ 'Metal1', 'Metal2', 'Metal3' ] );
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

	switch (event.keyCode)
	{
		case (119):	// W
		{
			console.log("Key 'W' pressed");
			this.scene.submarine.move("front");
			break;
		}
			
		case (97):	// A
		{
			console.log("Key 'A' pressed");
			this.scene.submarine.move("left");
			break;
		}
			
		case (115):	// S
		{
			console.log("Key 'S' pressed");
			this.scene.submarine.move("back");
			break;
		}
			
		case (100):	// D
		{
			console.log("Key 'D' pressed");
			this.scene.submarine.move("right");
			break;
		}

		case (113):	// Q
		{
			console.log("Key 'Q' pressed");
			this.scene.submarine.move("down");
			break;
		}

		case (101):	// E
		{
			console.log("Key 'E' pressed");
			this.scene.submarine.move("up");
			break;
		}

		case (112):	// P
		{
			console.log("Key 'P' pressed");
			this.scene.submarine.move("periscopeUp");
			break;
		}

		case (108):	// L
		{
			console.log("Key 'L' pressed");
			this.scene.submarine.move("periscopeDown");
			break;
		}

		case (108):	// L
		{
			console.log("Key 'L' pressed");
			this.scene.submarine.move("periscopeDown");
			break;
		}

		case (102):	// F
		{
			console.log("Key 'F' pressed");
			this.scene.submarine.move("fire");
			break;
		}	
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	var horizontal = "horizontal"
	var vertical = "vertical"

	//For some reason, event.keyCode does not work on processKeyUp, and the keyboard codes are not the same.
	switch (event.which)
	{
		case (81):	// Q
		{
			this.scene.submarine.resetSail(horizontal);
			break;
		}

		case (69):	// E
		{
			this.scene.submarine.resetSail(horizontal);
			break;
		}
			
		case (65):	// A
		{
			this.scene.submarine.resetSail(vertical);
			break;
		}
			
		case (68):	// D
		{
			this.scene.submarine.resetSail(vertical);
			break;
		}
	};

};

