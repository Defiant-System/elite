
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
				// must come after "fpsControl"
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
					camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 5 * Math.pow(10, 13)),
					light = new THREE.PointLight(0xffffff, 20, 0, 0);

				console.log( Star );
				break;
		}
	}
};
