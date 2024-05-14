
import * as THREE from "./modules/threejs/build/three.module.js";

import { OBJLoader } from "./modules/threejs/examples/jsm/loaders/OBJLoader.js";
import { SVGLoader } from "./modules/threejs/examples/jsm/loaders/SVGLoader.js";

// custom THREE.js "dispose"
THREE_dispose = () => {
	delete window.__THREE__;
};



module.exports = {
	THREE,
	THREE_dispose,
	
	OBJLoader,
	SVGLoader,
};
