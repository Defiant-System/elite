
@import "./main.three.js";
@import "./modules/bg.js"
@import "./modules/star-system.js"
@import "./modules/bank.js"
@import "./modules/cockpit.js"
@import "./modules/test.js"


const elite = {
	init() {
		// fast references
		this.content = window.find("content");
		
		// init objects
		Bg.init();
		Bank.init();
		Cockpit.init();
		
		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init());

		// must come after "hud"
		Star.init();

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.keyup":
			case "window.keydown":
			case "window.keystroke":
				// forward events
				Cockpit.dispatch(event);
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	},
	hud: @import "./hud/index.js",
};

window.exports = elite;
