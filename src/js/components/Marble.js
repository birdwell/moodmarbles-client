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
		this.marble = new Mesh(sphereGeometry, phongMaterial);

		// Initial Position
		this.marble.position.x = getRandomInt(-50, 50);
		this.marble.position.y = 0;
		this.marble.position.z = getRandomInt(-50, 50);
	}
}

export default Marble;