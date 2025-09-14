import React from 'react';
import Icon from '../../../components/AppIcon';

const QueryStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Queries",
      value: stats?.totalQueries,
      change: "+12%",
      changeType: "increase",
      icon: "MessageSquare",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Last 24 hours"
    },
    {
      title: "Critical Alerts",
      value: stats?.criticalAlerts,
      change: "+3",
      changeType: "increase",
      icon: "AlertTriangle",
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Requiring immediate attention"
    },
    {
      title: "Pattern Matches",
      value: stats?.patternMatches,
      change: "+8%",
      changeType: "increase",
      icon: "Brain",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "AI-detected patterns"
    },
    {
      title: "Response Rate",
      value: `${stats?.responseRate}%`,
      change: "+2%",
      changeType: "increase",
      icon: "Clock",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Avg response time: 4.2 min"
    }
  ];

  const urgencyBreakdown = [
    { level: "Critical", count: 23, color: "bg-red-600", percentage: 15 },
    { level: "High", count: 45, color: "bg-orange-600", percentage: 29 },
    { level: "Medium", count: 67, color: "bg-yellow-600", percentage: 43 },
    { level: "Low", count: 20, color: "bg-green-600", percentage: 13 }
  ];

  const languageBreakdown = [
    { language: "Hindi", count: 89, percentage: 57 },
    { language: "English", count: 42, percentage: 27 },
    { language: "Bengali", count: 15, percentage: 10 },
    { language: "Others", count: 9, percentage: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-medical hover:shadow-medical-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                stat?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon 
                  name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{stat?.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
              <p className="text-sm font-medium text-foreground mb-1">{stat?.title}</p>
              <p className="text-xs text-muted-foreground">{stat?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgency Breakdown */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-medical">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">Query Urgency Levels</h4>
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {urgencyBreakdown?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item?.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-foreground">{item?.level}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 ${item?.color} rounded-full transition-all duration-300`}
                      style={{ width: `${item?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground w-8 text-right">{item?.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total queries processed</span>
              <span className="font-medium">155 today</span>
            </div>
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-medical">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">Query Languages</h4>
            <Icon name="Globe" size={16} className="text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {languageBreakdown?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{item?.language}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${item?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground w-8 text-right">{item?.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Multilingual support active</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full pulse-vital"></div>
                <span className="font-medium text-success">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Real-time Activity */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-medical">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground">Real-time Activity</h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full pulse-vital"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-sm text-muted-foreground">Queries in last hour</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">3.2</div>
            <div className="text-sm text-muted-foreground">Avg response time (min)</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">2</div>
            <div className="text-sm text-muted-foreground">Active alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryStats;