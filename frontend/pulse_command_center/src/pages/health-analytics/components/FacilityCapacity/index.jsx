import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiActivity, FiAlertCircle, FiUsers, FiMonitor, FiHeart } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * FacilityCapacity Component
 * 
 * Displays real-time health facility capacity metrics including:
 * - Hospital bed availability
 * - ICU capacity
 * - Ventilator usage
 * - Staff availability
 */

// Mock data generator
const generateFacilityData = () => {
  const facilities = ['AIIMS Delhi', 'Apollo Mumbai', 'Fortis Bangalore', 'Medanta Gurgaon'];
  return facilities.map((name, index) => ({
    id: index + 1,
    name,
    beds: {
      total: Math.floor(Math.random() * 500) + 100,
      occupied: Math.floor(Math.random() * 400) + 50,
    },
    icu: {
      total: Math.floor(Math.random() * 100) + 20,
      occupied: Math.floor(Math.random() * 80) + 10,
      ventilators: Math.floor(Math.random() * 40) + 5,
    },
    staff: {
      available: Math.floor(Math.random() * 80) + 20, // percentage
    },
  }));
};

const FacilityCapacity = () => {
  const { t } = useTranslation();
  const [facilities] = React.useState(generateFacilityData());
  const [selectedFacility, setSelectedFacility] = React.useState(null);

  // Auto-select first facility on load
  React.useEffect(() => {
    if (facilities.length > 0 && !selectedFacility) {
      setSelectedFacility(facilities[0]);
    }
  }, [facilities, selectedFacility]);

  if (!selectedFacility) return null;

  // Prepare chart data
  const chartData = [
    { name: 'General Beds', used: selectedFacility.beds.occupied, total: selectedFacility.beds.total },
    { name: 'ICU Beds', used: selectedFacility.icu.occupied, total: selectedFacility.icu.total },
  ];

  // Calculate utilization percentage
  const calculateUtilization = (used, total) => {
    return Math.round((used / total) * 100);
  };

  // Get color based on utilization
  const getUtilizationColor = (percentage) => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="space-y-6">
      {/* Facility Selector */}
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FiActivity className="mr-2 text-blue-500" />
          {t('facilityCapacity.title', 'Health Facility Capacity')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {facilities.map((facility) => (
            <div 
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                selectedFacility.id === facility.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <h3 className="font-semibold">{facility.name}</h3>
              <div className="mt-2 text-sm text-gray-600">
                {facility.beds.total - facility.beds.occupied} beds available
              </div>
            </div>
          ))}
        </div>

        {/* Capacity Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* General Beds */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">General Beds</h3>
              <FiUsers className="text-blue-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Available:</span>
                <span className="font-medium">
                  {selectedFacility.beds.total - selectedFacility.beds.occupied} / {selectedFacility.beds.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{
                    width: `${calculateUtilization(selectedFacility.beds.occupied, selectedFacility.beds.total)}%`,
                    backgroundColor: getUtilizationColor(
                      calculateUtilization(selectedFacility.beds.occupied, selectedFacility.beds.total)
                    )
                  }}
                />
              </div>
            </div>
          </div>

          {/* ICU Beds */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">ICU Beds</h3>
              <FiHeart className="text-red-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Available:</span>
                <span className="font-medium">
                  {selectedFacility.icu.total - selectedFacility.icu.occupied} / {selectedFacility.icu.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{
                    width: `${calculateUtilization(selectedFacility.icu.occupied, selectedFacility.icu.total)}%`,
                    backgroundColor: getUtilizationColor(
                      calculateUtilization(selectedFacility.icu.occupied, selectedFacility.icu.total)
                    )
                  }}
                />
              </div>
            </div>
          </div>

          {/* Staff Availability */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Staff Availability</h3>
              <FiUsers className="text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {selectedFacility.staff.available}%
              </div>
              <div className="text-sm text-gray-500">
                {selectedFacility.staff.available > 60 ? 'Good' : 'Critical'} Status
              </div>
            </div>
          </div>
        </div>

        {/* Capacity Chart */}
        <div className="mt-6 bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-4">Bed Capacity Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="used" fill="#3b82f6" name="Occupied" />
                <Bar dataKey="total" fill="#dbeafe" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacilityCapacity;
