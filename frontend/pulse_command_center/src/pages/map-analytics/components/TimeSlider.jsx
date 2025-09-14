import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeSlider = ({ 
  selectedTimeRange, 
  onTimeChange, 
  isPlaying, 
  onPlayPause,
  playbackSpeed,
  onSpeedChange,
  onClose,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sliderValue, setSliderValue] = useState(50);

  // Generate time points based on selected range
  const getTimePoints = () => {
    const now = new Date();
    const points = [];
    
    switch (selectedTimeRange) {
      case 'last-7-days':
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          points.push(date);
        }
        break;
      case 'last-30-days':
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          points.push(date);
        }
        break;
      case 'last-3-months':
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - (i * 7));
          points.push(date);
        }
        break;
      case 'last-6-months':
        for (let i = 23; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - (i * 7));
          points.push(date);
        }
        break;
      case 'last-year':
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          points.push(date);
        }
        break;
      default:
        points.push(now);
    }
    
    return points;
  };

  const timePoints = getTimePoints();

  useEffect(() => {
    if (isPlaying && timePoints.length > 1) {
      const interval = setInterval(() => {
        setSliderValue(prev => {
          const next = prev + (playbackSpeed * 2);
          if (next >= 100) {
            onPlayPause(); // Stop when reaching the end
            return 100;
          }
          return next;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed, onPlayPause, timePoints.length]);

  useEffect(() => {
    const index = Math.floor((sliderValue / 100) * (timePoints.length - 1));
    const selectedDate = timePoints[index] || timePoints[0];
    setCurrentDate(selectedDate);
    onTimeChange(selectedDate);
  }, [sliderValue, timePoints, onTimeChange]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
  };

  const formatDate = (date) => {
    if (!date) return '';
    if (selectedTimeRange === 'last-year') {
      return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    } else if (selectedTimeRange?.includes('months')) {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }
  };

  const goToPrevious = () => {
    setSliderValue(prev => Math.max(0, prev - (100 / (timePoints.length - 1))));
  };

  const goToNext = () => {
    setSliderValue(prev => Math.min(100, prev + (100 / (timePoints.length - 1))));
  };

  const goToStart = () => {
    setSliderValue(0);
  };

  const goToEnd = () => {
    setSliderValue(100);
  };

  if (timePoints.length <= 1) {
    return null;
  }

  return (
    <div className={`fixed sm:absolute bottom-0 left-0 right-0 sm:right-4 z-20 bg-card border-t sm:border border-border rounded-t-lg sm:rounded-lg shadow-lg sm:shadow-medical-lg backdrop-blur-medical transition-all duration-300 ${className}`}>
      <div className="p-3 sm:p-4 w-full sm:w-96 max-w-full sm:max-w-none relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          aria-label="Close time analysis"
        >
          <Icon name="X" size={16} />
        </button>
        
        {/* Header - Only show on mobile */}
        <div className="sm:hidden flex items-center justify-between mb-3 pr-6">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Time Analysis</h4>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(currentDate)}
          </div>
        </div>

        {/* Time Slider */}
        <div className="space-y-3 sm:space-y-4">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${sliderValue}%, var(--color-muted) ${sliderValue}%, var(--color-muted) 100%)`
              }}
            />
            
            {/* Time markers */}
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatDate(timePoints[0])}</span>
              <span>{formatDate(timePoints[timePoints.length - 1])}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                onClick={goToStart}
                className="h-8 w-8"
                disabled={sliderValue === 0}
              >
                <Icon name="SkipBack" size={14} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="h-8 w-8"
                disabled={sliderValue === 0}
              >
                <Icon name="ChevronLeft" size={14} />
              </Button>
              <Button
                variant={isPlaying ? "default" : "outline"}
                size="icon"
                onClick={onPlayPause}
                className="h-8 w-8"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={14} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="h-8 w-8"
                disabled={sliderValue === 100}
              >
                <Icon name="ChevronRight" size={14} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToEnd}
                className="h-8 w-8"
                disabled={sliderValue === 100}
              >
                <Icon name="SkipForward" size={14} />
              </Button>
            </div>
            
            {/* Playback speed - Only show on desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="text-xs bg-background border border-border rounded-md px-2 py-1"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;
