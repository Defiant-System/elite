
let Test = {
	init(APP) {
		return;

		// auto stop hud player
		setTimeout(() => Star.dispatch({ type: "show-system-map" }), 100);
		
		return;

		return setTimeout(() => Game.els.content.data({ status: "game" }), 500);


		// setTimeout(() => Game.dispatch({ type: "game-pause" }), 500);
	}
};
