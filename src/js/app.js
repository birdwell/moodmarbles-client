import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    PointLight,
    SphereGeometry,
    Mesh,
    MeshPhongMaterial,
    AxesHelper,
    BoxGeometry,
    MeshBasicMaterial,
    LineSegments,
    BoxHelper
} from 'three';
import OrbitControls from 'three-orbitcontrols';

import BoxContainer from './components/BoxContainer';
import { updateParticles, createParticles } from "./particles";
import { getRandomInt } from "./utils";
import data from "../data/coffee.json";

const FLOOR = {
    Y: -50
}

const app = () => {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    const renderer = new WebGLRenderer({ antialias: true });

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, WIDTH / HEIGHT);
    const controls = new OrbitControls(camera);
    const boxContainer = new BoxContainer();

    camera.position.z = 50;
    controls.update();
    scene.add(camera);
    boxContainer.add(scene);

    // const particleSystem = createParticles();
    const spheres = [];

    const light = new PointLight(0xffffff);
    light.position.set(-10, 15, 50);
    scene.add(light);

    const mood = {
        sadness: 0xf1c40f,
        joy: 0x3498db,
        anger: 0xe74c3c
    };



    // scene.add(particleSystem);

    render();

    const addTweet = (tweet) => {
        const sphereGeometry = new SphereGeometry(2, 10, 10);
        const phongMaterial = new MeshPhongMaterial({
            color: mood[tweet.emotion]
        });
        const sphere = new Mesh(sphereGeometry, phongMaterial);

        sphere.position.x = getRandomInt(-50, 50);
        sphere.position.y = 0;
        sphere.position.z = getRandomInt(-50, 50);
        sphere.rotation.set(0.4, 0.2, 0);

        spheres.push(sphere);
        scene.add(sphere);
    }

    // Render the scene
    let t = 100;
    let tweetCount = 0;
    function render() {
        requestAnimationFrame(render);
        // updateParticles(particleSystem);
        renderer.render(scene, camera);

        if (tweetCount < data.length) {
            addTweet(data[tweetCount]);
        }

        if (t != FLOOR.Y) {
            spheres.forEach(x => (x.position.y = t));
            t -= 1;
        }

        tweetCount += 1;
    }
};

export default app;
