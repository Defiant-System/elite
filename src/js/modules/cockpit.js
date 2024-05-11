
let Cockpit = {
	init() {
		// save states here
		this.state = {
			"super-cruise": false,
		};
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
						Bg.dispatch({ worker: "stars", type: "thrust" });
						break;
					case 40: // down
					case 83: // s
						Bg.dispatch({ worker: "stars", type: "brake" });
						
						// if speed is less than 20% - auto turn off "super cruise"
						// if (Self.speed <= Self.cruise.minSpeed) {
						// 	Self.dispatch({ type: "super-cruise-off" });
						// }
						break;

					case 104: // numpad 8 - front
						Bg.dispatch({ worker: "stars", type: "look-front" });
						break;
					case 98: // numpad 2 - rear
						Bg.dispatch({ worker: "stars", type: "look-rear" });
						break;
					case 100: // numpad 4 - left
						Bg.dispatch({ worker: "stars", type: "look-left" });
						break;
					case 102: // numpad 6 - right
						Bg.dispatch({ worker: "stars", type: "look-right" });
						break;
					case 101: // numpad 5 - up
						Bg.dispatch({ worker: "stars", type: "look-up" });
						break;
					case 96: // numpad 0 - down
						Bg.dispatch({ worker: "stars", type: "look-down" });
						break;

					case 70: // "F" - Frame Shift Drive
						if (!Self.state["super-cruise"]) {
							Bg.dispatch({ worker: "stars", type: "super-cruise-on" });
							Self.state["super-cruise"] = true;
						} else {
							Bg.dispatch({ worker: "stars", type: "super-cruise-off" });
							Self.state["super-cruise"] = false;
						}
						break;
				}
				// console.log(event);
				break;
			// custom events
			case "some-event":
				break;
		}
	}
};
