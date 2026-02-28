import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, GitMerge, Cpu, Settings, Cloud, X } from 'lucide-react';
import { playClickSound } from '../utils/sounds';

const flowSteps = [
    {
        id: 1,
        title: 'Data Pre-processing',
        icon: <Database className="w-6 h-6" />,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        details: 'Initial phase involving data cleaning, handling missing values, and encoding categorical variables like Gender and Marital Status using Label Endcoding and One-Hot Encoding. Outliers in Annual Income and Policy Deductibles were capped to prevent skewing.'
    },
    {
        id: 2,
        title: 'Exploratory Data Analysis (EDA)',
        icon: <Search className="w-6 h-6" />,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        details: 'Visualized feature distributions and correlation matrices. We discovered notable overlaps between fraudulent and non-fraudulent claims in 2D space, confirming the need for a non-linear classifier.'
    },
    {
        id: 3,
        title: 'Algorithm Selection',
        icon: <GitMerge className="w-6 h-6" />,
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
        details: 'Evaluated Logistic Regression, Decision Trees, and Support Vector Machines. SVM with an RBF kernel was selected because it outperformed others in Recall on the minority class (Fraud) when combined with SMOTE for class balancing.'
    },
    {
        id: 4,
        title: 'Model Training (SVM)',
        icon: <Cpu className="w-6 h-6" />,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        details: 'Fitted the SVC on 80% of the balanced dataset. Features were scaled using StandardScaler beforehand, as SVMs are highly sensitive to the scale of input features.'
    },
    {
        id: 5,
        title: 'Hyperparameter Tuning',
        icon: <Settings className="w-6 h-6" />,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        details: 'Utilized GridSearchCV to find optimal values for C (regularization parameter) and gamma (kernel coefficient). The best parameters found were C=10 and gamma=0.1, preventing overfitting.'
    },
    {
        id: 6,
        title: 'Deployment & Inference',
        icon: <Cloud className="w-6 h-6" />,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        details: 'Serialized the final model using joblib. The model is now wrapped in a REST API, powering the predictor dashboard you see on this site with real-time latency under 50ms.'
    }
];

export const ProjectFlow = () => {
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    };

    return (
        <PageWrapper className="flex flex-col gap-8 py-10 max-w-4xl mx-auto relative">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold mb-4">Pipeline Architecture</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Click on any node in the timeline to view the technical details of that phase.
                </p>
            </div>

            {/* Timeline */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative border-l-2 border-border ml-4 md:ml-1/2 space-y-12 pb-12"
            >
                {flowSteps.map((step) => (
                    <motion.div
                        key={step.id}
                        variants={itemVariants}
                        className="relative flex items-center group cursor-pointer"
                        onClick={() => { playClickSound(); setSelectedStep(step.id); }}
                    >
                        {/* Timeline Node */}
                        <div className={`absolute -left-[25px] w-12 h-12 rounded-full ${step.bgColor} ${step.color} flex items-center justify-center border-4 border-background group-hover:scale-110 transition-transform shadow-lg z-10`}>
                            {step.icon}
                        </div>

                        {/* Node Card */}
                        <div className="pl-12 w-full">
                            <div className="glass p-6 rounded-2xl group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors border border-border group-hover:border-primary/40 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 text-[100px] font-black opacity-5 -translate-y-6 translate-x-4 pointer-events-none">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-primary text-sm font-semibold flex items-center gap-1">
                                    View Phase Details <span>→</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal / Popup */}
            <AnimatePresence>
                {selectedStep !== null && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { playClickSound(); setSelectedStep(null); }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-6"
                        >
                            <div className="glass p-8 rounded-3xl border border-border/50 shadow-2xl relative">
                                <button
                                    onClick={() => { playClickSound(); setSelectedStep(null); }}
                                    className="absolute top-4 right-4 p-2 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {flowSteps.filter(s => s.id === selectedStep).map(step => (
                                    <div key={step.id}>
                                        <div className={`w-16 h-16 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center mb-6`}>
                                            {step.icon}
                                        </div>
                                        <div className="inline-block px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold mb-3">
                                            Phase {step.id}
                                        </div>
                                        <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {step.details}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};
