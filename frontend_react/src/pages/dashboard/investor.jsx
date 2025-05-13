import React from 'react';

/**
 * InvestorDashboard component - the main dashboard for investor users
 */
const InvestorDashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { title: 'Portfolio Value', value: '$2.4M', change: '+14%' },
    { title: 'Active Investments', value: '12', change: '+2' },
    { title: 'New Opportunities', value: '24', change: '+5' },
    { title: 'Unread Messages', value: '7', change: '+3' },
  ];

  const entrepreneurs = [
    { id: 1, name: 'Sarah Johnson', company: 'EcoTech Solutions', industry: 'Clean Energy', funding: '$500K' },
    { id: 2, name: 'Michael Chen', company: 'HealthAI', industry: 'Healthcare', funding: '$1.2M' },
    { id: 3, name: 'Olivia Rodriguez', company: 'FinEdge', industry: 'Fintech', funding: '$750K' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Investor Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">{stat.title}</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <span className="ml-2 text-sm text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Top Entrepreneurs Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Top Entrepreneurs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funding Goal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entrepreneurs.map((entrepreneur) => (
                <tr key={entrepreneur.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-bold text-blue-800">
                          {entrepreneur.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{entrepreneur.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entrepreneur.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entrepreneur.industry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entrepreneur.funding}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
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