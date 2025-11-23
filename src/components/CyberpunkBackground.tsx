import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Cyberpunk Gateway Portal
function CyberpunkPortal() {
  const portalRef = useRef<THREE.Mesh>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (portalRef.current) {
      portalRef.current.rotation.z += 0.01;
      portalRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
    
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += 0.006 * (i % 2 === 0 ? 1 : -1);
        ring.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.05);
      }
    });

    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.12);
    }
  });

  return (
    <group position={[0, 0, -15]}>
      {/* Inner core glow - Multi-color */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </mesh>

      {/* Main portal ring - Blue */}
      <mesh ref={portalRef}>
        <torusGeometry args={[3.5, 0.12, 24, 120]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Outer rings - Multi-color */}
      {[
        { color: '#ffeb3b', intensity: 2.2 },
        { color: '#00ff00', intensity: 2.0 },
        { color: '#00d4ff', intensity: 1.8 },
        { color: '#ff00ff', intensity: 1.6 }
      ].map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringRefs.current[i] = el;
          }}
        >
          <torusGeometry args={[3.5 + i * 0.5, 0.06, 16, 100]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={ring.intensity}
            transparent
            opacity={0.7 - i * 0.12}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Orbiting particles - Multi-color */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 4.5 + Math.random() * 1.5;
        const colors = ['#00d4ff', '#ffeb3b', '#00ff00', '#ff00ff'];
        const color = colors[i % colors.length];
        
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              (Math.random() - 0.5) * 1.5
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

// Laser Light Rays
function LaserRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (raysRef.current) {
      raysRef.current.rotation.z += 0.001;
    }
  });

  const colors = ['#00d4ff', '#ffeb3b', '#00ff00', '#ff00ff'];

  return (
    <group ref={raysRef}>
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 18,
            Math.sin((i * Math.PI * 2) / 12) * 18,
            -22,
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 12]}
        >
          <planeGeometry args={[0.2, 45]} />
          <meshBasicMaterial
            color={colors[i % colors.length]}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Optimized Floating Particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 400;

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    const colorPalette = [
      [0, 0.83, 1],      // Blue
      [1, 0.92, 0.23],   // Yellow
      [0, 1, 0],         // Green
      [0, 1, 1],         // Cyan
    ];
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      
      const color = colorPalette[i % colorPalette.length];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        if (Math.abs(positions[i * 3]) > 40) positions[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 40) positions[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 40) positions[i * 3 + 2] *= -1;
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
        size={0.18}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Matrix Rain - Optimized
function MatrixRain() {
  const groupRef = useRef<THREE.Group>(null);
  const linesCount = 25;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((line, i) => {
        line.position.y -= 0.12 + (i % 4) * 0.04;
        if (line.position.y < -35) {
          line.position.y = 35;
          line.position.x = (Math.random() - 0.5) * 50;
        }
      });
    }
  });

  const colors = ['#00d4ff', '#ffeb3b', '#00ff00'];

  return (
    <group ref={groupRef}>
      {[...Array(linesCount)].map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 50, Math.random() * 70 - 35, -12]}
        >
          <planeGeometry args={[0.12, 2.5]} />
          <meshBasicMaterial
            color={colors[i % colors.length]}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Cyber Nebula Clouds
function CyberNebula() {
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.rotation.x += 0.0003;
      cloudRef.current.rotation.y += 0.0005;
    }
  });

  const colors = ['#00d4ff', '#ffeb3b', '#00ff00', '#ff00ff'];

  return (
    <>
      {[...Array(4)].map((_, i) => (
        <mesh
          key={i}
          ref={i === 0 ? cloudRef : null}
          position={[
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 35,
            -25 - i * 4
          ]}
        >
          <sphereGeometry args={[6 + i * 1.5, 32, 32]} />
          <meshBasicMaterial
            color={colors[i % colors.length]}
            transparent
            opacity={0.04}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}

// Orbiting Data Nodes
function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  const colors = ['#00d4ff', '#ffeb3b', '#00ff00', '#ff00ff'];

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 10;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.4,
              -8
            ]}
          >
            <octahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              emissive={colors[i % colors.length]}
              emissiveIntensity={1.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function CyberpunkBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 8, 70]} />
        
        {/* Multi-color lighting */}
        <ambientLight intensity={0.25} color="#00d4ff" />
        <pointLight position={[0, 0, -12]} intensity={2.5} color="#00d4ff" distance={45} />
        <pointLight position={[15, 15, 8]} intensity={1.8} color="#ffeb3b" />
        <pointLight position={[-15, -15, 8]} intensity={1.8} color="#00ff00" />
        <spotLight
          position={[0, 25, 0]}
          angle={0.35}
          penumbra={1}
          intensity={2.5}
          color="#00d4ff"
        />
        
        <Stars 
          radius={180} 
          depth={80} 
          count={4000} 
          factor={5} 
          saturation={0} 
          fade 
          speed={1.2}
        />
        
        <CyberpunkPortal />
        <LaserRays />
        <FloatingParticles />
        <MatrixRain />
        <CyberNebula />
        <DataNodes />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
          maxPolarAngle={Math.PI / 1.9}
          minPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
    </div>
  );
}
