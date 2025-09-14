import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

/**
 * HEADER COMPONENT - ENHANCED MOBILE-FIRST NAVIGATION
 * 
 * Features:
 * ✅ 3-line hamburger menu with enhanced mobile support
 * ✅ Responsive navigation with detailed labels
 * ✅ User authentication status display
 * ✅ Mobile-optimized dropdowns and interactions
 * ✅ Accessibility improvements (ARIA labels, focus management)
 * 
 * Backend Integration Points:
 * 🔗 User authentication status (/api/auth/status)
 * 🔗 User profile data (/api/user/profile)
 * 🔗 Notification system (/api/notifications)
 * 🔗 Logout functionality (/api/auth/logout)
 */
const Header = ({ isCollapsed = false, onToggleSidebar, isMobile = false, isTablet = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  // Navigation items with detailed descriptions for sidebar
  const navigationItems = [
    { path: '/main-dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Main command center' },
    { path: '/map-analytics', label: 'Map Analytics', icon: 'Map', description: 'Geographic insights' },
    { path: '/query-intelligence', label: 'Query Intelligence', icon: 'Brain', description: 'AI-powered analysis' },
  ];

  // More menu items with enhanced organization
  const moreItems = [
    { 
      section: 'User Management',
      items: [
        { path: '/profile', label: 'User Profile', icon: 'User', description: 'Personal settings' },
        { path: '/preferences', label: 'Preferences', icon: 'Settings', description: 'App customization' },
      ]
    },
    { 
      section: 'System',
      items: [
        { path: '/help', label: 'Help & Support', icon: 'HelpCircle', description: 'Documentation & support' },
        { path: '/admin', label: 'Admin Panel', icon: 'Shield', description: 'System administration' },
      ]
    }
  ];

  // Sample notifications data (Backend Integration Point)
  // TODO: Replace with real-time notifications from /api/notifications
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Critical Health Alert',
      message: 'Outbreak detected in District 12',
      timestamp: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      title: 'System Update',
      message: 'Dashboard refreshed with latest data',
      timestamp: '15 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Report Generated',
      message: 'Weekly health report is ready',
      timestamp: '1 hour ago',
      unread: false
    }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  /**
   * Enhanced Hamburger Menu Toggle
   * Supports both mobile overlay and desktop sidebar collapse
   */
  const navigate = useNavigate();
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const handleAIAssistantClick = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
    // You can add logic to open AI chat modal here
  };

  const handleMenuToggle = () => {
    onToggleSidebar?.();
  };

  /**
   * Notification Handler
   * TODO: Implement real-time notification management
   */
  const handleNotificationClick = (notificationId) => {
    console.log('Notification clicked:', notificationId);
    // TODO: Mark as read via API
    // markNotificationAsRead(notificationId);
  };

  /**
   * Logout Handler (Backend Integration Point)
   * TODO: Implement proper logout with token invalidation
   */
  const handleLogout = () => {
    console.log('Logout initiated');
    // TODO: Implement logout API call
    // logoutUser().then(() => {
    //   localStorage.removeItem('auth_token');
    //   navigate('/login');
    // });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        
        {/* Left Section - Enhanced 3-Line Menu and Logo */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Enhanced 3-Line Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuToggle}
            className="relative p-2 hover:bg-slate-100 focus:bg-slate-100 touch-target"
            aria-label={isMobile ? "Open navigation menu" : "Toggle sidebar"}
            aria-expanded={isMobile ? (isCollapsed ? "false" : "true") : undefined}
          >
            {/* Custom 3-line hamburger icon with animation */}
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-5 h-0.5 bg-slate-600 rounded transition-all duration-200"></div>
              <div className="w-5 h-0.5 bg-slate-600 rounded transition-all duration-200"></div>
              <div className="w-5 h-0.5 bg-slate-600 rounded transition-all duration-200"></div>
            </div>
          </Button>

          {/* Enhanced Logo with Health Theme */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                <Icon name="Activity" size={18} color="white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800">Pulse</h1>
              <p className="text-xs text-slate-500 font-mono">Command Center</p>
            </div>
          </div>

          {/* Desktop Navigation with Enhanced Details */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className={`transition-all duration-200 ${
                  isActivePath(item?.path) 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
                title={item?.description}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Right Section - Enhanced Actions and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* System Status Indicator - Desktop Only */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-xs font-medium text-emerald-700">System Healthy</span>
          </div>

          {/* Enhanced Notifications with Dropdown */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-slate-100 touch-target"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <Icon name="Bell" size={18} className="text-slate-600" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <>
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl backdrop-blur-md z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-slate-500">{unreadCount} unread</span>
                      )}
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto scrollbar-thin">
                    {notifications?.map((notification) => (
                      <button
                        key={notification?.id}
                        onClick={() => handleNotificationClick(notification?.id)}
                        className={`w-full p-4 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors ${
                          notification?.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'alert' ? 'bg-red-500' :
                            notification?.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 truncate">{notification?.title}</p>
                            <p className="text-sm text-slate-600 mt-1">{notification?.message}</p>
                            <p className="text-xs text-slate-400 mt-2">{notification?.timestamp}</p>
                          </div>
                          {notification?.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 hover:bg-blue-50"
                    >
                      View All Notifications
                    </Button>
                  </div>
                </div>
                
                {/* Overlay for mobile */}
                <div 
                  className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
              </>
            )}
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={handleAIAssistantClick}
            className="relative p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none transition-colors"
            aria-label="AI Assistant"
          >
            <Icon name="MessageSquare" className="w-5 h-5" />
            <span className="sr-only">AI Assistant</span>
          </button>

          {/* Enhanced Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="hover:bg-slate-100 touch-target"
              aria-label="User profile menu"
              aria-expanded={isProfileOpen}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center shadow-sm">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {/* Enhanced Profile Dropdown */}
            {isProfileOpen && (
              <>
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl backdrop-blur-md z-50">
                  
                  {/* User Info Section */}
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Dr. Priya Sharma</p>
                        <p className="text-sm text-slate-500">District Health Officer</p>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          <span className="text-xs text-slate-500">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items with Enhanced Organization */}
                  <div className="py-2">
                    {moreItems?.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <div className="px-4 py-2">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {section?.section}
                          </p>
                        </div>
                        {section?.items?.map((item) => (
                          <Button
                            key={item?.path}
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleNavigation(item?.path);
                              setIsProfileOpen(false);
                            }}
                            className="w-full justify-start px-4 py-2 hover:bg-slate-50"
                            title={item?.description}
                          >
                            <Icon name={item?.icon} size={16} className="mr-3 text-slate-400" />
                            <div className="text-left">
                              <div className="font-medium text-slate-700">{item?.label}</div>
                              <div className="text-xs text-slate-500">{item?.description}</div>
                            </div>
                          </Button>
                        ))}
                        {sectionIndex < moreItems?.length - 1 && (
                          <div className="border-t border-slate-100 my-2"></div>
                        )}
                      </div>
                    ))}
                    
                    <div className="border-t border-slate-200 my-2"></div>
                    
                    {/* Logout Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full justify-start px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Sign Out</div>
                        <div className="text-xs text-red-500">End current session</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Overlay for mobile */}
                <div 
                  className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;