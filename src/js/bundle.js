
import * as THREE from "./modules/threejs/build/three.module.js";

import { OBJLoader } from "./modules/threejs/examples/jsm/loaders/OBJLoader.js";
import { SVGLoader } from "./modules/threejs/examples/jsm/loaders/SVGLoader.js";

import { OrbitControls } from "./modules/threejs/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "./modules/threejs/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./modules/threejs/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "./modules/threejs/examples/jsm/postprocessing/OutlinePass.js";


// custom THREE.js "dispose"
THREE_dispose = () => {
	delete window.__THREE__;
};


module.exports = {
	THREE,
	THREE_dispose,
	
	OBJLoader,
	SVGLoader,
	
	OrbitControls,
	EffectComposer,
	RenderPass,
	OutlinePass,
};
