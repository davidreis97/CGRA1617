function MyTorpedo(scene, x = 0, y = 0, z = 0) {
	CGFobject.call(this,scene);

	this.pos = vec3.fromValues(x,y,z);

	this.start();

	this.t = 0;

	this.oldTime = 0;

	this.mainBody = new MyCylinder(this.scene,16,20);
 	this.frontSphere = new MyLamp(this.scene,16,10);
 	this.backSphere = new MyLamp(this.scene,16,10);
 	this.backSailVertical = new MySail(this.scene,1.64/2.34);
 	this.backSailHorizontal = new MySail(this.scene,1.64/2.34);

 	this.debug1 = new MyClockHand(this.scene,0,1);
 	this.debug2 = new MyClockHand(this.scene,0,1);
 	this.debug3 = new MyClockHand(this.scene,0,1);
 	this.debug4 = new MyClockHand(this.scene,0,1);	
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;


MyTorpedo.prototype.start = function(){
	this.target = this.scene.targets[0];

	this.rotationVertical = 0;
		
	var auxP2 = vec3.fromValues(6*Math.sin(this.scene.submarine.submarineRotation)*Math.cos(this.scene.submarine.submarineRotationVertical),
				   			    -6*Math.sin(this.scene.submarine.submarineRotationVertical),
				                6*Math.cos(this.scene.submarine.submarineRotation)*Math.cos(this.scene.submarine.submarineRotationVertical));

	this.rotationHorizontal = this.scene.submarine.submarineRotation;

	this.dist = vec3.distance(this.pos,this.target.pos);
	this.tIncrementPerSecond = 1/this.dist; //TODO - Double check
	console.log(this.dist);

	this.P1 = vec3.clone(this.pos);
	this.P2 = vec3.create();
	this.P2 = vec3.add(this.P2,auxP2,this.pos);
	this.P3 = vec3.fromValues(this.target.pos[0],this.target.pos[1] + 3,this.target.pos[2]);
	this.P4 = vec3.clone(this.target.pos);

	this.status = "running";
};


MyTorpedo.prototype.display = function() {
	this.scene.materialDefault.apply();

	this.scene.pushMatrix();

		this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);

		this.scene.rotate(this.rotationHorizontal,0,1,0);
		this.scene.rotate(this.rotationVertical,1,0,0);

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

	if(this.status == "exploding"){
		this.scene.pushMatrix();
			this.explosion.display();
		this.scene.popMatrix();	
	}
	
	this.scene.pushMatrix(); //For debugging purposes - Draws a clock hand on P1
		this.scene.translate(this.P1[0],this.P1[1],this.P1[2]);
		this.debug1.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); //For debugging purposes - Draws a clock hand on P2
		this.scene.translate(this.P2[0],this.P2[1],this.P2[2]);
		this.debug2.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); //For debugging purposes - Draws a clock hand on P3
		this.scene.translate(this.P3[0],this.P3[1],this.P3[2]);
		this.debug3.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); //For debugging purposes - Draws a clock hand on P4
		this.scene.translate(this.P4[0],this.P4[1],this.P4[2]);
		this.debug4.display();
	this.scene.popMatrix();

};

MyTorpedo.prototype.update = function (currTime) {
	if (this.oldTime == 0) {
		this.oldPos = vec3.clone(this.pos);
 		this.oldTime = currTime;
 		return 1;
 	}

 	if(this.status == "running"){
 		//Calculate new position
		this.pos = this.bezier(this.t);

		var oldPosHor = vec3.fromValues(this.oldPos[0],0,this.oldPos[2]); //Old position for horizontal direction calculation, disregards Y value
		var oldPosVer = vec2.fromValues(this.t * this.dist, this.oldPos[1]); //Old Y position on a graph that progresses with time

		//Calculate new t value
		this.t += (this.tIncrementPerSecond / 1000) * this.scene.updateRate;

		var posHor = vec3.fromValues(this.pos[0],0,this.pos[2]); //Current position for horizontal direction calculation, disregards Y value
		var posVer = vec2.fromValues(this.t * this.dist, this.pos[1]); //Current Y position on a graph that progresses with time

		var dir = vec3.create(); 
		var dir = vec3.sub(dir,posHor,oldPosHor); //Direction of the torpedo from a top-down prespective
		this.rotationHorizontal = Math.atan2(dir[0],dir[2]); //Angle between the X-Axis and the line defined by the points dir[0] and dir[2]
		this.rotationVertical = -Math.atan(this.slope(posVer, oldPosVer)); //Arctan of a slope gives the angle of the line

		//Save current data for next iteration
		this.oldTime = currTime;
		this.oldPos = vec3.clone(this.pos);

		if(this.t>=1){
			this.status = "exploding";
			this.explosion = new MyExplosion(this.scene,this.pos[0],this.pos[1],this.pos[2]);
		}
 	}

	else if(this.status == "exploding"){
		this.status = this.explosion.update(currTime);
	}

	else{
		console.log("Unknown torpedo status " + this.status);
	}

	return this.status; //running/exploding/exploded
};


MyTorpedo.prototype.bezier = function(t) {
	var c1 = (1-t) * (1-t) * (1-t);
	var c2 = 3 * t * (1-t) * (1-t);
	var c3 = 3 * t * t * (1-t);
	var c4 = t * t * t;

	var Pc1 = vec3.create();
	var Pc2 = vec3.create();
	var Pc3 = vec3.create();
	var Pc4 = vec3.create();

	Pc1 = vec3.scale(Pc1,this.P1,c1);
	Pc2 = vec3.scale(Pc2,this.P2,c2);
	Pc3 = vec3.scale(Pc3,this.P3,c3);
	Pc4 = vec3.scale(Pc4,this.P4,c4);

	var final = vec3.clone(Pc1);
	final = vec3.add(final,final,Pc2);
	final = vec3.add(final,final,Pc3);
	final = vec3.add(final,final,Pc4);
	
	return final;
}

MyTorpedo.prototype.slope = function(a, b) { //Slope of the line defined by the points a and b
	var y = b[1] - a[1];
    var x = b[0] - a[0];
 
    return (y/x);
}
