import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Controls } from './components/Controls';

function App() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Scene />
      </Canvas>
      <Controls />
    </div>
  );
}

export default App;