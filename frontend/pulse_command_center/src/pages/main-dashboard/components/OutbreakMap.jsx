import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OutbreakMap = () => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const hotspots = [
    {
      id: 1,
      district: "Barabanki",
      state: "Uttar Pradesh",
      severity: "high",
      cases: 47,
      trend: "increasing",
      lat: 26.9124,
      lng: 81.1861,
      alert: "Dengue outbreak detected",
      recommendation: "Deploy rapid response team and initiate vector control measures immediately",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      district: "Sitapur",
      state: "Uttar Pradesh", 
      severity: "medium",
      cases: 23,
      trend: "stable",
      lat: 27.5667,
      lng: 80.6833,
      alert: "Seasonal flu cluster",
      recommendation: "Monitor closely and ensure adequate medical supplies",
      lastUpdated: "4 hours ago"
    },
    {
      id: 3,
      district: "Hardoi",
      state: "Uttar Pradesh",
      severity: "low",
      cases: 8,
      trend: "decreasing",
      lat: 27.4167,
      lng: 80.1333,
      alert: "Gastroenteritis cases",
      recommendation: "Continue water quality monitoring and hygiene awareness",
      lastUpdated: "6 hours ago"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-accent';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical h-full">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Outbreak Alert Map</h3>
            <p className="text-sm text-muted-foreground">Real-time health intelligence across districts</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              <Icon name="Satellite" size={16} className="mr-2" />
              Satellite
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              <Icon name="Map" size={16} className="mr-2" />
              Terrain
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Health Alert Map - Uttar Pradesh Districts"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=27.0,80.5&z=8&output=embed"
          className="rounded-b-lg"
        />

        {/* Hotspot Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {hotspots?.map((hotspot) => (
            <div
              key={hotspot?.id}
              className={`absolute w-6 h-6 ${getSeverityColor(hotspot?.severity)} rounded-full border-2 border-white shadow-lg cursor-pointer pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform pulse-vital`}
              style={{
                left: `${30 + (hotspot?.id * 15)}%`,
                top: `${40 + (hotspot?.id * 10)}%`
              }}
              onClick={() => handleHotspotClick(hotspot)}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{hotspot?.cases}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-medical">
          <h4 className="text-sm font-medium text-foreground mb-2">Alert Severity</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-xs text-muted-foreground">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Low Risk</span>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Hotspot Details */}
      {selectedHotspot && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-foreground">{selectedHotspot?.district}, {selectedHotspot?.state}</h4>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  selectedHotspot?.severity === 'high' ? 'bg-accent text-accent-foreground' :
                  selectedHotspot?.severity === 'medium' ? 'bg-warning text-warning-foreground' :
                  'bg-success text-success-foreground'
                }`}>
                  <Icon name={getTrendIcon(selectedHotspot?.trend)} size={12} />
                  <span>{selectedHotspot?.trend}</span>
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-2">{selectedHotspot?.alert}</p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Brain" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">AI Recommendation</p>
                    <p className="text-sm text-foreground">{selectedHotspot?.recommendation}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{selectedHotspot?.cases} reported cases</span>
                <span>Updated {selectedHotspot?.lastUpdated}</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedHotspot(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutbreakMap;