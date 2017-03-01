function MyTable(scene) {
	CGFobject.call(this,scene);

	this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {

	this.scene.pushMatrix();
	
	//Pernas da Mesa
		this.scene.translate(6*0.3,1.75,2.5*0.3); 
    	this.scene.scale(0.3,3.5,0.3);
	this.unitCubeQuad.display();
		this.scene.translate(-12,0,0); 
	this.unitCubeQuad.display();
		this.scene.translate(0,0,-5); 
	this.unitCubeQuad.display();
		this.scene.translate(12,0,0); 
	this.unitCubeQuad.display();

	this.scene.popMatrix();
	this.scene.pushMatrix();
	
	
	//Tampo da Mesa
		this.scene.translate(0,3.5,0);
		this.scene.scale(5,0.3,3);
	this.unitCubeQuad.display();
	
	this.scene.popMatrix();

	
}