// Manual Verification Script for app.js logic
const references = {
    trunk_anterior: { min: 7, max: 10, calc: (v) => v - 90, label: 'Tronco Anterior' },
    hip_flexion: { min: 30, max: 30, calc: (v) => v - 180, label: 'Flexão Quadril' },
    hip_extension: { min: 20, max: 20, calc: (v) => v - 90, label: 'Extensão Quadril' },
    knee_flexion: { min: 40, max: 40, calc: (v) => v - 180, label: 'Flexão Joelho' },
    knee_extension: { min: -10, max: -10, calc: (v) => v - 180, label: 'Extensão Joelho' },
    trunk_lateral: { min: 5, max: 5, calc: (v) => v - 90, label: 'Tronco Lateral' },
    pelvis_drop: { min: 5, max: 5, calc: (v) => v - 90, label: 'Queda da Pelve' },
    knee_valgus: { min: -5, max: 5, calc: (v) => v - 90, label: 'Valgo do Joelho' }
};

const testCases = [
    { measure: 'trunk_anterior', raw: 98, expected: 8 },
    { measure: 'hip_flexion', raw: 210, expected: 30 },
    { measure: 'hip_extension', raw: 112, expected: 22 },
    { measure: 'knee_flexion', raw: 220, expected: 40 },
    { measure: 'knee_extension', raw: 170, expected: -10 },
    { measure: 'trunk_lateral', raw: 95, expected: 5 },
    { measure: 'pelvis_drop', raw: 95, expected: 5 },
    { measure: 'knee_valgus', raw: 95, expected: 5 }
];

console.log("--- Biomechanical App Calculation Verification ---");
let allPassed = true;

testCases.forEach(tc => {
    const ref = references[tc.measure];
    const result = ref.calc(tc.raw);
    const passed = result === tc.expected;
    console.log(`Measure: ${ref.label} | Input: ${tc.raw} | Output: ${result} | Expected: ${tc.expected} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) allPassed = false;
});

console.log("\nStatus Comparison Logic Check:");
const checkStatus = (val, min, max) => {
    if (min === max) {
        return Math.abs(val - min) <= 2;
    }
    return val >= min && val <= max;
};

const statusTests = [
    { val: 8, min: 7, max: 10, expected: true },
    { val: 6, min: 7, max: 10, expected: false },
    { val: 11, min: 7, max: 10, expected: false },
    { val: 30, min: 30, max: 30, expected: true },
    { val: 31, min: 30, max: 30, expected: true },
    { val: 28, min: 30, max: 30, expected: true },
    { val: 33, min: 30, max: 30, expected: false }
];

statusTests.forEach(st => {
    const result = checkStatus(st.val, st.min, st.max);
    const passed = result === st.expected;
    console.log(`Val: ${st.val} | Range: ${st.min}-${st.max} | result: ${result} | ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) allPassed = false;
});

if (allPassed) {
    console.log("\n--- ALL TESTS PASSED SUCCESSFULLY ---");
} else {
    console.log("\n--- SOME TESTS FAILED ---");
}
