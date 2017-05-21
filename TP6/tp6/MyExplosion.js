/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x, y, z) {
     CGFobject.call(this,scene);

     this.x = x;
     this.y = y;
     this.z = z;

     this.initBuffers();
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.initBuffers = function(){
     
     this.cap = new MyLamp(this.scene, 16, 20);
    
 };

 MyExplosion.prototype.display = function(){

     this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.cap.display();
     this.scene.popMatrix();

 };