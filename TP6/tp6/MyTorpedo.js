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

	this.zRotation = 0; //Starts at 0, changes according to position and bezier current slope
		
	var aux = vec3.create();
	aux = vec3.sub(aux,this.target.pos,this.pos);
	aux = vec3.normalize(aux,aux);
	aux = vec3.scale(aux,aux,6);
	aux[1] = 0;
	var aux2 = vec3.fromValues(0,0,1);

	if(this.pos[0] < this.target.pos[0]){  //TODO - Redo this
		this.yRotation = this.angle(aux,aux2);
	}else{
		this.yRotation = -this.angle(aux,aux2);
	}

	var dist = vec3.distance(this.pos,this.target.pos);
	this.tIncrementPerSecond = 1/dist;

	this.P1 = vec3.clone(this.pos);
	this.P2 = vec3.create();
	this.P2 = vec3.add(this.P2,aux,this.pos);
	this.P3 = vec3.fromValues(this.target.pos[0],this.target.pos[1] + 3,this.target.pos[2]); //TODO - Improve points 
	this.P4 = vec3.clone(this.target.pos);
};


MyTorpedo.prototype.display = function() {
	this.scene.materialDefault.apply();

	this.scene.pushMatrix();

	this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);

	this.scene.rotate(this.zRotation,0,0,1);
	this.scene.rotate(this.yRotation,0,1,0);

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

	this.pos = this.bezier(this.t);
	this.t += (this.tIncrementPerSecond / 1000) * (currTime - this.oldTime);

	this.zRotation = Math.atan(this.slope(this.oldPos,this.pos));

	this.oldTime = currTime;

	this.oldPos = vec3.clone(this.pos);

	if(this.t >= 1){
		this.scene.targets.shift();
		return 0;
	}else{
		return 1;
	}
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

MyTorpedo.prototype.angle = function(a, b) { //TODO - Check if ok with teacher, this is from GLMatrix
	var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
}

MyTorpedo.prototype.slope = function(a, b) { //Calculates the slope of a line between two points
	var y = b[1] - a[1];
    var x = b[0] - a[0];
 
    return (y/x);
}