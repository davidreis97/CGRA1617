/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, hour = 3, minutes = 30, seconds = 45) {
 	CGFobject.call(this,scene);

 	this.scene = scene;
	
	this.hour = hour;
	this.minutes = minutes;
	this.seconds = seconds;

	this.oldTime = 0;

	this.hourPointer = new MyClockHand(this.scene, (360/12) * hour, 0.4); //vermelho
	this.minutesPointer = new MyClockHand(this.scene, (360/60) * minutes, 0.7); //verde
	this.secondsPointer = new MyClockHand(this.scene, (360/60) * seconds, 0.9); //azul

 	this.initBuffers();
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.initBuffers = function() {
 	this.cylinder = new MyCylinder(this.scene,12,1);
 	this.clockFace = new MyPolygon(this.scene,12);

 	this.textureMaterial = new CGFappearance(this.scene);
	this.textureMaterial.loadTexture("resources/images/clock.png");
 }

 MyClock.prototype.display = function() {
 	this.materialDefault = new CGFappearance(this.scene);
 	this.materialDefault.apply();

 	this.scene.pushMatrix();
 		this.materialDefault.setDiffuse(1,0,0,1);
		this.materialDefault.setSpecular(1,0,0,1);
 		this.materialDefault.apply();
 		this.scene.translate(0,0,0.2);
 		this.hourPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.materialDefault.setDiffuse(0,1,0,1);
		this.materialDefault.setSpecular(0,1,0,1);
 		this.materialDefault.apply();
 		this.scene.translate(0,0,0.2);
 		this.minutesPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.materialDefault.setDiffuse(0,0,1,1);
		this.materialDefault.setSpecular(0,0,1,1);
 		this.materialDefault.apply();
 		this.scene.translate(0,0,0.2);
 		this.secondsPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.scale(1,1,0.1);
 		this.cylinder.display();
 		this.textureMaterial.apply();
 	 	this.clockFace.display();
 	this.scene.popMatrix();
 };

 MyClock.prototype.update = function(currTime){
 	if (this.oldTime == 0) {
 		this.oldTime = currTime;
 		return;
 	}

 	hourAngle = 360/(60*60*24*1000) * (currTime-this.oldTime);
 	minutesAngle = 360/(60*60*1000) * (currTime-this.oldTime);
 	secondsAngle = 360/(60*1000) * (currTime-this.oldTime);

 	this.hourPointer.setAngle(hourAngle);
 	this.minutesPointer.setAngle(minutesAngle);
 	this.secondsPointer.setAngle(secondsAngle);

 	this.oldTime = currTime;
 };






















