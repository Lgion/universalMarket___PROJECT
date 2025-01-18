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
    camera.position.set(0, 10, -5);  // Plus haut et légèrement en arrière des mains
    camera.lookAt(10, 0, -6);        // Regarder devant le caddie

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
    controls.target.set(0, 9.5, -4);           // Point de focus devant le caddie

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Sol
    const groundGeometry = new THREE.PlaneGeometry(10, 200);
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
            cart.position.set(0, 1, 0);
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
                    hands.position.set(-0.6, 2.5, -2.5);  // Ajusté pour la barre arrière
                    hands.rotation.set(0, Math.PI, 0);
                    cart.add(hands);

                    // Main droite (clone de la main gauche)
                    rightHand = hands.clone();
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
        if (!hands || !rightHand || !cart) return;
        
        const step = 1;
        const handToMove = activeHand === 'left' ? hands : rightHand;

        switch(event.key) {
            case 'ArrowUp':
                // Avancer l'ensemble
                cart.position.z += step;  // Le caddie avance (Z négatif = avant)
                camera.position.z += step;  // Le caddie avance (Z négatif = avant)
                controls.target.z += step; 
                break;
            case 'ArrowDown':
                // Reculer l'ensemble
                cart.position.z -= step;  // Le caddie recule (Z positif = arrière)
                camera.position.z -= step;  // Le caddie avance (Z négatif = avant)
                controls.target.z -= step; 
                break;
            case 'ArrowLeft':
                targetX = 8;  // Au lieu de définir directement controls.target.x
                controls.target.y = 0;
                break;
            case 'ArrowRight':
                targetX = -8;  // Au lieu de définir directement controls.target.x
                controls.target.y = 0;
                break;
            case ' ':
                targetX = 0;  // Réinitialiser la rotation
                controls.target.y = 9.5;  // Hauteur par défaut
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
    const rotationSpeed = 0.05;  // Vitesse de rotation (ajustez selon vos préférences)
    controls.target.x += (targetX - controls.target.x) * rotationSpeed;

    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
