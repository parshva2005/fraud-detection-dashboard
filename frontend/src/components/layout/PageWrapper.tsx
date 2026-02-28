import React from 'react';
import { motion } from 'framer-motion';

export const PageWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto ${className}`}
        >
            {children}
        </motion.div>
    );
};
