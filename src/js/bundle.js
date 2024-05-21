
import * as THREE from "./modules/threejs/build/three.module.js";

import Stats from "./modules/threejs/examples/jsm/libs/stats.module.js";

import { OrbitControls } from "./modules/threejs/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "./modules/threejs/examples/jsm/loaders/OBJLoader.js";
import { SVGLoader } from "./modules/threejs/examples/jsm/loaders/SVGLoader.js";

import { EffectComposer } from "./modules/threejs/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./modules/threejs/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "./modules/threejs/examples/jsm/postprocessing/UnrealBloomPass-r2.js";

// custom THREE.js "dispose"
THREE_dispose = () => {
	delete window.__THREE__;
};



module.exports = {
	THREE,
	THREE_dispose,
	Stats,
	OrbitControls,
	OBJLoader,
	SVGLoader,
	EffectComposer,
	RenderPass,
	UnrealBloomPass,
};
