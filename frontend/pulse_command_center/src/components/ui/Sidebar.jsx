import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../AppIcon';
import Button from './Button';
import LoginModal from './LoginModal';

const Sidebar = ({
  isCollapsed = false,
  isOpen = false,
  onClose = () => {},
  isMobile = false,
  isTablet = false,
  currentLanguage = 'en'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'Overview': true,
    'Monitoring': false,
    'Resources': false,
    'Reports': false,
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items with updated icons and structure
  const navigationItems = [
    {
      section: 'Health',
      icon: 'HeartPulse',
      items: [
        {
          path: '/health-chatbot',
          label: 'Health Chatbot',
          icon: 'MessageSquare',
          description: 'AI-powered health assistant',
          badge: 'New',
          requiresAuth: false
        }
      ]
    },
    {
      section: 'Health Analytics',
      icon: 'BarChart3',
      items: [
        {
          path: '/health-analytics',
          label: 'Overview',
          icon: 'LayoutDashboard',
          description: 'Health analytics dashboard',
          requiresAuth: false
        },
        {
          path: '/health-analytics/outbreaks',
          label: 'Disease Outbreaks',
          icon: 'Virus',
          description: 'Track disease outbreaks',
          requiresAuth: false
        },
        {
          path: '/health-analytics/facilities',
          label: 'Facility Capacity',
          icon: 'Building2',
          description: 'Hospital capacity tracking',
          requiresAuth: false
        }
      ]
    },
    {
      section: 'Overview',
      icon: 'LayoutGrid',
      items: [
        {
          path: '/main-dashboard',
          label: 'Main Dashboard',
          icon: 'LayoutDashboard',
          description: 'Real-time health command center',
          requiresAuth: false
        },
        {
          path: '/map-analytics',
          label: 'Map Analytics',
          icon: 'Map',
          description: 'Geographic health intelligence',
          requiresAuth: false
        },
        {
          path: '/query-intelligence',
          label: 'Query Intelligence',
          icon: 'Brain',
          description: 'Advanced data queries',
          requiresAuth: false
        }
      ]
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleNavigation = (item) => async (e) => {
    e.preventDefault();
    
    // If the item has a click handler, call it
    if (item.onClick) {
      item.onClick(e);
    } 
    // If the item has a path, navigate to it
    else if (item.path) {
      // Close the sidebar before navigating
      if (isMobile || isTablet) {
        onClose();
      }
      
      // Add a small delay to ensure the sidebar closes before navigation
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Navigate to the new route
      navigate(item.path);
    } else {
      // Close sidebar on mobile/tablet when an item is clicked
      if (isMobile || isTablet) {
        onClose();
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isMounted) return null;

  // Mobile menu toggle button
  const renderMobileToggle = () => (
    <button
      onClick={onClose}
      className="lg:hidden absolute top-4 right-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
      aria-label="Close menu"
    >
      <Icon name="X" className="w-5 h-5" />
    </button>
  );

  // Render section items with improved visual hierarchy
  const renderSectionItems = (items) => (
    <div className="mt-1 space-y-1">
      {items.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <div key={index} className="relative group">
            <a
              href={item.path || '#'}
              onClick={handleNavigation(item)}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                hover:bg-blue-50 hover:text-blue-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                group-hover:bg-blue-50
                relative overflow-hidden
                before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500
                before:opacity-0 before:transition-opacity
                group-hover:before:opacity-100
                active:bg-blue-100
                active:translate-y-px
                transition-all duration-200
                border border-transparent hover:border-blue-100
                shadow-sm hover:shadow-md
                ${isActive ? 'bg-blue-50 text-blue-700' : 'bg-white/80'}
                text-gray-700
                mb-1 last:mb-0
                relative group/item`}
            >
              <Icon name={item.icon} className="w-5 h-5 mr-3 text-blue-600" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!isCollapsed && item.description && (
                  <p className="mt-0.5 text-xs text-gray-500 truncate">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 text-xs text-blue-400 transition-opacity">
                &lt;/&gt;
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {(isMobile || isTablet) && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
          isMobile || isTablet ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''
        } ${isTablet && isCollapsed ? 'w-20' : 'w-72'}`}
        aria-label="Main navigation"
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        tabIndex={-1}
      >
        <div className="flex flex-col h-full overflow-hidden bg-gradient-to-b from-white to-blue-50">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                <Icon name="HeartPulse" className="w-6 h-6 text-blue-600" />
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Health Pulse</h1>
                  <p className="text-xs text-gray-500">For Rural & Urban Health</p>
                </div>
              )}
            </div>
            {(isMobile || isTablet) && renderMobileToggle()}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {navigationItems.map((section, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => toggleSection(section.section)}
                  className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                    expandedSections[section.section] 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon name={section.icon} className="w-5 h-5 mr-3" />
                    {(!isCollapsed || isMobile) && <span>{section.section}</span>}
                  </div>
                  <Icon 
                    name={expandedSections[section.section] ? 'ChevronUp' : 'ChevronDown'} 
                    className="w-4 h-4 text-gray-500"
                  />
                </button>
                
                {expandedSections[section.section] && renderSectionItems(section.items)}
              </div>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Icon name="User" className="w-5 h-5 text-gray-500" />
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Guest User</p>
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onLogin={() => {
            // Handle login logic here
            setIsLoginOpen(false);
          }} 
        />
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
  currentLanguage: PropTypes.string
};

export default Sidebar;
