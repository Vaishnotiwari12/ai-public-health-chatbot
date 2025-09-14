import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import MainDashboard from './pages/main-dashboard';
import QueryIntelligence from './pages/query-intelligence';
import MapAnalytics from './pages/map-analytics';
import HealthChatbot from './pages/health-chatbot';
import HealthAnalytics from './pages/health-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/query-intelligence" element={<QueryIntelligence />} />
        <Route path="/map-analytics" element={<MapAnalytics />} />
        <Route path="/health-chatbot" element={<HealthChatbot />} />
        
        {/* Health Analytics Routes */}
        <Route path="/health-analytics" element={<HealthAnalytics />}>
          <Route index element={<HealthAnalytics />} />
          <Route path="outbreaks" element={<HealthAnalytics defaultTab="outbreaks" />} />
          <Route path="facilities" element={<HealthAnalytics defaultTab="facilities" />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
