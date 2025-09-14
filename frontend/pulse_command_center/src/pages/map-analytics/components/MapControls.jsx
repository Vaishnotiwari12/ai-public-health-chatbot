import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MapControls = ({ 
  selectedLayer, 
  onLayerChange, 
  selectedTimeRange, 
  onTimeRangeChange,
  onZoomIn,
  onZoomOut,
  onResetView,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);

  const dataLayers = [
    { value: 'disease-surveillance', label: 'Disease Surveillance', description: 'Active disease monitoring' },
    { value: 'resource-availability', label: 'Resource Availability', description: 'Medical supplies & staff' },
    { value: 'population-density', label: 'Population Density', description: 'Demographic distribution' },
    { value: 'outbreak-patterns', label: 'Outbreak Patterns', description: 'Historical disease patterns' },
    { value: 'vulnerability-index', label: 'Vulnerability Index', description: 'Risk assessment zones' },
    { value: 'intervention-outcomes', label: 'Intervention Outcomes', description: 'Program effectiveness' }
  ];

  const timeRanges = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="absolute top-4 left-4 z-20 bg-card border border-border rounded-lg shadow-medical-lg backdrop-blur-medical">
      {/* Controls Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Layers" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">Map Controls</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsControlsExpanded(!isControlsExpanded)}
          className="h-6 w-6"
        >
          <Icon 
            name={isControlsExpanded ? "ChevronUp" : "ChevronDown"} 
            size={14} 
          />
        </Button>
      </div>

      {/* Controls Content */}
      {isControlsExpanded && (
        <div className="p-4 space-y-4 w-80">
          {/* Data Layer Selection */}
          <div>
            <Select
              label="Data Layer"
              options={dataLayers}
              value={selectedLayer}
              onChange={onLayerChange}
              searchable
              className="mb-3"
            />
          </div>

          {/* Time Range Selection */}
          <div>
            <Select
              label="Time Range"
              options={timeRanges}
              value={selectedTimeRange}
              onChange={onTimeRangeChange}
              className="mb-3"
            />
          </div>

          {/* Map Navigation Controls */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Navigation
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onZoomIn}
                className="flex items-center justify-center"
              >
                <Icon name="ZoomIn" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onZoomOut}
                className="flex items-center justify-center"
              >
                <Icon name="ZoomOut" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onResetView}
                className="flex items-center justify-center"
              >
                <Icon name="Home" size={16} />
              </Button>
            </div>
          </div>

          {/* View Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              View Options
            </label>
            <div className="space-y-2">
              <Button
                variant={isFullscreen ? "default" : "outline"}
                size="sm"
                onClick={onToggleFullscreen}
                className="w-full justify-start"
              >
                <Icon name="Maximize" size={16} className="mr-2" />
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Quick Actions
            </label>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export Map Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Icon name="Share" size={16} className="mr-2" />
                Share View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapControls;