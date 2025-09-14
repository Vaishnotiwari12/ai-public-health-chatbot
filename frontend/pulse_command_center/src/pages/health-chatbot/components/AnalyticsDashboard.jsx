import React, { useState, useEffect } from 'react';
import {
  LineChart, BarChart, PieChart, Line, Bar, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { useTranslation } from 'react-i18next';

// Sample color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Main Analytics Dashboard Component
const AnalyticsDashboard = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  
  // Sample data - in a real app, this would come from an API
  const [analyticsData, setAnalyticsData] = useState({
    healthTrends: [],
    vaccinationData: [],
    symptomData: [],
    communityData: []
  });

  // Fetch data from government health API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, replace with actual API calls
        // Example: const response = await fetch('GOVERNMENT_HEALTH_API_ENDPOINT');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = {
          healthTrends: generateHealthTrendsData(timeRange),
          vaccinationData: generateVaccinationData(),
          symptomData: generateSymptomData(),
          communityData: generateCommunityData()
        };
        
        setAnalyticsData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  // Data generation functions (replace with real API calls)
  const generateHealthTrendsData = (range) => {
    const days = range === 'week' ? 7 : 30;
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 86400000).toLocaleDateString(),
      cases: Math.floor(Math.random() * 1000),
      recovered: Math.floor(Math.random() * 800),
      active: Math.floor(Math.random() * 200)
    }));
  };

  const generateVaccinationData = () => {
    return [
      { name: 'COVID-19', firstDose: 75, secondDose: 60, booster: 40 },
      { name: 'Influenza', firstDose: 45, secondDose: 30, booster: 15 },
      { name: 'Tetanus', firstDose: 60, secondDose: 55, booster: 25 },
    ];
  };

  const generateSymptomData = () => {
    return [
      { name: 'Fever', count: 45 },
      { name: 'Cough', count: 65 },
      { name: 'Fatigue', count: 30 },
      { name: 'Headache', count: 25 },
      { name: 'Other', count: 15 },
    ];
  };

  const generateCommunityData = () => {
    return [
      { name: 'Vaccinated', value: 65 },
      { name: 'Partially Vaccinated', value: 20 },
      { name: 'Not Vaccinated', value: 15 },
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Health Trends Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{t('analytics.healthTrends', 'Health Trends')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.healthTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="cases" stroke="#FF8042" strokeWidth={2} />
              <Line type="monotone" dataKey="recovered" stroke="#00C49F" strokeWidth={2} />
              <Line type="monotone" dataKey="active" stroke="#0088FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vaccination Coverage */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t('analytics.vaccination', 'Vaccination Coverage')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.vaccinationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="firstDose" fill="#8884d8" name={t('analytics.firstDose', 'First Dose')} />
                <Bar dataKey="secondDose" fill="#82ca9d" name={t('analytics.secondDose', 'Second Dose')} />
                <Bar dataKey="booster" fill="#ffc658" name={t('analytics.booster', 'Booster')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Symptom Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t('analytics.symptomDistribution', 'Symptom Distribution')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.symptomData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.symptomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Community Insights */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{t('analytics.communityInsights', 'Community Insights')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={analyticsData.communityData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#8884d8" name="Percentage">
                {analyticsData.communityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
