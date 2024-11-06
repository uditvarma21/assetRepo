// Import the THREE.js library and the GLTFLoader from Skypack CDN
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create the Three.js scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background color to white

// Create a perspective camera with adjusted zoom level
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 200; // Zoomed out for a larger field of view

let object; // Variable to store the loaded 3D object

// Instantiate GLTFLoader to load the .gltf file
const loader = new GLTFLoader();
const objToRender = 'dino'; // Set the object to render

// Load the object, apply color, and adjust its orientation
loader.load(
  `models/${objToRender}/scene.gltf`, // Update this path to your actual model path
  function (gltf) {
    object = gltf.scene;

    // Change object color to red
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.set(0xff0000); // Set object color to red
      }
    });

    // Rotate the object -90 degrees on the X-axis to display a front view
    object.rotation.x = -Math.PI / 2;

    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Add ambient light and directional light to illuminate the object
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Animation loop with rotation on the Z-axis
function animate() {
  requestAnimationFrame(animate);

  // Rotate object around Z-axis
  if (object) object.rotation.z += 0.01;

  renderer.render(scene, camera);
}

// Adjust camera on window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
