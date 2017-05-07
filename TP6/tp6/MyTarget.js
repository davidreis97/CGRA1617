function MyTarget(scene, x = 0, y = 0, z = 0) {
	CGFobject.call(this,scene);

	this.pos = vec3.fromValues(x,y,z);

	this.prism = new MyPrism(this.scene,4,5);
	this.prismCover = new MyPolygon(this.scene,4);
	this.prismBottom = new MyPolygon(this.scene,4);
	this.initMaterials();
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);
		this.scene.scale(0.7,0.7,0.7);
		this.scene.rotate(- Math.PI /2, 1, 0, 0);   
		this.scene.rotate(Math.PI /4, 0, 0, 1);

		this.prism.display();

		this.targetMaterial.apply();
		this.prismCover.display();
		this.prismBottom.display();
	this.scene.popMatrix();
};

MyTarget.prototype.initMaterials = function () {
	this.targetMaterial = new CGFappearance(this.scene);
	this.targetMaterial.loadTexture("resources/images/target.png");
};
