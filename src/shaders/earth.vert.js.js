export default /* glsl */ `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform sampler2D heightMap;
uniform float displacementScale;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = vec2(
        atan(position.z, position.x) / (2.0 * 3.1415926) + 0.5,
        asin(position.y) / 3.1415926 + 0.5
    );

    float height = texture2D(heightMap, vUv).r;
    vec3 displacedPosition = position + normal * height * displacementScale;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
`
