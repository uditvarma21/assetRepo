<!-- HTML structure -->
<div id="container3D"></div>
<div id="controls">
  <p>Current Tilt Angle: <span id="tiltAngle">0</span>°</p>
  <p>Current Zoom Level: <span id="zoomLevel">25</span></p>
</div>

<style>
  #container3D {
    width: 100%;
    height: 100vh;
  }
  #controls {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
  }
</style>

<script type="module">
// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Import OrbitControls to allow the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
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
    
    // Change the color of the object to red
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.set(0xff0000); // Set mesh color to red
      }
    });

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
const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity); // Ambient light for overall illumination
scene.add(ambientLight);

// Add more directional lights to cast additional illumination
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2); // First directional light
directionalLight1.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2); // Second directional light
directionalLight2.position.set(-5, 10, -7.5).normalize(); // Positioning it on the opposite side
scene.add(directionalLight2);

// Add OrbitControls if the object is "dino"
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Get HTML elements for displaying tilt angle and zoom level
const tiltAngleDisplay = document.getElementById("tiltAngle");
const zoomLevelDisplay = document.getElementById("zoomLevel");

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Update controls, if present
  if (controls) controls.update();

  // Update tilt angle and zoom level in UI
  if (object) {
    // Calculate tilt angle in degrees
    const tiltAngle = THREE.MathUtils.radToDeg(object.rotation.x).toFixed(1);
    tiltAngleDisplay.textContent = tiltAngle;

    // Calculate zoom level (distance between camera and object)
    const zoomLevel = camera.position.distanceTo(object.position).toFixed(1);
    zoomLevelDisplay.textContent = zoomLevel;
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
</script>
