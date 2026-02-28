
import { PageWrapper } from '../components/layout/PageWrapper';
import { ArrowRight, Database, AlertTriangle, Trophy, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/sounds';

export const Home = () => {
    return (
        <PageWrapper className="flex flex-col gap-16 py-12">
            {/* Hero Section */}
            <section className="text-center space-y-8 max-w-4xl mx-auto mt-8 relative">
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10" />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enterprise-Grade Fraud Detection</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                    Securing the Future of <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                        Insurance Claims
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    An advanced Machine Learning pipeline utilizing Support Vector Machines (SVM)
                    to instantly detect and flag anomalous insurance claims with high precision.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        to="/predictor"
                        onClick={playClickSound}
                        className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/30"
                    >
                        Run AI Predictor <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        to="/flow"
                        onClick={playClickSound}
                        className="w-full sm:w-auto px-8 py-4 glass rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 transition-all border border-border"
                    >
                        View Project Flow
                    </Link>
                </div>
            </section>

            {/* Summary Cards Section */}
            <section className="grid md:grid-cols-3 gap-6 pt-12">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-3xl flex flex-col items-start gap-4 transition-all hover:border-primary/50"
                >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">The Problem</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Insurance fraud costs the industry billions annually. Manual auditing is slow and inefficient.
                        We need an automated, scalable solution to flag suspicious claims before payouts are processed.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-3xl flex flex-col items-start gap-4 transition-all hover:border-primary/50 translate-y-4 md:translate-y-0"
                >
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                        <Database className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">The Dataset</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Trained on a robust dataset of historical insurance claims, encompassing policy details,
                        customer demographics, incident reports, and previously verified fraud markers.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-3xl flex flex-col items-start gap-4 transition-all hover:border-primary/50 translate-y-8 md:translate-y-0"
                >
                    <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Key Achievements</h3>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-center gap-2">✓ High accuracy SVM implementation</li>
                        <li className="flex items-center gap-2">✓ Handled massive class imbalance</li>
                        <li className="flex items-center gap-2">✓ Interactive 3D Feature Space</li>
                        <li className="flex items-center gap-2">✓ Real-time prediction pipeline</li>
                    </ul>
                </motion.div>
            </section>
        </PageWrapper>
    );
};
