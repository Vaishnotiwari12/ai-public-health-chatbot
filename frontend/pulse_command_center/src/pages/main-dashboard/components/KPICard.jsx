import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'primary',
  badge = null,
  isLoading = false,
  description = null
}) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      accent: 'bg-accent text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    if (type === 'positive') return 'text-success';
    if (type === 'negative') return 'text-accent';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (type) => {
    if (type === 'positive') return 'TrendingUp';
    if (type === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-medical hover:shadow-medical-lg transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {badge && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                badge?.type === 'urgent' ? 'bg-accent text-accent-foreground pulse-urgent' :
                badge?.type === 'success' ? 'bg-success text-success-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {badge?.text}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            {isLoading ? (
              <div className="h-8 bg-muted rounded animate-pulse"></div>
            ) : (
              <p className="text-3xl font-bold text-foreground">{value}</p>
            )}
            
            {change && (
              <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
                <Icon name={getChangeIcon(changeType)} size={16} />
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        <div className={`w-12 h-12 ${getColorClasses(color)} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;