import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MapControls from './components/MapControls';
import MapLegend from './components/MapLegend';
import RegionDashboard from './components/RegionDashboard';
import TimeSlider from './components/TimeSlider';
import InteractiveMap from './components/InteractiveMap';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MapAnalytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  
  // Handle window resize and sidebar state
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < 768;
      const newIsTablet = width >= 768 && width < 1024;
      
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
      
      // Close sidebar when resizing to larger screens
      if (width >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    // Close sidebar when component mounts on mobile/tablet
    if (isMobile || isTablet) {
      setIsSidebarOpen(false);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isTablet]);
  const [selectedLayer, setSelectedLayer] = useState('disease-surveillance');
  const [selectedTimeRange, setSelectedTimeRange] = useState('last-30-days');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTimeSliderPlaying, setIsTimeSliderPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTimeSlider, setShowTimeSlider] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLayerChange = (layer) => {
    setSelectedLayer(layer);
  };

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    setIsTimeSliderPlaying(false);
  };

  const handleTimeChange = (date) => {
    setSelectedDate(date);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleCloseRegionDashboard = () => {
    setSelectedRegion(null);
  };

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  const handleResetView = () => {
    console.log('Reset view');
    setSelectedRegion(null);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePlayPause = () => {
    setIsTimeSliderPlaying(!isTimeSliderPlaying);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* Main Content */}
      <main className={`
        pt-16 transition-all duration-300
        ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-80'}
        ${isFullscreen ? 'fixed inset-0 z-50 pt-0' : ''}
        px-2 sm:px-4 md:px-6
      `}>
        <div className="p-2 sm:p-4 md:p-6">
          {/* Page Header */}
          {!isFullscreen && (
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleToggleSidebar}
                      className="lg:hidden p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full"
                      aria-label="Toggle sidebar"
                    >
                      <Icon name="Menu" className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
                      Map Analytics
                    </h1>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                    Geographic intelligence center for health pattern analysis
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0">
                  {/* Export Actions */}
                  <Button 
                    variant="outline" 
                    size="xs" 
                    className="text-xs sm:text-sm"
                  >
                    <Icon name="Download" size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xs" 
                    className="text-xs sm:text-sm"
                  >
                    <Icon name="Share" size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                  <Button 
                    variant="default" 
                    size="xs" 
                    className="text-xs sm:text-sm"
                  >
                    <Icon name="FileText" size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Report</span>
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
                <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-medical">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">Active Regions</p>
                      <p className="text-lg sm:text-2xl font-bold text-foreground truncate">5</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-medical">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="AlertTriangle" className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">High Risk Areas</p>
                      <p className="text-lg sm:text-2xl font-bold text-foreground truncate">3</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-medical">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">Population</p>
                      <p className="text-lg sm:text-2xl font-bold text-foreground truncate">4.2M</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-medical">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Activity" className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">Data Points</p>
                      <p className="text-lg sm:text-2xl font-bold text-foreground truncate">1.2K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Map Container */}
          <div className={`relative ${
            isFullscreen ? 'h-screen' : 'h-[400px] sm:h-[500px] md:h-[600px]'
          } bg-card border border-border rounded-lg overflow-hidden shadow-medical-lg`}>
            {/* Interactive Map */}
            <InteractiveMap
              selectedLayer={selectedLayer}
              selectedDate={selectedDate}
              onRegionClick={handleRegionClick}
              isFullscreen={isFullscreen}
            />

            {/* Map Controls */}
            <MapControls
              selectedLayer={selectedLayer}
              onLayerChange={handleLayerChange}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetView={handleResetView}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />

            {/* Map Legend */}
            <MapLegend selectedLayer={selectedLayer} />

            {/* Time Slider */}
            {showTimeSlider && (
              <TimeSlider
                selectedTimeRange={selectedTimeRange}
                onTimeChange={handleTimeChange}
                isPlaying={isTimeSliderPlaying}
                onPlayPause={handlePlayPause}
                playbackSpeed={playbackSpeed}
                onSpeedChange={handleSpeedChange}
                onClose={() => setShowTimeSlider(false)}
              />
            )}

            {/* Region Dashboard */}
            <RegionDashboard
              selectedRegion={selectedRegion}
              onClose={handleCloseRegionDashboard}
            />

            {/* Show TimeSlider Button */}
            {!showTimeSlider && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowTimeSlider(true)}
                className="absolute bottom-4 right-4 z-10 bg-card/80 backdrop-blur-sm hover:bg-card text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
                aria-label="Show time controls"
              >
                <Icon name="Clock" size={16} />
              </Button>
            )}

            {/* Fullscreen Toggle */}
            {!isFullscreen && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleFullscreen}
                className={`absolute ${showTimeSlider ? 'bottom-4' : 'bottom-16'} right-4 z-10 bg-card/80 backdrop-blur-sm hover:bg-card`}
                aria-label="Toggle fullscreen"
              >
                <Icon name="Maximize2" size={16} />
              </Button>
            )}

            {/* Exit Fullscreen */}
            {isFullscreen && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleFullscreen}
                className="absolute top-4 right-4 z-20 bg-card/80 backdrop-blur-sm"
              >
                <Icon name="Minimize" size={16} />
              </Button>
            )}
          </div>

          {/* Additional Analysis Panels */}
          {!isFullscreen && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Pattern Analysis */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Pattern Analysis</h3>
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Seasonal Trends</p>
                      <p className="text-sm text-muted-foreground">Monsoon-related diseases increasing</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-accent">+23%</p>
                      <p className="text-xs text-muted-foreground">vs last month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Geographic Clusters</p>
                      <p className="text-sm text-muted-foreground">3 active disease clusters identified</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-warning">Medium</p>
                      <p className="text-xs text-muted-foreground">Risk level</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Resource Distribution</p>
                      <p className="text-sm text-muted-foreground">Optimization opportunities found</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-success">Good</p>
                      <p className="text-xs text-muted-foreground">Overall status</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive Insights */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-medical">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Predictive Insights</h3>
                  <Icon name="Brain" size={20} className="text-secondary" />
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={16} className="text-accent mt-1" />
                      <div>
                        <p className="font-medium text-foreground">High Risk Prediction</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Bhopal District shows 78% probability of outbreak in next 2 weeks based on current trends.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={16} className="text-warning mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Resource Alert</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Raisen District may face medical supply shortage within 10 days at current consumption rate.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Intervention Success</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sehore District intervention program shows 92% effectiveness. Model recommends expansion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MapAnalytics;