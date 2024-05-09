
let Bank = (() => {

	let ships = [
			{ color: 0x003300, lines: 0x00aa00, opacity: .80, id: "cobra", path: "~/3d/cobra-mk3.obj" },
			{ color: 0xcc0066, lines: 0xcc1188, opacity: .25, id: "thargoid", path: "~/3d/thargoid.obj" },
			{ color: 0xcc6600, lines: 0xcc7700, opacity: .25, id: "coriolis", path: "~/3d/coriolis.obj" },
			{ color: 0xcc6600, lines: 0xff9900, opacity: .25, id: "canister", path: "~/3d/canister.obj" },
		];

	let emblems = [
			{ color: 0xbb5500, id: "elite", svg: `<svg viewBox="0 0 55 55"><path class="st0" d="M27.2,37.5L26,30.6l-1.4-1.4l-1.8,0c0,0-1.4-1.5-1.7-1.9c-0.4-0.4,0.5-2.4,1.5-2.8c0,0,0-1.7,0-1.7s-8-7.3-9.7-9c-0.5,2,0.7,4.8,1.7,5.8s2.1,2.1,2.6,2.6c0.6,0.5,1.9,1.9,0.9,3.2c-0.9,1.4-2,2.4-0.2,3.9C20.2,31.2,27.2,37.5,27.2,37.5z"/><polygon class="st0" points="27.5,35.3 26.5,30.3 28.5,30.3 "/><polygon class="st0" points="27.5,27.8 29,26.5 29.4,26.6 30.2,27.1 29,27.1 29.1,27.7 30.6,28 31.3,28.5 28.9,28.6 27.5,29.7 26.1,28.6 23.7,28.5 24.4,28 25.9,27.7 26,27.1 24.8,27.1 25.6,26.6 26,26.5 "/><polygon class="st0" points="27.5,24.4 28.1,23.9 28.2,20.6 28.4,19.7 28.9,25 28.5,25.3 28.5,26.2 27.5,27 27.5,27 26.5,26.2 26.5,25.3 26.1,25 26.6,19.7 26.8,20.6 26.9,23.9 "/><path class="st0" d="M17.3,25.9c0.5-0.6,1.2-1.7,0.1-2.7s-2.3-2.1-3-2.7c0,2.2-0.1,2.8,1,3.8S17.3,25.9,17.3,25.9z"/><path class="st0" d="M12.4,14.3c-1.2-1.1-10.2-9.2-11-9.9C1.3,8.1,1.2,9,3,10.4s4.8,4.5,4.8,4.5l0,0.8l-2.6-2.4c0,0,0.1,1.7,0.1,2.5c0,0.8,0.3,2,1.5,3.1c1.1,1,4.1,3.8,4.1,3.8l0,0.8c0,0-1.7-1.5-2.2-2c0,1.8-0.1,3,0.9,4c1,1,9.4,8.9,10,9.4c0.5,0.5,0.8,1,0.8,1.8c0,0.8-0.2,2.1,0.6,2.8c0.8,0.6,3.3,3,3.8,3.6c0.8-1.9,1.7-3.9,2.1-4.9c-1.1-1-9.8-8.8-10.4-9.3c-0.6-0.6-0.7-1.6,0.2-2.6c-1.5-1.5-2-1.9-2.2-2.1c-0.2-0.2-0.7-0.7-0.8-2.2c0-1.4,0-1.9,0-2.2C12.2,18.2,12,15.8,12.4,14.3z"/><path class="st0" d="M19.8,38.5c0-1.3,0.2-2.1-0.5-2.8c-0.7-0.7-4.1-3.8-5-4.6c0,1.5,0,2.4,1,3.3C16.4,35.3,19,37.8,19.8,38.5z"/><polygon class="st0" points="26.3,45.4 26.9,42.6 27.5,41.7 28.2,42.7 28.7,45.4 29.9,44.4 27.5,38.6 25.1,44.4 "/><polygon class="st0" points="28.6,49.5 28.7,49.1 27.8,43.2 27.5,42.5 27.2,43.2 26.3,49.1 26.4,49.5 27.5,50.7 "/><path class="st0" d="M27.7,37.6l1.3-6.9l1.4-1.4l1.8,0c0,0,1.4-1.5,1.7-1.9c0.4-0.4-0.5-2.4-1.5-2.8c0,0,0-1.7,0-1.7s8-7.3,9.7-9c0.5,2-0.7,4.8-1.7,5.8c-1,0.9-2.1,2.1-2.6,2.6c-0.6,0.5-1.9,1.9-0.9,3.2s2,2.4,0.2,3.9C34.8,31.3,27.7,37.6,27.7,37.6z"/><path class="st0" d="M37.7,26c-0.5-0.6-1.2-1.7-0.1-2.7s2.3-2.1,3-2.7c0,2.2,0.1,2.8-1,3.8S37.7,26,37.7,26z"/><path class="st0" d="M42.6,14.4c1.2-1.1,10.2-9.2,11-9.9c0,3.7,0.1,4.6-1.6,6.1C50.3,12,47.2,15,47.2,15l0,0.8l2.6-2.4c0,0-0.1,1.7-0.1,2.5c0,0.8-0.3,2-1.5,3.1C47,20.1,44,23,44,23l0,0.8c0,0,1.7-1.5,2.2-2c0,1.8,0.1,3-0.9,4c-1,1-9.4,8.9-10,9.4c-0.5,0.5-0.8,1-0.8,1.8c0,0.8,0.2,2.1-0.6,2.8c-0.8,0.6-3.3,3-3.8,3.6c-0.8-1.9-1.7-3.9-2.1-4.9c1.1-1,9.8-8.8,10.4-9.3c0.6-0.6,0.7-1.6-0.2-2.6c1.5-1.5,2-1.9,2.2-2.1c0.2-0.2,0.7-0.7,0.8-2.2s0-1.9,0-2.2C42.8,18.2,43,15.9,42.6,14.4z"/><path class="st0" d="M35.1,38.6c0-1.3-0.2-2.1,0.5-2.8c0.7-0.7,4.1-3.8,5-4.6c0,1.5,0,2.4-1,3.3C38.6,35.3,36,37.8,35.1,38.6z"/></svg>` }
		];

	let Bank = {
		init() {
			// bank vault - duhh..!
			this.vault = {};
			// start loading 3d objects
			this.dispatch({ type: "load-ships" });
			// parse svg emblems
			this.dispatch({ type: "parse-svg" });
		},
		clone(id) {
			let org = this.vault[id];
			if (org.svg) return org.obj3d.clone();

			let obj3d = org.obj3d.clone(),
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
				loader,
				item;
			switch (event.type) {
				case "load-ships":
					// object loader
					loader = new OBJLoader();
					// get next item to load
					item = ships.pop();

					let material = new THREE.MeshPhongMaterial({
							color: item.color,
							opacity: item.opacity,
							transparent: true,
						});

					// start loading
					loader.load(item.path, object => {
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
				case "parse-svg":
					// svg loader
					loader = new SVGLoader();
					// loop svg emblems
					emblems.map(item => {
						let svgData = loader.parse(item.svg);
						let obj3d = new THREE.Object3D();
						let material = new THREE.MeshPhongMaterial({
								color: item.color,
								opacity: .65,
								transparent: true,
							});

						svgData.paths.forEach(path => {
							let shapes = SVGLoader.createShapes(path);
							
							shapes.forEach((shape) => {
								let extrudeSettings = {
									steps: 1,
									depth: 2.5,
									bevelEnabled: true,
									bevelThickness: .25,
									bevelSize: .25,
									bevelOffset: 0,
									bevelSegments: 1
								};
								let meshGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
								let mesh = new THREE.Mesh(meshGeometry, material);

								obj3d.add(mesh);
							});
						});

						let box = new THREE.Box3().setFromObject(obj3d);
						let size = box.getSize(new THREE.Vector3());
						let xOffset = size.x / -2;
						let yOffset = size.y / -1.5;

						// Offset all of group's elements, to center them
						obj3d.children.forEach(item => {
							item.position.x = xOffset;
							item.position.y = yOffset;
						});
						// rotate emblem
						obj3d.rotateX(Math.PI);
						// save to bank vault
						Self.vault[item.id] = { ...item, obj3d };
					});
					break;
			}
		}
	};

	return Bank;

})();
