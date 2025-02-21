
@import "./main.three.js";
@import "./modules/bg.js"
@import "./modules/game.js"
@import "./modules/star.js"
@import "./modules/bank.js"
@import "./modules/cockpit.js"
@import "./modules/test.js"


const elite = {
	init() {
		// init objects
		Bg.init();
		Game.init();
		Bank.init();
		Cockpit.init();
		
		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init());

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.close":
				// clear three.js from memory
				THREE_dispose();
				break;
			case "window.focus":
				Game.dispatch({ type: "game-resume" });
				break;
			case "window.blur":
				Game.dispatch({ type: "game-pause" });
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
			default:
				// forward event to game
				Game.dispatch(event);
		}
	},
	hud: @import "./hud/index.js",
};

window.exports = elite;
