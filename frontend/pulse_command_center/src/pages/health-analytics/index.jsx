import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { OutbreakTracker, FacilityCapacity } from './components';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * HealthAnalytics Dashboard
 * 
 * Main container component for the health analytics dashboard.
 * Features:
 * - Modular component architecture
 * - Internationalization support
 * - Responsive design
 * - Easy to extend with new analytics components
 */

const HealthAnalytics = ({ defaultTab = 'overview' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update active tab when URL changes
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'health-analytics' || path === '') {
      setActiveTab('overview');
    } else if (['outbreaks', 'facilities'].includes(path)) {
      setActiveTab(path);
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/health-analytics/${tab === 'overview' ? '' : tab}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'outbreaks':
        return <OutbreakTracker />;
      case 'facilities':
        return <FacilityCapacity />;
      case 'overview':
      default:
        return (
          <>
            <OutbreakTracker />
            <FacilityCapacity />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{t('analytics.title', 'Health Analytics Dashboard')}</h1>
          <p className="text-blue-100">
            {t('analytics.subtitle', 'Comprehensive health monitoring and analytics')}
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-blue-700">
          <div className="container mx-auto px-4 flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
              { id: 'outbreaks', label: 'Disease Outbreaks', icon: 'AlertTriangle' },
              { id: 'facilities', label: 'Facility Capacity', icon: 'Building2' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-800'
                    : 'text-blue-100 hover:bg-blue-600'
                }`}
              >
                <div className="flex items-center">
                  <i className={`ri-${tab.icon}-line mr-2`}></i>
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 space-y-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default HealthAnalytics;
