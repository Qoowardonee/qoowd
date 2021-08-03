var stageWidth = 1200;
var stageHeight = 600;
var xRows = 25;
var zRows = 25;
var cubeSize = 600;
var cubeGap = 200;
var cubeRow = cubeSize + cubeGap;

var container = document.createElement('div');
document.body.appendChild( container );

var camera = new THREE.PerspectiveCamera(55, stageWidth/stageHeight, 1, 20000);
camera.position.y = 5000;
camera.lookAt( new THREE.Vector3(0,0,0) );

var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x000000, 5000, 10000 );

var pointLight = new THREE.PointLight(0xFF4040);
pointLight.position.x = 0;
pointLight.position.y = 1800;
pointLight.position.z = -1800;
scene.add(pointLight);

var pointLight = new THREE.PointLight(0xc0c0f0);
pointLight.position.x = 0;
pointLight.position.y = 800;
pointLight.position.z = 1000;
scene.add(pointLight);*/

group = new THREE.Object3D();
scene.add( group );

var cubes = [];

var halfXRows = (cubeRow * -xRows / 2);
var halfZRows = (cubeRow * -zRows / 2);

for (var x = 0; x < xRows; x++) {
cubes[x] = []
for (var z = 0; z < zRows; z++) {
var cubeHeight = 100 + Math.random() * 700;
cubeHeight = 10 + (Math.sin(x / xRows * Math.PI) + Math.sin(z / zRows * Math.PI)) * 200 + Math.random() * 150;
var geometry = new THREE.BoxGeometry(cubeSize, cubeHeight, cubeSize);

var colours = [
0x4444ff, 0x4477ff, 0x7744ff, 0xff8080
];
var material = new THREE.MeshPhongMaterial( {
ambient: 0x030303,
color: 0x4444ff,
specular: 0xffffff,
shininess: 10, //~~(Math.random() * 200),
shading: THREE.SmoothShading
} )

var cube = new THREE.Mesh(geometry, material);
cube.position.x = halfXRows + x * cubeRow;
cube.position.y = cubeHeight / 2;
cube.position.z = (cubeRow * -zRows / 2) + z * cubeRow;
cube.height = cubeHeight;
group.add(cube);
cubes[x][z] = cube;

}
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(stageWidth, stageHeight);
container.appendChild( renderer.domElement );

var out = document.createElement("div")
container.appendChild( out );

var grid = { x: 0, z: 0};
var position = { x: 0, y: 0, z: 0};

function checkRow() {