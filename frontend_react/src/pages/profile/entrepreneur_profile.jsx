import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { AppRoutes } from '../../constants/AppRoutes';

const EntrepreneurProfile = () => {
  const { id } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntrepreneur = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('authToken');
          const response = await axios.get(`${AppRoutes.enterpreneurProfile}/${id}`, {
              headers: {
                  Authorization:`Bearer ${token}`
              }
          });
            console.log(response);
            
        setEntrepreneur(response.data?.data?.entrepreneur);
      } catch (error) {
        console.error("Error fetching entrepreneur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneur();
  }, [id]);

  if (loading) return <p className="text-center text-blue-500">Loading enterpreneur...</p>;
  if (!entrepreneur) {
    return <p>Entrepreneur not found.</p>;
  }

  const initials = entrepreneur.name?.split(' ').map(n => n[0]).join('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Entrepreneur Profile</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-800">
            {initials}
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-bold text-black">{entrepreneur.name}</h2>
            <p className="text-gray-600 capitalize">{entrepreneur.role}</p>
            <p className="text-blue-600 font-medium">
              {entrepreneur.organization || "No organization"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-gray-700">{entrepreneur.bio || "No bio provided."}</p>
        </div>

        {entrepreneur.organization && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Organization Info</h3>
            <p><strong>Industry:</strong> {entrepreneur.organization.organization || 'N/A'}</p>
            {/* <p><strong>Stage:</strong> {entrepreneur.organization.stage || 'N/A'}</p>
            <p><strong>Employees:</strong> {entrepreneur.organization.employees || 'N/A'}</p>
            <p><strong>Website:</strong> <a href={entrepreneur.organization.website} target="_blank" rel="noreferrer">{entrepreneur.organization.website}</a></p> */}
          </div>
        )}

        {entrepreneur.portfolioSize && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
            <p><strong>Size:</strong> {entrepreneur.portfolioSize}</p>
          </div>
        )}

        {/* {entrepreneur.interests && entrepreneur.interests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Interests</h3>
            <ul className="list-disc list-inside text-gray-700">
              {entrepreneur.interests.map((interest, idx) => (
                <li key={idx}>{interest}</li>
              ))}
            </ul>
          </div>
        )}

        {entrepreneur.portfolioCompanies && entrepreneur.portfolioCompanies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Portfolio Companies</h3>
            <ul className="list-disc list-inside text-gray-700">
              {entrepreneur.portfolioCompanies.map((company, idx) => (
                <li key={idx}>{company}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EntrepreneurProfile;
