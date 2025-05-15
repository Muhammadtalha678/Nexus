import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppRoutes } from '../../constants/AppRoutes';
import { Link } from 'react-router'
import {useAuth} from '../../context/Authcontext'
const InvestorDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);
  const {user} = useAuth()
  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        const [allEnterpreneursResp,allRequestsResp] = await Promise.all([
           axios.get(AppRoutes.entrepreneurs, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
           axios.get(AppRoutes.getRequest, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ])
        // const resp = await axios.get(AppRoutes.entrepreneurs, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        setRequests(allRequestsResp.data?.data?.allRequests || []);
        setEntrepreneurs(allEnterpreneursResp.data?.data?.allEntrepreneur || []);
      } catch (error) {
        const errorData = error.response?.data?.errors || { general: 'Failed to fetch data' };
        setErrors(errorData);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);
  const sendRequest = async (entrepreneurId) => {
    try {
      setRequestLoader(true)
      const token = localStorage.getItem('authToken');
      const resp = await axios.post(`${AppRoutes.sendRequest}/${entrepreneurId}`, {
        status:"Pending"
      }, {
        headers:{ Authorization: `Bearer ${token}`,}
      })
      // console.log(resp);
      const newRequest = resp.data?.data?.sendRequest; 
      if (newRequest) {
        setRequests((prev) => [...prev, newRequest]);
      }
    } catch (error) {
      // console.log(error);
        
      const errorData = error.response?.data?.errors || { general: 'Failed to fetch investors' };
      setErrors(errorData);
      
    } finally {
      setRequestLoader(false)
    }
  }

  const getRequestStatusForEntrepreneur = (entrepreneurId) => {
    const request = requests.find((r) => r.enterpreneurId === entrepreneurId && r.investorId === user.id);
    console.log(requests);
    console.log(user);
    
    return request?.status || null;
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-purple-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-purple-700">Investor Dashboard</h1>

      {errors.general && (
        <div className="text-red-500 text-sm">{errors.general}</div>
      )}

      {/* Entrepreneurs Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Entrepreneurs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrepreneurs.map((entrepreneur, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow border space-y-3">
              <div>
                <p className="text-sm font-extrabold text-gray-900">Name:</p>
                <p className="  text-gray-800">{entrepreneur.name}</p>
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900">Startup:</p>
                <p className="text-gray-800">{entrepreneur.startup}</p>
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900">Pitch Summary:</p>
                <p className="text-gray-800">{entrepreneur.pitchSummary}</p>
              </div>
              <div className="flex gap-4 pt-2">
              <Link
          to={`/profile/entrepreneur/${entrepreneur.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Profile
                </Link>
               
                {(() => {
  const status = getRequestStatusForEntrepreneur(entrepreneur.id);


  if (status) {
    return (
      <span className={`text-xs font-semibold px-3 py-1 rounded ${
        status === 'Pending' ? 'bg-yellow-400 text-white' :
        status === 'Accepted' ? 'bg-green-500 text-white' :
        'bg-red-500 text-white'
      }`}>
        {status}
      </span>
    );
  }

  return (
    <button
      className="text-sm px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      disabled={requestLoader}
      onClick={() => sendRequest(entrepreneur.id)}
    >
      {requestLoader ? (
        <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : "Request"}
    </button>
  );
})()}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow p-6 text-black">
        <h2 className="text-lg font-semibold mb-4 text-purple-700">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
              C
            </div>
            <div className="ml-4">
              <p className="text-sm">You connected with <span className="font-medium">Chris Rodriguez</span></p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
              M
            </div>
            <div className="ml-4">
              <p className="text-sm"><span className="font-medium">Maria Torres</span> sent you a message</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold">
              A
            </div>
            <div className="ml-4">
              <p className="text-sm">You viewed <span className="font-medium">Alex Kim's</span> profile</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
