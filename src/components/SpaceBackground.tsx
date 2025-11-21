import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WarpPortal() {
  const portalRef = useRef<THREE.Mesh>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += 0.01;
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += 0.005 * (i + 1);
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1);
      }
    });
  });

  return (
    <group position={[0, 0, -15]}>
      {/* Main portal */}
      <mesh ref={portalRef}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Rotating rings */}
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringRefs.current[i] = el;
          }}
        >
          <torusGeometry args={[3 + i * 0.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00ff88" : "#8b5cf6"}
            emissive={i % 2 === 0 ? "#00ff88" : "#8b5cf6"}
            emissiveIntensity={1.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function SpaceShip() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.8;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -5]}>
      <coneGeometry args={[0.5, 2, 4]} />
      <meshStandardMaterial 
        color="#06b6d4" 
        emissive="#06b6d4"
        emissiveIntensity={1}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function LightRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={raysRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 15,
            Math.sin((i * Math.PI * 2) / 8) * 15,
            -20,
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 8]}
        >
          <planeGeometry args={[0.2, 30]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 500;

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      const color = Math.random() > 0.5 ? new THREE.Color('#00ff88') : new THREE.Color('#8b5cf6');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Wrap around
        if (Math.abs(positions[i * 3]) > 25) positions[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 25) positions[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 25) positions[i * 3 + 2] *= -1;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MatrixRain() {
  const groupRef = useRef<THREE.Group>(null);
  const linesCount = 30;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((line, i) => {
        line.position.y -= 0.1 + (i % 3) * 0.05;
        if (line.position.y < -30) {
          line.position.y = 30;
          line.position.x = (Math.random() - 0.5) * 40;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(linesCount)].map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 40, Math.random() * 60 - 30, -10]}
        >
          <planeGeometry args={[0.1, 2]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={['#0a0a1f']} />
        <fog attach="fog" args={['#0a0a1f', 10, 50]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[0, 0, 5]} intensity={1} color="#06b6d4" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#00ff88"
        />
        
        <Stars 
          radius={150} 
          depth={80} 
          count={8000} 
          factor={6} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        <WarpPortal />
        <LightRays />
        <SpaceShip />
        <FloatingParticles />
        <MatrixRain />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
