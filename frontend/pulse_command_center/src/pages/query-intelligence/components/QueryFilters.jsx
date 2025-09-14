import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QueryFilters = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North District' },
    { value: 'south', label: 'South District' },
    { value: 'east', label: 'East District' },
    { value: 'west', label: 'West District' },
    { value: 'central', label: 'Central District' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'fever', label: 'Fever & Temperature' },
    { value: 'respiratory', label: 'Respiratory Issues' },
    { value: 'gastrointestinal', label: 'Digestive Problems' },
    { value: 'skin', label: 'Skin Conditions' },
    { value: 'maternal', label: 'Maternal Health' },
    { value: 'child', label: 'Child Health' },
    { value: 'mental', label: 'Mental Health' },
    { value: 'chronic', label: 'Chronic Diseases' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'marathi', label: 'Marathi' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.region !== 'all') count++;
    if (filters?.category !== 'all') count++;
    if (filters?.urgency !== 'all') count++;
    if (filters?.language !== 'all') count++;
    if (filters?.dateFrom || filters?.dateTo) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Query Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={getActiveFilterCount() === 0}
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search queries by symptoms, keywords..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Region"
              options={regionOptions}
              value={filters?.region}
              onChange={(value) => handleFilterChange('region', value)}
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
            />

            <Select
              label="Urgency"
              options={urgencyOptions}
              value={filters?.urgency}
              onChange={(value) => handleFilterChange('urgency', value)}
            />

            <Select
              label="Language"
              options={languageOptions}
              value={filters?.language}
              onChange={(value) => handleFilterChange('language', value)}
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="From Date"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />

            <Input
              type="date"
              label="To Date"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground font-medium">Quick Filters:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('urgency', 'critical')}
            >
              <Icon name="AlertTriangle" size={14} className="mr-1" />
              Critical Only
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date()?.toISOString()?.split('T')?.[0];
                handleFilterChange('dateFrom', today);
                handleFilterChange('dateTo', today);
              }}
            >
              <Icon name="Calendar" size={14} className="mr-1" />
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const weekAgo = new Date();
                weekAgo?.setDate(weekAgo?.getDate() - 7);
                handleFilterChange('dateFrom', weekAgo?.toISOString()?.split('T')?.[0]);
                handleFilterChange('dateTo', new Date()?.toISOString()?.split('T')?.[0]);
              }}
            >
              <Icon name="Clock" size={14} className="mr-1" />
              Last 7 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('category', 'fever')}
            >
              <Icon name="Thermometer" size={14} className="mr-1" />
              Fever Cases
            </Button>
          </div>
        </div>
      </div>
      {/* Compact View */}
      <div className={`p-4 ${isExpanded ? 'hidden' : 'block'}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="search"
            placeholder="Search queries..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="flex-1 min-w-64"
          />
          
          <Select
            options={regionOptions}
            value={filters?.region}
            onChange={(value) => handleFilterChange('region', value)}
            placeholder="Region"
            className="w-32"
          />
          
          <Select
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Category"
            className="w-36"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
          >
            <Icon name="Settings" size={16} className="mr-2" />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QueryFilters;