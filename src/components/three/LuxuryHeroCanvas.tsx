import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function createBallTexture(
  num: string,
  bodyColor: string,
  bandColor: string,
  numColor = '#1A1A1A',
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = bodyColor;
    ctx.fillRect(0, 0, 256, 128);

    ctx.fillStyle = bandColor;
    ctx.fillRect(0, 44, 256, 40);

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(128, 64, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = numColor;
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(num, 128, 65);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface BallConfig {
  num: string;
  bodyColor: string;
  bandColor: string;
  numColor?: string;
  position: [number, number, number];
  scale: number;
  speed: number;
  isGold?: boolean;
}

// Central Gold Ball (32) visually prominent, flanked by Chilli Red & Ivory/Gold balls
const BALLS: BallConfig[] = [
  { num: '32', bodyColor: '#D4AF37', bandColor: '#FFF3B0', numColor: '#C21825', position: [0, 0.14, 0.45], scale: 0.64, speed: 1.4, isGold: true },
  { num: '07', bodyColor: '#C21825', bandColor: '#D4AF37', position: [-1.48, 0.08, -0.05], scale: 0.48, speed: 1.6 },
  { num: '18', bodyColor: '#FFFFF0', bandColor: '#C21825', position: [-0.76, -0.22, 0.15], scale: 0.42, speed: 1.75 },
  { num: '45', bodyColor: '#C21825', bandColor: '#FFFFF0', position: [0.78, -0.18, 0.16], scale: 0.42, speed: 1.55 },
  { num: '50', bodyColor: '#8F0F1A', bandColor: '#E8C95A', position: [1.5, 0.12, -0.04], scale: 0.48, speed: 1.7 },
];

function LotteryBall({
  num,
  bodyColor,
  bandColor,
  numColor,
  position,
  scale,
  speed,
  isGold,
}: BallConfig) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(
    () => createBallTexture(num, bodyColor, bandColor, numColor),
    [num, bodyColor, bandColor, numColor],
  );

  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y =
      -Math.PI / 2 + Math.sin(t * 0.6 + scale * 4) * 0.36 + state.pointer.x * 0.28;
    meshRef.current.rotation.x = Math.cos(t * 0.48 + scale * 3) * 0.14 + state.pointer.y * 0.18;
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.38}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          metalness={isGold ? 0.72 : 0.22}
          roughness={isGold ? 0.14 : 0.18}
        />
      </mesh>
    </Float>
  );
}

function GoldParticles({ count = 65 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = ((Math.sin(i * 12.9898) * 43758.5453) % 1) * 6 - 3;
      pos[i * 3 + 1] = ((Math.sin(i * 78.233) * 19341.123) % 1) * 3 - 1.5;
      pos[i * 3 + 2] = -1.6 + (i % 4) * 0.35;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#D4AF37" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function CameraParallax() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.3,
      0.05,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.2,
      0.05,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function LuxuryHeroCanvas({ isVisible }: { isVisible: boolean }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      frameloop={isVisible ? 'always' : 'never'}
      camera={{ position: [0, 0.1, 4.4], fov: 40 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 5]} intensity={2.0} color="#FFFDF6" castShadow />
      <pointLight position={[-3, 2, 3]} intensity={1.2} color="#E8C95A" />
      <pointLight position={[3, 2, 3]} intensity={1.1} color="#C21825" />

      <CameraParallax />
      {BALLS.map((ball) => (
        <LotteryBall key={ball.num} {...ball} />
      ))}
      <ContactShadows position={[0, -0.95, 0]} opacity={0.28} scale={6.5} blur={2.4} far={2.5} color="#8F0F1A" />
      <GoldParticles count={isMobile ? 35 : 65} />
    </Canvas>
  );
}
