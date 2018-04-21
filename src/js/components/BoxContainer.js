import {
    BoxGeometry,
    MeshBasicMaterial,
	BoxHelper,
	Mesh
} from 'three';

class BoxContainer  {
	constructor() {
		const boxGeo = new BoxGeometry(100, 100, 100);
		const object = new Mesh(boxGeo, new MeshBasicMaterial(0xffffff));
		this.box = new BoxHelper(object, 0xffffff);
	}

	add(scene) {
		scene.add(this.box);
	}
}

export default BoxContainer;