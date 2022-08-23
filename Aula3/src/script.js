import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const cube = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 'green' });
const cube2 = new THREE.Mesh(geometry2, material2);

const geometry3 = new THREE.BoxGeometry(1, 1, 1);
const material3 = new THREE.MeshBasicMaterial({ color: 'yellow' });
const cube3 = new THREE.Mesh(geometry3, material3);

const geometry4 = new THREE.BoxGeometry(1, 1, 1);
const material4 = new THREE.MeshBasicMaterial({ color: 'blue' });
const cube4 = new THREE.Mesh(geometry4, material4);

const geometry5 = new THREE.BoxGeometry(1, 1, 1);
const material5 = new THREE.MeshBasicMaterial({ color: 'black' });
const cube5 = new THREE.Mesh(geometry5, material5);

scene.add(cube);
scene.add(cube2)
scene.add(cube3)
scene.add(cube4)
scene.add(cube5)

// Sizes
const sizes = {
  width: 1900,
  height: 960,
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
);

camera.position.z = 3


scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

gsap.to(cube.position, { x: 2, duration: 1, delay: 1 });
gsap.to(cube.position, { x: 0, duration: 1, delay: 2 });
gsap.to(cube.position, { x: -2, duration: 1, delay: 2 });

gsap.to(cube2.position, { x: -2, duration: 1, delay: 1 });
gsap.to(cube2.position, { x: 0, duration: 1, delay: 2 });
gsap.to(cube2.position, { x: 2, duration: 1, delay: 2 });

gsap.to(cube3.position, { y: -2, duration: 1, delay: 1 });
gsap.to(cube3.position, { y: 0, duration: 1, delay: 2 });
gsap.to(cube3.position, { y: 2, duration: 1, delay: 2 });

gsap.to(cube4.position, { y: 2, duration: 1, delay: 1 });
gsap.to(cube4.position, { y: 0, duration: 1, delay: 2 });
gsap.to(cube4.position, { y: -2, duration: 1, delay: 2 });



// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  camera.position.y = Math.sin(elapsedTime);
  camera.position.x = Math.cos(elapsedTime);
  camera.lookAt(cube5.position);

  // Renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
