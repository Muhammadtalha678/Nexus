import React from 'react';

const mockRequests = [
  {
    id: 1,
    name: 'John Doe',
    company: 'VentureX',
    message: 'Excited about your clean tech idea!',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Amelia White',
    company: 'AngelBridge',
    message: 'Let’s schedule a call to discuss opportunities.',
    status: 'Accepted',
  },
];

const EntrepreneurDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-700">Entrepreneur Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Collab Requests', value: '3' },
          { title: 'Active Investors', value: '2' },
          { title: 'Messages', value: '4' },
          { title: 'Meetings Scheduled', value: '1' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-2xl font-semibold text-green-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Collaboration Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-purple-600">Investor Collaboration Requests</h2>
        </div>
        <div className="divide-y">
          {mockRequests.map((req) => (
            <div key={req.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">{req.name} – {req.company}</p>
                <p className="text-sm text-gray-600">{req.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800'
                  : req.status === 'Accepted' ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}>
                  {req.status}
                </span>
                {req.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button className="text-green-600 hover:underline">Accept</button>
                    <button className="text-red-600 hover:underline">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
