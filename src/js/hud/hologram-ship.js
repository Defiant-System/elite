
// elite.hud.hShip

{
	init() {
		// fast references
		this.els = {
			el: window.find(`.hud .hologram.ship`),
			cvs: window.find(`.hud .hologram.ship canvas`),
		};
		// subscribe to events
		window.on("bank-ready", this.dispatch);
	},
	dispatch(event) {
		let APP = elite,
			Self = APP.hud.hShip,
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
					camera = new THREE.PerspectiveCamera(45, 2, 1, 1000),
					light = new THREE.PointLight(0xffffff, 20, 0, 0);
				// camera settings
				camera.position.set(0, 0, 50);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);
				// setup model
				let { mesh, color } = Bank.clone("cobra");
				scene.add(mesh);
				// hologram outline color (with transparency)
				Self.els.cvs.css({ "--color": `#${color.toString(16)}77` });
				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();
				// temporary tick function
				let tick = () => {
						mesh.rotation.y -= 0.01;
						mesh.rotation.x += 0.02;
					};
				// add scene setup for game FPS
				Game.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
}
