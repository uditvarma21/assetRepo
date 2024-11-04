// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Import OrbitControls to allow the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// Import GLTFLoader to allow loading the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.js scene
const scene = new THREE.Scene();
// Create a new camera with perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep the 3D object in a global variable for later access
let object;
let controls;

// Set the object to render
const objToRender = 'dino';

// Instantiate a GLTFLoader for the .gltf file
const loader = new GLTFLoader();

// Load the file based on `objToRender`
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // Add the loaded object to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // Log the loading progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // Log any errors during loading
    console.error(error);
  }
);

// Instantiate a renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha allows for a transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Set the camera position based on `objToRender`
camera.position.z = objToRender === "dino" ? 25 : 500;

// Add ambient light to the scene
const ambientIntensity = objToRender === "dino" ? 5 : 1;
const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
scene.add(ambientLight);

// Add a directional light to cast additional illumination
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Adjust intensity as needed
directionalLight.position.set(5, 10, 7.5).normalize(); // Position the light source
scene.add(directionalLight);

// Add OrbitControls if the object is "dino"
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Update controls, if present
  if (controls) controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Resize event listener to handle window resizing
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
