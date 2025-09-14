import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState({
    apiStatus: 'healthy',
    dataFreshness: 'current',
    connectionStrength: 'strong',
    lastUpdate: new Date(Date.now() - 120000),
    activeConnections: 1247,
    responseTime: 89
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getConnectionIcon = (strength) => {
    switch (strength) {
      case 'strong': return 'Wifi';
      case 'medium': return 'Wifi';
      case 'weak': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTimeSinceUpdate = (lastUpdate) => {
    const diff = currentTime - lastUpdate;
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-medical">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">System Health</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(systemMetrics?.apiStatus)} 
                  size={16} 
                  className={getStatusColor(systemMetrics?.apiStatus)}
                />
                <span className="text-sm text-foreground">API Services</span>
              </div>
              <span className={`text-xs font-medium ${getStatusColor(systemMetrics?.apiStatus)}`}>
                {systemMetrics?.apiStatus}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getConnectionIcon(systemMetrics?.connectionStrength)} 
                  size={16} 
                  className={getStatusColor('healthy')}
                />
                <span className="text-sm text-foreground">Connection</span>
              </div>
              <span className="text-xs font-medium text-success">
                {systemMetrics?.connectionStrength}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={16} className={getStatusColor('healthy')} />
                <span className="text-sm text-foreground">Data Stream</span>
              </div>
              <span className="text-xs font-medium text-success">
                {systemMetrics?.dataFreshness}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Response Time</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-success">{systemMetrics?.responseTime}ms</span>
                <div className="w-2 h-2 bg-success rounded-full pulse-vital"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Active Users</span>
              <span className="text-xs font-medium text-foreground">
                {systemMetrics?.activeConnections?.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Last Update</span>
              <span className="text-xs font-medium text-muted-foreground">
                {getTimeSinceUpdate(systemMetrics?.lastUpdate)}
              </span>
            </div>
          </div>
        </div>

        {/* Current Time */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">System Time</h4>
          
          <div className="space-y-2">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="text-lg font-bold text-primary font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(currentTime)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                India Standard Time (IST)
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full pulse-vital"></div>
              <span className="text-xs text-success font-medium">All Systems Operational</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Uptime: 99.9% | Last Incident: None
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground font-mono">
            v2.1.0 | Build {new Date()?.getFullYear()}.{String(new Date()?.getMonth() + 1)?.padStart(2, '0')}.{String(new Date()?.getDate())?.padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;