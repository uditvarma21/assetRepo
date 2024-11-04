// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Import GLTFLoader to allow loading the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.js scene
const scene = new THREE.Scene();
// Set the background color of the scene to white
scene.background = new THREE.Color(0xffffff); // White background

// Create a new camera with perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep the 3D object in a global variable for later access
let object;

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
    
    // Change the color of the object to red
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.set(0xff0000); // Set mesh color to red
      }
    });

    // Rotate the object down by 90 degrees (in radians)
    object.rotation.x = Math.PI / 2; // 90 degrees in radians
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

// Position the camera in front of the object and zoom out (total zoom out 300% from the original)
camera.position.set(0, 0, 45); // Adjust the z-position to zoom out by around 200%

// Add ambient light to the scene
const ambientIntensity = objToRender === "dino" ? 5 : 1;
const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity); // Ambient light for overall illumination
scene.add(ambientLight);

// Add more directional lights to cast additional illumination
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2); // First directional light
directionalLight1.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2); // Second directional light
directionalLight2.position.set(-5, 10, -7.5).normalize(); // Positioning it on the opposite side
scene.add(directionalLight2);

// Auto-rotate the object vertically
let rotationSpeed = 0.01; // Speed of rotation in radians

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the object vertically
  if (object) {
    object.rotation.x += rotationSpeed; // Auto-rotate around the X-axis
  }

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
