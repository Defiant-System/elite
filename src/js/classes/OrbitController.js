
class OrbitController {
	constructor(object, rotationEnabled) {
		this._object = object;
		this._threePlanet = object.threeObject;
		this._distanceFromParent = object.threeDistanceFromParent;
		this._segmentsInDay = 1;
		this._currentDay = 1;
		this._orbitAmplitude = this._object.threeParent ? this._object.threeParent.threeRadius + this._distanceFromParent : 1000;
		this._degreesToRotate = 0.1 * Math.PI / 180;
		this._orbitPositionOffset = object.orbitPositionOffset || 0;
		this._theta = 0;
		this._rotationEnabled = typeof rotationEnabled === 'boolean' ? rotationEnabled : true;
		this._dateObject = new StarDate();

		this.initListeners();
	}

	initListeners() {
		this.positionObject(true);

		window.on("frame", () => {
			this.positionObject();

			if (this._rotationEnabled) {
				this.rotateObject();
			}
		});
	};

	positionObject(canlog) {
		var dayOfYear = this._dateObject.getDOYwithTimeAsDecimal();
		var time = (dayOfYear + (starClock.getElapsedTime() / 60)) + this._orbitPositionOffset;
		var theta = time * (360 / this._object.orbitalPeriod) * Constants.degreesToRadiansRatio;
		var x = this._orbitAmplitude * Math.cos(theta);
		var y = this._orbitAmplitude * Math.sin(theta);

		this._object.theta = theta;

		x = Number.parseFloat(x.toFixed(Constants.COORDINATE_PRECISION));
		y = Number.parseFloat(y.toFixed(Constants.COORDINATE_PRECISION));

		this._threePlanet.position.set(x, y, 0);
		this._object.core.position.set(x, y, 0);

		if (this._object.objectCentroid) {
			this._object.objectCentroid.position.set(x, y, 0);
		}

		var timeParsed = Number.parseInt(time);

		if (timeParsed > 0 && timeParsed % 60 === 0) {
			starClock = new Clock(true);
		}
	};

	rotateObject() {
		this._threePlanet.rotation.z += this._degreesToRotate; // 1 degree per frame
	};
}
