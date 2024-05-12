let Stars = {
	init() {
		// initial values
		this.paused = false;
		this.TAU = Math.PI * 2;

		// ship speed
		this.speed = .35;

		this.inertia = 11;
		this.stars = {
			view: null,
			angle: 0,
			velocity: {
				x: 0,
				y: 0,
				z: 0,
			},
			min: 0.2,
			size: 1.5,
			threshold: 50,
			count: 255,
			list: [],
		};

		this.cruise = {
			minSpeed: .2,
			count: 7,
			l1: [],
			l2: [],
		};

		// setTimeout(() => { this.paused = true }, 5000);
	},
	dispatch(event) {
		let Self = Stars,
			value;
		switch (event.type) {
			case "start":
				Self.cvs = event.canvas;
				Self.ctx = Self.cvs.getContext("2d", { willReadFrequently: true });
				Self.width = Self.cvs.width;
				Self.height = Self.cvs.height;
				// defaults
				Self.target = {
					x: Self.width >> 1,
					y: Self.height >> 1,
				};
				// focus point
				Self.focal = {
					x: Self.width >> 1,
					y: Self.height >> 1,
				};

				Self.cruise.step = (Self.focal.x + 60) / Self.cruise.count;

				// apply speed + view value
				Self.dispatch({ type: "view-front" });
				// create star field
				Self.dispatch({ type: "create-scene" });
				// create super cruise lines
				// Self.dispatch({ type: "super-cruise-on" });

				// start rendering
				Self.draw();
				break;
			case "pause":
				Self.paused = true;
				break;
			case "resume":
				if (Self.paused && Self.ctx) {
					Self.paused = false;
					Self.draw();
				}
				break;
			case "view-front":
				// set view
				Self.stars.view = event.type.split("-")[1];
				// set stars velocity
				Self.stars.velocity = { x: 0, y: 0, z: Self.speed * .0025 };
				// create star field
				if (!event.update) Self.dispatch({ type: "create-scene" });
				break;
			case "view-back":
				// set view
				Self.stars.view = event.type.split("-")[1];
				// set stars velocity
				Self.stars.velocity = { x: 0, y: 0, z: -Self.speed * .0025 };
				// create star field
				if (!event.update) Self.dispatch({ type: "create-scene" });
				break;
			case "view-up":
				// set view
				Self.stars.view = event.type.split("-")[1];
				// set stars velocity
				Self.stars.velocity = { x: 0, y: Self.speed * 2, z: 0 };
				// create star field
				if (!event.update) Self.dispatch({ type: "create-scene" });
				break;
			case "view-down":
				// set view
				Self.stars.view = event.type.split("-")[1];
				// set stars velocity
				Self.stars.velocity = { x: 0, y: -Self.speed * 2, z: 0 };
				// create star field
				if (!event.update) Self.dispatch({ type: "create-scene" });
				break;
			case "view-left":
				// set view
				Self.stars.view = event.type.split("-")[1];
				// set stars velocity
				Self.stars.velocity = { x: Self.speed * 2, y: 0, z: 0 };
				// create star field
				if (!event.update) Self.dispatch({ type: "create-scene" });
				break;
			case "view-right":
				// set view
				Self.stars.view = event.type.split("-")[1];
				// set stars velocity
				Self.stars.velocity = { x: -Self.speed * 2, y: 0, z: 0 };
				// create star field
				if (!event.update) Self.dispatch({ type: "create-scene" });
				break;
			case "thrust":
				// change speed
				Self.speed = Math.min(Self.speed + .1, 1);
				// update view
				Self.dispatch({ type: `view-${Self.stars.view}`, update: true });
				break;
			case "brake":
				// change speed
				Self.speed = Math.max(Self.speed - .1, 0.15);
				// update view
				Self.dispatch({ type: `view-${Self.stars.view}`, update: true });
				break;
			case "roll-left":
				Self.stars.rotate = event.state ? .5 * (Math.PI / 180) : null;
				break;
			case "roll-right":
				Self.stars.rotate = event.state ? -.5 * (Math.PI / 180) : null;
				break;
			case "dive":
			case "climb":
				console.log("TODO: ", event.type);
				break;
			case "set-focal-point":
				// mostly for dev purposes for now
				Self.target = { x: event.x, y: event.y };
				break;
			case "create-scene":
				Self.stars.list = [...Array(Self.stars.count)].map(s => ({
						x: Utils.random(0, Self.width),
						y: Utils.random(0, Self.height),
						z: Utils.random(Self.stars.min, Self.stars.size),
					}));
				break;
			case "super-cruise-on":
				Self.cruise.l1 = [...Array(Self.cruise.count)].map((s, i) => ({ x: -i * Self.cruise.step, z: .5 }));
				Self.cruise.l2 = [...Array(Self.cruise.count)].map((s, i) => ({ x: -i * Self.cruise.step, z: .5 }));
				break;
			case "super-cruise-off":
				if (Self.speed > Self.cruise.minSpeed) {
					// turn off super cruise and "force" speed drop
					Self.speed = Self.cruise.minSpeed;
					// update view
					Self.dispatch({ type: `look-${Self.stars.view}`, update: true });
				}
				Self.cruise.l1 = [];
				Self.cruise.l2 = [];
				break;
		}
	},
	recycle(star={}) {
		let Self = this,
			velocity = Self.stars.velocity,
			threshold = Self.stars.threshold,
			view = Self.stars.view,
			getPos = (star, dir) => {
				switch (dir) {
					case "left":
						star.x = -threshold;
						star.y = Utils.random(0, Self.height);
						break;
					case "right":
						star.x = Self.width + threshold;
						star.y = Utils.random(0, Self.height);
						break;
					case "up":
						star.x = Utils.random(0, Self.width);
						star.y = -threshold;
						break;
					case "down":
						star.x = Utils.random(0, Self.width);
						star.y = Self.height + threshold;
						break;
				}
			};
		// randomzie
		star.z = Utils.random(Self.stars.min, Self.stars.size);
		// create star for direction
		switch (view) {
			case "front":
				star.x = Utils.random(0, Self.width);
				star.y = Utils.random(0, Self.height);
				if (star.z > .35) star.z -= .3;
				break;
			case "back":
				star.x = Utils.random(0, Self.width);
				star.y = Utils.random(0, Self.height);
				// star.z += .3;
				break;
				/* falls through */
			case "left":
			case "right":
			case "up":
			case "down":
				getPos(star, view);
				break;
		}

		return star;
	},
	update(Self) {
		let velocity = Self.stars.velocity,
			threshold = Self.stars.threshold,
			dx = Self.target.x - Self.focal.x,
			dy = Self.target.y - Self.focal.y;

		Self.focal.x += dx / Self.inertia;
		Self.focal.y += dy / Self.inertia;

		Self.stars.list.map(star => {
			if (!!Self.stars.rotate) {
				let cX = Self.focal.x,
					cY = Self.focal.y,
					rad = Math.atan2(star.y - cY, star.x - cX),
					dist = Utils.calculateDistance(cX, cY, star.x, star.y);
				star.x = cX + dist * Math.cos(rad + Self.stars.rotate);
				star.y = cY + dist * Math.sin(rad + Self.stars.rotate);
			}

			star.x += velocity.x * star.z;
			star.y += velocity.y * star.z;
			star.x += (star.x - Self.focal.x) * velocity.z * star.z;
			star.y += (star.y - Self.focal.y) * velocity.z * star.z;
			star.z += velocity.z;

			if (star.x < -threshold
				|| star.x > Self.width + threshold
				|| star.y < -threshold
				|| star.y > Self.height + threshold
				|| star.z < 0) {
				Self.recycle(star);
			}
		});

		if (Self.stars.view === "front" && Self.cruise.l1.length) {
			Self.cruise.l1.map(item => {
				item.x += (item.x - Self.focal.x) * Self.speed * .000025 * item.z;
				item.z += Self.speed * .45;
				item.a = item.z * Self.speed * .0025;
				if (item.x < -Self.focal.x) {
					item.a = 0;
					item.x = 0;
					item.z = .15;
				}
			});

			Self.cruise.l2.map(item => {
				item.x += (item.x - Self.focal.x) * Self.speed * .000025 * item.z;
				item.z += Self.speed * 2;
				item.a = item.z * Self.speed * .001;
				if (item.x < -Self.focal.x) {
					item.a = 0;
					item.x = 0;
					item.z = .15;
				}
			});
		}
	},
	draw() {
		let Self = Stars,
			ctx = Self.ctx,
			multiplier = Self.stars.view === "back" ? .45 : 0;

		// reset canvas
		Self.cvs.width = Self.cvs.width;

		// update stars
		Self.update(Self);

		// render
		Self.stars.list.map(star => {
			let size = star.z * .85,
				alpha = (size / Self.stars.size) + multiplier,
				c = 255 - Math.round((Self.stars.size - size) * 255);
			ctx.beginPath();
			ctx.fillStyle = `rgba(${c},${c},${c},${alpha})`;
			ctx.arc(star.x, star.y, size, 0, Self.TAU);
			ctx.fill();
		});

		if (Self.stars.view === "front" && Self.cruise.l1.length) {
			ctx.save();
			ctx.translate(0, Self.height * .5);
			ctx.lineWidth = 1;
			[...Self.cruise.l1, ...Self.cruise.l2]
				.map(item => {
					let px = item.x + (Self.focal.x - 150),
						py = 80 - ((px * 70) / Self.focal.y);
					ctx.strokeStyle = `rgba(255,255,255,${item.a})`;

					ctx.beginPath();
					ctx.moveTo(px, -py);
					ctx.lineTo(px, py);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(Self.width-px, -py);
					ctx.lineTo(Self.width-px, py);
					ctx.stroke();
				});
			ctx.restore();
		}

		// next tick
		if (!Self.paused) requestAnimationFrame(Self.draw);
	}
};

// auto call init
Stars.init();

// forward message / event
self.onmessage = event => Stars.dispatch(event.data);



// simple utils
let Utils = {
	// get a random number within a range
	random(min, max) {
		return Math.random() * (max - min) + min;
	},
	// calculate the distance between two points
	calculateDistance(p1x, p1y, p2x, p2y) {
		let xDistance = p1x - p2x,
			yDistance = p1y - p2y;
		return Math.sqrt((xDistance ** 2) + (yDistance ** 2));
	}
};
