
let Star = {
	init() {
		// fast references
		this.els = {
			cvs: window.find(".main-cvs"),
		}
		// reset canvas
		this.els.cvs.attr({ width: window.innerWidth, height: window.innerHeight });

		// subscribe to events
		window.on("bank-ready", this.dispatch);
	},
	dispatch(event) {
		let APP = elite,
			Self = Star,
			el;
		switch (event.type) {
			// subscribed events
			case "bank-ready":
				// initiate hologram scene
				Self.dispatch({ type: "setup-scene" });
				break;
			// custom events
			case "setup-scene":
				let scene = new THREE.Scene(),
					camera = new THREE.PerspectiveCamera(40, 2, 1, 1000),
					light = new THREE.PointLight(0xaaaaaa, 40, 40, 0);
				// camera settings
				camera.position.set(0, 0, 100);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);

				// setup model
				// let material = new THREE.MeshPhongMaterial( {
				// 	color: 0xff9900,
				// } );
				// let mesh = new THREE.Mesh(new THREE.TorusGeometry(2, 0.3, 30, 30), material);
				// scene.add(mesh);

				// setup model
				let mesh = Bank.clone("elite");
				scene.add(mesh);

				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// temporary tick function
				let tick = () => {
						mesh.rotation.y -= 0.0025;
					};
				// fick camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();
				// add scene setup for hud FPS
				// APP.hud.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
};
