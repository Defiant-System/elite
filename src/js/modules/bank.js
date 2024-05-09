
let Bank = (() => {

	let ships = [
			{ color: 0x00aa00, id: "cobra", path: "~/3d/cobra-mk3.obj" },
			{ color: 0xcc7700, id: "canister", path: "~/3d/canister.obj" },
		];

	let Bank = {
		init() {
			// bank vault - duhh..!
			this.vault = {};
			// default loader
			this.loader = new OBJLoader();
			// default material
			this.phongMaterial = new THREE.MeshPhongMaterial({
				color: 0x003300,
				opacity: .825,
				transparent: true,
			});
			// start loading 3d objects
			this.dispatch({ type: "load-ships" });
		},
		clone(id) {
			let color = this.vault[id].color,
				obj3d = this.vault[id].obj3d.clone(),
				mesh = obj3d.children[0].children[0];
			
			// wireframe
			let geo = new THREE.EdgesGeometry(mesh.geometry);
			let mat = new THREE.LineBasicMaterial({ color });
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

					// start loading
					Self.loader.load(item.path, object => {
						object.traverse(child => {
							if (child.isMesh) {
								child.material = Self.phongMaterial;
							}
						});

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
