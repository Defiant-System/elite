
let Bg = {
	init() {
		let cvs = window.find(".game-bg"),
			width = +cvs.prop("offsetWidth"),
			height = +cvs.prop("offsetHeight");
		// reset canvas
		cvs.attr({ width, height });

		// save references to items
		this.cvs = cvs;
		this.stars = new Worker("~/js/bg-stars.js");

		// auto start bg
		this.dispatch({ type: "start" });
	},
	dispatch(event) {
		let Self = Bg,
			value;
		switch (event.type) {
			case "start":
				// transfer canvas control
				value = Self.cvs[0].transferControlToOffscreen();
				Self.stars.postMessage({ ...event, canvas: value }, [value]);
				break;
			case "dispose":
				break;
			default:
				if (event.worker) {
					Self[event.worker].postMessage(event);
				}
		}
	}
};
