import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";


/* =========================================
   NETWORK POINTS
========================================= */

function NetworkPoints() {
  const points = useMemo(() => {

    const positions = [];

    const count = 180;
    const radius = 2.04;

    for (let i = 0; i < count; i++) {

      const phi =
        Math.acos(
          1 - (2 * (i + 0.5)) / count
        );

      const theta =
        Math.PI *
        (1 + Math.sqrt(5)) *
        i;

      const x =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      const y =
        radius *
        Math.cos(phi);

      const z =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      positions.push(x, y, z);
    }

    return new Float32Array(positions);

  }, []);


  return (
    <points>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />

      </bufferGeometry>

       <pointsMaterial
  color="#eee7a7"
  size={0.035}
  sizeAttenuation
  transparent
  opacity={0.95}
/>

    </points>
  );
}


/* =========================================
   GLOBE
========================================= */

function Globe() {

  const globe = useRef();

  useFrame((_, delta) => {

    if (globe.current) {

      globe.current.rotation.y +=
        delta * 0.10;

    }

  });


  return (
    <group ref={globe}>

      {/* EARTH */}

      <mesh>

        <sphereGeometry
          args={[2, 64, 64]}
        />

        <meshStandardMaterial
          color="#101a1d"
          roughness={0.82}
          metalness={0.25}
          emissive="#071012"
          emissiveIntensity={0.6}
        />

      </mesh>


      {/* GOLDEN GRID */}

      <mesh
        scale={[1.006, 1.006, 1.006]}
      >

        <sphereGeometry
          args={[2, 32, 32]}
        />

        <meshBasicMaterial
          color="#dcd494"
          wireframe
          transparent
          opacity={0.16}
        />

      </mesh>


      {/* NETWORK POINTS */}

      <NetworkPoints />


      {/* ATMOSPHERE */}

      <mesh
        scale={[1.08, 1.08, 1.08]}
      >

        <sphereGeometry
          args={[2, 64, 64]}
        />

        <meshBasicMaterial
          color="#d8cf83"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />

      </mesh>

    </group>
  );
}


/* =========================================
   GLOBE COMPONENT
========================================= */

export default function CyberGlobe() {

  return (

    <div className="cyber-globe">

      <Canvas
        camera={{
          position: [0, 0, 5.5],
          fov: 42,
        }}

        dpr={[1, 2]}

        gl={{
          antialias: true,
          alpha: true,
        }}
      >

        {/* LIGHTING */}

        <ambientLight
          intensity={0.35}
        />

        <pointLight
          position={[4, 3, 5]}
          intensity={4}
          color="#eee7a7"
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={1.2}
          color="#61757b"
        />


        {/* BACKGROUND PARTICLES */}

        <Stars
          radius={15}
          depth={8}
          count={500}
          factor={0.8}
          saturation={0}
          fade
          speed={0.2}
        />


        {/* GLOBE */}

        <Globe />

      </Canvas>


      {/* CSS ORBITS */}

      <div className="globe-orbit orbit-a" />

      <div className="globe-orbit orbit-b" />

      <div className="globe-orbit orbit-c" />


      {/* GLOWING NODES */}

      <span className="globe-node node-a" />
      <span className="globe-node node-b" />
      <span className="globe-node node-c" />

    </div>
  );
}