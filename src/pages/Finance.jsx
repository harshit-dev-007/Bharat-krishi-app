import React, { useState } from 'react';
import { IndianRupee, ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Finance = () => {
    const { t } = useLanguage();

    // Mock Data
    const transactions = [
        { id: 1, type: 'expense', title: 'Urea Bags (5)', amount: 1350, date: '12 Dec' },
        { id: 2, type: 'income', title: 'Wheat Advance', amount: 25000, date: '10 Dec' },
        { id: 3, type: 'expense', title: 'Diesel Gen-set', amount: 800, date: '08 Dec' },
    ];

    return (
        <div className="p-4 space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('finance')}</h1>
                    <p className="text-gray-500">Manage your farm expenses & loans</p>
                </div>
                <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    <Plus size={18} className="mr-2" />
                    {t('addEntry')}
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600"><ArrowDownLeft size={24} /></div>
                        <span className="text-xs font-bold uppercase text-green-700">{t('income')}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">₹ 4.2 L</h3>
                </div>
                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600"><ArrowUpRight size={24} /></div>
                        <span className="text-xs font-bold uppercase text-red-700">{t('expense')}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">₹ 1.8 L</h3>
                </div>
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><IndianRupee size={24} /></div>
                        <span className="text-xs font-bold uppercase text-blue-700">{t('balance')}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">₹ 2.4 L</h3>
                </div>
            </div>

            {/* Loan Tracker & Ledger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* KCC Loan Status */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">{t('loanLimit')} (KCC)</h3>

                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                    {t('used')}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-indigo-600">
                                    45%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style={{ width: "45%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Used: ₹ 1.35 Lakhs</span>
                            <span>Limit: ₹ 3.00 Lakhs</span>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-600">Next Installment Due:</p>
                        <p className="font-bold text-gray-900">15th March 2026</p>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Recent Ledger</h3>
                    <div className="space-y-3">
                        {transactions.map(tx => (
                            <div key={tx.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {tx.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{tx.title}</p>
                                        <p className="text-xs text-gray-400">{tx.date}</p>
                                    </div>
                                </div>
                                <span className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.type === 'income' ? '+' : '-'} ₹{tx.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 text-sm text-center text-gray-500 hover:text-gray-800 font-medium">View Full Ledger</button>
                </div>
            </div>
        </div>
    );
};

export default Finance;
