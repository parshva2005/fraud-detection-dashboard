// src/utils/mockData.ts

// 1. Feature Space Data
const generateFeatureSpace = (numPoints: number) => {
    const safe: { x: number[], y: number[], z: number[], text: string[] } = { x: [], y: [], z: [], text: [] };
    const fraud: { x: number[], y: number[], z: number[], text: string[] } = { x: [], y: [], z: [], text: [] };

    for (let i = 0; i < numPoints; i++) {
        const isFraud = Math.random() > 0.8;
        const target = isFraud ? fraud : safe;

        // Age (x)
        const age = isFraud ? 20 + Math.random() * 25 : 30 + Math.random() * 40;
        // Income (y)
        const income = isFraud ? 30000 + Math.random() * 40000 : 50000 + Math.random() * 80000;
        // Deductible (z)
        const deductible = isFraud ? 1000 + Math.random() * 1500 : 500 + Math.random() * 1000;

        target.x.push(age);
        target.y.push(income);
        target.z.push(deductible);
        target.text.push(`Age: ${Math.round(age)}<br>Income: $${Math.round(income)}<br>Ded: $${Math.round(deductible)}`);
    }
    return { safe, fraud };
};

const fs = generateFeatureSpace(200);

export const featureSpace2D = [
    {
        x: fs.safe.x, y: fs.safe.y, mode: 'markers', type: 'scatter',
        name: 'Safe', marker: { color: '#22c55e', size: 8, opacity: 0.7 },
        text: fs.safe.text, hoverinfo: 'text'
    },
    {
        x: fs.fraud.x, y: fs.fraud.y, mode: 'markers', type: 'scatter',
        name: 'Fraud', marker: { color: '#ef4444', size: 8, symbol: 'x' },
        text: fs.fraud.text, hoverinfo: 'text'
    }
];

export const featureSpace3D = [
    {
        x: fs.safe.x, y: fs.safe.y, z: fs.safe.z, mode: 'markers', type: 'scatter3d',
        name: 'Safe', marker: { color: '#22c55e', size: 5, opacity: 0.8 },
        text: fs.safe.text, hoverinfo: 'text'
    },
    {
        x: fs.fraud.x, y: fs.fraud.y, z: fs.fraud.z, mode: 'markers', type: 'scatter3d',
        name: 'Fraud', marker: { color: '#ef4444', size: 6, symbol: 'diamond' },
        text: fs.fraud.text, hoverinfo: 'text'
    }
];

// 2. ROC Curve
const generateROC = () => {
    const steps = 50;
    const roc2d: { x: number[], y: number[], z: number[] } = { x: [], y: [], z: [] };
    const baseline = { x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', line: { dash: 'dash', color: 'gray' }, showlegend: false };

    for (let i = 0; i <= steps; i++) {
        const threshold = i / steps;
        const fpr = Math.pow(threshold, 2);
        const tpr = Math.pow(threshold, 0.5);
        roc2d.x.push(fpr);
        roc2d.y.push(tpr);
        roc2d.z.push(1 - threshold);
    }
    return { roc2d, baseline };
};

const rocData = generateROC();
export const rocCurve2D = [
    { x: rocData.roc2d.x, y: rocData.roc2d.y, type: 'scatter', mode: 'lines', name: 'SVM Model', line: { color: '#3b82f6', width: 3 } },
    rocData.baseline
];

export const rocCurve3D = [
    { x: rocData.roc2d.x, y: rocData.roc2d.y, z: rocData.roc2d.z, type: 'scatter3d', mode: 'lines', name: 'SVM path', line: { color: '#3b82f6', width: 6 } },
];

// 3. Feature Importance
export const importance2D = [
    {
        type: 'bar', orientation: 'h',
        y: ['Gender', 'Marital Status', 'Education', 'Deductible', 'Age', 'Income', 'Incident Severity'],
        x: [0.02, 0.05, 0.08, 0.12, 0.18, 0.22, 0.33],
        marker: { color: '#8b5cf6' }
    }
];

export const importance3D = [
    {
        type: 'scatter3d', mode: 'markers+lines',
        x: [0, 0, 0, 0, 0, 0, 0], // Anchor at 0
        y: [1, 2, 3, 4, 5, 6, 7], // Categories
        z: [0.02, 0.05, 0.08, 0.12, 0.18, 0.22, 0.33], // Heights
        marker: { color: '#8b5cf6', size: 10 },
        line: { color: '#8b5cf6', width: 5 }
    }
];
