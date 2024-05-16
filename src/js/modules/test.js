
let Test = {
	init(APP) {
		// return;

		return;

		return setTimeout(() => Game.els.content.data({ status: "game" }), 500);

		// auto stop hud player
		setTimeout(() => Star.dispatch({ type: "show-system-map" }), 1000);

		// setTimeout(() => Game.dispatch({ type: "game-pause" }), 500);
	}
};
