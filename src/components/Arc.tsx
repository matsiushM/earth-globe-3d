import * as THREE from 'three';

export default function Arc({ coords }) {
    const getSphericalCoords = (lat, lon) => {
        const longitudeOffset = 0;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180 + longitudeOffset) * (Math.PI / 180);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        return [x, y, z];
    };

    const points = [];
    const steps = 50;
    const [startX, startY, startZ] = getSphericalCoords(coords[0].lat, coords[0].lon);
    const [endX, endY, endZ] = getSphericalCoords(coords[1].lat, coords[1].lon);

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t;
        const z = startZ + (endZ - startZ) * t;
        const height = Math.sin(t * Math.PI) * 0.2;
        const normalized = new THREE.Vector3(x, y, z).normalize();
        points.push(normalized.multiplyScalar(1 + height));
    }

    return (
        <line>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="white" />
        </line>
    );
}