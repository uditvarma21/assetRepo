// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Import GLTFLoader to allow loading the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.js scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background color to white

// Create a perspective camera and adjust zoom level
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100; // Zoomed out by 150% from previous position

let object; // For the loaded 3D object

// Instantiate a GLTFLoader to load the .gltf file
const loader = new GLTFLoader();
const objToRender = 'dino'; // Set object to render

// Load the object and adjust its orientation
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.set(0xff0000); // Change color to red
      }
    });

    // Tilt the object by -90 degrees to get a front view
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

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Ambient light for general illumination
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Directional light for highlights
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Instantiate renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Render loop with rotation on the Z-axis
function animate() {
  requestAnimationFrame(animate);

  // Rotate object around Z-axis for 360-degree rotation
  if (object) object.rotation.z += 0.01;

  renderer.render(scene, camera);
}

// Adjust on window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
