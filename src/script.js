import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Typeface fonts are always required to work with 3D Text - Big issue here is downloading a font and putting it into the static folder
    // In 'static' folder, create a 'fonts' folder
    // Download typeface font (or find in 'three' folder) -> then place it in ./static/fonts

    //import fontLoader and TextGeometry
import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/Addons.js'

// Use FontLoader
const fontLoader = new FontLoader();


/* Base */

// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('./textures/matcaps/1.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const matcapTexture1 = textureLoader.load('./textures/matcaps/6.png');
matcapTexture1.colorSpace = THREE.SRGBColorSpace;
console.log(matcapTexture)

// // Add axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper)



// Load the font - finnicky, careful
fontLoader.load(
    './fonts/gentilis_bold.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Hello World', {
                font: font,
                size: 0.5,
                depth: 0.1,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 3
            }
    )

    // // KNOW THIS! It's not fastest, but good info on 3d geometries

    // // We will center the text to origin (or another position ) by using BOUNDING
    //     // Bounding uses the 3d shape that encompasses the mesh, it'll be a box or sphere. By default, 3.js bounds objects to a sphere

    // textGeometry.computeBoundingBox(); // This should be ), but it'll be a little higher due to bevel

    // // We will move the GEOMETRY, NOT THE MESH - geometry can use translate()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5, //here, we're taking the size of the bounding box and translating by half of it  
    //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5, // we are subtracting 0.02 to account for the bevel (bounding box doesn't include it)
    //     -(textGeometry.boundingBox.max.z -0.03) * 0.5 // here, need to subtract the bevelThickness (z dummyyy)
    // )

    // Instead of Bound-Halving (^^^) - we can use TextGeometry.center()
    textGeometry.center();

    const textMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)

    const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture1})
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
 
    for(let i=0; i<200; i++) {
        const donut = new THREE.Mesh(donutGeometry, donutMaterial)

        donut.position.set((Math.random() -0.5) * 10, (Math.random() -0.5) *10, (Math.random() -0.5) *10) 
        donut.rotation.set((Math.random() * Math.PI), (Math.random() * Math.PI), 0)

        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        scene.add(donut)
    }


    }
)



/**
 * Object
 */

// const torusMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
// const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), torusMaterial)
// torus.position.set(2,1,-0.1)
// torus.rotation.set(-1, 0, 0)
// scene.add(torus)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()