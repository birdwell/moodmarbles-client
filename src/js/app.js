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
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import BoxContainer from './components/BoxContainer';
import Marble from './components/Marble';
import { updateParticles, createParticles } from "./particles";
import tweets from "../data/coffee.json";
import joy from './joy2.jpg';

const FLOOR = {
    Y: -50
}

const app = () => {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const marbles = [];

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
    scene.add(boxContainer.object);

    const light = new PointLight(0xffffff);
    light.position.set(-10, 15, 50);
    scene.add(light);

    // earth

    var loader = new THREE.TextureLoader();

    loader.load(joy, function (texture) {
        var geometry = new THREE.SphereGeometry(5, 10, 10);
        var uniforms = {
            "texture": { type: "t", value: texture }
        };

        // material
        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertex_shader').textContent,
            fragmentShader: document.getElementById('fragment_shader').textContent
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    });


    render();

    tweets.forEach((tweet) => {
        let marble = new Marble(tweet);
        marbles.push(marble);

        scene.add(marble.object);
    })

    // Render the scene
    let t = 100;
    function render() {
        requestAnimationFrame(render);
        // updateParticles(particleSystem);
        renderer.render(scene, camera);

        if (t != FLOOR.Y) {
            marbles.forEach(x => (x.object.position.y = t));
            t -= 1;
        }
    }
};

export default app;
