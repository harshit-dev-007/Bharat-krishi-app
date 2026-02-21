import { supabase } from '../lib/supabaseClient';

export const getInventory = async () => {
    try {
        if (!supabaseUrlConfigured()) {
            return [
                { id: 1, name: 'Wheat Seeds', category: 'Seeds', quantity: '50 Kg', status: 'In Stock', created_at: new Date().toISOString() },
                { id: 2, name: 'Urea Fertilizer', category: 'Fertilizer', quantity: '10 Bags', status: 'Low Stock', created_at: new Date().toISOString() }
            ];
        }

        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
};

export const addItem = async (item) => {
    try {
        if (!supabaseUrlConfigured()) {
            return [{ ...item, id: Date.now(), created_at: new Date().toISOString() }];
        }

        const { data, error } = await supabase
            .from('inventory')
            .insert([item])
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding item:', error);
        return null;
    }
};

// Helper function to check if Supabase is mocked
const supabaseUrlConfigured = () => {
    return typeof supabase.auth.signInWithPassword.toString !== 'function' || !supabase.auth.signInWithPassword.toString().includes('demo-user');
}
