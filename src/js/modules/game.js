
let Game = {
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
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
		window.on("star-system-ready", this.dispatch);

		// start loading solar system
		Star.init();
	},
	dispatch(event) {
		let APP = elite,
			Self = Game,
			el;
		switch (event.type) {
			// "super" events
			case "game-resume":
				// resume background worker
				Bg.dispatch({ worker: "stars", type: "resume" });
				Self.fpsControl.start();
				Self.els.content.data({ status: "start" });
				break;
			case "game-pause":
				// resume background worker
				Bg.dispatch({ worker: "stars", type: "pause" });
				Self.fpsControl.stop();
				Self.els.content.data({ status: "pause" });
				break;

			// subscribed events
			case "star-system-ready":
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
					camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 5e13),
					light = new THREE.PointLight(0x666666, 20, 0, 0);
				// camera settings
				camera.position.set(0, 0, 20e3);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);
				
				// add sun to scene
				scene.add(Star.system.sun.threeObject);

				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();

				// temporary tick function
				let tick = () => {
						Star.system.sun.threeObject.rotation.z += 0.005
					};
				
				// Self.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
};
