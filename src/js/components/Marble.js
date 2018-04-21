import {
	SphereGeometry,
	MeshPhongMaterial,
	Mesh
} from 'three';
import { getRandomInt } from '../utils';

const mood = {
	sadness: 0xf1c40f,
	joy: 0x3498db,
	anger: 0xe74c3c
};

class Marble {
	constructor(tweet) {
		const sphereGeometry = new SphereGeometry(2, 10, 10);
		const phongMaterial = new MeshPhongMaterial({
			color: mood[tweet.emotion]
		});
		this.object = new Mesh(sphereGeometry, phongMaterial);

		// Initial Position
		this.object.position.x = getRandomInt(-50, 50);
		this.object.position.y = 0;
		this.object.position.z = getRandomInt(-50, 50);
	}
}

export default Marble;