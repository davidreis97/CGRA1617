/**
* MyPeriscope
* @constructor
*/
function MyPeriscope(scene) {
	CGFobject.call(this,scene);

	this.periscopeHeight = 0;

	this.initBuffers();
};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.initBuffers = function() {
	this.mainPeriscope = new MyCylinder(this.scene,16,20);
 	this.upperPeriscope = new MyCylinder(this.scene,16,20);
 	this.smallPeriscope = new MyCylinder(this.scene,16,20);
 	this.mainPeriscopeCover = new MyPolygon(this.scene,16);
 	this.smallPeriscopeCover = new MyPolygon(this.scene,16);
 	this.periscopeSail = new MySail(this.scene,1.64/2.34);
};

MyPeriscope.prototype.display = function(){
	this.scene.pushMatrix(); //Main Periscope
		this.scene.translate(0,1 + 0.70,1.8);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.59,0.88,1.5);
		this.mainPeriscope.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); //Main Periscope Cover
		this.scene.translate(0,0.70,1.8);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.59,0.88,1);
		this.mainPeriscopeCover.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); //Periscope movable top	
		this.scene.translate(0,this.periscopeHeight,0);
		
		this.scene.pushMatrix(); //Upper Periscope
			this.scene.translate(0,1.6,1.8);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(0.06,0.06,1.2);
			this.upperPeriscope.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Small Periscope
			this.scene.translate(0,2.76,1.7);
			this.scene.scale(0.06,0.06,0.3);
			this.smallPeriscope.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //Small Periscope Cover
			this.scene.translate(0,2.76,1.7);
			this.scene.scale(0.06,0.06,0.3);
			this.smallPeriscopeCover.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	this.scene.pushMatrix(); //Periscope Sail
		this.scene.translate(0,1.3,1.8);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.scene.scale(0.4,0.75,0.46);
		this.periscopeSail.display();
	this.scene.popMatrix();
}

MyPeriscope.prototype.move = function(direction){
	
	switch(direction){
		case ("up"):
		{
			if(this.periscopeHeight < 0){
				this.periscopeHeight += 0.05;
			}
			break;
		}
		case ("down"):
		{
			if(this.periscopeHeight > -0.9){
				this.periscopeHeight -= 0.05;
			}
			break;
		}
		default:
		{
			console.log("ERROR! Unknown movement periscope direction [" + direction + "]");
			break;
		}
	};
}
