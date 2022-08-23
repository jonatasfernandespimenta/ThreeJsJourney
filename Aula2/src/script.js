import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene();

// // Red Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
// const cube = new THREE.Mesh(geometry, material);

// // cube.position.x = 0.8;
// // cube.position.y = 0.5;
// // cube.position.z = 1;
// cube.scale.set(0.5, 0.5, 0.5);

// scene.add(cube);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'red' }),
);

group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

cube2.position.x = -2;
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue' }),
);

cube3.position.x = +2;
group.add(cube3)

group.position.y = 1;

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
);

camera.position.z = 3
camera.position.y = 1

scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
