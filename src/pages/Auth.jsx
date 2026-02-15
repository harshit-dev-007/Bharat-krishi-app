import React, { useState } from 'react';
import { User, Lock, Phone, ArrowRight, Loader2, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', phone: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                if (data.user) onLogin(data.user);
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            phone: formData.phone,
                        }
                    }
                });
                if (error) throw error;
                alert('Check your email for verification link!');
                if (data.user) onLogin(data.user);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="w-full p-8">
                    <div className="text-center mb-8">
                        <span className="text-4xl mb-2 block">🌾</span>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                            BharatKrishi
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">Empowering Farmers, Every Day.</p>
                    </div>

                    <div className="flex border-b border-gray-100 mb-6">
                        <button
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex justify-center items-center mt-6"
                        >
                            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                <>
                                    {isLogin ? 'Login' : 'Create Account'}
                                    <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
