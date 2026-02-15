import React, { useState } from 'react';
import { LayoutDashboard, Sprout, HandCoins, Package, Landmark, Store, LogOut, Menu, X, Mic, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();

    const menuItems = [
        { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { id: 'production', label: t('production'), icon: Sprout },
        { id: 'features', label: t('features'), icon: Mic },
        { id: 'finance', label: t('finance'), icon: HandCoins },
        { id: 'inventory', label: t('inventory'), icon: Package },
        { id: 'schemes', label: t('schemes'), icon: Landmark },
        { id: 'market', label: t('market'), icon: Store },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-lg shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        overflow-y-auto max-h-screen
      `}>
                <div className="flex flex-col min-h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
                        <span className="text-2xl mr-2">🌾</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                            BharatKrishi
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === item.id
                                        ? 'bg-green-50 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Language Toggle & Footer */}
                    <div className="p-4 border-t border-gray-200 space-y-2 shrink-0 bg-white">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
                        >
                            <Languages className="w-5 h-5 mr-3" />
                            {language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
                        </button>

                        <button
                            onClick={onLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            {t('signOut')}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
