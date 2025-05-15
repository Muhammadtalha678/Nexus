import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AppRoutes } from '../../constants/AppRoutes';
import { Link } from 'react-router'; // ✅ FIXED
import {useAuth} from '../../context/Authcontext'
const EntrepreneurDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [errors, setErrors] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const { user } = useAuth()
  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        const [allInvestorsResponse, allRequestResp] = await Promise.all([
            axios.get(AppRoutes.investors, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
            axios.get(AppRoutes.getRequest, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ])

        // console.log(allInvestorsResponse);
        // console.log(allInvestorsResponse);
        
        setInvestors(allInvestorsResponse.data?.data?.allInvestors || []);
        setRequests(allRequestResp.data?.data?.allRequests || []);
      } catch (error) {
        console.log(error);
        
        const errorData = error.response?.data?.errors || { general: 'Failed to fetch investors' };
        setErrors(errorData);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);
  // Get request by investorId
  const getRequestForInvestor = (investorId) => {
    return requests.find((request) => request.investorId === investorId && request.enterpreneurId === user.id);
  };

  const handleStatusChange = async (requestId,newStatus) => {
    try {
      setLoader(true)
      const token = localStorage.getItem('authToken');
      await axios.patch(`${AppRoutes.acceptRequest}/${requestId}`, { status: newStatus }, {
      // await axios.patch(`http://localhost:5000/api/request/${requestId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local request status
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      const errorData = error.response?.data?.errors || { general: 'Failed to fetch investors' };
        setErrors(errorData);
    } finally {
      setLoader(false)
    }
    // console.log(status);
    // console.log(requestId);
    
  }
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investors.map((investor, idx) => {
                const request = getRequestForInvestor(investor.id)
                const status = request?.status
                return <tr key={idx}>
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
                  <td className="px-6 py-4 text-sm">
                    {status ? (
                        <div className="mt-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded inline-block ${
                            status === 'Pending' ? 'bg-yellow-400 text-white' :
                            status === 'Accepted' ? 'bg-green-500 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            {status}
                          </span>
                          {status === 'Pending' && (
                            <div className="mt-2 space-x-2 flex">
                              <button
                              onClick={() => handleStatusChange(request._id, 'Accepted')}
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs" disabled={ loader}
                              >
                                {loader ? "....":"Accept"}
                              </button>
                              <button
                                // onClick={() => handleStatusChange(request._id, 'Rejected')}
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 italic mt-2">No request</div>
                      )}
                    
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
