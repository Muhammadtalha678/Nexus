import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AppRoutes } from '../../constants/AppRoutes';
import { Link } from 'react-router'; // ✅ FIXED

const EntrepreneurDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        const resp = await axios.get(AppRoutes.investors, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInvestors(resp.data?.data?.allInvestors || []);
      } catch (error) {
        const errorData = error.response?.data?.errors || { general: 'Failed to fetch investors' };
        setErrors(errorData);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-purple-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-700">Entrepreneur Dashboard</h1>
      {errors.general && (
        <div className="text-red-500 mt-2 text-sm">{errors.general}</div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-purple-600">Available Investors</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pitch Summary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investors.map((investor, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 text-sm text-gray-900">{investor.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{investor.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{investor.pitchSummary}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      to={`/profile/investor/${investor.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
