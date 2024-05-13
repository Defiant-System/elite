
@import "./constants.js"
@import "../classes/CelestialObject.js"
@import "../classes/Sun.js"
@import "../classes/Planet.js"

let Star = {
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
			cvs: window.find(".map-cvs"),
		}
		// reset canvas
		this.els.cvs.attr({ width: window.innerWidth, height: window.innerHeight });


		// scene sets array
		this.sets = [];
		// create renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

		// create FPS controller
		this.fpsControl = karaqu.FpsControl({
			fps: 40,
			callback() {
				let APP = elite,
					Self = Star;

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


		// initiate solar system
		this.dispatch({ type: "load-star-system", data: StarSystem });
	},
	dispatch(event) {
		let APP = elite,
			Self = Star,
			el;
		switch (event.type) {
			// custom events
			case "load-star-system":
				let sun = new Sun(event.data.parent),
					planets = event.data.planets.map(data => new Planet(data, sun));

				this.system = { sun, planets };

				// emit events
				window.emit("star-system-ready");
				break;
			case "show-system-map":
				// stop game FPS
				Game.fpsControl.stop();
				// pause background stars
				Bg.dispatch({ worker: "stars", type: "pause" });
				// show star system map view
				Self.els.content.data({ status: "system-map" });

				Self.dispatch({ type: "render-system-map" });

				// start FPS control for star map
				Self.fpsControl.start();
				break;
			case "hide-system-map":
				// stop FPS control for star map
				Self.fpsControl.stop();
				// resume background stars
				Bg.dispatch({ worker: "stars", type: "resume" });
				// show start view
				Self.els.content.data({ status: "start" });
				// start game FPS
				Game.fpsControl.start();
				break;
			case "register-celestial":
				// add set to sets array - to be rendered next tick
				Self.sets.push(event.set);
				break;
			case "render-system-map":
				let scene = new THREE.Scene(),
					camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 500),
					light = new THREE.PointLight(0x666666, 20, 0, 0),
					sphere = Star.system.sun.threeObject.clone();
				// camera settings
				camera.position.set(0, 0, 300);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);
				
				// scale down star
				sphere.scale.set(.5, .5, .5);

				sphere.position.set(-90, 0, 0);
				// add sun to scene
				scene.add(sphere);

				// canvas element
				let cvs = Self.els.cvs[0];
				let ctx = cvs.getContext("2d");
				// camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();

				// temporary tick function
				let tick = () => {
						sphere.rotation.z += 0.005
					};
				
				Self.dispatch({ type: "register-celestial", set: { scene, camera, tick, cvs, ctx } });
				break;
		}
	}
};
