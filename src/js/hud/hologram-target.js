
// elite.hud.hTarget

{
	init() {
		// fast references
		this.els = {
			el: window.find(`.hud .hologram.target`),
			cvs: window.find(`.hud .hologram.target canvas`),
		};
		// subscribe to events
		window.on("bank-ready", this.dispatch);
	},
	dispatch(event) {
		let APP = elite,
			Self = APP.hud.hTarget,
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
					camera = new THREE.PerspectiveCamera(45, 2, 1, 1000);
				// camera settings
				camera.position.set(0, 0, 100);
				camera.lookAt(0, 0, 0);
				scene.add(new THREE.AmbientLight(0x555555));
				camera.add(new THREE.PointLight(0xb0b0b0, .75, 0, 0));
				scene.add(camera);
				// setup model
				let { mesh, color } = Bank.clone("jupiter");
				scene.add(mesh);
				// hologram outline color (with transparency)
				// Self.els.cvs.css({ "--color": `#${color.toString(16)}77` });
				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// temporary tick function
				let tick = () => {
						mesh.rotation.y += 0.0025;
					};
				// fick camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();
				// add scene setup for game FPS
				Game.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
}
