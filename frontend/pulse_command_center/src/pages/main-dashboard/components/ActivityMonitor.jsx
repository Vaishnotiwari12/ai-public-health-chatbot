import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ActivityMonitor = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  const initialActivities = [
    {
      id: 1,
      type: 'query',
      user: 'Citizen Query',
      location: 'Barabanki, UP',
      content: 'High fever and body ache for 3 days, multiple cases in village',
      category: 'Fever/Dengue',
      priority: 'high',
      timestamp: new Date(Date.now() - 180000),
      status: 'investigating'
    },
    {
      id: 2,
      type: 'alert',
      user: 'System Alert',
      location: 'Sitapur, UP',
      content: 'Water quality parameters exceeded safe limits in 3 testing points',
      category: 'Water Quality',
      priority: 'medium',
      timestamp: new Date(Date.now() - 600000),
      status: 'resolved'
    },
    {
      id: 3,
      type: 'query',
      user: 'ASHA Worker',
      location: 'Hardoi, UP',
      content: 'Request for additional ORS packets - increased diarrhea cases',
      category: 'Supply Request',
      priority: 'medium',
      timestamp: new Date(Date.now() - 1200000),
      status: 'pending'
    },
    {
      id: 4,
      type: 'intervention',
      user: 'Health Team',
      location: 'Lucknow, UP',
      content: 'Vector control operation completed in 12 villages',
      category: 'Prevention',
      priority: 'low',
      timestamp: new Date(Date.now() - 1800000),
      status: 'completed'
    },
    {
      id: 5,
      type: 'query',
      user: 'Citizen Query',
      location: 'Unnao, UP',
      content: 'Skin rash outbreak in school children, 15 affected',
      category: 'Skin Condition',
      priority: 'high',
      timestamp: new Date(Date.now() - 2400000),
      status: 'investigating'
    }
  ];

  useEffect(() => {
    setActivities(initialActivities);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'query': return 'MessageSquare';
      case 'alert': return 'AlertTriangle';
      case 'intervention': return 'Activity';
      default: return 'Circle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'query': return 'text-primary';
      case 'alert': return 'text-warning';
      case 'intervention': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-accent text-accent-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'bg-warning/10 text-warning border-warning/20';
      case 'pending': return 'bg-primary/10 text-primary border-primary/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const filteredActivities = activities?.filter(activity => {
      const matchesSearch = activity?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           activity?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           activity?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesFilter = filterType === 'all' || activity?.type === filterType;
      return matchesSearch && matchesFilter;
    })?.sort((a, b) => {
      if (sortBy === 'timestamp') return b?.timestamp - a?.timestamp;
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      }
      return 0;
    });

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity Monitor</h3>
            <p className="text-sm text-muted-foreground">Live citizen queries and system events</p>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full pulse-vital"></div>
            <span className="text-xs font-medium text-primary">Real-time</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search activities, locations, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="all">All Types</option>
              <option value="query">Queries</option>
              <option value="alert">Alerts</option>
              <option value="intervention">Interventions</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="timestamp">Latest First</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>
      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto scrollbar-thin">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activities found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`${getTypeColor(activity?.type)} mt-1`}>
                    <Icon name={getTypeIcon(activity?.type)} size={18} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-foreground">{activity?.user}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{activity?.location}</span>
                        </div>
                        <p className="text-sm text-foreground">{activity?.content}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity?.priority)}`}>
                          {activity?.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {activity?.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(activity?.status)}`}>
                          {activity?.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimeAgo(activity?.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing {filteredActivities?.length} of {activities?.length} activities
          </span>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityMonitor;