import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';

// Warp Portal - Giant rotating energy gate
function WarpPortal() {
  const portalRef = useRef<THREE.Mesh>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (portalRef.current) {
      portalRef.current.rotation.z += 0.015;
    }
    
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += 0.008 * (i % 2 === 0 ? 1 : -1);
        ring.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.08);
      }
    });

    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.15);
    }
  });

  return (
    <group position={[0, 0, -18]}>
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
      </mesh>

      <mesh ref={portalRef}>
        <torusGeometry args={[4, 0.15, 24, 120]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringRefs.current[i] = el;
          }}
        >
          <torusGeometry args={[4 + i * 0.6, 0.08, 16, 100]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={2.5 - i * 0.3}
            transparent
            opacity={0.7 - i * 0.1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {[...Array(40)].map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 5 + Math.random() * 2;
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              (Math.random() - 0.5) * 2
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#00ff00" />
          </mesh>
        );
      })}
    </group>
  );
}

function LightRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={raysRef}>
      {[...Array(16)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 16) * 20,
            Math.sin((i * Math.PI * 2) / 16) * 20,
            -25,
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 16]}
        >
          <planeGeometry args={[0.3, 50]} />
          <meshBasicMaterial
            color="#00ff00"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 1500;

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      const greenIntensity = 0.5 + Math.random() * 0.5;
      colors[i * 3] = 0;
      colors[i * 3 + 1] = greenIntensity;
      colors[i * 3 + 2] = 0;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
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
        
        if (Math.abs(positions[i * 3]) > 50) positions[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 50) positions[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 50) positions[i * 3 + 2] *= -1;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.0005;
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
        size={0.2}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MatrixRain() {
  const groupRef = useRef<THREE.Group>(null);
  const linesCount = 60;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((line, i) => {
        line.position.y -= 0.15 + (i % 4) * 0.05;
        if (line.position.y < -40) {
          line.position.y = 40;
          line.position.x = (Math.random() - 0.5) * 60;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(linesCount)].map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 60, Math.random() * 80 - 40, -15]}
        >
          <planeGeometry args={[0.15, 3]} />
          <meshBasicMaterial
            color="#00ff00"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function NebulaClouds() {
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.x += 0.0005;
      cloudRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={i === 0 ? cloudRef : null}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            -30 - i * 5
          ]}
        >
          <sphereGeometry args={[8 + i * 2, 32, 32]} />
          <meshBasicMaterial
            color="#00ff00"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}

function OrbitingSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 12;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              -10
            ]}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 80]} />
        
        <ambientLight intensity={0.3} color="#00ff00" />
        <pointLight position={[0, 0, -15]} intensity={3} color="#00ff00" distance={50} />
        <pointLight position={[20, 20, 10]} intensity={2} color="#00ff00" />
        <pointLight position={[-20, -20, 10]} intensity={2} color="#00ff00" />
        <spotLight
          position={[0, 30, 0]}
          angle={0.4}
          penumbra={1}
          intensity={3}
          color="#00ff00"
        />
        
        <Stars 
          radius={200} 
          depth={100} 
          count={12000} 
          factor={8} 
          saturation={0} 
          fade 
          speed={2}
        />
        
        <WarpPortal />
        <LightRays />
        <FloatingParticles />
        <MatrixRain />
        <NebulaClouds />
        <OrbitingSpheres />
        
        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Glitch
            delay={[5, 10]}
            duration={[0.1, 0.3]}
            strength={[0.1, 0.2]}
            mode={GlitchMode.SPORADIC}
          />
        </EffectComposer>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
