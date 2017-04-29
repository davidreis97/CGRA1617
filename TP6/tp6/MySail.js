/**
 * MySail
 * @constructor
 */
 function MySail(scene, ratio = 0.7) {
 	CGFobject.call(this,scene);
	
	this.ratio = ratio;

 	this.initBuffers();
 };

 MySail.prototype = Object.create(CGFobject.prototype);
 MySail.prototype.constructor = MySail;

 MySail.prototype.initBuffers = function() {
 	
 	this.vertices = [
 		-0.2, 2, -0.6, 				//0
 		-0.2, -2, -0.6,				//1
 		-0.2, -2 * this.ratio, 0.6,	//2
 		-0.2, 2 * this.ratio, 0.6,	//3
 		0.2, 2, -0.6,				//4
 		0.2, -2, -0.6,				//5
 		0.2, -2 * this.ratio, 0.6,	//6
 		0.2, 2 * this.ratio, 0.6,	//7
 	];

 	this.indices = [
 		0, 1, 2,
 		0, 2, 3,
 		5, 4, 6,
 		4, 7, 6,
 		0, 3, 4,
 		3, 7, 4,
 		2, 6, 3,
 		6, 7, 3,
 		2, 5, 6,
 		2, 1, 5,
 		0, 4, 5,
 		0, 5, 1
  	];

  	this.normals = [
  		-0.2, 2, -0.6, 				//0
 		-0.2, -2, -0.6,				//1
 		-0.2, -2 * this.ratio, 0.6,	//2
 		-0.2, 2 * this.ratio, 0.6,	//3
 		0.2, 2, -0.6,				//4
 		0.2, -2, -0.6,				//5
 		0.2, -2 * this.ratio, 0.6,	//6
 		0.2, 2 * this.ratio, 0.6,	//7
  	]

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}
