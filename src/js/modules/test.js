
let Test = {
	init(APP) {
		// auto stop hud player
		setTimeout(() => {
			Star.dispatch({ type: "show-system-map" });
		}, 1000);

		// setTimeout(() => Game.dispatch({ type: "game-pause" }), 500);
	}
};
