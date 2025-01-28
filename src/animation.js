export function createAnimationLoop(renderer, scene, camera, controls) {
    function animate() {
        requestAnimationFrame(animate);
        
        if (controls) {
            controls.update();
        }
        
        renderer.render(scene, camera);
    }
    
    return animate;
}
