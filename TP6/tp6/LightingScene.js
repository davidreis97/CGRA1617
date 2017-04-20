var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.option1 = true;
	this.option2 = false;
	this.speed = 3;

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.setUpdatePeriod(100);

	this.gl.clearColor(0.0, 0.0, 1.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,-1,2,-1,2);
	this.floor = new Plane(this, 10,1/10,1/10);
	this.prism = new MyPrism(this,8,20);
	this.cylinder = new MyCylinder(this,8,20);
	this.lamp = new MyLamp(this,8,20);
	this.clock = new MyClock(this);
	this.submarine = new MySubmarine(this);
	this.pole = new MyCylinder(this,8,20);

	/* A textura slide.png é um quadrado (512*512) enquanto que o quadro é um rectangulo (6*4), ou seja, queremos representar a textura em 4*4.
	*  Desse modo, 4 = 6 * xRatio <=> xRatio = 4/6
	*/
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,4/6,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,1,1);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.oceanMaterial = new CGFappearance(this);
	this.oceanMaterial.loadTexture("resources/images/ocean.jpg");

	this.marbleMaterial = new CGFappearance(this);
	this.marbleMaterial.loadTexture("resources/images/marble.jpg");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("resources/images/slides.png");
	this.slidesAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.slidesAppearance.setSpecular(1,1,1,1);
	this.slidesAppearance.setShininess(30);
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("resources/images/board.png");
	this.boardAppearance.setDiffuse(1,1,1,1);
	this.boardAppearance.setSpecular(0.1,0.1,0.1,1);
	this.boardAppearance.setShininess(1);
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.windowMaterial = new CGFappearance(this);
	this.windowMaterial.loadTexture("resources/images/window.png");
	this.windowMaterial.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.wallMaterial = new CGFappearance(this); //Pink, divided by 255 because according to documentation colors need to be between 0 and 1
	this.wallMaterial.setAmbient(0.2*255/255,0.2*192/255,0.2*203/255,1);
	this.wallMaterial.setDiffuse(255/255,192/255,203/255,1);
	this.wallMaterial.setSpecular(0.5*255/255,0.5*192/255,0.5*203/255,1);
	this.wallMaterial.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0,0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 10, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(0.3, 4, 7.5, 1);
	this.lights[4].setVisible(true); // show marker on light position (different from enabled)
	

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);
	this.lights[0].enable();
	

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,0,1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(0.1, 0.1, 0.1, 1);
	this.lights[4].setSpecular(0.1,0.1,0,1);
	this.lights[4].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};

LightingScene.prototype.update = function(currTime){
	this.clock.update(currTime);
};


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.oceanMaterial.apply();

		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.windowMaterial.apply();

		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.wallMaterial.apply();
		
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();

	// Pole
	this.pushMatrix();
		this.materialDefault.apply();		
		this.translate(8,0,0);
		this.scale(0.1,5,0.1);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.pole.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.slidesAppearance.apply();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.boardAppearance.apply();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardB.display();
	this.popMatrix();

	// MyPrism
	this.pushMatrix();
		this.scale(1,10,1);
		this.translate(10,1,13);

		this.rotate(90 * degToRad, 1, 0, 0);
		this.prism.display();
	this.popMatrix();

	// MyLamp
	this.pushMatrix();
		this.translate(7,10,7);
		this.rotate(90 * degToRad, 1, 0, 0);
		this.lamp.display();
	this.popMatrix();

	// MyCylinder
	this.pushMatrix();
		this.marbleMaterial.apply();
		this.scale(1,10,1);
		this.translate(5,1,13);

		this.rotate(90 * degToRad, 1, 0, 0);
		this.cylinder.display();
	this.popMatrix();
	// ---- END Primitive drawing section	

	// MyClock
	this.pushMatrix();
		this.translate(8,5,0);
		//this.scale(0.7,0.7,0.7); //Scale para caber melhor na posicao pedida.
		this.clock.display();
	this.popMatrix();

	//MySubmarine
	this.pushMatrix();
		this.rotate(125 * degToRad, 0, 1, 0); //Angulo estimado...
		this.translate(-5,0,0);
		this.submarine.display();
	this.popMatrix();
};

LightingScene.prototype.doSomething = function () { 
	console.log("Doing something..."); 
};
