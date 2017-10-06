var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
  0.1, 10000);

camera.position.z = -50;

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xBD7833, 1);

var canvas = renderer.domElement;
canvas.style.display = "block";

document.body.appendChild(canvas);

// Enable controls
var controls = new THREE.TrackballControls(camera);

//Add lighting
scene.add(new THREE.AmbientLight(0xaaaaaa));

var light = new THREE.DirectionalLight(0xe4eef9, .7);
light.position.set(12, 12, 8);
scene.add(light);

var radius = 14,
  segments = 32,
  rotation = 0;

var bergamota = new Bergamota(radius, segments);

scene.add(bergamota);

// Render the image
function render() {
  controls.update();

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
