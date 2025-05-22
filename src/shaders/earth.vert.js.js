export default /* glsl */ `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = vec2(
        atan(position.z, position.x) / (2.0 * 3.1415926) + 0.5,
        asin(position.y) / 3.1415926 + 0.5
    );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
