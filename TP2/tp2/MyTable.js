function MyTable(scene) {
	CGFobject.call(this,scene);

	this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
	this.initMaterials();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {

	this.scene.pushMatrix();
	
	//Pernas da Mesa
	  this.legs.apply();
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
		this.wood.apply();
		this.scene.translate(0,3.5,0);
		this.scene.scale(5,0.3,3);
	this.unitCubeQuad.display();
	
	this.scene.popMatrix();
};

MyTable.prototype.initMaterials = function () { //Pink, divided by 255 because according to documentation colors need to be between 0 and 1
	this.wood = new CGFappearance(this.scene);
	this.wood.setAmbient(0.3*102/255, 0.3*51/255, 0,1);
	this.wood.setDiffuse(102/255, 51/255, 0 ,1);
	this.wood.setSpecular(0.01*102/255, 0.01*51/255, 0,1);
	this.wood.setShininess(120);

	this.legs = new CGFappearance(this.scene); //Similar to materials A and B but with higher specular reflextion 
	this.legs.setAmbient(0.3,0.3,0.3,1);
	this.legs.setDiffuse(0.6,0.6,0.6,1);
	this.legs.setSpecular(1,1,1,1);
	this.legs.setShininess(120);

};