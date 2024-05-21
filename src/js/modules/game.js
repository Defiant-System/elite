
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
			fps: 60,
			autoplay: true,
			callback() {
				let APP = elite,
					Self = Game;

				Self.sets.map(set => {
					let width = set.cvs.width,
						height = set.cvs.height;
					// call tick if set has any
					if (set.tick) set.tick();

					if (set.composer) {
						Self.renderer.setSize(width, height);
						set.composer.setSize(width, height);
						set.composer.render();
						// clear canvas
						set.cvs.width = width;
						set.ctx.drawImage(Self.renderer.domElement, 0, 0);
					} else {
						// renderer
						Self.renderer.setSize(width, height);
						Self.renderer.render(set.scene, set.camera);
						// clear canvas
						set.cvs.width = width;
						// transfer rendered image
						set.ctx.drawImage(Self.renderer.domElement, 0, 0);
					}
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
			value,
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

			// contextmenu events
			case "bloom-exposure":
				value = Math.lerp(0.1, 2, event.arg/100);
				Self.renderer.toneMappingExposure = Math.pow(value, 4.0);
				break;
			case "bloom-threshold":
				value = Math.lerp(0, 1, event.arg/100);
				Self.bloomPass.threshold = value;
				break;
			case "bloom-strength":
				value = Math.lerp(0, 3, event.arg/100);
				Self.bloomPass.strength = value;
				break;
			case "bloom-radius":
				value = Math.lerp(0, 1, event.arg/100);
				Self.bloomPass.radius = value;
				break;

			// custom events
			case "register-set":
				// add set to sets array - to be rendered next tick
				Self.sets.push(event.set);
				break;

			case "setup-scene":
				let params = {
						exposure: 1,
						bloomThreshold: 0.25,
						bloomStrength: 1.15,
						bloomRadius: 1,
					};

				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// add stats display
				let stats = new Stats();
				Self.els.cvs.after(stats.dom).addClass("stats-display").css({ position: "absolute", top: 3, left: 838 });

				let scene = new THREE.Scene(),
					ratio = cvs.width / cvs.height,
					camera = new THREE.PerspectiveCamera(50, ratio, 200, 5e13),
					light = new THREE.PointLight(0x444444, 1, 0, 0),
					renderScene = new RenderPass(scene, camera),
					// resolution, strength, radius, threshold, selectedObjects, scene, camera
					bloomPass = new UnrealBloomPass(new THREE.Vector2(ratio)),
					composer = new EffectComposer(Self.renderer),
					// create scene set
					set = { composer, camera, cvs, ctx };

				// camera settings
				camera.position.set(0, 0, 1e3);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);
				
				bloomPass.threshold = params.bloomThreshold;
				bloomPass.strength = params.bloomStrength;
				bloomPass.radius = params.bloomRadius;

				composer.addPass(renderScene);
				composer.addPass(bloomPass);

				// reference to items
				Self.set = set;
				Self.stats = stats;
				Self.scene = scene;
				Self.bloomPass = bloomPass;
				
				// build star system
				Star.dispatch({ type: "plot-star-system" });

				// Self.dispatch({ type: "register-set", set: { scene, camera, tick, cvs, ctx } });
				Self.dispatch({ type: "register-set", set });
				break;
		}
	}
};
