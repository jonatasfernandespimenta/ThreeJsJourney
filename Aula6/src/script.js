import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl')

const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

// scene
const scene = new THREE.Scene();

// Red Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const positionsArray = new Float32Array([
  0, 0, 0,
  0, 1, 0,
  1, 0, 0,
])

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: 'red' });
const cube = new THREE.Mesh(geometry, material);


scene.add(cube);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement){
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
);

// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.5, 100)

// camera.position.x = cursor.x;
// camera.position.y = cursor.y;
camera.position.z = 3

camera.lookAt(cube.position);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  // Update objects
  // cube.rotation.y = elapsedTime;

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // camera.lookAt(cube.position)



  // Renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
