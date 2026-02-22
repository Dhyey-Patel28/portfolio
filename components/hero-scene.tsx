"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Deterministic pseudo-random in [0,1).
 * Pure function: same input => same output.
 */
function hash01(n: number) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
}

function makePositions(count: number) {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const ix = i * 3;

        // Stable pseudo-random values derived from index
        const rx = hash01(ix + 1);
        const ry = hash01(ix + 2);
        const rz = hash01(ix + 3);

        pos[ix + 0] = (rx - 0.5) * 12; // spread X
        pos[ix + 1] = (ry - 0.5) * 6;  // spread Y
        pos[ix + 2] = -2 - rz * 6;     // depth
    }

    return pos;
}

function Blob() {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        mesh.current.rotation.x = t * 0.15;
        mesh.current.rotation.y = t * 0.22;
    });

    return (
        <Float speed={1.4} rotationIntensity={0.85} floatIntensity={1.15}>
        <mesh ref={mesh} position={[1.6, 0, 0]} scale={2.35}>
            <icosahedronGeometry args={[1, 64]} />
            <MeshDistortMaterial
            color="#ffffff"
            roughness={0.28}
            metalness={0.62}
            distort={0.36}
            speed={2.1}
            />
        </mesh>
        </Float>
    );
}

function Particles() {
    const points = useRef<THREE.Points>(null!);

    const positions = useMemo(() => makePositions(700), []);

    useFrame(({ clock }) => {
        if (!points.current) return;
        points.current.rotation.y = clock.getElapsedTime() * 0.03;
    });

    return (
        <points ref={points}>
        <bufferGeometry>
            {/* TS-friendly: BufferAttribute(array, itemSize) */}
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>

        <pointsMaterial
            color="#9aa7ff"
            size={0.018}
            sizeAttenuation
            transparent
            opacity={0.55}
            depthWrite={false}
        />
        </points>
    );
    }

    export default function HeroScene() {
    return (
        <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 4, 6]} intensity={1.0} />
        <pointLight position={[-6, -2, 4]} intensity={0.6} />

        <Particles />
        <Blob />
        </Canvas>
    );
}