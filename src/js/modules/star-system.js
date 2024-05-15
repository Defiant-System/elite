
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
			sidebar: window.find(".system-map .sidebar"),
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
					set.ctx.drawImage(Self.renderer.domElement, 0, -100);
				});
			}
		});


		// initiate solar system
		this.dispatch({ type: "load-star-system" });
	},
	dispatch(event) {
		let APP = elite,
			Self = Star,
			scene, camera, light, sun, planets, chart,
			cvs, ctx, tick, xNode,
			el;
		switch (event.type) {
			// custom events
			case "load-star-system":
				xNode = window.bluePrint.selectSingleNode(`//StarSystem/Star`);
				// references structure
				Self.system = {
					sun: new Sun(xNode),
					planets: [],
				};
				// loop planets (skips dwarf types)
				xNode.selectNodes(`./Satellites/Planet[not(@type)]`).map(xPlanet =>
					Self.system.planets.push(new Planet(xPlanet, Self.system.sun)));

				// // emit events
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
				// render sidebar content
				window.render({
					template: "chart-sidebar-star",
					// match: "//StarSystem/Star",
					match: "//StarSystem//Planet[@id='2']",
					target: Self.els.sidebar,
				});

				// canvas element
				cvs = Self.els.cvs[0];
				ctx = cvs.getContext("2d");
				// scene
				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera(45, cvs.width / cvs.height, 10, 500);
				light = new THREE.PointLight(0x666666, 5, 0, 0);
				sun = Star.system.sun.threeObject.clone();
				chart = Star.system.sun.chart;
				// camera settings
				camera.position.set(0, 0, 100);
				camera.lookAt(0, 0, 0);
				camera.add(light);
				scene.add(camera);
				// camera.updateProjectionMatrix();

				// scale down star
				sun.scale.set(chart.scale, chart.scale, chart.scale);
				// position star
				sun.position.set(chart.position, 0, 0);
				// position star
				sun.rotation.set(2, 0, 0);
				// add sun to scene
				scene.add(sun);

				// system planets
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


				light = new THREE.PointLight(0xffffff, 1.75, 0, 0);
				light.position.set(chart.position, 0, 0);
				light.target = Self.system.planets[0];
				scene.add(light);

				// temporary tick function
				tick = () => {
					sun.rotation.z -= 0.002;
				};
				
				// add set to sets array - to be rendered next tick
				Self.sets.push({ scene, camera, tick, cvs, ctx });
				break;
		}
	}
};
