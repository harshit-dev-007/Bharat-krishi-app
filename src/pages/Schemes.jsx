import React from 'react';
import { Landmark, ExternalLink, ChevronRight, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Schemes = () => {
    const { t } = useLanguage();

    const schemes = [
        {
            id: 1,
            title: "PM-KISAN Samman Nidhi",
            description: "Financial benefit of ₹6,000 per year to eligible farmer families.",
            eligibility: "Small and marginal farmers",
            deadline: "Open All Year",
            link: "https://pmkisan.gov.in/"
        },
        {
            id: 2,
            title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Crop insurance scheme tailored for farmers to protect against yield losses.",
            eligibility: "All farmers growing notified crops",
            deadline: "31st July 2026",
            link: "https://pmfby.gov.in/"
        },
        {
            id: 3,
            title: "Kisan Credit Card (KCC)",
            description: "Access to credit for farmers for agriculture and allied activities.",
            eligibility: "All farmers, tenant farmers, sharecroppers",
            deadline: "Apply at Bank",
            link: "#"
        },
        {
            id: 4,
            title: "Soil Health Card Scheme",
            description: "Government issued card giving information on nutrient status of soil.",
            eligibility: "All land holding farmers",
            deadline: "Every 2 Years",
            link: "https://soilhealth.dac.gov.in/"
        }
    ];

    return (
        <div className="p-4 space-y-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{t('schemes')}</h1>
                <p className="text-gray-500">Government support & Yojanas for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemes.map(scheme => (
                    <div key={scheme.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                                    <Landmark size={24} />
                                </div>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                    Active
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                                {scheme.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                {scheme.description}
                            </p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-sm text-gray-600">
                                    <FileCheck size={16} className="mr-2 text-gray-400" />
                                    <span className="font-medium">Eligibility:</span>
                                    <span className="ml-1 text-gray-500">{scheme.eligibility}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <ClockIcon size={16} className="mr-2 text-gray-400" />
                                    <span className="font-medium">Deadline:</span>
                                    <span className="ml-1 text-gray-500">{scheme.deadline}</span>
                                </div>
                            </div>

                            <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center w-full justify-center px-4 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-colors"
                            >
                                {t('applyNow')} <ExternalLink size={16} className="ml-2" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ClockIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
)

export default Schemes;
