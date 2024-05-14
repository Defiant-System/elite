
class CelestialObject {
	constructor(diameter, mass, gravity, density, chart) {
		this._diameter = diameter || 1;
		this._mass = mass || 1;
		this._gravity = gravity || 1;
		this._density = density || 1;
		this._chart = chart || null;
		this._core = new THREE.Object3D();
		this._objectCentroid = new THREE.Object3D();
	}

	get core() {
		return this._core;
	}

	get diameter() {
		return this._diameter;
	}

	get mass() {
		return this._mass;
	}

	get gravity() {
		return this._gravity;
	}

	get density() {
		return this._density;
	}

	get chart() {
		return this._chart;
	}

	get objectCentroid() {
		return this._objectCentroid;
	}
}
