import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertPanel = ({ alerts, onAlertAction }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const toggleAlert = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Active Alerts</h3>
          <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full pulse-urgent">
            {alerts?.filter(a => a?.status === 'active')?.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Archive" size={16} className="mr-2" />
            Archive All
          </Button>
        </div>
      </div>
      {/* Alert List */}
      <div className="max-h-96 overflow-y-auto scrollbar-thin">
        {alerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <h4 className="font-medium text-foreground mb-2">No Active Alerts</h4>
            <p className="text-sm text-muted-foreground">All systems are operating normally</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {alerts?.map((alert) => (
              <div key={alert?.id} className="p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      alert?.priority === 'critical' ? 'bg-red-100 pulse-urgent' : 
                      alert?.priority === 'high' ? 'bg-orange-100' :
                      alert?.priority === 'medium'? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <Icon 
                        name={getPriorityIcon(alert?.priority)} 
                        size={16} 
                        className={
                          alert?.priority === 'critical' ? 'text-red-600' : 
                          alert?.priority === 'high' ? 'text-orange-600' :
                          alert?.priority === 'medium'? 'text-yellow-600' : 'text-green-600'
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">{alert?.title}</h5>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert?.priority)}`}>
                            {alert?.priority}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(alert?.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {alert?.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} />
                            <span>{alert?.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={12} />
                            <span>{alert?.affectedCount} affected</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="TrendingUp" size={12} />
                            <span>{alert?.confidence}% confidence</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAlert(alert?.id)}
                          >
                            <Icon 
                              name={expandedAlert === alert?.id ? "ChevronUp" : "ChevronDown"} 
                              size={14} 
                            />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAlertAction(alert?.id, 'investigate')}
                          >
                            <Icon name="Search" size={14} className="mr-1" />
                            Investigate
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => onAlertAction(alert?.id, 'respond')}
                          >
                            <Icon name="Zap" size={14} className="mr-1" />
                            Respond
                          </Button>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      {expandedAlert === alert?.id && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <div>
                            <h6 className="text-sm font-medium text-foreground mb-2">AI Analysis</h6>
                            <p className="text-sm text-muted-foreground">{alert?.aiAnalysis}</p>
                          </div>
                          
                          <div>
                            <h6 className="text-sm font-medium text-foreground mb-2">Recommended Actions</h6>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {alert?.recommendations?.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Icon name="ArrowRight" size={12} className="mt-0.5 text-primary" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h6 className="text-sm font-medium text-foreground mb-2">Similar Historical Cases</h6>
                            <div className="flex flex-wrap gap-2">
                              {alert?.historicalCases?.map((case_, index) => (
                                <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                                  {case_}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onAlertAction(alert?.id, 'dismiss')}
                              >
                                <Icon name="X" size={14} className="mr-1" />
                                Dismiss
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onAlertAction(alert?.id, 'escalate')}
                              >
                                <Icon name="ArrowUp" size={14} className="mr-1" />
                                Escalate
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onAlertAction(alert?.id, 'export')}
                            >
                              <Icon name="Download" size={14} className="mr-1" />
                              Export Report
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full pulse-urgent"></div>
              <span className="text-muted-foreground">
                {alerts?.filter(a => a?.priority === 'critical')?.length} Critical
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span className="text-muted-foreground">
                {alerts?.filter(a => a?.priority === 'high')?.length} High
              </span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPanel;