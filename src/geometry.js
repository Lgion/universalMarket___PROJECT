import * as THREE from 'three';

export function createTextures() {
    const textureLoader = new THREE.TextureLoader();
    
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(5, 100);

    const tileTexture = textureLoader.load('https://threejs.org/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg');
    tileTexture.wrapS = THREE.RepeatWrapping;
    tileTexture.wrapT = THREE.RepeatWrapping;
    tileTexture.repeat.set(20, 20);

    const wallTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(2, 1);

    return { floorTexture, tileTexture, wallTexture };
}

export function createEnvironment(scene, textures) {
    // Alley
    const alleyGeometry = new THREE.PlaneGeometry(10, 100);
    const alleyMaterial = new THREE.MeshStandardMaterial({
        map: textures.floorTexture,
        roughness: 0.8,
        metalness: 0.2
    });
    const alley = new THREE.Mesh(alleyGeometry, alleyMaterial);
    alley.rotation.x = -Math.PI / 2;
    alley.position.z = 50;
    alley.receiveShadow = true;
    scene.add(alley);

    // Tiled floors
    const tileFloorGeometry = new THREE.PlaneGeometry(10, 100);
    const tileFloorMaterial = new THREE.MeshStandardMaterial({
        map: textures.tileTexture,
        roughness: 0.9,
        metalness: 0.1
    });

    const leftFloor = new THREE.Mesh(tileFloorGeometry, tileFloorMaterial);
    leftFloor.rotation.x = -Math.PI / 2;
    leftFloor.position.set(-10, 0, 50);
    leftFloor.receiveShadow = true;
    scene.add(leftFloor);

    const rightFloor = new THREE.Mesh(tileFloorGeometry, tileFloorMaterial);
    rightFloor.rotation.x = -Math.PI / 2;
    rightFloor.position.set(10, 0, 50);
    rightFloor.receiveShadow = true;
    scene.add(rightFloor);

    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(30, 100);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5F5,
        roughness: 0.3,
        metalness: 0.1
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 15, 50);
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    // Walls
    const wallGeometry = new THREE.PlaneGeometry(100, 15);
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: textures.wallTexture,
        roughness: 0.8,
        metalness: 0.2
    });

    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-15, 7.5, 50);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(15, 7.5, 50);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    return {
        alley,
        leftFloor,
        rightFloor,
        ceiling,
        leftWall,
        rightWall
    };
}
