import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Cpu, Maximize, Activity, Network } from 'lucide-react';

export const Architecture = () => {
    return (
        <PageWrapper className="flex flex-col gap-12 py-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Model Architecture</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Deep dive into the Mathematics and System Design of our
                    Support Vector Machine (SVM) implementation.
                </p>
            </div>

            {/* Why SVM */}
            <section className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary flex-shrink-0 mt-1">
                        <Cpu className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Why Support Vector Machines?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            Fraud detection datasets are notoriously imbalanced and feature-rich. We selected an SVM over traditional Logistic Regression or Random Forests for its superior ability to construct optimal decision boundaries (hyperplanes) in highly dimensional spaces. By maximizing the margin between fraudulent and safe claims, SVM provides robustness against overfitting.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="border border-border p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Accuracy</p>
                                <p className="text-2xl font-bold text-primary">96.4%</p>
                            </div>
                            <div className="border border-border p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Recall (Fraud)</p>
                                <p className="text-2xl font-bold text-red-500">92.1%</p>
                            </div>
                            <div className="border border-border p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">F1 Score</p>
                                <p className="text-2xl font-bold text-blue-500">0.94</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mathematics Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold border-b border-border pb-4">Mathematical Foundations</h2>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Hyperplane Card */}
                    <div className="glass p-8 rounded-3xl group hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <Maximize className="w-6 h-6 text-purple-500" />
                            <h3 className="text-2xl font-semibold">The Hyperplane</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            An SVM separates data points using a hyperplane. The goal is to maximize the margin, defined as the distance between the closest data points (support vectors) and the hyperplane.
                        </p>
                        <div className="bg-white dark:bg-[#0a0f1b] p-6 rounded-2xl border border-border shadow-inner relative overflow-hidden">
                            {/* Decorative Math Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                            <div className="relative font-serif text-center space-y-4">
                                <p className="text-2xl tracking-widest text-foreground">
                                    min <span className="text-purple-500 font-bold">||w||²</span> / 2
                                </p>
                                <p className="text-xl text-gray-500 italic">subject to:</p>
                                <p className="text-2xl tracking-wider text-foreground">
                                    y<sub className="text-sm">i</sub>(w<sup className="text-sm">T</sup>x<sub className="text-sm">i</sub> + b) ≥ 1
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Kernel Trick Card */}
                    <div className="glass p-8 rounded-3xl group hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <Network className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl font-semibold">The Kernel Trick</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Insurance data is rarely linearly separable. We use the Radial Basis Function (RBF) kernel to implicitly map inputs into high-dimensional feature spaces without computing transformation vectors.
                        </p>
                        <div className="bg-white dark:bg-[#0a0f1b] p-6 rounded-2xl border border-border shadow-inner relative overflow-hidden">
                            {/* Decorative Math Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                            <div className="relative font-serif text-center space-y-4">
                                <p className="text-2xl tracking-widest text-foreground">
                                    K(x<sub className="text-sm">i</sub>, x<sub className="text-sm">j</sub>) =
                                </p>
                                <div className="flex justify-center items-center gap-2 text-2xl">
                                    <span>exp</span>
                                    <span className="text-4xl font-light">(</span>
                                    <div className="flex flex-col items-center">
                                        <span className="border-b border-foreground/50 pb-1 px-2 text-blue-500 font-bold">
                                            -||x<sub className="text-sm text-foreground">i</sub> - x<sub className="text-sm text-foreground">j</sub>||²
                                        </span>
                                        <span className="pt-1 px-2">
                                            2σ²
                                        </span>
                                    </div>
                                    <span className="text-4xl font-light">)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </PageWrapper>
    );
};
