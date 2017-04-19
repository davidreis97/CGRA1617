/**
 * MyClockHand
 * @constructor
 */
 function MyClockHand(scene, angle = 0, size = 1) {
 	CGFobject.call(this,scene);

 	this.scene = scene;
	this.angle = angle * Math.PI/180;
	this.size = size;

 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.initBuffers = function() {
 	this.pointer = new MyPrism(this.scene,4,1);
 };

 MyClockHand.prototype.setAngle = function(angle) {
 	this.angle += angle * Math.PI/180;

 	if(this.angle >= (2*Math.PI)){
 		this.angle -= 2*Math.PI; //Previne overflow de this.angle, o que poderia acontecer dado que o seu valor vai aumentando ao longo da execucao
 	}
 };

 MyClockHand.prototype.display = function(){
 	this.scene.pushMatrix();
 		this.scene.rotate(-this.angle, 0, 0, 1);
 		this.scene.scale(0.04,this.size,0.04);
 		this.scene.rotate(-Math.PI/2, 1, 0, 0);
 		this.scene.rotate(Math.PI/4, 0, 0, 1);
 		this.pointer.display();
 	this.scene.popMatrix();
 }
