import React, { useState, useEffect } from 'react';
import { Package, Plus, AlertTriangle, Search, Filter, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getInventory, addItem } from '../services/inventoryService';
import { supabase } from '../lib/supabaseClient';

const Inventory = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', category: 'Seeds', quantity: '', status: 'In Stock' });

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        setLoading(true);
        const data = await getInventory();
        setItems(data);
        setLoading(false);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return alert('Please login to add items');

        const itemToAdd = { ...newItem, user_id: user.id };
        const savedItem = await addItem(itemToAdd);

        if (savedItem) {
            setItems([savedItem[0], ...items]);
            setShowAddModal(false);
            setNewItem({ name: '', category: 'Seeds', quantity: '', status: 'In Stock' });
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 space-y-6 max-w-6xl mx-auto relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('inventory')}</h1>
                    <p className="text-gray-500">Track seeds, fertilizers, and equipment</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                >
                    <Plus size={18} className="mr-2" />
                    {t('addItem')}
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
            </div>

            {/* Inventory List */}
            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-green-600" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                {item.status === 'Low Stock' && (
                                    <span className="flex items-center text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                                        <AlertTriangle size={12} className="mr-1" />
                                        Low Stock
                                    </span>
                                )}
                                {item.status === 'In Stock' && (
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                        In Stock
                                    </span>
                                )}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{item.category}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-400">Quantity</p>
                                    <p className="font-bold text-gray-800">{item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Added</p>
                                    <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No items found or database not connected.</p>
                </div>
            )}

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">{t('addItem')}</h2>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <input
                                className="w-full p-2 border rounded-lg"
                                placeholder="Item Name"
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                required
                            />
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={newItem.category}
                                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                            >
                                <option>Seeds</option>
                                <option>Fertilizer</option>
                                <option>Chemicals</option>
                                <option>Equipment</option>
                            </select>
                            <input
                                className="w-full p-2 border rounded-lg"
                                placeholder="Quantity (e.g., 5 Bags)"
                                value={newItem.quantity}
                                onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                                required
                            />
                            <div className="flex space-x-3 mt-6">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-green-600 text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
