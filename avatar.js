class Avatar {
    constructor() {
        this.group = new THREE.Group();
        this.createAvatar();
        return this.group;
    }

    createAvatar() {
        // Pull/Sweat (corps)
        const sweaterGeometry = new THREE.BoxGeometry(0.45, 0.5, 0.3);
        const sweaterMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3366cc,
            roughness: 0.7 
        });
        const sweater = new THREE.Mesh(sweaterGeometry, sweaterMaterial);
        sweater.position.y = 0.7;
        this.group.add(sweater);

        // Dos du pull (plus foncé)
        const backGeometry = new THREE.BoxGeometry(0.45, 0.5, 0.05);
        const backMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x254da3,
            roughness: 0.7 
        });
        const back = new THREE.Mesh(backGeometry, backMaterial);
        back.position.set(0, 0.7, -0.15);
        this.group.add(back);

        // Tête
        const headGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const skinMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            roughness: 0.3 
        });
        const head = new THREE.Mesh(headGeometry, skinMaterial);
        head.position.y = 1.1;
        this.group.add(head);

        // Cheveux (style moderne)
        const hairGroup = new THREE.Group();
        
        // Dessus des cheveux
        const topHairGeometry = new THREE.BoxGeometry(0.32, 0.1, 0.32);
        const hairMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a1810,
            roughness: 0.6 
        });
        const topHair = new THREE.Mesh(topHairGeometry, hairMaterial);
        topHair.position.y = 1.3;
        hairGroup.add(topHair);

        // Côtés des cheveux
        const sideHairGeometry = new THREE.BoxGeometry(0.32, 0.2, 0.32);
        const sideHair = new THREE.Mesh(sideHairGeometry, hairMaterial);
        sideHair.position.y = 1.2;
        hairGroup.add(sideHair);

        // Arrière des cheveux
        const backHairGeometry = new THREE.BoxGeometry(0.32, 0.25, 0.1);
        const backHair = new THREE.Mesh(backHairGeometry, hairMaterial);
        backHair.position.set(0, 1.15, -0.15);
        hairGroup.add(backHair);

        this.group.add(hairGroup);

        // Pantalon
        const pantsGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
        const pantsMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            roughness: 0.8 
        });
        const pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
        pants.position.y = 0.3;
        this.group.add(pants);

        // Orientation de l'avatar
        this.group.rotation.y = Math.PI; // Face vers le fond du supermarché

        // Bras et mains
        const armGeometry = new THREE.BoxGeometry(0.08, 0.4, 0.08);
        const armMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3366cc, // Couleur du pull
            roughness: 0.7 
        });

        // Définition du matériau pour les mains (couleur chair)
        const handMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac, // Même couleur que le visage
            roughness: 0.3 
        });

        // Bras gauche
        const leftArm = new THREE.Group();
        const leftUpperArm = new THREE.Mesh(armGeometry, armMaterial);
        leftUpperArm.position.set(-0.25, 0.8, -0.2);
        leftUpperArm.rotation.x = Math.PI * 0.25;
        leftArm.add(leftUpperArm);

        // Main gauche (couleur chair)
        const handGeometry = new THREE.BoxGeometry(0.08, 0.12, 0.08);
        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.set(-0.25, 0.6, -0.4);
        leftArm.add(leftHand);

        // Bras droit
        const rightArm = new THREE.Group();
        const rightUpperArm = new THREE.Mesh(armGeometry, armMaterial);
        rightUpperArm.position.set(0.25, 0.8, -0.2);
        rightUpperArm.rotation.x = Math.PI * 0.25;
        rightArm.add(rightUpperArm);

        // Main droite (couleur chair)
        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.set(0.25, 0.6, -0.4);
        rightArm.add(rightHand);

        this.group.add(leftArm);
        this.group.add(rightArm);
    }
} 