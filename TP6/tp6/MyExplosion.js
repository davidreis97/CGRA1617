/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x, y, z) {
     CGFobject.call(this,scene);

     this.x = x;
     this.y = y;
     this.z = z;
     
     this.times = 60;
    
     this.cap = new MyLamp(this.scene, 16, 20);

     this.initMaterials();
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.initMaterials = function(){ 
    /*this.flameAppearance = new CGFappearance(this.scene);
    this.flameAppearance = loadTexture("resources/images/fire.jpg");*/
 };

 MyExplosion.prototype.display = function(){

     this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.scale(this.times/40, this.times/40, this.times/40);
        this.scene.rotate(-Math.PI/2,1,0,0);
        //this.flameAppearance.apply();
        this.cap.display();
     this.scene.popMatrix();

 };

 MyExplosion.prototype.update = function(){
    //Atualiza a explosao, retorna "exploding" se ainda nao tiver acabado a explosao e retorna "exploded" quando ja tiver acabado a explosao
    if(this.times > 30){
        this.times--;
        return "exploding";
    } 

    return "exploded";
 }
