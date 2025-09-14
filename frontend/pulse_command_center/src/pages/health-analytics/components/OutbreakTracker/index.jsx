import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiAlertTriangle, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * OutbreakTracker Component
 * 
 * Displays information about active disease outbreaks with trends and statistics.
 * Features:
 * - Real-time outbreak monitoring
 * - Trend analysis
 * - Risk level assessment
 * - Interactive data visualization
 */

// Mock data generator for demonstration
const generateOutbreakData = () => {
  const diseases = ['Dengue', 'Malaria', 'Cholera', 'Influenza', 'COVID-19'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];
  
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    disease: diseases[i % diseases.length],
    location: locations[i % locations.length],
    cases: Math.floor(Math.random() * 1000) + 100,
    trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
    riskLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
    lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

// Generate timeline data for the chart
const generateTimelineData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    name: month,
    cases: Math.floor(Math.random() * 1000) + 100,
    hospitalizations: Math.floor(Math.random() * 500) + 50,
  }));
};

const OutbreakTracker = () => {
  const { t } = useTranslation();
  const [outbreakData] = React.useState(generateOutbreakData());
  const [timelineData] = React.useState(generateTimelineData());
  const [selectedOutbreak, setSelectedOutbreak] = React.useState(null);

  // Helper function to determine risk level styling
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  // Helper function to render trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FiTrendingUp className="text-red-500" />;
      case 'down': return <FiTrendingUp className="transform rotate-180 text-green-500" />;
      default: return <FiTrendingUp className="text-blue-500 opacity-0" />; // Invisible icon for stable trend
    }
  };

  return (
    <div className="space-y-6">
      {/* Outbreak Alerts Section */}
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FiAlertTriangle className="mr-2 text-yellow-500" />
          {t('analytics.activeOutbreaks', 'Active Outbreaks')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outbreakData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedOutbreak(item)}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                selectedOutbreak?.id === item.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{item.disease}</h3>
                  <p className="text-gray-600 flex items-center">
                    <FiMapPin className="mr-1" size={14} />
                    {item.location}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.riskLevel)}`}>
                  {item.riskLevel.toUpperCase()}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-2xl font-bold">{item.cases.toLocaleString()}</div>
                <div className="flex items-center">
                  {getTrendIcon(item.trend)}
                  <span className="ml-1 text-sm text-gray-500">
                    {item.trend === 'up' ? 'Increasing' : item.trend === 'down' ? 'Decreasing' : 'Stable'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases Timeline Chart */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            {t('analytics.casesTimeline', 'Cases Timeline - Last 6 Months')}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="Reported Cases" 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="hospitalizations" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  name="Hospitalizations" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Disease Distribution Chart */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            {t('analytics.diseaseDistribution', 'Disease Distribution')}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  name="Disease Cases"
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Selected Outbreak Details */}
      {selectedOutbreak && (
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            {t('analytics.outbreakDetails', 'Outbreak Details')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900">{selectedOutbreak.disease} in {selectedOutbreak.location}</h3>
              <div className="mt-4 space-y-3">
                <p className="flex justify-between">
                  <span className="text-gray-600">Total Cases:</span>
                  <span className="font-medium">{selectedOutbreak.cases.toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedOutbreak.riskLevel)}`}>
                    {selectedOutbreak.riskLevel.toUpperCase()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Trend:</span>
                  <span className="flex items-center">
                    {getTrendIcon(selectedOutbreak.trend)}
                    <span className="ml-1">
                      {selectedOutbreak.trend === 'up' ? 'Increasing' : selectedOutbreak.trend === 'down' ? 'Decreasing' : 'Stable'}
                    </span>
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{new Date(selectedOutbreak.lastUpdated).toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">Recommended Actions</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {selectedOutbreak.riskLevel === 'high' && (
                  <li>Issue public health advisory</li>
                )}
                <li>Increase testing in affected areas</li>
                <li>Coordinate with local health authorities</li>
                <li>Mobilize additional medical resources</li>
                <li>Launch public awareness campaign</li>
              </ul>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                View Detailed Response Plan
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default OutbreakTracker;
