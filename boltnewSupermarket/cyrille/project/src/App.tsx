import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Controls from './components/Controls';

function App() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000 }}>
        <Scene />
      </Canvas>
      <Controls />
    </div>
  );
}

export default App;