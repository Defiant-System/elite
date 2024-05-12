
// elite.hud

{
	init() {
		// fast references
		this.els = {
			el: window.find(`.hud`),
		};

		return;
		
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
			case "some-event":
				break;
		}
	},
	scanner: @import "./scanner.js",
	hTarget: @import "./hologram-target.js",
	hShip: @import "./hologram-ship.js",
}
