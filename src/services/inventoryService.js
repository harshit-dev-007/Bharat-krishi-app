import { supabase } from '../lib/supabaseClient';

export const getInventory = async () => {
    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
};

export const addItem = async (item) => {
    try {
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
