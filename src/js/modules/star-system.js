
@import "./constants.js"
@import "../classes/CelestialObject.js"
@import "../classes/Sun.js"
@import "../classes/Planet.js"

let Star = {
	init() {
		// initiate solar system
		this.dispatch({ type: "load-star-system", data: StarSystem });
	},
	dispatch(event) {
		let APP = elite,
			Self = Star,
			el;
		switch (event.type) {
			// custom events
			case "load-star-system":
				let sun = new Sun(event.data.parent),
					planets = event.data.planets.map(data => new Planet(data, sun));

				this.system = { sun, planets };
				break;
		}
	}
};
