import { Outlet } from 'react-router';
import Navbar from '../navigation/navbar';
import Sidebar from '../navigation/sidebar';

/**
 * DashboardLayout component that provides a consistent layout
 * for both investor and entrepreneur dashboards
 */
const DashboardLayout = () => {
  return (
    <div className="flex  h-screen w-screen  bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* This is where the specific dashboard content will be rendered */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;