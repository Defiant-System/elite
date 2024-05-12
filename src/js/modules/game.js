
let Game = {
	init() {
		// fast references
		this.els = {
			cvs: window.find(".main-cvs"),
		}
		// reset canvas
		this.els.cvs.attr({ width: window.innerWidth, height: window.innerHeight });
		this.els.cvs.attr({ width: window.innerWidth, height: window.innerHeight });

		// scene sets array
		this.sets = [];
		// create renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

		// create FPS controller
		this.fpsControl = karaqu.FpsControl({
			fps: 40,
			autoplay: true,
			callback() {
				let APP = elite,
					Self = Game;

				Self.sets.map(set => {
					let width = set.cvs.width,
						height = set.cvs.height;
					// call tick if set has any
					if (set.tick) set.tick();
					// renderer
					Self.renderer.setSize(width, height);
					Self.renderer.render(set.scene, set.camera);
					// clear canvas
					set.cvs.width = width;
					// transfer rendered image
					set.ctx.drawImage(Self.renderer.domElement, 0, 0);
				});
			}
		});


		// subscribe to events
		window.on("bank-ready", this.dispatch);
	},
	dispatch(event) {
		let APP = elite,
			Self = Game,
			el;
		switch (event.type) {
			// subscribed events
			case "bank-ready":

				// must come after "hud"
				Star.init();

				// initiate hologram scene
				Self.dispatch({ type: "setup-scene" });
				break;
			// custom events
			case "register-set":
				// add set to sets array - to be rendered next tick
				Self.sets.push(event.set);
				break;
			case "setup-scene":
				let scene = new THREE.Scene(),
					camera = new THREE.PerspectiveCamera(45, 2, 1, 1000),
					light = new THREE.PointLight(0xffffff, 20, 0, 0);
				// camera settings
				camera.position.set(0, 0, 20);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);
				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();
				// setup model
				let geo = new THREE.SphereGeometry(.5);
				let mat = new THREE.MeshPhongMaterial({ color: 0x993300 });
				let mesh = new THREE.Mesh(geo, mat);
				scene.add(mesh);

				// temporary tick function
				let tick = () => {
						// mesh.rotation.y -= 0.01;
						// mesh.rotation.x += 0.02;
					};
				
				Self.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
};
