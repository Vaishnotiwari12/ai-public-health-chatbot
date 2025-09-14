import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapLegend = ({ selectedLayer }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const legendData = {
    'disease-surveillance': {
      title: 'Disease Surveillance',
      items: [
        { color: 'bg-green-500', label: 'No Active Cases', value: '0 cases' },
        { color: 'bg-yellow-500', label: 'Low Risk', value: '1-5 cases' },
        { color: 'bg-orange-500', label: 'Medium Risk', value: '6-15 cases' },
        { color: 'bg-red-500', label: 'High Risk', value: '16+ cases' },
        { color: 'bg-purple-500', label: 'Outbreak Alert', value: 'Active outbreak' }
      ]
    },
    'resource-availability': {
      title: 'Resource Availability',
      items: [
        { color: 'bg-green-500', label: 'Well Stocked', value: '80-100%' },
        { color: 'bg-yellow-500', label: 'Adequate', value: '60-79%' },
        { color: 'bg-orange-500', label: 'Low Stock', value: '40-59%' },
        { color: 'bg-red-500', label: 'Critical', value: '20-39%' },
        { color: 'bg-gray-500', label: 'No Data', value: 'Unknown' }
      ]
    },
    'population-density': {
      title: 'Population Density',
      items: [
        { color: 'bg-blue-200', label: 'Very Low', value: '<100/km²' },
        { color: 'bg-blue-400', label: 'Low', value: '100-300/km²' },
        { color: 'bg-blue-600', label: 'Medium', value: '300-600/km²' },
        { color: 'bg-blue-800', label: 'High', value: '600-1000/km²' },
        { color: 'bg-blue-900', label: 'Very High', value: '>1000/km²' }
      ]
    },
    'outbreak-patterns': {
      title: 'Historical Outbreaks',
      items: [
        { color: 'bg-green-500', label: 'No History', value: '0 outbreaks' },
        { color: 'bg-yellow-500', label: 'Rare', value: '1-2 outbreaks' },
        { color: 'bg-orange-500', label: 'Occasional', value: '3-5 outbreaks' },
        { color: 'bg-red-500', label: 'Frequent', value: '6+ outbreaks' },
        { color: 'bg-purple-500', label: 'Hotspot', value: 'Recurring pattern' }
      ]
    },
    'vulnerability-index': {
      title: 'Vulnerability Index',
      items: [
        { color: 'bg-green-500', label: 'Low Risk', value: '0.0-0.2' },
        { color: 'bg-yellow-500', label: 'Moderate Risk', value: '0.2-0.4' },
        { color: 'bg-orange-500', label: 'High Risk', value: '0.4-0.6' },
        { color: 'bg-red-500', label: 'Very High Risk', value: '0.6-0.8' },
        { color: 'bg-purple-500', label: 'Critical Risk', value: '0.8-1.0' }
      ]
    },
    'intervention-outcomes': {
      title: 'Intervention Success',
      items: [
        { color: 'bg-green-500', label: 'Excellent', value: '90-100%' },
        { color: 'bg-yellow-500', label: 'Good', value: '70-89%' },
        { color: 'bg-orange-500', label: 'Fair', value: '50-69%' },
        { color: 'bg-red-500', label: 'Poor', value: '30-49%' },
        { color: 'bg-gray-500', label: 'No Data', value: '<30%' }
      ]
    }
  };

  const currentLegend = legendData?.[selectedLayer] || legendData?.['disease-surveillance'];

  return (
    <div className="absolute bottom-4 left-4 z-20 bg-card border border-border rounded-lg shadow-medical-lg backdrop-blur-medical">
      {/* Legend Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <h4 className="font-medium text-foreground text-sm">{currentLegend?.title}</h4>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-6"
        >
          <Icon 
            name={isExpanded ? "ChevronDown" : "ChevronUp"} 
            size={12} 
          />
        </Button>
      </div>
      {/* Legend Content */}
      {isExpanded && (
        <div className="p-3 w-64">
          <div className="space-y-2">
            {currentLegend?.items?.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${item?.color} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">
                      {item?.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {item?.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Updated: {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLegend;