
// elite.hud.hShip

{
	init() {
		// fast references
		this.els = {
			el: window.find(`.hud .hologram.ship`),
			cvs: window.find(`.hud .hologram.ship canvas`),
		};
		// initiate hologram scene
		this.dispatch({ type: "setup-scene" });
	},
	dispatch(event) {
		let APP = elite,
			Self = APP.hud.hShip,
			el;
		switch (event.type) {
			case "setup-scene":
				let scene = new THREE.Scene(),
					camera = new THREE.PerspectiveCamera(45, 2, 1, 1000),
					light = new THREE.PointLight(0xffffff, 20, 0, 0);
				// camera settings
				camera.position.set(0, 2, 1);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				// scene.background = null;
				scene.add(camera);
				// setup model
				let geo = new THREE.BoxGeometry(1, 1, 1);
				let mat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
				let mesh = new THREE.Mesh(geo, mat);
				scene.add(mesh);
				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// temporary tick function
				let tick = () => {
						mesh.rotation.y -= 0.01;
						mesh.rotation.x += 0.02;
					};
				// fick camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();
				// add scene setup for hud FPS
				APP.hud.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
}
