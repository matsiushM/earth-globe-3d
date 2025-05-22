import {Billboard, useTexture} from "@react-three/drei";
import * as THREE from "three";

export default function Markers({coords}) {
    const pin = useTexture("src/textures/placeholder.png");

    const getSphericalCoords = (lat, lon) => {
        const longitudeOffset = 0;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180 + longitudeOffset) * (Math.PI / 180);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        return [x, y, z];
    };

    return coords.map((coord, index) => {
        const [x, y, z] = getSphericalCoords(coord.lat, coord.lon);

        return (
            <mesh key={index} position={[x, y, z]}>
                <Billboard>
                    <mesh position={[0, 0.05, 0]}>
                        <planeGeometry args={[0.1, 0.1]}/>
                        <meshBasicMaterial
                            map={pin}
                            transparent={true}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </Billboard>
            </mesh>
        );
    });
}