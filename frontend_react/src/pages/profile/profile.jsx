import { useState } from 'react';
import { useAuth } from '../../context/Authcontext';
import axios from 'axios';
import { AppRoutes } from '../../constants/AppRoutes';

const Profile = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    startupName: user.startupName || '',
    startupDescription: user.startupDescription || '',
    fundingGoal: user.fundingGoal || '',
    pitchSummary:user.pitchSummary || '',
    pitchDeckUrl: user.pitchDeckUrl || '',
    organization: user.organization || '',
    portfolioSize: user.portfolioSize || '',
    interests: user.interests?.join(', ') || '',
    portfolioCompanies: user.portfolioCompanies?.join(', ') || '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading,setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear individual field error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrors({});

    const updatedData = {
      ...formData,
      interests: formData.interests.split(',').map(s => s.trim()),
      portfolioCompanies: formData.portfolioCompanies.split(',').map(s => s.trim()),
    };

    try {
      setLoading(true)
      const token = localStorage.getItem('authToken');
      const res = await axios.put(AppRoutes.profile, updatedData, {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      console.log(res);
      
      setSuccessMessage('Profile updated successfully!');
      setUser({ ...user, ...updatedData });
    } catch (err) {
      const errorData = err.response?.data?.errors || { general: 'Update failed' };
      setErrors(errorData);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded mt-2 text-black">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600 capitalize">{user.role}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-2 rounded">
            {successMessage}
          </div>
        )}

        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label>Email (read-only)</label>
          <input type="email" value={user.email} disabled className="w-full border p-2 rounded bg-gray-100" />
        </div>

        <div>
          <label>Role</label>
          <input type="text" value={user.role} disabled className="w-full border p-2 rounded bg-gray-100" />
        </div>

        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            placeholder="Tell us about yourself"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        {user.role === 'entrepreneur' && (
          <>
            <div>
              <label>Startup Name</label>
              <input
                name="startupName"
                value={formData.startupName}
                placeholder="e.g., EcoTech"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Startup Description</label>
              <textarea
                name="startupDescription"
                value={formData.startupDescription}
                placeholder="Describe your startup"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Pitch Summary</label>
              <textarea
                name="pitchSummary"
                value={formData.pitchSummary}
                placeholder="Describe your pitch summary"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Funding Goal</label>
              <input
                name="fundingGoal"
                value={formData.fundingGoal}
                placeholder="e.g., $500K"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Pitch Deck URL</label>
              <input
                name="pitchDeckUrl"
                value={formData.pitchDeckUrl}
                placeholder="https://your-link.com"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}

        {user.role === 'investor' && (
          <>
            <div>
              <label>Organization</label>
              <input
                name="organization"
                value={formData.organization}
                placeholder="Company or firm name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Portfolio Size</label>
              <input
                name="portfolioSize"
                value={formData.portfolioSize}
                placeholder="e.g., $2M"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Interests (comma-separated)</label>
              <input
                name="interests"
                value={formData.interests}
                placeholder="e.g., AI, Clean Energy, Fintech"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Portfolio Companies (comma-separated)</label>
              <input
                name="portfolioCompanies"
                value={formData.portfolioCompanies}
                placeholder="e.g., StartupOne, GreenTech Inc."
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg> : "Update"}
        </button>

        {errors.general && (
          <div className="text-red-500 mt-2 text-sm">{errors.general}</div>
        )}
      </form>
    </div>
  );
};

export default Profile;
