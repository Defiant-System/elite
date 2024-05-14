
@import "./constants.js"
@import "../classes/Orbit.js"
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
			scene, camera, light, sun, planets,
			cvs, ctx, tick,
			el;
		switch (event.type) {
			// custom events
			case "load-star-system":
				sun = new Sun(event.data.parent);
				planets = event.data.planets.map(data => new Planet(data, sun));

				Self.system = { sun, planets };

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
			case "render-system-map":
				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 500);
				light = new THREE.PointLight(0x666666, 20, 0, 0);
				sun = Star.system.sun.threeObject.clone();
				// camera settings
				camera.position.set(0, 0, 100);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);

				// let cData = [
				// 		{ name: "Mercury", position: -12, scale: 3.75 },
				// 		{ name: "Venus", position: -6, scale: 2.25 },
				// 		{ name: "Earth", position: 1, scale: 2.25 },
				// 		{ name: "Mars", position: 8, scale: 3 },
				// 		{ name: "Jupiter", position: 16.5, scale: .365 },
				// 		{ name: "Saturn", position: 27, scale: .35 },
				// 		{ name: "Uranus", position: 37, scale: .65 },
				// 		{ name: "Neptune", position: 45.5, scale: .8 },
				// 		{ name: "Pluto", position: 53, scale: 8 },
				// 	];
				
				// scale down star
				sun.scale.set(.15, .15, .15);
				// position star
				sun.position.set(-33, 0, 0);
				// position star
				sun.rotation.set(.125, 0, 0);
				// add sun to scene
				scene.add(sun);

				
				Self.system.planets.map((org, i) => {
					let planet = org.threeObject.clone(),
						chart = org.chart; // cData[i];
					// scale planet
					planet.scale.set(chart.scale, chart.scale, chart.scale);
					// position planet
					planet.position.set(chart.position, 0, 0);
					// rotate planet
					planet.rotation.set(2, 0, 0);
					// add sun to scene
					scene.add(planet);
				});

				// canvas element
				cvs = Self.els.cvs[0];
				ctx = cvs.getContext("2d");
				// camera aspect
				camera.aspect = cvs.width / cvs.height;
				camera.updateProjectionMatrix();

				// temporary tick function
				tick = () => {
					sun.rotation.y += 0.0015;
					// planet.rotation.z += 0.0005;
				};
				
				// add set to sets array - to be rendered next tick
				Self.sets.push({ scene, camera, tick, cvs, ctx });
				break;
		}
	}
};
