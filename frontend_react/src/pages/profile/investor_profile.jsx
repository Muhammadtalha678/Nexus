import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { AppRoutes } from '../../constants/AppRoutes';

const InvestorProfile = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${AppRoutes.investorProfile}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setInvestor(response.data.data.investor);
      } catch (err) {
        const msg = err.response?.data?.errors?.general || 'Failed to load investor profile';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestor();
  }, [id]);

  if (loading) return <p className="text-center text-blue-500">Loading investor...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!investor) return <p className="text-center">Investor not found.</p>;

  const initials = investor.name?.split(' ').map(n => n[0]).join('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Investor Profile</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-800">
            {initials}
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-bold text-black">{investor.name}</h2>
            <p className="text-gray-600 capitalize">{investor.role}</p>
            <p className="text-blue-600 font-medium">{investor.organization || 'No Organization'}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-gray-700">{investor.bio || 'No bio available.'}</p>
        </div>

        {investor.portfolioSize && (
          <div className="mt-6 text-black">
            <h3 className="text-lg font-semibold mb-2">Portfolio Size</h3>
            <p>{investor.portfolioSize}</p>
          </div>
        )}

        {investor.interests?.length > 0 && (
          <div className="mt-6 text-black">
            <h3 className="text-lg font-semibold mb-2">Interests</h3>
            <ul className="list-disc list-inside text-gray-700">
              {investor.interests.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}

        {investor.portfolioCompanies?.length > 0 && (
          <div className="mt-6 text-black">
            <h3 className="text-lg font-semibold mb-2">Portfolio Companies</h3>
            <ul className="list-disc list-inside text-gray-700">
              {investor.portfolioCompanies.map((company, i) => (
                <li key={i}>{company}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorProfile;
