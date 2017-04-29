/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);
	
 	this.submarineRotation = 125 * degToRad;
	this.submarineX = 5;
	this.submarineY = 2;
	this.submarineZ = 0;

 	this.initBuffers();
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.initBuffers = function() {
 	
 	this.mainBody = new MyCylinder(this.scene,16,20);
 	this.mainPeriscope = new MyCylinder(this.scene,16,20);
 	this.upperPeriscope = new MyCylinder(this.scene,16,20);
 	this.smallPeriscope = new MyCylinder(this.scene,16,20);
 	this.mainPeriscopeCover = new MyPolygon(this.scene,16);
 	this.smallPeriscopeCover = new MyPolygon(this.scene,16);
 	this.frontSphere = new MyLamp(this.scene,16,10);
 	this.backSphere = new MyLamp(this.scene,16,10);
 	this.backSailVertical = new MySail(this.scene,1.64/2.34);
 	this.backSailHorizontal = new MySail(this.scene,1.64/2.34);
 	this.periscopeSail = new MySail(this.scene,1.64/2.34);
 	this.rightHelix = new MyHelix(this.scene, 16, 20);
 	this.leftHelix = new MyHelix(this.scene, 16, 20);
}

MySubmarine.prototype.move = function (input) { 
	switch(input){
		case ("up"):
		{
			this.submarineX += Math.sin(this.submarineRotation);
			this.submarineZ += Math.cos(this.submarineRotation);
			break;
		}
		case("down"):
		{
			this.submarineX -= Math.sin(this.submarineRotation);
			this.submarineZ -= Math.cos(this.submarineRotation);
			break;
		}
		case("left"):
		{
			this.submarineRotation += 5 * degToRad;
			break;
		}
		case("right"):
		{
			this.submarineRotation -= 5 * degToRad;
			break;
		}
	}


	if(this.submarineRotation >= (Math.PI*2)){ //Previne overflow
		this.submarineRotation -= Math.PI*2;
	}else if(this.submarineRotation <= -(Math.PI*2)){
		this.submarineRotation += Math.PI*2;
	}
		
};

MySubmarine.prototype.customDisplay = function () { 
	this.scene.pushMatrix();
		
		this.scene.translate(this.submarineX,this.submarineY,this.submarineZ);
		this.scene.rotate(this.submarineRotation, 0, 1, 0);

		this.scene.pushMatrix(); //Main Body
			this.scene.scale(0.73,1,4.08);
			this.mainBody.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Front Sphere
			this.scene.translate(0,0,4.08);
			this.scene.rotate(-Math.PI, 0, 0, 1);
			this.scene.scale(0.73,1,0.92);
			this.frontSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Back Sphere
			this.scene.scale(0.73,1,0.92);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.backSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Main Periscope
			this.scene.translate(0,1 + 0.70,1.8);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(0.59,0.88,1.5);
			this.mainPeriscope.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Main Periscope Cover
			this.scene.translate(0,0.70,1.8);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(0.59,0.88,1);
			this.mainPeriscopeCover.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Upper Periscope
			this.scene.translate(0,1.6,1.8);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(0.06,0.06,1.2);
			this.upperPeriscope.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Small Periscope
			this.scene.translate(0,2.76,1.7);
			this.scene.scale(0.06,0.06,0.3);
			this.smallPeriscope.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Small Periscope Cover
			this.scene.translate(0,2.76,1.7);
			this.scene.scale(0.06,0.06,0.3);
			this.smallPeriscopeCover.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0,-0.46)
			this.scene.scale(0.6,1,0.46);
			this.backSailVertical.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0,-0.46);
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.scale(0.6,1,0.46);
			this.backSailHorizontal.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,1.3,1.8);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.scale(0.4,0.75,0.46);
			this.periscopeSail.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.075,-0.4,0.3);
			this.scene.scale(0.4,0.4,0.4);
			this.rightHelix.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.075,-0.4,0.3);
			this.scene.scale(0.4,0.4,0.4);
			this.leftHelix.display();
		this.scene.popMatrix();
		
	this.scene.popMatrix();
};


