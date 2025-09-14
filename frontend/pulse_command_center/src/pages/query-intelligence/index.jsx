import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QueryFilters from './components/QueryFilters';
import QueryTable from './components/QueryTable';
import PatternAnalysis from './components/PatternAnalysis';
import QueryStats from './components/QueryStats';
import AlertPanel from './components/AlertPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QueryIntelligence = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [activeView, setActiveView] = useState('table');
  const [filters, setFilters] = useState({
    search: '',
    region: 'all',
    category: 'all',
    urgency: 'all',
    language: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Mock data for queries
  const mockQueries = [
    {
      id: 'Q2025001',
      timestamp: '2025-01-12T14:30:00Z',
      summary: 'High fever with body aches in multiple family members',
      symptoms: ['High fever (102°F)', 'Body aches', 'Headache', 'Fatigue'],
      category: 'fever',
      urgency: 'critical',
      location: { district: 'East District', block: 'Rampur Block' },
      language: 'Hindi',
      aiInsight: true,
      confidence: 87,
      affectedCount: 12
    },
    {
      id: 'Q2025002',
      timestamp: '2025-01-12T13:45:00Z',
      summary: 'Persistent cough and breathing difficulty',
      symptoms: ['Dry cough', 'Shortness of breath', 'Chest tightness'],
      category: 'respiratory',
      urgency: 'high',
      location: { district: 'North District', block: 'Industrial Area' },
      language: 'English',
      aiInsight: true,
      confidence: 73,
      affectedCount: 8
    },
    {
      id: 'Q2025003',
      timestamp: '2025-01-12T12:20:00Z',
      summary: 'Stomach pain and diarrhea in children',
      symptoms: ['Stomach pain', 'Diarrhea', 'Vomiting', 'Dehydration'],
      category: 'gastrointestinal',
      urgency: 'medium',
      location: { district: 'South District', block: 'Rural Block 3' },
      language: 'Hindi',
      aiInsight: false,
      confidence: 65,
      affectedCount: 5
    },
    {
      id: 'Q2025004',
      timestamp: '2025-01-12T11:15:00Z',
      summary: 'Skin rash and itching in school children',
      symptoms: ['Red rash', 'Itching', 'Skin irritation'],
      category: 'skin',
      urgency: 'medium',
      location: { district: 'West District', block: 'School Area' },
      language: 'Bengali',
      aiInsight: false,
      confidence: 58,
      affectedCount: 15
    },
    {
      id: 'Q2025005',
      timestamp: '2025-01-12T10:30:00Z',
      summary: 'Pregnancy-related concerns and complications',
      symptoms: ['Abdominal pain', 'Bleeding', 'Dizziness'],
      category: 'maternal',
      urgency: 'high',
      location: { district: 'Central District', block: 'Maternity Ward' },
      language: 'Hindi',
      aiInsight: true,
      confidence: 82,
      affectedCount: 3
    }
  ];

  // Mock data for alerts
  const mockAlerts = [
    {
      id: 'A2025001',
      title: 'Fever Outbreak Pattern Detected',
      description: 'Unusual spike in fever-related queries in East District, potentially indicating viral outbreak.',
      priority: 'critical',
      timestamp: '2025-01-12T14:00:00Z',
      location: 'East District',
      affectedCount: 24,
      confidence: 87,
      status: 'active',
      aiAnalysis: `AI analysis indicates a 87% probability of viral fever outbreak based on symptom clustering, geographic concentration, and temporal patterns. The affected population shows similar symptom progression with high fever, body aches, and headache as primary complaints.`,
      recommendations: [
        'Deploy rapid response team to East District immediately',
        'Set up fever screening camps in affected areas',
        'Initiate contact tracing for confirmed cases',
        'Increase surveillance in neighboring blocks'
      ],
      historicalCases: ['Viral Fever 2024-03', 'Dengue Outbreak 2023-09', 'Seasonal Flu 2024-01']
    },
    {
      id: 'A2025002',
      title: 'Respiratory Symptoms Cluster',
      description: 'Increased respiratory complaints near industrial area, possible environmental factor.',
      priority: 'high',
      timestamp: '2025-01-12T13:30:00Z',
      location: 'North District - Industrial Area',
      affectedCount: 18,
      confidence: 73,
      status: 'active',
      aiAnalysis: `Pattern recognition shows 73% correlation between respiratory symptoms and proximity to industrial facilities. Air quality monitoring recommended to identify potential environmental triggers.`,
      recommendations: [
        'Conduct environmental health assessment',
        'Monitor air quality in affected areas',
        'Coordinate with industrial safety officials',
        'Provide respiratory health guidance to residents'
      ],
      historicalCases: ['Air Pollution 2024-11', 'Industrial Incident 2023-07']
    }
  ];

  // Mock stats data
  const mockStats = {
    totalQueries: 847,
    criticalAlerts: 3,
    patternMatches: 12,
    responseRate: 94
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({
      search: '',
      region: 'all',
      category: 'all',
      urgency: 'all',
      language: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleQuerySelect = (queryIds) => {
    setSelectedQueries(queryIds);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on queries:`, selectedQueries);
    // Implement bulk actions here
    setSelectedQueries([]);
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert action: ${action} on alert: ${alertId}`);
    // Implement alert actions here
  };

  const handlePatternAction = (patternId, action) => {
    console.log(`Pattern action: ${action} on pattern: ${patternId}`);
    // Implement pattern actions here
  };

  const filteredQueries = mockQueries?.filter(query => {
    if (filters?.search && !query?.summary?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !query?.symptoms?.some(symptom => symptom?.toLowerCase()?.includes(filters?.search?.toLowerCase()))) {
      return false;
    }
    if (filters?.region !== 'all' && !query?.location?.district?.toLowerCase()?.includes(filters?.region)) {
      return false;
    }
    if (filters?.category !== 'all' && query?.category !== filters?.category) {
      return false;
    }
    if (filters?.urgency !== 'all' && query?.urgency !== filters?.urgency) {
      return false;
    }
    if (filters?.language !== 'all' && query?.language?.toLowerCase() !== filters?.language) {
      return false;
    }
    return true;
  });

  const views = [
    { id: 'table', label: 'Query Table', icon: 'Table' },
    { id: 'patterns', label: 'Pattern Analysis', icon: 'Brain' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3' }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isMobile ? false : sidebarCollapsed} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          isCollapsed={isMobile ? false : sidebarCollapsed} 
          onToggleSidebar={toggleSidebar} 
          isMobile={isMobile}
          isTablet={isTablet}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Query Intelligence</h1>
                    <p className="text-sm text-muted-foreground">Analyze and manage health queries</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={activeView === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveView('table')}
                    >
                      <Icon name="Table" className="mr-2 h-4 w-4" />
                      Table
                    </Button>
                    <Button
                      variant={activeView === 'patterns' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveView('patterns')}
                    >
                      <Icon name="PieChart" className="mr-2 h-4 w-4" />
                      Patterns
                    </Button>
                    <Button
                      variant={activeView === 'stats' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveView('stats')}
                    >
                      <Icon name="BarChart3" className="mr-2 h-4 w-4" />
                      Stats
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <QueryFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleFiltersReset}
                />

                {/* Dynamic Content Based on Active View */}
                <div className="rounded-lg border bg-card">
                  {activeView === 'table' && (
                    <QueryTable
                      queries={filteredQueries}
                      onQuerySelect={handleQuerySelect}
                      selectedQueries={selectedQueries}
                      onBulkAction={handleBulkAction}
                    />
                  )}

                  {activeView === 'patterns' && (
                    <PatternAnalysis
                      patterns={mockQueries}
                      onPatternAction={handlePatternAction}
                    />
                  )}

                  {activeView === 'stats' && (
                    <QueryStats stats={mockStats} />
                  )}
                </div>
              </div>

              {/* Right Column - Alerts Panel */}
              <div className="xl:col-span-1">
                <AlertPanel
                  alerts={mockAlerts}
                  onAlertAction={handleAlertAction}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-6 bg-card border border-border rounded-lg p-4 shadow-medical">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium text-foreground whitespace-nowrap">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Icon name="Zap" size={16} className="mr-2" />
                    Create Alert
                  </Button>
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Icon name="Users" size={16} className="mr-2" />
                    Contact ASHA Workers
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                Last sync: {new Date().toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QueryIntelligence;