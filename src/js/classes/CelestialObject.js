
class CelestialObject {
	constructor(xNode) {
		let xInfo = xNode.selectSingleNode(`./Meta[@name="info"]`),
			xChart = xNode.selectSingleNode(`./Meta[@name="chart"]`);

		this._diameter = +xInfo.getAttribute("diameter") || 1;
		this._mass = +xInfo.getAttribute("mass") || 1;
		this._gravity = +xInfo.getAttribute("gravity") || 1;
		this._density = +xInfo.getAttribute("density") || 1;
		this._chart = {
			scale: +xChart.getAttribute("scale") || null,
			position: +xChart.getAttribute("position") || null,
		};
		
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
