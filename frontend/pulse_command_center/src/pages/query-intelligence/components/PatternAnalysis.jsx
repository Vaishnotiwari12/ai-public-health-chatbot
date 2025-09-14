import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatternAnalysis = ({ patterns, onPatternAction }) => {
  const [activeTab, setActiveTab] = useState('trends');

  const trendData = [
    { date: '2025-01-06', fever: 45, respiratory: 32, gastrointestinal: 28, skin: 15 },
    { date: '2025-01-07', fever: 52, respiratory: 38, gastrointestinal: 31, skin: 18 },
    { date: '2025-01-08', fever: 48, respiratory: 41, gastrointestinal: 35, skin: 22 },
    { date: '2025-01-09', fever: 67, respiratory: 45, gastrointestinal: 29, skin: 19 },
    { date: '2025-01-10', fever: 73, respiratory: 52, gastrointestinal: 33, skin: 25 },
    { date: '2025-01-11', fever: 89, respiratory: 58, gastrointestinal: 41, skin: 28 },
    { date: '2025-01-12', fever: 95, respiratory: 62, gastrointestinal: 38, skin: 31 }
  ];

  const categoryDistribution = [
    { name: 'Fever & Temperature', value: 35, color: '#dc2626' },
    { name: 'Respiratory Issues', value: 28, color: '#2563eb' },
    { name: 'Digestive Problems', value: 18, color: '#059669' },
    { name: 'Skin Conditions', value: 12, color: '#d97706' },
    { name: 'Others', value: 7, color: '#6b7280' }
  ];

  const geographicData = [
    { region: 'North District', queries: 156, trend: '+12%', risk: 'high' },
    { region: 'South District', queries: 134, trend: '+8%', risk: 'medium' },
    { region: 'East District', queries: 189, trend: '+18%', risk: 'critical' },
    { region: 'West District', queries: 98, trend: '+3%', risk: 'low' },
    { region: 'Central District', queries: 167, trend: '+15%', risk: 'high' }
  ];

  const emergingPatterns = [
    {
      id: 1,
      pattern: "Unusual fever spike in East District",
      confidence: 87,
      affectedPopulation: "~2,400 people",
      timeframe: "Last 48 hours",
      symptoms: ["High fever", "Body aches", "Headache"],
      recommendation: "Deploy rapid response team for investigation",
      status: "active",
      priority: "critical"
    },
    {
      id: 2,
      pattern: "Respiratory symptoms clustering near industrial area",
      confidence: 73,
      affectedPopulation: "~1,800 people",
      timeframe: "Last 72 hours",
      symptoms: ["Cough", "Breathing difficulty", "Chest pain"],
      recommendation: "Environmental health assessment required",
      status: "monitoring",
      priority: "high"
    },
    {
      id: 3,
      pattern: "Gastrointestinal issues in rural blocks",
      confidence: 65,
      affectedPopulation: "~950 people",
      timeframe: "Last 5 days",
      symptoms: ["Diarrhea", "Vomiting", "Stomach pain"],
      recommendation: "Water quality testing and sanitation review",
      status: "investigating",
      priority: "medium"
    }
  ];

  const tabs = [
    { id: 'trends', label: 'Trend Analysis', icon: 'TrendingUp' },
    { id: 'patterns', label: 'Emerging Patterns', icon: 'Brain' },
    { id: 'geographic', label: 'Geographic Clusters', icon: 'Map' },
    { id: 'categories', label: 'Category Distribution', icon: 'PieChart' }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Pattern Analysis</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full pulse-vital"></div>
            <span className="text-xs text-success font-medium">AI Active</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex items-center space-x-1 p-4 border-b border-border bg-muted/20">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab?.id)}
            className="transition-quick"
          >
            <Icon name={tab?.icon} size={16} className="mr-2" />
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Content */}
      <div className="p-4">
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">7-Day Query Trends by Category</h4>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span>Fever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>Respiratory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Gastrointestinal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-600 rounded"></div>
                  <span>Skin</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="fever" stroke="#dc2626" strokeWidth={2} dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="respiratory" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="gastrointestinal" stroke="#059669" strokeWidth={2} dot={{ fill: '#059669', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="skin" stroke="#d97706" strokeWidth={2} dot={{ fill: '#d97706', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Emerging Health Patterns</h4>
              <span className="text-sm text-muted-foreground">
                {emergingPatterns?.length} patterns detected
              </span>
            </div>
            
            {emergingPatterns?.map((pattern) => (
              <div key={pattern?.id} className="border border-border rounded-lg p-4 hover:shadow-medical transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-1 h-12 ${getPriorityColor(pattern?.priority)} rounded-full`}></div>
                    <div>
                      <h5 className="font-medium text-foreground">{pattern?.pattern}</h5>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>Confidence: {pattern?.confidence}%</span>
                        <span>•</span>
                        <span>{pattern?.timeframe}</span>
                        <span>•</span>
                        <span>{pattern?.affectedPopulation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskColor(pattern?.priority)}`}>
                      {pattern?.priority}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h6 className="text-sm font-medium text-foreground mb-2">Common Symptoms</h6>
                    <div className="flex flex-wrap gap-1">
                      {pattern?.symptoms?.map((symptom, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-foreground mb-2">AI Recommendation</h6>
                    <p className="text-sm text-muted-foreground">{pattern?.recommendation}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    pattern?.status === 'active' ? 'text-red-600 bg-red-50' :
                    pattern?.status === 'monitoring'? 'text-yellow-600 bg-yellow-50' : 'text-blue-600 bg-blue-50'
                  }`}>
                    {pattern?.status}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={14} className="mr-2" />
                      View Details
                    </Button>
                    <Button variant="default" size="sm">
                      <Icon name="AlertTriangle" size={14} className="mr-2" />
                      Create Alert
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'geographic' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Geographic Query Clusters</h4>
              <Button variant="outline" size="sm">
                <Icon name="Map" size={16} className="mr-2" />
                View on Map
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {geographicData?.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-medical transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      region?.risk === 'critical' ? 'bg-red-600 pulse-urgent' :
                      region?.risk === 'high' ? 'bg-orange-600' :
                      region?.risk === 'medium'? 'bg-yellow-600' : 'bg-green-600'
                    }`}></div>
                    <div>
                      <h5 className="font-medium text-foreground">{region?.region}</h5>
                      <p className="text-sm text-muted-foreground">{region?.queries} queries</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        region?.trend?.startsWith('+') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {region?.trend}
                      </div>
                      <div className="text-xs text-muted-foreground">vs last week</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskColor(region?.risk)}`}>
                      {region?.risk} risk
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="ChevronRight" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Query Category Distribution</h4>
              <span className="text-sm text-muted-foreground">Last 7 days</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {categoryDistribution?.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category?.color }}
                      ></div>
                      <span className="text-sm font-medium text-foreground">{category?.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{category?.value}%</div>
                      <div className="text-xs text-muted-foreground">of total queries</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternAnalysis;