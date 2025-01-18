import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let scene, camera, renderer, controls;
const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
let cart, hands;

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
    // Positionner la caméra en arrière et légèrement en hauteur (environ 0.5m = 5 unités Three.js)
    camera.position.set(0, 2, 5);
    // Faire pointer la caméra légèrement vers le bas
    camera.lookAt(0, 0.5, 0);

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
    // Définir les limites de zoom
    controls.minDistance = 3;
    controls.maxDistance = 10;
    // Limiter l'angle vertical pour garder une vue du dessus
    controls.minPolarAngle = Math.PI / 6; // 30 degrés minimum depuis le haut
    controls.maxPolarAngle = Math.PI / 2.5; // environ 72 degrés maximum
    // Centrer les contrôles sur un point légèrement surélevé
    controls.target.set(0, 0.5, 0);

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Sol
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Chargement du modèle GLTF du caddie
    loader.load(
        'assets/shopping_cart.glb',
        function (gltf) {
            cart = gltf.scene;
            cart.position.set(0, 0, 0);
            cart.scale.set(1, 1, 1);
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
                    hands.position.set(-0.6, 2.5, -2.5);  // Ajusté pour la barre arrière
                    hands.rotation.set(0, Math.PI, 0);
                    cart.add(hands);

                    // Main droite (clone de la main gauche)
                    const rightHand = hands.clone();
                    rightHand.position.set(0.6, 2.5, -2.5);  // Ajusté pour la barre arrière
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
        if (!hands) return;
        
        const step = 0.1;
        switch(event.key) {
            case 'ArrowUp':
                hands.position.y += step;
                break;
            case 'ArrowDown':
                hands.position.y -= step;
                break;
            case 'ArrowLeft':
                hands.position.x -= step;
                break;
            case 'ArrowRight':
                hands.position.x += step;
                break;
            case 'PageUp':
                hands.position.z -= step;
                break;
            case 'PageDown':
                hands.position.z += step;
                break;
            case 'r':
                hands.rotation.y += step;
                break;
            case 'f':
                hands.rotation.y -= step;
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
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
