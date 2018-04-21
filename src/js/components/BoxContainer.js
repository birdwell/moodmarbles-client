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
		this.object = new BoxHelper(object, 0xffffff);
	}
}

export default BoxContainer;