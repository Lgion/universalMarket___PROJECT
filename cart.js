class ShoppingCart {
    constructor() {
        this.group = new THREE.Group();
        this.createCart();
        return this.group;
    }

    createCart() {
        // Panier principal du caddie
        const basketGeometry = new THREE.BoxGeometry(0.8, 0.5, 1);
        const cartMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x888888,
            metalness: 0.8,
            roughness: 0.2
        });
        const basket = new THREE.Mesh(basketGeometry, cartMaterial);
        basket.position.y = 0.5;
        this.group.add(basket);

        // Grille du panier (barreaux verticaux)
        const barGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
        const barMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x999999,
            metalness: 0.9,
            roughness: 0.1
        });

        // Création des barreaux verticaux
        const barPositions = [
            [-0.35, 0, 0.45],
            [0.35, 0, 0.45],
            [-0.35, 0, 0],
            [0.35, 0, 0],
            [-0.35, 0, -0.45],
            [0.35, 0, -0.45]
        ];

        barPositions.forEach(pos => {
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            bar.position.set(pos[0], 0.5, pos[1]);
            this.group.add(bar);
        });

        // Structure inférieure
        const baseGeometry = new THREE.BoxGeometry(0.8, 0.1, 1);
        const base = new THREE.Mesh(baseGeometry, cartMaterial);
        base.position.y = 0.15;
        this.group.add(base);

        // Roues
        const wheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
        const wheelMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            metalness: 0.5,
            roughness: 0.7
        });

        // Position des roues
        const wheelPositions = [
            [-0.35, 0.08, 0.45],  // avant gauche
            [0.35, 0.08, 0.45],   // avant droite
            [-0.35, 0.08, -0.45], // arrière gauche
            [0.35, 0.08, -0.45]   // arrière droite
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.x = Math.PI / 2;
            wheel.position.set(pos[0], pos[1], pos[2]);
            this.group.add(wheel);
        });

        // Poignée
        const handleGroup = new THREE.Group();

        // Barre horizontale de la poignée plus épaisse et plus visible
        const handleBarGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 12);
        const handleMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x666666,
            metalness: 0.9,
            roughness: 0.1
        });
        const handleBar = new THREE.Mesh(handleBarGeometry, handleMaterial);
        handleBar.rotation.z = Math.PI / 2;
        handleBar.position.y = 0.9;
        handleBar.position.z = -0.45; // Ajusté pour correspondre aux mains
        handleGroup.add(handleBar);

        // Supports verticaux de la poignée plus épais
        const supportGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
        const leftSupport = new THREE.Mesh(supportGeometry, handleMaterial);
        const rightSupport = new THREE.Mesh(supportGeometry, handleMaterial);

        leftSupport.position.set(-0.35, 0.7, -0.45);
        rightSupport.position.set(0.35, 0.7, -0.45);

        handleGroup.add(leftSupport);
        handleGroup.add(rightSupport);

        this.group.add(handleGroup);

        // Orientation du caddie vers le fond du magasin
        this.group.rotation.y = Math.PI;
    }
} 