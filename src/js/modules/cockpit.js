
let Cockpit = {
	init() {
		// fast references
		this.els = {
			el: window.find(".cockpit-view"),
			content: window.find("content"),
		};
		// save states here
		this.state = {
			"status": "start",
			"super-cruise": false,
			"system-chart": false,
		};
	},
	dispatch(event) {
		let APP = elite,
			Self = Cockpit,
			show,
			value,
			el;
		switch (event.type) {
			// system events
			case "window.keystroke":
				// console.log(event);
				switch (event.keyCode) {
					case 27: // esc
						if (Self.state.status === "start") {
							Self.state.status = "game";
							Self.els.content.data({ status: Self.state.status });
						} else  {
							Self.state.status = "start";
							Self.els.content.data({ status: Self.state.status });
						}
						break;

					case 104: // numpad 8 - front
						show = "front";
						Self.els.el.data({ show });
						Bg.dispatch({ worker: "stars", type: `view-${show}` });
						break;
					case 98: // numpad 2 - rear
						show = "back";
						Self.els.el.data({ show });
						Bg.dispatch({ worker: "stars", type: `view-${show}` });
						break;
					case 100: // numpad 4 - left
						show = "left";
						Self.els.el.data({ show });
						Bg.dispatch({ worker: "stars", type: `view-${show}` });
						break;
					case 102: // numpad 6 - right
						show = "right";
						Self.els.el.data({ show });
						Bg.dispatch({ worker: "stars", type: `view-${show}` });
						break;
					case 101: // numpad 5 - up
						show = "up";
						Self.els.el.data({ show });
						Bg.dispatch({ worker: "stars", type: `view-${show}` });
						break;
					case 96: // numpad 0 - down
						show = "down";
						Self.els.el.data({ show });
						Bg.dispatch({ worker: "stars", type: `view-${show}` });
						break;

					case 107: // numpad plus
						Bg.dispatch({ worker: "stars", type: "thrust" });
						break;
					case 109: // numpad minus
						Bg.dispatch({ worker: "stars", type: "brake" });
						// if speed is less than 20% - auto turn off "super cruise"
						// if (Self.speed <= Self.cruise.minSpeed) {
						// 	Self.dispatch({ type: "super-cruise-off" });
						// }
						break;

					case 77: // "M" - star system chart
						if (!Self.state["system-chart"]) {
							Star.dispatch({ type: "show-system-chart" });
							Self.state["system-chart"] = true;
						} else {
							Star.dispatch({ type: "hide-system-chart" });
							Self.state["system-chart"] = false;
						}
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
				break;
			case "window.keydown":
				switch (event.keyCode) {
					case 37: // left
					case 65: // a
						Bg.dispatch({ worker: "stars", type: "roll-left", state: true });
						break;
					case 39: // right
					case 68: // d
						Bg.dispatch({ worker: "stars", type: "roll-right", state: true });
						break;
					case 38: // up
					case 87: // w
						Bg.dispatch({ worker: "stars", type: "dive", state: true });
						break;
					case 40: // down
					case 83: // s
						Bg.dispatch({ worker: "stars", type: "climb", state: true });
						break;
				}
				break;
			case "window.keyup":
				switch (event.keyCode) {
					case 37: // left
					case 65: // a
						Bg.dispatch({ worker: "stars", type: "roll-left", state: false });
						break;
					case 39: // right
					case 68: // d
						Bg.dispatch({ worker: "stars", type: "roll-right", state: false });
						break;
					case 38: // up
					case 87: // w
						Bg.dispatch({ worker: "stars", type: "dive", state: false });
						break;
					case 40: // down
					case 83: // s
						Bg.dispatch({ worker: "stars", type: "climb", state: false });
						break;
				}
				break;

			// custom events
			case "some-event":
				break;
		}
	}
};
