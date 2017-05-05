/**
* MyHelix
* @constructor
*/
function MyHelix(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.angle = Math.PI/2;

	this.oldTime = 0;

	this.initBuffers();
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor = MyHelix;

MyHelix.prototype.initBuffers = function() {
	this.cylinderInside = new MyCylinder(this.scene, this.slices, this.stacks, true);	
	this.cylinderOutside = new MyCylinder(this.scene, this.slices, this.stacks);
	this.prism = new MySail(this.scene,1);
	this.semiSphere = new MyLamp(this.scene, this.slices, this.stacks);
};

MyHelix.prototype.display = function(){
	this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.cylinderInside.display();
		this.cylinderOutside.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.rotate(this.angle,0,0,1);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(0.43,0.43,0.43);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(0.3,0.3,0.3);
		this.semiSphere.display();
	this.scene.popMatrix();
}

MyHelix.prototype.update = function(direction,currTime,velocity){
	if (this.oldTime == 0) {
 		this.oldTime = currTime;
 		return;
 	}

 	if(direction=="clockwise"){
 		this.angle -= (currTime-this.oldTime)*(Math.PI*2/1000)*velocity;
 	}else if(direction=="anticlockwise"){
 		this.angle += (currTime-this.oldTime)*(Math.PI*2/1000)*velocity;
 	}else{
 		console.log("Warning! Unknown direction [" + direction + "]");
 	}

 	this.oldTime = currTime;
}
