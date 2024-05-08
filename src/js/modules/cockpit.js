
let Cockpit = {
	init() {
		let width = window.innerWidth,
			height = window.innerHeight,
			ratio = width / height;
		let scene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera(40, ratio, 1, 1000);
		let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		// postprocessing
		let composer = new EffectComposer(renderer);
		let renderPass = new RenderPass(scene, camera);
		let outlinePass = new OutlinePass(new THREE.Vector2(width, height ), scene, camera);
		// controls
		let controls = new OrbitControls(camera, renderer.domElement);
		// ambient light
		let ambientLight = new THREE.AmbientLight(0x666666);
		// point light
		let pointLight = new THREE.PointLight(0xffffff, 20, 0, 0);

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		camera.position.set(35, 20, 40);
		scene.background = null;
		scene.add(camera);
		scene.add(ambientLight);
		camera.add(pointLight);

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		composer.addPass(renderPass);
		composer.addPass(outlinePass);
		renderer.setSize(width, height);
		composer.setSize(width, height);

		let params = {
				edgeStrength: 2.0,
				edgeGlow: 1.0,
				edgeThickness: 1.0,
			};
		outlinePass.edgeStrength = Number(params.edgeStrength);
		outlinePass.edgeGlow = Number(params.edgeGlow);
		outlinePass.edgeThickness = Number(params.edgeThickness);
		outlinePass.visibleEdgeColor.set( 0x66ff66 );

		// mesh goup
		let obj3d = new THREE.Object3D();
		let group = new THREE.Group();
		scene.add(group);
		group.add(obj3d);

		let loader = new OBJLoader();
		loader.load("~/3d/cobra-mk3.obj", object => {
			let scale = 1.0;
			object.traverse(child => {
				if (child instanceof THREE.Mesh) {
					child.geometry.center();
					child.geometry.computeBoundingSphere();
					scale = 0.1 * child.geometry.boundingSphere.radius;

					let phongMaterial = new THREE.MeshPhongMaterial( {
						color: 0x003300,
						opacity: .9,
						transparent: true,
						polygonOffset: true,
						polygonOffsetFactor: 1, // positive value pushes polygon further away
						polygonOffsetUnits: 1
					} );
					child.material = phongMaterial;
					outlinePass.selectedObjects = [child];
				}
			});

			// wireframe
			let geo = new THREE.EdgesGeometry(object.children[0].geometry); // or WireframeGeometry
			let mat = new THREE.LineBasicMaterial({ color: 0x22aa22 });
			let wireframe = new THREE.LineSegments(geo, mat);
			object.add( wireframe );

			object.scale.divideScalar(scale);
			obj3d.add(object);

			Cockpit.fpsControl.start();
		});

		// create FPS controller
		this.fpsControl = karaqu.FpsControl({
			fps: 40,
			callback() {
				let APP = elite,
					Self = Cockpit;

				group.rotation.y -= 0.01;
				group.rotation.x += 0.02;
					
				controls.update();
				composer.render();
			}
		});

		// fast references
		this.el = window.find(".cockpit-view");
		// add renderer canvas to window body
		this.el.prepend(renderer.domElement);
	},
	dispatch(event) {
		let APP = elite,
			Self = Cockpit,
			el;
		switch (event.type) {
			case "some-event":
				break;
		}
	}
};
