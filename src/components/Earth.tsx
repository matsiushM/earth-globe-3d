import {useRef} from "react";
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {useTexture} from '@react-three/drei'
import Markers from "./Matkers.tsx";
import Arc from "./Arc.tsx";

import vertexShader from '../shaders/earth.vert.js'
import fragmentShader from '../shaders/earth.frag.js'

export default function Earth() {
    const [dayTexture, nightTexture, cloudMap, heightMap] = useTexture([
        'src/textures/8k_earth_daymap.jpg',
        'src/textures/8k_earth_nightmap.jpg',
        'src/textures/8k_earth_clouds.jpg',
        'src/textures/8k_earth_normal_map.jpg',
    ])

    const earthRef = useRef();
    const cloudsRef = useRef();

    const coords = [
        { lat: 55.7558, lon: 37.6173 },
        { lat: 40.7128, lon: -74.0060 },
    ];

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        earthRef.current.rotation.y = t * 0.05;
        cloudsRef.current.rotation.y = t * 0.06;
    });

    return (
        <>
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 128, 128]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        dayTexture: { value: dayTexture },
                        nightTexture: { value: nightTexture },
                        heightMap: { value: heightMap },
                        lightDirection: { value: new THREE.Vector3(5, 5, 5).normalize() },
                        displacementScale: { value: 0.06},
                    }}
                />
                <Markers coords={coords} />
                <Arc coords={coords} />
            </mesh>

            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.06, 128, 128]}/>
                <meshPhongMaterial
                    map={cloudMap}
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                />
            </mesh>
        </>
    );
}
