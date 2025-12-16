'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Planet from './Planet';

interface SceneProps {
    scrollProgress: number;
}

export default function Scene({ scrollProgress }: SceneProps) {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{
                    position: [0, 0, 4],
                    fov: 60,
                    near: 0.1,
                    far: 100,
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
            >
                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[5, 3, 5]}
                    intensity={1.2}
                    color="#ffffff"
                />
                <directionalLight
                    position={[-5, -2, -5]}
                    intensity={0.4}
                    color="#8b5cf6"
                />
                <pointLight position={[0, 0, 4]} intensity={0.5} color="#6366f1" />

                {/* Planet */}
                <Suspense fallback={null}>
                    <Planet scrollProgress={scrollProgress} />
                </Suspense>
            </Canvas>
        </div>
    );
}
