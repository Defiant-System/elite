
// elite.hud

{
	init() {
		// fast references
		this.els = {
			el: window.find(`.hud`),
		};

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
					Self = APP.hud;

				Self.sets.map(set => {
					let width = set.cvs.width,
						height = set.cvs.height;

					set.camera.aspect = width / height;
					set.camera.updateProjectionMatrix();

					Self.renderer.setSize(width, height);
					Self.renderer.render(set.scene, set.camera);
					// clear canvas
					set.cvs.width = width;
					set.ctx.drawImage(Self.renderer.domElement, 0, 0);
				});
			}
		});

		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init());
	},
	dispatch(event) {
		let APP = elite,
			Self = APP.hud,
			el;
		switch (event.type) {
			case "register-set":
				// add set to sets array - to be rendered next tick
				Self.sets.push(event.set);
				break;
		}
	},
	hTarget: @import "./hologram-target.js",
	hShip: @import "./hologram-ship.js",
}
