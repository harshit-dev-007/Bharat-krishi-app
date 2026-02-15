import React from 'react';
import { Sprout, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Production = () => {
    const { t } = useLanguage();

    const timelineEvents = [
        { date: '10 Nov', title: 'Sowing Wheat', status: 'completed' },
        { date: '15 Nov', title: 'First Irrigation', status: 'completed' },
        { date: '05 Dec', title: 'Fertilizer Application (Urea)', status: 'active' },
        { date: '25 Dec', title: 'Weed Control', status: 'pending' },
        { date: '10 Jan', title: 'Second Irrigation', status: 'pending' },
    ];

    return (
        <div className="p-4 space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('production')}</h1>
                    <p className="text-gray-500">{t('timeline')}</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    + {t('addEntry')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Active Crop Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <Sprout className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Wheat (Rabi Season)</h2>
                            <p className="text-sm text-gray-500">Sowed on 10th Nov • 5 Acres</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-6 relative ml-2">
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                        {timelineEvents.map((event, idx) => (
                            <div key={idx} className="relative flex items-start space-x-4">
                                <div className={`z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white ${event.status === 'completed' ? 'border-green-500 text-green-500' :
                                        event.status === 'active' ? 'border-blue-500 text-blue-500 animate-pulse' : 'border-gray-300 text-gray-300'
                                    }`}>
                                    {event.status === 'completed' && <CheckCircle size={14} fill="currentColor" className="text-white" />}
                                    {event.status === 'active' && <Clock size={14} />}
                                    {event.status === 'pending' && <div className="w-2 h-2 rounded-full bg-gray-300" />}
                                </div>
                                <div className={`flex-1 p-3 rounded-lg ${event.status === 'active' ? 'bg-blue-50 border border-blue-100' : ''}`}>
                                    <p className="text-sm font-bold text-gray-800">{event.title}</p>
                                    <p className="text-xs text-gray-500">{event.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts / Tasks */}
                <div className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                        <div className="flex items-center space-x-2 text-red-700 font-bold mb-3">
                            <AlertCircle size={20} />
                            <h3>Critical Alerts</h3>
                        </div>
                        <p className="text-sm text-red-600 mb-4">Leaf Rust detected in neighboring farms. Please inspect your Wheat crop today.</p>
                        <button className="w-full py-2 bg-white text-red-600 text-sm font-bold rounded-lg border border-red-200 hover:bg-red-100">
                            View Details
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold mb-3 text-gray-800">{t('tasks')}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-sm">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <span className="text-gray-600 line-through">Buy Urea (5 Bags)</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <span className="text-gray-800">Clean irrigation canals</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <span className="text-gray-800">Submit Insurance Form</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Production;
