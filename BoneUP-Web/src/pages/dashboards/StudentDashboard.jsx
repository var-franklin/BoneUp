//file path: BoneUP-Web/src/pages/dashboards/StudentDashboard.jsx

import { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { 
  BarChart3, 
  BookOpen, 
  Gamepad2, 
  TrendingUp, 
  Award, 
  Fish, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import DashboardNavbar from "../../components/DashboardNavbar";

const StudentDashboard = () => {
  const { user } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Overview", path: "/student/dashboard", icon: BarChart3, end: true },
    { name: "My Courses", path: "/student/dashboard/courses", icon: BookOpen },
    { name: "Simulations", path: "/student/dashboard/simulations", icon: Gamepad2 },
    { name: "Progress", path: "/student/dashboard/progress", icon: TrendingUp },
    { name: "Achievements", path: "/student/dashboard/achievements", icon: Award }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#04510e] rounded-lg flex items-center justify-center">
                <Fish className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">BoneUP</span>
            </div>
          )}
          {!sidebarOpen && (
            <div className="w-8 h-8 bg-[#04510e] rounded-lg flex items-center justify-center mx-auto">
              <Fish className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-50 text-[#04510e] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${!sidebarOpen && "justify-center"}`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
        <DashboardNavbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;