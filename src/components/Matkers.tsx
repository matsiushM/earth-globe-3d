export default function Markers({ coords }) {
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
                <sphereGeometry args={[0.05, 32, 32]} /> {/* Увеличен радиус до 0.05 */}
                <meshBasicMaterial color="red" />
            </mesh>
        );
    });
}