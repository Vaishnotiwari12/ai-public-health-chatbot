import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionDashboard = ({ selectedRegion, onClose }) => {
  if (!selectedRegion) return null;

  const regionData = {
    name: "Rajgarh District",
    state: "Madhya Pradesh",
    population: "1,545,814",
    area: "6,154 km²",
    blocks: 9,
    villages: 1247,
    healthWorkers: 342,
    facilities: {
      hospitals: 12,
      phcs: 45,
      subcenters: 156
    },
    currentMetrics: {
      activeCases: 23,
      riskLevel: "Medium",
      resourceAvailability: 67,
      lastUpdate: "2 hours ago"
    },
    recentInterventions: [
      {
        id: 1,
        type: "Vaccination Drive",
        date: "2025-01-10",
        coverage: "85%",
        status: "completed"
      },
      {
        id: 2,
        type: "Water Quality Testing",
        date: "2025-01-08",
        coverage: "92%",
        status: "completed"
      },
      {
        id: 3,
        type: "Malaria Prevention",
        date: "2025-01-05",
        coverage: "78%",
        status: "ongoing"
      }
    ],
    trends: {
      cases: { current: 23, previous: 31, change: -25.8 },
      resources: { current: 67, previous: 62, change: 8.1 },
      coverage: { current: 85, previous: 82, change: 3.7 }
    }
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'ongoing': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="absolute top-4 right-4 z-20 w-96 bg-card border border-border rounded-lg shadow-medical-lg backdrop-blur-medical max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">{regionData?.name}</h3>
          <p className="text-sm text-muted-foreground">{regionData?.state}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Population</p>
            <p className="font-semibold text-foreground">{regionData?.population}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-semibold text-foreground">{regionData?.area}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Blocks</p>
            <p className="font-semibold text-foreground">{regionData?.blocks}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Villages</p>
            <p className="font-semibold text-foreground">{regionData?.villages}</p>
          </div>
        </div>

        {/* Current Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Activity" size={16} className="mr-2 text-primary" />
            Current Status
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Active Cases</p>
                <p className="text-xs text-muted-foreground">Disease surveillance</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{regionData?.currentMetrics?.activeCases}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(regionData?.currentMetrics?.riskLevel)}`}>
                  {regionData?.currentMetrics?.riskLevel} Risk
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Resource Availability</p>
                <p className="text-xs text-muted-foreground">Medical supplies & staff</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{regionData?.currentMetrics?.resourceAvailability}%</p>
                <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${regionData?.currentMetrics?.resourceAvailability}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Infrastructure */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Building" size={16} className="mr-2 text-secondary" />
            Health Infrastructure
          </h4>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-foreground">{regionData?.facilities?.hospitals}</p>
              <p className="text-xs text-muted-foreground">Hospitals</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-foreground">{regionData?.facilities?.phcs}</p>
              <p className="text-xs text-muted-foreground">PHCs</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-foreground">{regionData?.facilities?.subcenters}</p>
              <p className="text-xs text-muted-foreground">Sub-centers</p>
            </div>
          </div>
          
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <p className="text-lg font-bold text-primary">{regionData?.healthWorkers}</p>
            <p className="text-xs text-muted-foreground">Active Health Workers</p>
          </div>
        </div>

        {/* Recent Interventions */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Target" size={16} className="mr-2 text-success" />
            Recent Interventions
          </h4>
          
          <div className="space-y-2">
            {regionData?.recentInterventions?.map((intervention) => (
              <div key={intervention?.id} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{intervention?.type}</p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(intervention?.status)}`}>
                    {intervention?.status}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{intervention?.date}</span>
                  <span>Coverage: {intervention?.coverage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Indicators */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2 text-trust" />
            Trends (vs. last period)
          </h4>
          
          <div className="space-y-2">
            {Object.entries(regionData?.trends)?.map(([key, trend]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <span className="text-sm text-foreground capitalize">{key}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{trend?.current}</span>
                  <div className={`flex items-center text-xs ${
                    trend?.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <Icon 
                      name={trend?.change > 0 ? "TrendingUp" : "TrendingDown"} 
                      size={12} 
                      className="mr-1" 
                    />
                    {Math.abs(trend?.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="default" className="w-full">
            <Icon name="FileText" size={16} className="mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" className="w-full">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Create Alert
          </Button>
        </div>

        {/* Last Updated */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Last updated: {regionData?.currentMetrics?.lastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionDashboard;