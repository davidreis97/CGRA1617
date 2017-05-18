/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);
	
 	this.submarineRotation = 125 * degToRad;
 	this.submarineRotationVertical = 0;
	this.submarineX = 5;
	this.submarineY = 2;
	this.submarineZ = 0;

	this.verticalSailAngle = 0;
	this.horizontalSailAngle = 0;

	this.oldTime = 0;

	this.firing = 0;

	this.velocity = 0;
 	this.initBuffers();

 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.initBuffers = function() {
 	
 	this.mainBody = new MyCylinder(this.scene,16,20);
 	this.frontSphere = new MyLamp(this.scene,16,10);
 	this.backSphere = new MyLamp(this.scene,16,10);
 	this.backSailVertical = new MySail(this.scene,1.64/2.34);
 	this.backSailHorizontal = new MySail(this.scene,1.64/2.34);
 	this.rightHelix = new MyHelix(this.scene, 16, 20);
 	this.leftHelix = new MyHelix(this.scene, 16, 20);
 	this.periscope = new MyPeriscope(this.scene);
}

MySubmarine.prototype.move = function (input) { 

	switch(input){
		case ("front"):
		{
			this.velocity++;
			break;
		}
		case ("back"):
		{
			this.velocity--;
			break;
		}
		case ("left"):
		{
			this.submarineRotation += 2 * degToRad;
			this.verticalSailAngle = -Math.PI/4;
			break;
		}
		case ("right"):
		{
			this.submarineRotation -= 2 * degToRad;
			this.verticalSailAngle = Math.PI/4;
			break;
		}
		case ("up"):
		{
			this.submarineRotationVertical += 2 * degToRad; 
			this.horizontalSailAngle = Math.PI/4;
			break;
		}
		case ("down"):
		{
			this.submarineRotationVertical -= 2 * degToRad;
			this.horizontalSailAngle = -Math.PI/4;
			break;
		}
		case ("periscopeUp"):
		{
			this.periscope.move("up");
			break;
		}
		case ("periscopeDown"):
		{
			this.periscope.move("down");
			break;
		}
		case ("fire"):
		{
			this.fire();
			break;
		}
		default:
		{
			console.log("ERROR! Unknown movement direction [" + input + "]");
			break;
		}

	}

	if(this.submarineRotation >= (Math.PI*2)){ //Previne overflow
		this.submarineRotation -= Math.PI*2;
	}else if(this.submarineRotation <= -(Math.PI*2)){
		this.submarineRotation += Math.PI*2;
	}
		
};

MySubmarine.prototype.resetSail = function (type) { 
	if (type == "vertical"){
		this.verticalSailAngle = 0;
	}else if (type == "horizontal"){
		this.horizontalSailAngle = 0;
	}else{
		console.log("ERROR! Unknown reset sail type [" + type + "]");
	}
	
};

MySubmarine.prototype.fire = function () {
	if(this.scene.targets.length > 0){
		this.torpedo = new MyTorpedo(this.scene,this.submarineX,this.submarineY - 1.3,this.submarineZ);
		this.firing = 1;
	}else{
		console.log("Mission accomplished, no more targets to destroy.");
	}
	
};

MySubmarine.prototype.customDisplay = function () { 
	this.scene.pushMatrix();
		
		this.scene.translate(this.submarineX,this.submarineY,this.submarineZ);
		this.scene.rotate(this.submarineRotation, 0, 1, 0);
		this.scene.rotate(this.submarineRotationVertical, 1, 0, 0);

		this.scene.pushMatrix(); //Main Body
			this.scene.scale(0.73,1,4.08);
			this.scene.translate(0,0,-0.5);
			this.mainBody.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Front Sphere
			this.scene.translate(0,0,2.04);
			this.scene.rotate(-Math.PI, 0, 0, 1);
			this.scene.scale(0.73,1,0.92);
			this.frontSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Back Sphere
			this.scene.scale(0.73,1,0.92);
			this.scene.translate(0,0,-2.04);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.backSphere.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix(); //Vertical Back Sail
			this.scene.translate(0,0,-0.46 - 2.04)
			this.scene.rotate(this.verticalSailAngle,0,1,0);
			this.scene.scale(0.6,1,0.46);
			this.backSailVertical.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Horizontal Back Sail
			this.scene.translate(0,0,-0.46 - 2.04);
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.rotate(this.horizontalSailAngle,0,1,0);
			this.scene.scale(0.6,1,0.46);
			this.backSailHorizontal.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.075,-0.4,0.3 - 2.04);
			this.scene.scale(0.4,0.4,0.4);
			this.rightHelix.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.075,-0.4,0.3 - 2.04);
			this.scene.scale(0.4,0.4,0.4);
			this.leftHelix.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0,0.3 - 2.04);
			this.periscope.display();
		this.scene.popMatrix();
		
	this.scene.popMatrix();

	if(this.firing){
		this.scene.pushMatrix();
			this.torpedo.display();
		this.scene.popMatrix();
	}
};


MySubmarine.prototype.update = function (currTime) {
	if (this.oldTime == 0) {
 		this.oldTime = currTime;
 		return;
 	}

 	if(this.firing){
 		this.firing = this.torpedo.update(currTime);
 	}

	this.submarineX += (currTime-this.oldTime)*this.velocity*Math.sin(this.submarineRotation)*Math.cos(this.submarineRotationVertical)/1000;
	this.submarineY -= (currTime-this.oldTime)*this.velocity*Math.sin(this.submarineRotationVertical)/1000;
	this.submarineZ += (currTime-this.oldTime)*this.velocity*Math.cos(this.submarineRotation)*Math.cos(this.submarineRotationVertical)/1000;

	this.rightHelix.update("clockwise",currTime,this.velocity);
	this.leftHelix.update("anticlockwise",currTime,this.velocity);

	this.oldTime = currTime;
};
