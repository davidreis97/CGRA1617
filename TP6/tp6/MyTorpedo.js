function MyTorpedo(scene, x = 0, y = 0, z = 0) {
	CGFobject.call(this,scene);

	this.pos = vec3.fromValues(x,y,z);

	this.start();

	this.mainBody = new MyCylinder(this.scene,16,20);
 	this.frontSphere = new MyLamp(this.scene,16,10);
 	this.backSphere = new MyLamp(this.scene,16,10);
 	this.backSailVertical = new MySail(this.scene,1.64/2.34);
 	this.backSailHorizontal = new MySail(this.scene,1.64/2.34);
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;


MyTorpedo.prototype.start = function(){
	this.target = this.scene.targets[0]; //TODO - First of the list

	this.xRotation = 0; //Starts at 0, changes according to position and bezier current slope
	this.yRotation = 0; //Defined at the beginning, stays the same throughout the flight

	this.P1 = vec3.clone(this.pos); 											//Default/initial torpedo position
	this.P2 = vec3.add(this.pos); 		 										//TODO -- torpedo position 6 steps forward			       
	this.P3 = vec3.fromValues(this.target.x,this.target.y + 3,this.target.z);   //Target position 3 steps upward/downward					   
	this.P4 = vec3.fromValues(this.target.x,this.target.y,this.target.z);       //Target position*/
	
};


MyTorpedo.prototype.display = function() {
	this.scene.materialDefault.apply();

	this.scene.pushMatrix();

	this.scene.rotate(this.xRotation,1,0,0);
	this.scene.rotate(this.yRotation,0,1,0);

	this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);

		this.scene.pushMatrix(); //Main Body
			this.scene.scale(0.3,0.3,1);
			this.mainBody.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Front Sphere
			this.scene.translate(0,0,1);
			this.scene.rotate(-Math.PI, 0, 0, 1);
			this.scene.scale(0.3,0.3,0.3);
			this.frontSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Back Sphere
			this.scene.scale(0.3,0.3,0.3);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.backSphere.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix(); //Vertical Back Sail
			this.scene.translate(0,0,-0.10);
			this.scene.scale(0.3,0.3,0.3);
			this.backSailVertical.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Horizontal Back Sail
			this.scene.translate(0,0,-0.10);
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.scale(0.3,0.3,0.3);
			this.backSailHorizontal.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
};

MyTorpedo.prototype.update = function (currTime) {
	if (this.oldTime == 0) {
 		this.oldTime = currTime;
 		return;
 	}

	//Update bezier

	//Check for colision / end of curve

	this.oldTime = currTime;
};
