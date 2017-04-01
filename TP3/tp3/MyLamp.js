/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene, slices, stacks) {
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function () {

	var z = 0;
	var y = 0;
	var x = 0;

	var currentAngle = 0;

	this.vertices = [];
	this.normals = [];
	this.indices = [];

	this.vertices.push(x, y, 1);
	this.normals.push(x, y, 1);

	for (var i = 0; i < this.stacks; i++)  { //Por agora ainda nao faz nada com os stacks
		for (var j = 0; j < this.slices; j++) {
			x = Math.sin(currentAngle);
			y = Math.cos(currentAngle);

			this.vertices.push(x, y, 0);
			this.normals.push(x, y, 0);

			currentAngle += ((Math.PI * 2) / this.slices);

			x = Math.sin(currentAngle);
			y = Math.cos(currentAngle);

			this.vertices.push(x, y, 0);
			this.normals.push(x, y, 0);

			this.indices.push(1 + (2 * j), 0, 2 + (2 * j));
		}
	}


	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
