export default /* glsl */ `
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform sampler2D heightMap;
uniform vec3 lightDirection;
uniform float displacementScale;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    // Получаем высоту из heightMap
    float height = texture2D(heightMap, vUv).r;

    // Вычисляем градиенты высоты для создания нормали
    vec2 dUv = vec2(0.001, 0.001); // Шаг для аппроксимации
    float hL = texture2D(heightMap, vUv - vec2(dUv.x, 0.0)).r;
    float hR = texture2D(heightMap, vUv + vec2(dUv.x, 0.0)).r;
    float hD = texture2D(heightMap, vUv - vec2(0.0, dUv.y)).r;
    float hU = texture2D(heightMap, vUv + vec2(0.0, dUv.y)).r;

    // Вычисляем новую нормаль на основе градиентов
    vec3 tangent = vec3(1.0, 0.0, (hR - hL) * displacementScale);
    vec3 bitangent = vec3(0.0, 1.0, (hU - hD) * displacementScale);
    vec3 bumpNormal = normalize(cross(tangent, bitangent));
    bumpNormal = normalize(vNormal + bumpNormal);

    // Освещение с учетом новой нормали
    float lighting = dot(bumpNormal, normalize(lightDirection));
    lighting = clamp(lighting, 0.0, 1.0);

    // Смешиваем текстуры дня и ночи
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);

    gl_FragColor = mix(nightColor, dayColor, lighting);
}
`
