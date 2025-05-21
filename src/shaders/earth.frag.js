export default /* glsl */ `
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    float lighting = dot(normalize(vNormal), normalize(lightDirection));
    lighting = clamp(lighting, 0.0, 1.0);

    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);

    gl_FragColor = mix(nightColor, dayColor, lighting);
}
`
