import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let scene, camera, renderer, controls;
const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
let cart, hands, rightHand;
let activeHand = 'left'; // Variable pour garder la main active
let targetX = 0;  // Position cible pour controls.target.x

// Gestionnaire de chargement
const loadingElement = document.getElementById('loading');
loadingManager.onStart = () => loadingElement.style.display = 'block';
loadingManager.onLoad = () => loadingElement.style.display = 'none';

function init() {
    // Création de la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Configuration de la caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Position de la caméra comme si c'était les yeux de l'utilisateur
    camera.position.set(0, 10, -20);  // Juste avant le début de l'allée
    camera.lookAt(0, 0, 1);          // Regarder vers le début de l'allée

    // Configuration du renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    // Ajout des contrôles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // Limiter les contrôles pour maintenir une vue réaliste
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI / 6;    // Limite l'angle vertical minimum (vue du dessus)
    controls.maxPolarAngle = Math.PI / 2.5;  // Limite l'angle vertical maximum
    controls.target.set(0, 9.5, 1);  // Point de focus au début de l'allée

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Chargement des textures
    const textureLoader = new THREE.TextureLoader();
    
    // Texture du sol de l'allée (bois)
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(5, 100);

    // Texture du carrelage
    const tileTexture = textureLoader.load('https://threejs.org/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg');
    tileTexture.wrapS = THREE.RepeatWrapping;
    tileTexture.wrapT = THREE.RepeatWrapping;
    tileTexture.repeat.set(20, 20);

    // Texture des murs
    const wallTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(2, 1);

    // Texture publicitaire Nike pour le mur du fond
    const adTexture = textureLoader.load("assets/nike.jpg", 
        // Callback de succès
        function(texture) {
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = false;
        },
        // Callback de progression
        undefined,
        // Callback d'erreur
        function(err) {
            console.error('Erreur de chargement de la texture Nike:', err);
            // Texture de fallback en cas d'erreur
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 256;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000000';
            ctx.font = '48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('NIKE', canvas.width/2, canvas.height/2);
            const fallbackTexture = new THREE.CanvasTexture(canvas);
            endWallMaterial.map = fallbackTexture;
            endWallMaterial.needsUpdate = true;
        }
    );

    // Texture pour le panneau au sol
    const floorSignTexture = textureLoader.load('assets/beef.jpg',
        function(texture) {
            texture.encoding = THREE.sRGBEncoding;
        },
        undefined,
        function(err) {
            console.error('Erreur de chargement de la texture du panneau:', err);
            // Texture de fallback
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000000';
            ctx.font = '36px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('ATTENTION', canvas.width/2, canvas.height/2);
            const fallbackTexture = new THREE.CanvasTexture(canvas);
            floorSignMaterial.map = fallbackTexture;
            floorSignMaterial.needsUpdate = true;
        }
    );

    // Sol de l'allée (bois)
    const alleyGeometry = new THREE.PlaneGeometry(10, 100);  
    const alleyMaterial = new THREE.MeshStandardMaterial({ 
        map: floorTexture,
        roughness: 0.8,
        metalness: 0.2
    });
    const alley = new THREE.Mesh(alleyGeometry, alleyMaterial);
    alley.rotation.x = -Math.PI / 2;
    alley.position.z = 50;  
    alley.receiveShadow = true;
    scene.add(alley);

    // Sol en carrelage (de chaque côté de l'allée)
    const tileFloorGeometry = new THREE.PlaneGeometry(10, 100);  
    const tileFloorMaterial = new THREE.MeshStandardMaterial({
        map: tileTexture,
        roughness: 0.9,
        metalness: 0.1
    });
    
    // Sol carrelé gauche
    const leftFloor = new THREE.Mesh(tileFloorGeometry, tileFloorMaterial);
    leftFloor.rotation.x = -Math.PI / 2;
    leftFloor.position.set(-10, 0, 50);  
    leftFloor.receiveShadow = true;
    scene.add(leftFloor);

    // Sol carrelé droit
    const rightFloor = new THREE.Mesh(tileFloorGeometry, tileFloorMaterial);
    rightFloor.rotation.x = -Math.PI / 2;
    rightFloor.position.set(10, 0, 50);  
    rightFloor.receiveShadow = true;
    scene.add(rightFloor);

    // Plafond
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

    // Murs latéraux
    const wallGeometry = new THREE.PlaneGeometry(100, 15);  
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.8,
        metalness: 0.2
    });

    // Mur gauche
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-15, 7.5, 50);  
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Mur droit
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(15, 7.5, 50);  
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Mur du fond avec publicité Nike
    const endWallGeometry = new THREE.PlaneGeometry(30, 15);
    const endWallMaterial = new THREE.MeshStandardMaterial({
        map: adTexture,
        roughness: 0.4,    // Un peu plus brillant pour la pub
        metalness: 0.2
    });
    const endWall = new THREE.Mesh(endWallGeometry, endWallMaterial);
    endWall.position.set(0, 7.5, 100);
    endWall.receiveShadow = true;
    scene.add(endWall);

    // Ajout d'un éclairage spécifique pour la publicité
    const adLight = new THREE.SpotLight(0xffffff, 1);
    adLight.position.set(0, 12, 95);  // Légèrement devant le mur
    adLight.target = endWall;
    adLight.angle = Math.PI / 6;      // Angle du spot
    adLight.penumbra = 0.2;           // Douceur des bords
    adLight.decay = 1;                // Atténuation de la lumière
    scene.add(adLight);

    // Panneau au sol
    const floorSignGeometry = new THREE.PlaneGeometry(4, 4);  // 4x4 mètres
    const floorSignMaterial = new THREE.MeshStandardMaterial({
        map: floorSignTexture,
        roughness: 0.6,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9
    });
    const floorSign = new THREE.Mesh(floorSignGeometry, floorSignMaterial);
    floorSign.rotation.x = -Math.PI / 2;  // Couché sur le sol
    floorSign.position.set(0, 0.01, 20);  // Légèrement au-dessus du sol pour éviter le z-fighting
    floorSign.receiveShadow = true;
    scene.add(floorSign);

    // Lumière spot pour le panneau au sol
    const signLight = new THREE.SpotLight(0xffffff, 0.8);
    signLight.position.set(0, 5, 20);  // 5 mètres au-dessus du panneau
    signLight.target = floorSign;
    signLight.angle = Math.PI / 4;
    signLight.penumbra = 0.3;
    signLight.decay = 1.5;
    scene.add(signLight);

    // Éclairages au plafond
    const createCeilingLight = (x, z) => {
        const light = new THREE.PointLight(0xffffff, 0.5, 30);
        light.position.set(x, 14, z);
        light.castShadow = true;
        scene.add(light);

        // Ajouter un support visuel pour la lumière
        const lightFixture = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.2, 2),
            new THREE.MeshStandardMaterial({ color: 0xcccccc })
        );
        lightFixture.position.set(x, 14.5, z);
        scene.add(lightFixture);
    };

    // Créer une rangée de lumières
    for (let z = 10; z <= 90; z += 20) {  
        createCeilingLight(-7, z);
        createCeilingLight(0, z);
        createCeilingLight(7, z);
    }

    // Chargement du modèle GLTF du caddie
    loader.load(
        'assets/shopping_cart.glb',
        function (gltf) {
            cart = gltf.scene;
            cart.position.set(0, 1, 1);
            cart.scale.set(1.5, 1.5, 1.5);
            cart.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            scene.add(cart);

            // Une fois le caddie chargé, on charge les mains
            loader.load(
                'assets/Hand.glb',
                function (gltf) {
                    // Main gauche
                    hands = gltf.scene;
                    hands.scale.set(0.055, 0.055, 0.055);
                    hands.position.set(-0.6, 2.5, -2.5);  
                    hands.rotation.set(0, Math.PI, 0);
                    cart.add(hands);

                    // Main droite (clone de la main gauche)
                    rightHand = hands.clone();
                    rightHand.position.set(0.6, 2.5, -2.5);  
                    cart.add(rightHand);

                    // Appliquer les ombres aux deux mains
                    [hands, rightHand].forEach(hand => {
                        hand.traverse((node) => {
                            if (node.isMesh) {
                                node.castShadow = true;
                                node.receiveShadow = true;
                            }
                        });
                    });
                },
                undefined,
                function (error) {
                    console.error('Une erreur est survenue lors du chargement des mains:', error);
                }
            );
        },
        undefined,
        function (error) {
            console.error('Une erreur est survenue lors du chargement du caddie:', error);
        }
    );

    // Ajout des contrôles de position pour les mains
    document.addEventListener('keydown', (event) => {
        if (!hands || !rightHand || !cart) return;
        
        const step = 1;
        const handToMove = activeHand === 'left' ? hands : rightHand;

        switch(event.key) {
            case 'ArrowUp':
                // Avancer l'ensemble
                cart.position.z += step;  
                camera.position.z += step;  
                controls.target.z += step; 
                break;
            case 'ArrowDown':
                // Reculer l'ensemble
                cart.position.z -= step;  
                camera.position.z -= step;  
                controls.target.z -= step; 
                break;
            case 'ArrowLeft':
                targetX = 8;  
                controls.target.y = 10;
                break;
            case 'ArrowRight':
                targetX = -8;  
                controls.target.y = 10;
                break;
            case ' ':
                targetX = 0;  
                controls.target.set(0, 9.5, 1);     
                camera.position.set(0, 10, -20);  // Juste avant le début de l'allée
                camera.lookAt(0, 0, 1);          // Regarder vers le début de l'allée         
                break;
            case 'PageUp':
                handToMove.position.z -= step;
                break;
            case 'PageDown':
                handToMove.position.z += step;
                break;
            case 'r':
                handToMove.rotation.y += step;
                break;
            case 'f':
                handToMove.rotation.y -= step;
                break;
        }
    });

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Interpolation fluide de la rotation
    const rotationSpeed = 0.05;  
    controls.target.x += (targetX - controls.target.x) * rotationSpeed;

    // Ajuster la hauteur du point de vue en fonction de la rotation
    if (Math.abs(controls.target.x) < 0.1) {  
        controls.target.y = 9.5;  
    }
    
    // Vérifier si on a atteint la bout de l'allée
    if (cart && cart.position.z > 95) {  
        cart.position.z = 0;
        controls.target.z = 1;  
        controls.target.y = 9.5;
        camera.position.set(0, 10, -20);  // Juste avant le début de l'allée
        camera.lookAt(0, 0, 1);          // Regarder vers le début de l'allée
        cart.position.set(0, 1, 1);
    }

    // Mettre à jour les informations de la caméra
    const cameraInfo = document.getElementById('cameraInfo');
    cameraInfo.innerHTML = `
        Camera Position:
        X: ${camera.position.x.toFixed(2)}
        Y: ${camera.position.y.toFixed(2)}
        Z: ${camera.position.z.toFixed(2)}
        
        Target Position:
        X: ${controls.target.x.toFixed(2)}
        Y: ${controls.target.y.toFixed(2)}
        Z: ${controls.target.z.toFixed(2)}
    `.replace(/\n/g, '<br>');

    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
