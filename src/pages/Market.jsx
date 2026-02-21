import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Market = () => {
    const { t } = useLanguage();
    const [selectedState, setSelectedState] = useState('All');

    // Mock Data
    const marketData = [
        { id: 1, crop: 'Wheat', variety: 'Sharbati', mandi: 'Indore Mandi', state: 'Madhya Pradesh', price: '₹3,200', change: '+1.5%', trend: 'up' },
        { id: 2, crop: 'Soybean', variety: 'Yellow', mandi: 'Dewas Mandi', state: 'Madhya Pradesh', price: '₹4,800', change: '-0.8%', trend: 'down' },
        { id: 3, crop: 'Cotton', variety: 'H-4', mandi: 'Rajkot Market', state: 'Gujarat', price: '₹6,150', change: '+0.5%', trend: 'up' },
        { id: 4, crop: 'Mustard', variety: 'Black', mandi: 'Bharatpur Mandi', state: 'Rajasthan', price: '₹5,400', change: '+2.1%', trend: 'up' },
        { id: 5, crop: 'Onion', variety: 'Red', mandi: 'Lasalgaon', state: 'Maharashtra', price: '₹1,200', change: '-5.0%', trend: 'down' },
        { id: 6, crop: 'Rice', variety: 'Basmati 1121', mandi: 'Karnal', state: 'Haryana', price: '₹3,850', change: '+0.2%', trend: 'up' },
        { id: 7, crop: 'Sugarcane', variety: 'Co-0238', mandi: 'Muzaffarnagar', state: 'Uttar Pradesh', price: '₹350', change: '+0.0%', trend: 'up' },
        { id: 8, crop: 'Paddy', variety: 'Common', mandi: 'Ludhiana', state: 'Punjab', price: '₹2,203', change: '+1.1%', trend: 'up' },
        { id: 9, crop: 'Tea', variety: 'Assam CTC', mandi: 'Guwahati Auction', state: 'Assam', price: '₹18,500', change: '-1.2%', trend: 'down' },
        { id: 10, crop: 'Jute', variety: 'TD-5', mandi: 'Kolkata', state: 'West Bengal', price: '₹5,050', change: '+0.8%', trend: 'up' },
        { id: 11, crop: 'Coffee', variety: 'Arabica', mandi: 'Chikmagalur', state: 'Karnataka', price: '₹32,000', change: '+3.5%', trend: 'up' },
        { id: 12, crop: 'Cardamom', variety: 'Alleppey Green', mandi: 'Vandanmedu', state: 'Kerala', price: '₹154,000', change: '-2.0%', trend: 'down' },
        { id: 13, crop: 'Turmeric', variety: 'Salem', mandi: 'Erode', state: 'Tamil Nadu', price: '₹14,200', change: '+5.5%', trend: 'up' },
        { id: 14, crop: 'Chilli', variety: 'Teja', mandi: 'Guntur', state: 'Andhra Pradesh', price: '₹22,000', change: '-0.5%', trend: 'down' },
        { id: 15, crop: 'Maize', variety: 'Hybrid', mandi: 'Khagaria', state: 'Bihar', price: '₹2,100', change: '+1.0%', trend: 'up' },
        { id: 16, crop: 'Paddy', variety: 'Grade A', mandi: 'Bargarh', state: 'Odisha', price: '₹2,203', change: '+0.0%', trend: 'up' },
        { id: 17, crop: 'Tomato', variety: 'Hybrid', mandi: 'Madanapalle', state: 'Andhra Pradesh', price: '₹1,800', change: '-10.0%', trend: 'down' },
        { id: 18, crop: 'Apple', variety: 'Royal Delicious', mandi: 'Shimla', state: 'Himachal Pradesh', price: '₹8,500', change: '+4.2%', trend: 'up' },
        { id: 19, crop: 'Saffron', variety: 'Mongra', mandi: 'Pampore', state: 'Jammu and Kashmir', price: '₹300,000', change: '+1.5%', trend: 'up' },
        { id: 20, crop: 'Bamboo', variety: 'Raw', mandi: 'Dimapur', state: 'Nagaland', price: '₹2,500', change: '+0.5%', trend: 'up' },
        { id: 21, crop: 'Pineapple', variety: 'Kew', mandi: 'Agartala', state: 'Tripura', price: '₹3,200', change: '-1.0%', trend: 'down' }
    ];

    const filteredData = selectedState === 'All'
        ? marketData
        : marketData.filter(item => item.state === selectedState);

    const states = [
        'All', 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
        'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
        'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
        'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
        'Uttarakhand', 'West Bengal'
    ];

    return (
        <div className="p-4 space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('liveMandi')}</h1>
                    <p className="text-gray-500">Real-time commodity prices from major mandis</p>
                </div>
                <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200">
                    <MapPin size={18} className="text-gray-400 ml-2" />
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="bg-transparent p-2 outline-none text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">{t('crop')}</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Mandi / State</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">{t('price')} (/Qtl)</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">{t('change')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold text-gray-800">{item.crop}</p>
                                        <p className="text-xs text-gray-500">{item.variety}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <MapPin size={14} className="text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-700">{item.mandi}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 pl-5">{item.state}</p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="font-bold text-gray-900">{item.price}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${item.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                            {item.change}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                    <Search size={16} />
                </div>
                <div>
                    <h4 className="font-bold text-blue-800 text-sm">Pro Tip</h4>
                    <p className="text-sm text-blue-700 mt-1">Prices are updated daily at 11:00 AM and 4:00 PM. Rates may vary based on quality and moisture content.</p>
                </div>
            </div>
        </div>
    );
};

export default Market;
