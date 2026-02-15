import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/Dashboard';
import AiFeatures from './pages/AiFeatures';
import Production from './pages/Production';
import Finance from './pages/Finance';
import Inventory from './pages/Inventory';
import Schemes from './pages/Schemes';
import Market from './pages/Market';
import Auth from './pages/Auth';
import { PhoneCall } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 md:ml-64 p-4 transition-all duration-300 relative">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'production' && <Production />}
        {activeTab === 'features' && <AiFeatures />}
        {activeTab === 'finance' && <Finance />}
        {activeTab === 'inventory' && <Inventory />}
        {activeTab === 'schemes' && <Schemes />}
        {activeTab === 'market' && <Market />}

        {/* Kisan Call Center FAB */}
        <button
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all z-50 flex items-center justify-center animate-bounce"
          title="Kisan Call Center (1551)"
          onClick={() => window.open('tel:1551')}
        >
          <PhoneCall size={24} />
        </button>
      </main>
    </div>
  );
}

export default App;
