import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, User, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { playClickSound, playSwooshSound } from '../../utils/sounds';

export const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isLogged, setIsLogged] = useState(true);
    const [showHistory, setShowHistory] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Enhanced Mock Data for Recent Predictions
    const mockPredictions = [
        { id: '11090', result: 'Fraudulent' },
        { id: '99182', result: 'Safe' },
        { id: '23412', result: 'Fraudulent' },
        { id: '55677', result: 'Safe' },
        { id: '08123', result: 'Safe' },
        { id: '77210', result: 'Safe' },
        { id: '34411', result: 'Fraudulent' },
        { id: '99822', result: 'Safe' },
        { id: '11543', result: 'Safe' },
        { id: '22340', result: 'Fraudulent' },
        { id: '88112', result: 'Safe' },
        { id: '55019', result: 'Safe' }
    ];

    const displayedPredictions = mockPredictions.slice(0, 10);
    const hasMore = mockPredictions.length > 10;

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Predictor', path: '/predictor' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Architecture', path: '/architecture' },
        { name: 'Project Flow', path: '/flow' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo element */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                            FraudSafe AI
                        </span>
                    </div>

                    {/* Nav links (Desktop) */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={playClickSound}
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive
                                        ? 'border-primary text-primary'
                                        : 'border-transparent hover:border-gray-300 hover:text-primary'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side controls and Mobile Toggle */}
                    <div className="flex items-center gap-2 sm:gap-4 border-l border-border pl-2 sm:pl-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => { playClickSound(); toggleTheme(); }}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Auth Simulator */}
                        {isLogged ? (
                            <div className="relative">
                                <button
                                    onClick={() => { playClickSound(); setShowHistory(!showHistory); }}
                                    className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all border border-border"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                        JS
                                    </div>
                                    <span className="text-sm font-medium">User</span>
                                </button>

                                {showHistory && (
                                    <div className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-border focus:outline-none z-50">
                                        <div className="p-3 border-b border-border flex justify-between items-center">
                                            <p className="text-sm font-semibold">Recent Predictions</p>
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{mockPredictions.length} total</span>
                                        </div>
                                        <ul className="py-2 text-sm max-h-[300px] overflow-y-auto">
                                            {displayedPredictions.map((pred) => (
                                                <li key={pred.id} className="px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex justify-between items-center transition-colors">
                                                    <span className="font-mono text-gray-700 dark:text-gray-300">Pol #{pred.id}</span>
                                                    <span className={`font-medium ${pred.result === 'Safe' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                                        {pred.result}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="p-2 border-t border-border space-y-1">
                                            {hasMore && (
                                                <button className="w-full text-xs text-primary hover:underline py-1.5 text-center font-medium">
                                                    View All Predictions →
                                                </button>
                                            )}
                                            <button
                                                onClick={() => { playSwooshSound(); setIsLogged(false); setShowHistory(false); }}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => { playClickSound(); setIsLogged(true); }}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center pl-2 border-l border-border">
                            <button
                                onClick={() => { playClickSound(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
                                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-t border-border animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => { playClickSound(); setIsMobileMenuOpen(false); }}
                                className={({ isActive }) =>
                                    `block px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
