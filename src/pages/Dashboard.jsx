import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, CloudRain, Droplets, Sun, Wind } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const data = [
    { name: 'Jan', yield: 4000, profit: 2400 },
    { name: 'Feb', yield: 3000, profit: 1398 },
    { name: 'Mar', yield: 2000, profit: 9800 },
    { name: 'Apr', yield: 2780, profit: 3908 },
    { name: 'May', yield: 1890, profit: 4800 },
    { name: 'Jun', yield: 2390, profit: 3800 },
    { name: 'Jul', yield: 3490, profit: 4300 },
];

const prices = [
    { crop: 'Wheat', price: '₹2,125', change: '+2.4%' },
    { crop: 'Rice (Basmati)', price: '₹3,450', change: '-1.1%' },
    { crop: 'Cotton', price: '₹6,200', change: '+0.5%' },
    { crop: 'Maize', price: '₹1,980', change: '+3.2%' },
];

const Dashboard = () => {
    const { t } = useLanguage();

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('dashboard')}</h1>
                    <p className="text-gray-500">{t('welcome')}</p>
                </div>
                <div className="mt-4 md:mt-0 bg-white p-2 rounded-lg shadow-sm flex items-center space-x-4">
                    <div className="flex items-center text-blue-600">
                        <CloudRain size={20} className="mr-2" />
                        <span className="font-semibold">24°C</span>
                    </div>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="text-sm text-gray-500">
                        {t('humidity')}: 65% • {t('rain')}: 40%
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title={t('totalYield')} value="12.5 Tons" icon={<TrendingUp size={24} className="text-green-600" />} trend="+12% vs last year" />
                <StatCard title={t('revenue')} value="₹ 4.2 Lakhs" icon={<TrendingUp size={24} className="text-blue-600" />} trend="+8% vs last year" />
                <StatCard title={t('activeCrops')} value="3 Types" icon={<Sun size={24} className="text-yellow-500" />} trend="Wheat, Mustard, Gram" />
                <StatCard title={t('soilHealth')} value="Good" icon={<Droplets size={24} className="text-blue-400" />} trend="pH 6.5 • N-P-K Normal" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Yield vs Profit Analysis</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="yield" stroke="#82ca9d" fillOpacity={1} fill="url(#colorYield)" />
                                <Area type="monotone" dataKey="profit" stroke="#8884d8" fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Mandi Prices */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">{t('liveMandi')}</h3>
                    <div className="space-y-4">
                        {prices.map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div>
                                    <p className="font-semibold">{p.crop}</p>
                                    <p className="text-xs text-gray-500">{t('updated')} 10m ago</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{p.price}</p>
                                    <p className={`text-xs ${p.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{p.change}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-green-700 font-semibold text-sm hover:underline">{t('viewAll')} &rarr;</button>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        </div>
        <p className="text-xs text-green-600 font-medium">{trend}</p>
    </div>
);

export default Dashboard;
