import React, { useState } from 'react';
import { Mic, Camera, Brain, User, Send, Upload, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AiFeatures = () => {
    const { t } = useLanguage();
    const [voiceActive, setVoiceActive] = useState(false);
    const [conversation, setConversation] = useState([
        { role: 'user', text: 'What is the price of Wheat today?' },
        { role: 'ai', text: "Today's modal price for Wheat is ₹2,125/quintal. Prices are up 2%." }
    ]);
    const [analyzingImage, setAnalyzingImage] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [cropLoading, setCropLoading] = useState(false);
    const [cropResult, setCropResult] = useState(null);

    const handleVoiceClick = () => {
        setVoiceActive(true);
        setTimeout(() => {
            setVoiceActive(false);
            setConversation(prev => [...prev,
            { role: 'user', text: 'When should I irrigate my Cotton?' },
            { role: 'ai', text: 'Based on soil moisture sensors (simulated), you should irrigate tomorrow morning as humidity is dropping.' }
            ]);
        }, 2000);
    };

    const handleImageUpload = () => {
        setAnalyzingImage(true);
        setTimeout(() => {
            setAnalyzingImage(false);
            setImageResult({
                status: 'danger',
                disease: 'Leaf Rust',
                confidence: '94%',
                solution: 'Apply Propiconazole 25% EC @ 1ml/liter of water.'
            });
        }, 2500);
    };

    const handleCropRecommendation = () => {
        setCropLoading(true);
        setTimeout(() => {
            setCropLoading(false);
            setCropResult(['Wheat (HD-2967)', 'Mustard (Pusa-31)', 'Chickpea']);
        }, 1500);
    };

    return (
        <div className="p-4 space-y-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{t('features')}</h1>
                <p className="text-gray-500">Powered by Enterprise AI Models</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Voice Assistant */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Mic className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold">{t('aiAssistant')}</h2>
                        </div>
                        <p className="text-indigo-100 mb-6">Ask anything in Hindi, English, or Regional languages.</p>

                        <div className="h-48 bg-black/20 rounded-xl p-4 mb-4 overflow-y-auto backdrop-blur-sm border border-white/10 space-y-3">
                            {conversation.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <span className="text-[10px] text-indigo-200 uppercase tracking-wider mb-1">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                                    <div className={`p-3 rounded-lg text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-white/20 text-white' : 'bg-white text-indigo-900 shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {voiceActive && (
                                <div className="flex items-center space-x-2 text-indigo-200 text-sm animate-pulse">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <div className="w-2 h-2 bg-white rounded-full animation-delay-75"></div>
                                    <div className="w-2 h-2 bg-white rounded-full animation-delay-150"></div>
                                    <span>{t('listening')}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleVoiceClick}
                                disabled={voiceActive}
                                className={`flex-1 py-3 rounded-xl font-bold transition-all flex justify-center items-center shadow-lg ${voiceActive ? 'bg-red-500 text-white scale-95' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}
                            >
                                <Mic className={`w-5 h-5 mr-2 ${voiceActive ? 'animate-ping' : ''}`} />
                                {voiceActive ? t('listening') : t('tapToSpeak')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Disease Detection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Camera className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold">{t('diseaseDoctor')}</h2>
                    </div>

                    {!imageResult ? (
                        <>
                            <p className="text-gray-500 mb-6 text-sm">Upload a photo of your affected crop leaf for instant diagnosis.</p>
                            <div
                                onClick={handleImageUpload}
                                className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                            >
                                {analyzingImage ? (
                                    <div className="flex flex-col items-center text-green-600">
                                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                        <p className="font-semibold">Analyzing Leaf Structure...</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-medium text-gray-600">{t('uploadImage')}</p>
                                        <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG</p>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 animate-in fade-in zoom-in">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-800 text-lg">{imageResult.disease} Detected</h3>
                                    <p className="text-sm text-red-600 mb-2">Confidence: {imageResult.confidence}</p>
                                    <div className="bg-white p-3 rounded-lg border border-red-100">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Recommended Solution:</p>
                                        <p className="text-sm text-gray-800">{imageResult.solution}</p>
                                    </div>
                                    <button
                                        onClick={() => setImageResult(null)}
                                        className="mt-3 text-sm text-red-600 hover:underline font-medium"
                                    >
                                        Scan Another Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Crop Recommendation */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Brain className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h2 className="text-xl font-bold">{t('cropRecommender')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-4 col-span-2 grid grid-cols-2 gap-4">
                            {['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Soil pH', 'Rainfall (mm)'].map((label) => (
                                <div key={label} className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-gray-500">{label}</label>
                                    <input type="number" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="Enter value..." />
                                </div>
                            ))}
                            <div className="flex items-end">
                                <button
                                    onClick={handleCropRecommendation}
                                    disabled={cropLoading}
                                    className="w-full py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-colors flex justify-center items-center"
                                >
                                    {cropLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('getSuggestion')}
                                </button>
                            </div>
                        </div>

                        {/* Result Area */}
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100 flex flex-col justify-center items-center min-h-[200px]">
                            {cropResult ? (
                                <div className="text-center animate-in fade-in slide-in-from-bottom-4">
                                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                    <p className="text-sm text-green-800 font-medium mb-1">Top Recommendation:</p>
                                    <h3 className="text-2xl font-bold text-green-900 mb-2">{cropResult[0]}</h3>
                                    <div className="flex justify-center flex-wrap gap-2">
                                        {cropResult.slice(1).map(crop => (
                                            <span key={crop} className="px-3 py-1 bg-white text-green-700 text-xs font-bold rounded-full shadow-sm">{crop}</span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400">
                                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">Enter soil parameters to get AI-driven crop suggestions.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiFeatures;
