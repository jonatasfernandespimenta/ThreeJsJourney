import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

const canvas = document.querySelector("canvas.webgl");

const cursor = {
  x: 0,
  y: 0,
};

const generateCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshBasicMaterial({ color: parameters.color });
  const cube = new THREE.Mesh(geometry, material);

  return { geometry, material, cube };
};

const parameters = {
  color: "#ff0000",
  spin: () => {
    gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI + 2 });
  },
  addCube: () => {
    const cube1 = generateCube();
    cube1.cube.position.x = -1;
    scene.add(cube1.cube);
    return cube1;
  }
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

// scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const cube = new THREE.Mesh(geometry, material);

// Debug
gui.add(cube.position, "x", -3, 3, 0.01);
gui.add(cube.position, "y", -3, 3, 0.01).name("red cube Y");
gui.add(cube.position, "z", -3, 3, 0.01);
gui.add(material, "wireframe").name("wireframe");
gui.addColor(parameters, "color").onChange(function (value) {
  material.color.set(value);
});
gui.add(parameters, "spin");
gui.add(parameters, "addCube");

scene.add(cube);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.5, 100)

// camera.position.x = cursor.x;
// camera.position.y = cursor.y;
camera.position.z = 3;

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
};

tick();
