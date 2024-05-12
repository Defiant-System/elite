
class Sun extends CelestialObject {
	constructor(data) {
		super(data.diameter, data.mass, data.gravity, data.density);

		this._id = data.id || null;
		this._name = data.name || null;
		this._rotationPeriod = data.rotationPeriod || null;
		this._lengthOfDay = data.lengthOfDay || null;
		this._distanceFromParent = data.distanceFromParent || null;
		this._axialTilt = data.axialTilt || null;
		this._threeDiameter = this.createThreeDiameter();
		this._threeRadius = this.createThreeRadius();
		this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
		this._threeObject = this.createGeometry(this._surface);
	}

	/**
	 * 3D Model Data
	 */
	get threeDiameter() {
		return this._threeDiameter;
	}

	get threeRadius() {
		return this._threeRadius;
	}

	get threeObject() {
		return this._threeObject;
	}

	getTexture(src) {
		if (src) {
			var texture = new THREE.TextureLoader().load(src);
			texture.wrapS = THREE.ClampToEdgeWrapping;
			texture.wrapT = THREE.ClampToEdgeWrapping;
			return texture;
		}
	}

	createThreeDiameter() {
		return this._diameter * Constants.CELESTIAL_SCALE;
	}

	createThreeRadius() {
		return this._diameter * Constants.CELESTIAL_SCALE / 2;
	}

	createGeometry(surface) {
		let geometry = new THREE.SphereGeometry(this._threeRadius, 84, 42);
		let mesh = new THREE.Mesh(geometry, surface);
		let lightColor = 0xffffff;
		let intesity = 1;
		let lightDistanceStrength = Constants.DISTANCE_TO_KUIPER_BELT * Constants.UNIVERSE_SCALE;
		let lightDecayRate = 0.6;
		let sunLight = new THREE.PointLight(lightColor, intesity, lightDistanceStrength, lightDecayRate);

		mesh.rotation.x = 90 * Constants.DEGREES_TO_RADIANS_RATIO;
		mesh.add(sunLight);
		return mesh;
	}

	createSurface(base, topo) {
		if (!base) return;

		let texture = this.getTexture(base);
		texture.minFilter = THREE.NearestFilter;

		return new THREE.MeshPhongMaterial({
			map: texture,
			// lightMap: texture,
			// transparent: true,
			// opacity: 0.85, // 0.8
			// shading: THREE.SmoothShading
		});
	}
}
