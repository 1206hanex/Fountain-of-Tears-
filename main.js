import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParticleSystem } from './src/particleSystem'

let controls
let scene
let camera
let renderer
let particles

function Init() {
	scene = new THREE.Scene()

	renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector('#bg'),
		antialias: true
	})
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	document.body.appendChild(renderer.domElement)

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.0, 1000.0)
	camera.position.set(25, 10, 0)

	const grid = new THREE.GridHelper(200, 50)
	scene.add(grid)

	controls = new OrbitControls(camera, renderer.domElement)
	controls.update()

	let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
	light.position.set(20, 100, 10);
	light.target.position.set(0, 0, 0);
	light.castShadow = true;
	light.shadow.bias = -0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 500.0;
	light.shadow.camera.near = 0.5;
	light.shadow.camera.far = 500.0;
	light.shadow.camera.left = 100;
	light.shadow.camera.right = -100;
	light.shadow.camera.top = 100;
	light.shadow.camera.bottom = -100;
	scene.add(light);

	light = new THREE.AmbientLight(0x101010);
	scene.add(light);

	particles = new ParticleSystem({
		parent: scene,
		camera: camera,
	})

	renderer.render(scene, camera)
}

let prevAnimate = null
function Animate(){
	requestAnimationFrame((t) => {
		if (prevAnimate === null){
			prevAnimate = t
		}

		Animate()

		renderer.render(scene, camera)
		step(t - prevAnimate)
		prevAnimate = t
	})
}

function step(timeElapsed){
	const timeElapsedS = timeElapsed * 0.001

	particles.Step(timeElapsedS)
}

Init()
Animate()