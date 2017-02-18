

function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5, //0
            0.5, -0.5, -0.5, //1
            -0.5, 0.5, -0.5, //2
            0.5, 0.5, -0.5, //3
            -0.5, -0.5, 0.5, //4
            0.5, -0.5, 0.5, //5
            -0.5, 0.5, 0.5, //6
            0.5, 0.5, 0.5, //7
			];

	this.indices = [
            1, 0, 2, 
			2, 3, 1,
			4, 5, 6, 
			7, 6, 5,
			0, 1, 4,
			4, 1, 5,
			2, 7, 3,
			2, 6, 7,
			0, 4, 6,
			2, 0, 6,
			7, 5, 1,
			3, 7, 1
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};