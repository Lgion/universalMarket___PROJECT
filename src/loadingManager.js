import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createLoadingManager() {
    const loadingManager = new THREE.LoadingManager();
    const loadingElement = document.getElementById('loading');
    
    loadingManager.onStart = () => loadingElement.style.display = 'block';
    loadingManager.onLoad = () => loadingElement.style.display = 'none';
    
    return loadingManager;
}

export function createGLTFLoader(loadingManager) {
    return new GLTFLoader(loadingManager);
}
