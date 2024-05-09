
let Cockpit = {
	init() {
		
	},
	dispatch(event) {
		let APP = elite,
			Self = Cockpit,
			el;
		switch (event.type) {
			// system events
			case "window.keystroke":
				switch (event.keyCode) {
					case 37: // left
					case 65: // a
						Bg.dispatch({ worker: "stars", type: "roll-left" });
						break;
					case 39: // right
					case 68: // d
						Bg.dispatch({ worker: "stars", type: "roll-right" });
						break;
					case 38: // up
					case 87: // w
						Bg.dispatch({ worker: "stars", type: "speed-up" });
						break;
					case 40: // down
					case 83: // s
						Bg.dispatch({ worker: "stars", type: "speed-down" });
						break;
				}
				break;
			// custom events
			case "some-event":
				break;
		}
	}
};
