import { useState } from 'react';
import { Link,useLocation} from 'react-router';

/**
 * Sidebar component for the dashboard layout
 * Contains navigation links for both investor and entrepreneur dashboards
 */
const Sidebar = () => {
  const [userType, setUserType] = useState('investor'); // This would come from auth context in a real app
  const location = useLocation();
  
  // Determine active state based on current path
  const isActive = (path) => {
    return location.pathname.includes(path) ? 'bg-blue-700' : '';
  };

  // Navigation links based on user type
  const navigationLinks = userType === 'investor' 
    ? [
        { name: 'Dashboard', path: '/dashboard/investor' },
        { name: 'Entrepreneurs', path: '/dashboard/entrepreneur' },
        { name: 'My Investments', path: '/investments' },
        { name: 'Messages', path: '/messages' },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard/entrepreneur' },
        { name: 'Investors', path: '/investors' },
        { name: 'My Projects', path: '/projects' },
        { name: 'Messages', path: '/messages' },
      ];

  return (
    <div className="w-64 bg-blue-800 text-white h-full flex flex-col">
      {/* Logo/Brand */}
      <div className="px-6 py-4 border-b border-blue-700">
        <h1 className="text-2xl font-bold">Business Nexus</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {navigationLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded flex items-center hover:bg-blue-700 ${isActive(link.path)}`}
              >
                {/* We could add icons here later */}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-blue-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="font-bold">UN</span>
          </div>
          <div className="ml-3">
            <p className="font-medium">User Name</p>
            <p className="text-sm text-blue-300 capitalize">{userType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;