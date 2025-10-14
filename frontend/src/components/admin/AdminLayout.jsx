import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // 1. Parent: Use h-screen instead of min-h-screen to fix the height to the viewport.
    <div className="h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin DashBoard</h1>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden h-full"
          onClick={toggleSidebar}
        />
      )}

      {/* sidebar wrapper */}
      <div className="h-full">
        <div
          // 2. Sidebar container: Removed min-h-screen and added h-full (and bg-gray-900 is kept for background)
          className={`bg-gray-900 w-64 h-full text-white absolute md:relative transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
        >
          {/* Sidebar */}
          <AdminSidebar />
        </div>
      </div>

      {/* Main Content */}
      {/* 3. Main Content: Use flex-grow and overflow-y-auto to enable vertical scrolling only in this section */}
      <div className="flex-grow p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
