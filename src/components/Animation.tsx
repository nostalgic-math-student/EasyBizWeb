// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import "./styles.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const color = "#00FFFF";

const RotatingTorus = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.006 ;
      ref.current.rotation.y += 0.006;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.3, 0.55, 120, 20]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

function Scene() {
  return (
    <RotatingTorus />
  );
}

export default function Animation() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
