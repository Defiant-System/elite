
@import "./main.three.js";
@import "./modules/bg.js"
@import "./modules/cockpit.js"
@import "./modules/test.js"


const elite = {
	init() {
		// fast references
		this.content = window.find("content");
		
		// init objects
		Bg.init();
		Cockpit.init();
		
		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init());

		// console.log( THREE );
		// console.log( OBJLoader );
		// console.log( OrbitControls );
		// console.log( EffectComposer, RenderPass, OutlinePass );

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		switch (event.type) {
			// system events
			case "window.init":
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
