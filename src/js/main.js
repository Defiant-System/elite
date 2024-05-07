
@import "./modules/bg.js"
@import "./modules/test.js"


const elite = {
	init() {
		// fast references
		this.content = window.find("content");
		
		// init objects
		Bg.init();

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
	}
};

window.exports = elite;
