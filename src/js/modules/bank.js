
let Bank = (() => {

	let ships = [
			{ color: 0x003300, lines: 0x00aa00, id: "cobra", path: "~/3d/cobra-mk3.obj" },
			{ color: 0xcc0066, lines: 0xcc1188, id: "thargoid", path: "~/3d/thargoid.obj" },
			{ color: 0xcc6600, lines: 0xcc7700, id: "coriolis", path: "~/3d/coriolis.obj" },
			{ color: 0xcc6600, lines: 0xff9900, id: "canister", path: "~/3d/canister.obj" },
		];

	let Bank = {
		init() {
			// bank vault - duhh..!
			this.vault = {};
			// default loader
			this.loader = new OBJLoader();
			// start loading 3d objects
			this.dispatch({ type: "load-ships" });
		},
		clone(id) {
			let obj3d = this.vault[id].obj3d.clone(),
				mesh = obj3d.children[0].children[0];
			// set mesh color
			mesh.material.color.setHex(this.vault[id].color);
			// wireframe
			let geo = new THREE.EdgesGeometry(mesh.geometry);
			let mat = new THREE.LineBasicMaterial({ color: this.vault[id].lines });
			let wireframe = new THREE.LineSegments(geo, mat);
			obj3d.add(wireframe);

			return obj3d;
		},
		dispatch(event) {
			let Self = Bank,
				item;
			switch (event.type) {
				case "load-ships":
					// get next item to load
					item = ships.pop();

					let material = new THREE.MeshPhongMaterial({
							color: item.color,
							transparent: true,
							opacity: .75,
						});

					// start loading
					Self.loader.load(item.path, object => {
						object.traverse(child => {
							if (child.isMesh) {
								child.material = material;
							}
						});
						// group item
						let obj3d = new THREE.Object3D();
						obj3d.add(object);
						// save to bank vault
						Self.vault[item.id] = { ...item, obj3d };
						// load next, if any
						if (ships.length) Self.dispatch({ type: "load-ships" });
						else window.emit("bank-ready");
					});
					break;
			}
		}
	};

	return Bank;

})();
