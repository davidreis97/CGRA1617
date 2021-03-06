/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x, y, z) {
     CGFobject.call(this,scene);

     this.x = x;
     this.y = y;
     this.z = z;
     
     this.times = 10;
        
     this.oldTime = 0;

     this.cap = new MyLamp(this.scene, 16, 20);

     this.initMaterials();
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.initMaterials = function(){ 
    this.flameAppearance = new CGFappearance(this.scene);
    this.flameAppearance.loadTexture("resources/images/fire.jpg");
 };

 MyExplosion.prototype.display = function(){

     this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.scale(this.times/40, this.times/40, this.times/40);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.flameAppearance.apply();
        this.cap.display();
     this.scene.popMatrix();

     this.scene.pushMatrix();
        this.scene.translate(this.x+0.5,this.y,this.z);
        this.scene.scale(this.times/50, this.times/50, this.times/50);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.flameAppearance.apply();
        this.cap.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
        this.scene.translate(this.x,this.y+0.8,this.z);
        this.scene.scale(this.times/80, this.times/80, this.times/80);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.flameAppearance.apply();
        this.cap.display();
    this.scene.popMatrix();
 };

 MyExplosion.prototype.update = function(currTime){
    //Atualiza a explosao, retorna "exploding" se ainda nao tiver acabado a explosao e retorna "exploded" quando ja tiver acabado a explosao

    if (this.oldTime == 0) {
        this.oldTime = currTime;
        return "exploding";
    }

    if(this.times > 50){
        return "exploded";
    }

    this.times += 13 * (currTime-this.oldTime) / 200;

    console.log(this.times);
    this.oldTime = currTime;
    return "exploding";
 }
