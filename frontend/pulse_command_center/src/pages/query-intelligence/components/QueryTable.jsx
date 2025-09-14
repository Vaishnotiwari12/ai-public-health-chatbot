import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueryTable = ({ queries, onQuerySelect, selectedQueries, onBulkAction }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectAll, setSelectAll] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      onQuerySelect([]);
    } else {
      onQuerySelect(queries?.map(q => q?.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (queryId) => {
    if (selectedQueries?.includes(queryId)) {
      onQuerySelect(selectedQueries?.filter(id => id !== queryId));
    } else {
      onQuerySelect([...selectedQueries, queryId]);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fever': return 'Thermometer';
      case 'respiratory': return 'Wind';
      case 'gastrointestinal': return 'Pill';
      case 'skin': return 'Hand';
      case 'maternal': return 'Heart';
      case 'child': return 'Baby';
      case 'mental': return 'Brain';
      case 'chronic': return 'Activity';
      default: return 'HelpCircle';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedQueries = [...queries]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical overflow-hidden">
      {/* Table Header with Actions */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm text-muted-foreground">
              {selectedQueries?.length > 0 ? `${selectedQueries?.length} selected` : `${queries?.length} queries`}
            </span>
          </div>
          
          {selectedQueries?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('mark-reviewed')}
              >
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Mark Reviewed
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('flag-important')}
              >
                <Icon name="Flag" size={16} className="mr-2" />
                Flag Important
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export')}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            View Options
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20 border-b border-border">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>
              <th 
                className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-2">
                  <span>Timestamp</span>
                  <Icon 
                    name={sortField === 'timestamp' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th className="p-3 text-left font-medium text-foreground">Query Summary</th>
              <th 
                className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-2">
                  <span>Category</span>
                  <Icon 
                    name={sortField === 'category' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th 
                className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleSort('urgency')}
              >
                <div className="flex items-center space-x-2">
                  <span>Urgency</span>
                  <Icon 
                    name={sortField === 'urgency' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th className="p-3 text-left font-medium text-foreground">Location</th>
              <th className="p-3 text-left font-medium text-foreground">Language</th>
              <th className="p-3 text-left font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedQueries?.map((query, index) => (
              <tr 
                key={query?.id}
                className={`border-b border-border hover:bg-muted/20 transition-colors ${
                  selectedQueries?.includes(query?.id) ? 'bg-primary/5' : ''
                } ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedQueries?.includes(query?.id)}
                    onChange={() => handleRowSelect(query?.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground font-mono">
                    {formatTimestamp(query?.timestamp)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {query?.id}
                  </div>
                </td>
                <td className="p-3 max-w-xs">
                  <div className="text-sm text-foreground font-medium mb-1">
                    {query?.summary}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {query?.symptoms?.join(', ')}
                  </div>
                  {query?.aiInsight && (
                    <div className="flex items-center mt-1">
                      <Icon name="Brain" size={12} className="text-primary mr-1" />
                      <span className="text-xs text-primary">AI Pattern Detected</span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getCategoryIcon(query?.category)} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-sm text-foreground capitalize">
                      {query?.category}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(query?.urgency)}`}>
                    {query?.urgency}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">
                    {query?.location?.district}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {query?.location?.block}
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">
                    {query?.language}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MessageSquare" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
        <div className="text-sm text-muted-foreground">
          Showing {queries?.length} of {queries?.length} queries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} className="mr-1" />
            Previous
          </Button>
          <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded">
            1
          </span>
          <Button variant="outline" size="sm" disabled>
            Next
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QueryTable;