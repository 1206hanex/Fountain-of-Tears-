import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Fountain } from './src/fountain'

let controls
let scene
let camera
let renderer
let fountain

function Init() {
	scene = new THREE.Scene()

	renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector('#bg'),
		antialias: true
	})
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.0, 1000.0)
	camera.position.set(25, 10, 0)

	const grid = new THREE.GridHelper(200, 50)
	scene.add(grid)

	controls = new OrbitControls(camera, renderer.domElement)
	controls.update()

  const light = new THREE.AmbientLight(0x101010);
	scene.add(light);

	fountain = new Fountain({
		parent: scene,
		camera: camera,
	})

	renderer.render(scene, camera)
}

let prevAnimate = null
function Animate() {
	requestAnimationFrame((t) => {
		if (prevAnimate === null) {
			prevAnimate = t
		}

		Animate()

		renderer.render(scene, camera)
		step(t - prevAnimate)
		prevAnimate = t
	})
}

function step(timeElapsed) {
	const timeElapsedS = timeElapsed * 0.001

	fountain.Step(timeElapsedS)
}

Init()
Animate()
