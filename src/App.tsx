import './App.css'
import {Canvas} from "@react-three/fiber";
import Earth from './components/Earth.tsx';
import {OrbitControls, Stars} from "@react-three/drei";

function App() {



  return (
      <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
          <Stars radius={100} depth={50} count={1000} factor={4} />
          <Earth />
          <OrbitControls enableZoom={true} />
      </Canvas>
  )
}

export default App
