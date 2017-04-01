/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	
	var z = 0;
	var y = 0;
	var x = 0;

	var currentAngle = 0;

	this.vertices = [];
	this.normals = [];
	this.indices = [];

	var low = 0;
	var high = 0;
	var step = 1/this.stacks;

	for(var j = 0; j < this.stacks; j++){
		low = high;
		high += step;
		currentAngle = 0;

		for (var i = 0; i < this.slices; i++) {
			z = 0;

			x = Math.sin(currentAngle);
			y = Math.cos(currentAngle);

			this.vertices.push(x, y, low); //Bottom 0
			this.vertices.push(x, y, high); //Top 1
			
			this.normals.push(x, y, 0); //Bottom 
			this.normals.push(x, y, 0); //Bottom 

			currentAngle += ((Math.PI * 2) / this.slices);
			x = Math.sin(currentAngle);
			y = Math.cos(currentAngle);

			if(i != this.slices-1){
				this.indices.push(0 + ((i * 2) + (j*2*this.slices)), 1 + ((i * 2) + (j*2*this.slices)), 2 + ((i * 2) + (j*2*this.slices)));
				this.indices.push(1 + ((i * 2) + (j*2*this.slices)), 3 + ((i * 2) + (j*2*this.slices)), 2 + ((i * 2) + (j*2*this.slices)));
			}else{ //Caso seja a ultima face, os vertices têm de conectar com os vertices da primeira.
				this.indices.push(0 + ((i * 2) + (j*2*this.slices)), 1 + ((i * 2) + (j*2*this.slices)), 0 + (j*2*this.slices));
				this.indices.push(1 + ((i * 2) + (j*2*this.slices)), 1 + (j*2*this.slices), 0 + (j*2*this.slices));
			}
		}
	}
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
