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

	this.target1 = new MyTarget(this,1,0,1);
	this.target2 = new MyTarget(this,10,0,7);
	this.target3 = new MyTarget(this,7,0,3);
	this.target4 = new MyTarget(this,4,0,1);

	this.updateRate = 1000/60; //60 frames per second

	this.targets = [
		this.target1,
		this.target2,
		this.target3,
		this.target4
	];

	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.setUpdatePeriod(this.updateRate); //TODO - CHANGE??

	this.gl.clearColor(0.0, 0.0, 1.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.clock = new MyClock(this);
	this.submarine = new MySubmarine(this);
	this.pole = new MyCylinder(this,8,20);
	this.floor = new Plane(this, 10,1/4,1/4);

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
	this.oceanMaterial.loadTexture("./resources/images/ocean.jpg");

	this.metal1Material = new CGFappearance(this);
	this.metal1Material.loadTexture("./resources/images/metal1.jpg");
	
	this.metal2Material = new CGFappearance(this);
	this.metal2Material.loadTexture("./resources/images/metal2.jpg");
	
	this.metal3Material = new CGFappearance(this);
	this.metal3Material.loadTexture("./resources/images/metal3.jpg");

	this.submarineAppearances = [
		this.metal1Material,
		this.metal2Material,
		this.metal3Material,
	];

	this.submarineAppearancesList = {};
	this.submarineAppearancesList["Metal1"] = this.submarineAppearances[0];
	this.submarineAppearancesList["Metal2"] = this.submarineAppearances[1];
	this.submarineAppearancesList["Metal3"] = this.submarineAppearances[2];

	this.currSubmarineAppearance = "Metal1";

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
	

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,0,1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(0.1, 0.1, 0.1, 1);
	this.lights[4].setSpecular(0.1,0.1,0,1);
};

LightingScene.prototype.updateLights = function() {
	if (this.light0) this.lights[0].enable();
	else this.lights[0].disable();
	
	if (this.light1) this.lights[1].enable();
	else this.lights[1].disable();
	
	if (this.light2) this.lights[2].enable();
	else this.lights[2].disable();
	
	if (this.light3) this.lights[3].enable();
	else this.lights[3].disable();

	if (this.light4) this.lights[4].enable();
	else this.lights[4].disable();


	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};

LightingScene.prototype.update = function(currTime){
	this.clock.update(currTime);
	this.submarine.update(currTime);
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

	// Pole
	this.pushMatrix();
		this.materialDefault.apply();		
		this.translate(8,0,0);
		this.scale(0.1,5,0.1);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.pole.display();
	this.popMatrix();

	// MyClock
	this.pushMatrix();
		this.translate(8,5,0);
		this.clock.display();
	this.popMatrix();

	// MySubmarine
	this.pushMatrix();
		this.submarineAppearancesList[this.currSubmarineAppearance].apply();
		this.submarine.customDisplay();
	this.popMatrix();

	for(i = 0; i < this.targets.length; i++){
		this.targets[i].display();
	}
};
