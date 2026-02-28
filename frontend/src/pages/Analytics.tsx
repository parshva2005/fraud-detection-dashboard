import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { InteractiveChart } from '../components/charts/InteractiveChart';
import {
    featureSpace2D, featureSpace3D,
    rocCurve2D, rocCurve3D,
    importance2D, importance3D
} from '../utils/mockData';

export const Analytics = () => {

    const commonLayout2D = {
        xaxis: { gridcolor: '#e2e8f0', zerolinecolor: '#e2e8f0' },
        yaxis: { gridcolor: '#e2e8f0', zerolinecolor: '#e2e8f0' }
    };

    const commonLayout3D = {
        scene: {
            xaxis: { backgroundcolor: 'transparent', gridcolor: '#e2e8f0', showbackground: false },
            yaxis: { backgroundcolor: 'transparent', gridcolor: '#e2e8f0', showbackground: false },
            zaxis: { backgroundcolor: 'transparent', gridcolor: '#e2e8f0', showbackground: false },
        }
    };

    return (
        <PageWrapper className="flex flex-col gap-8 py-8">
            <div>
                <h1 className="text-4xl font-extrabold mb-4">Model Analytics</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
                    Visualizing the Support Vector Machine's decision boundaries, performance metrics, and feature impacts.
                    Toggle any graph into 3D for a deeper exploration of the data space.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Full width feature space */}
                <div className="lg:col-span-2">
                    <InteractiveChart
                        title="Feature Space vs Fraud"
                        description="Age (x), Income (y), Deductible (z)"
                        data2D={featureSpace2D}
                        layout2D={{
                            ...commonLayout2D,
                            xaxis: { ...commonLayout2D.xaxis, title: 'Age' },
                            yaxis: { ...commonLayout2D.yaxis, title: 'Annual Income ($)' }
                        }}
                        data3D={featureSpace3D}
                        layout3D={{
                            ...commonLayout3D,
                            scene: {
                                ...commonLayout3D.scene,
                                xaxis: { title: 'Age' },
                                yaxis: { title: 'Income' },
                                zaxis: { title: 'Deductible' }
                            }
                        }}
                    />
                </div>

                {/* Half width ROC */}
                <InteractiveChart
                    title="ROC Curve"
                    description="True Positive vs False Positive Rate. 3D view maps the Threshold on Z-axis."
                    data2D={rocCurve2D}
                    layout2D={{
                        ...commonLayout2D,
                        xaxis: { ...commonLayout2D.xaxis, title: 'False Positive Rate' },
                        yaxis: { ...commonLayout2D.yaxis, title: 'True Positive Rate' }
                    }}
                    data3D={rocCurve3D}
                    layout3D={{
                        ...commonLayout3D,
                        scene: {
                            ...commonLayout3D.scene,
                            xaxis: { title: 'FPR' },
                            yaxis: { title: 'TPR' },
                            zaxis: { title: 'Threshold' }
                        }
                    }}
                />

                {/* Half width Importance */}
                <InteractiveChart
                    title="Feature Importance"
                    description="Relative impact of each feature on the model's prediction."
                    data2D={importance2D}
                    layout2D={{
                        ...commonLayout2D,
                        margin: { l: 120, r: 20, t: 40, b: 40 }
                    }}
                    data3D={importance3D}
                    layout3D={{
                        ...commonLayout3D,
                        scene: {
                            ...commonLayout3D.scene,
                            yaxis: { title: 'Features (Index)' },
                            zaxis: { title: 'Importance (Weight)' },
                            xaxis: { title: '' }
                        }
                    }}
                />

            </div>
        </PageWrapper>
    );
};
