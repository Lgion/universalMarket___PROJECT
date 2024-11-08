class Avatar extends THREE.Group {
    constructor() {
        super();

        // Corps (cylindre)
        const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2266cc });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.7;
        this.add(body);

        // Tête (sphère)
        const headGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.5;
        this.add(head);

        // Bras gauche
        const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8);
        const armMaterial = new THREE.MeshStandardMaterial({ color: 0x2266cc });
        
        const leftArm = new THREE.Group();
        const leftArmMesh = new THREE.Mesh(armGeometry, armMaterial);
        leftArmMesh.rotation.z = Math.PI / 3; // Angle pour atteindre la poignée
        leftArmMesh.position.x = 0.3;
        leftArmMesh.position.y = 1.2;
        
        // Main gauche
        const handGeometry = new THREE.SphereGeometry(0.06, 8, 8);
        const handMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.set(0.5, 1.0, -0.7); // Position ajustée pour la poignée du caddie
        
        this.add(leftArm);
        this.add(leftHand);

        // Bras droit
        const rightArm = new THREE.Group();
        const rightArmMesh = new THREE.Mesh(armGeometry, armMaterial);
        rightArmMesh.rotation.z = -Math.PI / 3; // Angle symétrique
        rightArmMesh.position.x = -0.3;
        rightArmMesh.position.y = 1.2;
        
        // Main droite
        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.set(-0.5, 1.0, -0.7); // Position symétrique
        
        this.add(rightArm);
        this.add(rightHand);
    }
} 