import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.target.set(0, 9.5, 1);
    
    return controls;
}
