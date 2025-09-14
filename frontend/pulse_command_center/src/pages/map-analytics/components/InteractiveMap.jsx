import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveMap = ({ 
  selectedLayer, 
  selectedDate, 
  onRegionClick,
  isFullscreen 
}) => {
  const [mapData, setMapData] = useState([]);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Mock map regions data
  const mockRegions = [
    {
      id: 'rajgarh',
      name: 'Rajgarh District',
      coordinates: { lat: 23.7, lng: 76.8 },
      bounds: { north: 24.0, south: 23.4, east: 77.1, west: 76.5 },
      data: {
        'disease-surveillance': { value: 23, level: 'medium', color: '#f59e0b' },
        'resource-availability': { value: 67, level: 'adequate', color: '#10b981' },
        'population-density': { value: 251, level: 'low', color: '#3b82f6' },
        'outbreak-patterns': { value: 3, level: 'occasional', color: '#f59e0b' },
        'vulnerability-index': { value: 0.45, level: 'high', color: '#ef4444' },
        'intervention-outcomes': { value: 85, level: 'good', color: '#10b981' }
      }
    },
    {
      id: 'sehore',
      name: 'Sehore District',
      coordinates: { lat: 23.2, lng: 77.1 },
      bounds: { north: 23.5, south: 22.9, east: 77.4, west: 76.8 },
      data: {
        'disease-surveillance': { value: 8, level: 'low', color: '#10b981' },
        'resource-availability': { value: 82, level: 'well-stocked', color: '#10b981' },
        'population-density': { value: 398, level: 'medium', color: '#3b82f6' },
        'outbreak-patterns': { value: 1, level: 'rare', color: '#10b981' },
        'vulnerability-index': { value: 0.28, level: 'moderate', color: '#f59e0b' },
        'intervention-outcomes': { value: 92, level: 'excellent', color: '#10b981' }
      }
    },
    {
      id: 'bhopal',
      name: 'Bhopal District',
      coordinates: { lat: 23.3, lng: 77.4 },
      bounds: { north: 23.6, south: 23.0, east: 77.7, west: 77.1 },
      data: {
        'disease-surveillance': { value: 45, level: 'high', color: '#ef4444' },
        'resource-availability': { value: 91, level: 'well-stocked', color: '#10b981' },
        'population-density': { value: 855, level: 'high', color: '#1e40af' },
        'outbreak-patterns': { value: 7, level: 'frequent', color: '#ef4444' },
        'vulnerability-index': { value: 0.52, level: 'high', color: '#ef4444' },
        'intervention-outcomes': { value: 78, level: 'good', color: '#10b981' }
      }
    },
    {
      id: 'raisen',
      name: 'Raisen District',
      coordinates: { lat: 23.3, lng: 77.8 },
      bounds: { north: 23.6, south: 23.0, east: 78.1, west: 77.5 },
      data: {
        'disease-surveillance': { value: 12, level: 'low', color: '#10b981' },
        'resource-availability': { value: 58, level: 'low', color: '#f59e0b' },
        'population-density': { value: 189, level: 'low', color: '#60a5fa' },
        'outbreak-patterns': { value: 2, level: 'rare', color: '#10b981' },
        'vulnerability-index': { value: 0.38, level: 'moderate', color: '#f59e0b' },
        'intervention-outcomes': { value: 71, level: 'good', color: '#10b981' }
      }
    },
    {
      id: 'vidisha',
      name: 'Vidisha District',
      coordinates: { lat: 23.5, lng: 77.8 },
      bounds: { north: 23.8, south: 23.2, east: 78.1, west: 77.5 },
      data: {
        'disease-surveillance': { value: 31, level: 'medium', color: '#f59e0b' },
        'resource-availability': { value: 73, level: 'adequate', color: '#10b981' },
        'population-density': { value: 312, level: 'medium', color: '#3b82f6' },
        'outbreak-patterns': { value: 4, level: 'occasional', color: '#f59e0b' },
        'vulnerability-index': { value: 0.41, level: 'high', color: '#ef4444' },
        'intervention-outcomes': { value: 83, level: 'good', color: '#10b981' }
      }
    }
  ];

  useEffect(() => {
    setMapData(mockRegions);
  }, []);

  const handleRegionClick = (region) => {
    onRegionClick(region);
  };

  const handleRegionHover = (region) => {
    setHoveredRegion(region);
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
  };

  const getRegionStyle = (region) => {
    const data = region?.data?.[selectedLayer];
    return {
      fill: data?.color || '#94a3b8',
      stroke: hoveredRegion?.id === region?.id ? '#1e40af' : '#64748b',
      strokeWidth: hoveredRegion?.id === region?.id ? 3 : 1,
      opacity: 0.8,
      cursor: 'pointer'
    };
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[400px] md:h-[600px] w-full'}`}>
      {/* Map container */}
      <div 
        className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md relative"
        onMouseLeave={() => !isMobile && setHoveredRegion(null)}
        onTouchEnd={() => isMobile && setHoveredRegion(null)}
      >
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Madhya Pradesh Health Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=23.3,77.4&z=8&output=embed"
          className="absolute inset-0"
        />

        {/* SVG Overlay for Interactive Regions */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        >
          {mapData?.map((region) => (
            <g key={region?.id}>
              {/* Region Polygon (simplified representation) */}
              <polygon
                points={`${region?.coordinates?.lng * 10},${region?.coordinates?.lat * 20} ${(region?.coordinates?.lng + 0.3) * 10},${region?.coordinates?.lat * 20} ${(region?.coordinates?.lng + 0.3) * 10},${(region?.coordinates?.lat + 0.3) * 20} ${region?.coordinates?.lng * 10},${(region?.coordinates?.lat + 0.3) * 20}`}
                style={getRegionStyle(region)}
                className="pointer-events-auto transition-all duration-200"
                onClick={() => handleRegionClick(region)}
                onMouseEnter={() => handleRegionHover(region)}
                onMouseLeave={handleRegionLeave}
              />
              
              {/* Region Label */}
              <text
                x={region?.coordinates?.lng * 10 + 15}
                y={region?.coordinates?.lat * 20 + 15}
                className="fill-white text-xs font-medium pointer-events-none"
                textAnchor="middle"
              >
                {region?.name?.split(' ')?.[0]}
              </text>
              
              {/* Data Value Display */}
              <text
                x={region?.coordinates?.lng * 10 + 15}
                y={region?.coordinates?.lat * 20 + 30}
                className="fill-white text-xs font-bold pointer-events-none"
                textAnchor="middle"
              >
                {region?.data?.[selectedLayer]?.value}
              </text>
            </g>
          ))}
        </svg>

        {/* Region hover card */}
        {hoveredRegion && (
          <div 
            className={`absolute z-20 p-3 md:p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg ${
              isMobile ? 'w-[90%] left-1/2 bottom-4 transform -translate-x-1/2' : 'max-w-xs'
            }`}
            style={isMobile ? {} : {
              left: hoveredRegion.position.x,
              top: hoveredRegion.position.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="text-center">
              <h4 className="font-semibold text-foreground">{hoveredRegion?.name}</h4>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-sm text-muted-foreground">Current Value:</span>
                  <span className="font-medium text-foreground">
                    {hoveredRegion?.data?.[selectedLayer]?.value}
                  </span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-sm text-muted-foreground">Level:</span>
                  <span className="font-medium text-foreground capitalize">
                    {hoveredRegion?.data?.[selectedLayer]?.level}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click for detailed analysis
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {mapData?.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading map data...</p>
            </div>
          </div>
        )}

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          © Google Maps | Health Intelligence Layer
        </div>
      </div>
      {/* Hotspot Indicators */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {mapData?.filter(region => 
          region?.data?.[selectedLayer]?.level === 'high' || 
          region?.data?.[selectedLayer]?.level === 'frequent' ||
          region?.data?.[selectedLayer]?.level === 'critical'
        )?.map(region => (
          <div
            key={region?.id}
            className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium pulse-urgent cursor-pointer"
            onClick={() => handleRegionClick(region)}
          >
            <Icon name="AlertTriangle" size={12} className="mr-1 inline" />
            {region?.name?.split(' ')?.[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMap;