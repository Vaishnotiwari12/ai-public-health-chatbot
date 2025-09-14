import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightEngine = () => {
  const [insights, setInsights] = useState([]);
  const [filter, setFilter] = useState('all');

  const initialInsights = [
    {
      id: 1,
      type: 'critical',
      title: "Dengue Vector Breeding Detected",
      message: "Satellite imagery analysis shows 73% increase in stagnant water bodies in Barabanki district following recent rainfall.",
      recommendation: "Deploy vector control teams to identified coordinates within 24 hours",
      timestamp: new Date(Date.now() - 300000),
      source: "Satellite AI Analysis",
      dismissed: false,
      actionTaken: false
    },
    {
      id: 2,
      type: 'warning',
      title: "Query Pattern Anomaly",
      message: "Unusual spike in fever-related queries from Sitapur region - 340% above baseline in last 6 hours.",
      recommendation: "Initiate proactive health screening in affected villages",
      timestamp: new Date(Date.now() - 900000),
      source: "Query Intelligence Engine",
      dismissed: false,
      actionTaken: false
    },
    {
      id: 3,
      type: 'info',
      title: "Seasonal Trend Prediction",
      message: "ML models predict 23% increase in respiratory infections over next 14 days based on weather patterns.",
      recommendation: "Pre-position medical supplies and alert healthcare workers",
      timestamp: new Date(Date.now() - 1800000),
      source: "Predictive Analytics",
      dismissed: false,
      actionTaken: true
    },
    {
      id: 4,
      type: 'success',
      title: "Intervention Success",
      message: "Water quality improvement program in Hardoi shows 67% reduction in gastroenteritis cases.",
      recommendation: "Document best practices for replication in other districts",
      timestamp: new Date(Date.now() - 3600000),
      source: "Impact Assessment",
      dismissed: false,
      actionTaken: true
    }
  ];

  useEffect(() => {
    setInsights(initialInsights);
  }, []);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'critical': return 'text-accent';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getInsightBg = (type) => {
    switch (type) {
      case 'critical': return 'bg-accent/10 border-accent/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'success': return 'bg-success/10 border-success/20';
      default: return 'bg-primary/10 border-primary/20';
    }
  };

  const handleDismiss = (id) => {
    setInsights(prev => prev?.map(insight => 
      insight?.id === id ? { ...insight, dismissed: true } : insight
    ));
  };

  const handleActionTaken = (id) => {
    setInsights(prev => prev?.map(insight => 
      insight?.id === id ? { ...insight, actionTaken: true } : insight
    ));
  };

  const filteredInsights = insights?.filter(insight => {
    if (filter === 'all') return !insight?.dismissed;
    if (filter === 'critical') return insight?.type === 'critical' && !insight?.dismissed;
    if (filter === 'pending') return !insight?.actionTaken && !insight?.dismissed;
    return true;
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insight Engine</h3>
            <p className="text-sm text-muted-foreground">Real-time intelligence and recommendations</p>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full pulse-vital"></div>
            <span className="text-xs font-medium text-success">Live</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All Insights', count: filteredInsights?.length },
            { key: 'critical', label: 'Critical', count: insights?.filter(i => i?.type === 'critical' && !i?.dismissed)?.length },
            { key: 'pending', label: 'Pending Action', count: insights?.filter(i => !i?.actionTaken && !i?.dismissed)?.length }
          ]?.map((tab) => (
            <Button
              key={tab?.key}
              variant={filter === tab?.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(tab?.key)}
              className="text-xs"
            >
              {tab?.label}
              {tab?.count > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                  {tab?.count}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* Insights List */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
        {filteredInsights?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Brain" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No insights available</p>
          </div>
        ) : (
          filteredInsights?.map((insight) => (
            <div
              key={insight?.id}
              className={`border rounded-lg p-4 ${getInsightBg(insight?.type)} ${
                insight?.type === 'critical' ? 'pulse-urgent' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`${getInsightColor(insight?.type)} mt-1`}>
                  <Icon name={getInsightIcon(insight?.type)} size={20} />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-foreground">{insight?.title}</h4>
                    <div className="flex items-center space-x-1">
                      {!insight?.actionTaken && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleActionTaken(insight?.id)}
                          className="h-6 w-6"
                        >
                          <Icon name="Check" size={14} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDismiss(insight?.id)}
                        className="h-6 w-6"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground">{insight?.message}</p>
                  
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">Recommended Action</p>
                        <p className="text-sm text-foreground">{insight?.recommendation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Cpu" size={12} />
                      <span>{insight?.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {insight?.actionTaken && (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="CheckCircle" size={12} />
                          <span>Action Taken</span>
                        </div>
                      )}
                      <span>{formatTimeAgo(insight?.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIInsightEngine;