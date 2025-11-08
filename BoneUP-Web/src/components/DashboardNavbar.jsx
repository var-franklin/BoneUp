//file path: BoneUP-Web/src/components/DashboardNavbar.jsx

import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut, Settings, User, Moon, Sun, AlertTriangle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';

const DashboardNavbar = () => {
  const { user, logout } = useContext(AppContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Role-based configurations
  const roleConfig = {
    student: {
      searchPlaceholder: 'Search courses, simulations, achievements...',
      settingsPath: '/student/dashboard/settings',
      notifications: [
        {
          id: 1,
          title: 'New course available',
          message: 'Advanced Fish Deboning Techniques is now available',
          time: '2 hours ago',
          unread: true,
        },
        {
          id: 2,
          title: 'Achievement unlocked',
          message: 'You earned the "Quick Learner" badge',
          time: '1 day ago',
          unread: true,
        },
        {
          id: 3,
          title: 'Simulation completed',
          message: 'Your Milkfish deboning simulation score: 95%',
          time: '2 days ago',
          unread: false,
        },
      ]
    },
    instructor: {
      searchPlaceholder: 'Search courses, students, analytics...',
      settingsPath: '/instructor/dashboard/settings',
      notifications: [
        {
          id: 1,
          title: 'New student enrolled',
          message: 'John Doe has enrolled in your Advanced Deboning course',
          time: '1 hour ago',
          unread: true,
        },
        {
          id: 2,
          title: 'Assignment submitted',
          message: '5 new assignments await grading',
          time: '3 hours ago',
          unread: true,
        },
        {
          id: 3,
          title: 'Course updated',
          message: 'Your Milkfish Techniques course has been published',
          time: '1 day ago',
          unread: false,
        },
      ]
    },
    admin: {
      searchPlaceholder: 'Search users, courses, system logs...',
      settingsPath: '/admin/dashboard/settings',
      notifications: [
        {
          id: 1,
          title: 'System alert',
          message: 'Database backup completed successfully',
          time: '30 minutes ago',
          unread: true,
        },
        {
          id: 2,
          title: 'New user registered',
          message: '3 new users registered today',
          time: '2 hours ago',
          unread: true,
        },
        {
          id: 3,
          title: 'Report generated',
          message: 'Monthly analytics report is ready',
          time: '1 day ago',
          unread: false,
        },
      ]
    }
  };

  const currentRole = user?.role || 'student';
  const config = roleConfig[currentRole];
  const notifications = config.notifications;
  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setProfileOpen(false);
    navigate(config.settingsPath);
  };

  const handleSettingsClick = () => {
    setProfileOpen(false);
    navigate(config.settingsPath);
  };

  const handleLogoutClick = () => {
    setProfileOpen(false);
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    logout();
  };

  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-10 flex-shrink-0">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-400" />
            <input
              type="text"
              placeholder={config.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-zinc-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#04510e] rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-800 py-2">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-zinc-100">Notifications</h3>
                  {unreadCount > 0 && (
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">{unreadCount} unread</p>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer border-l-2 ${
                        notification.unread ? 'border-[#04510e] bg-green-50/30 dark:bg-[#04510e]/10' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{notification.title}</p>
                          <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#04510e] rounded-full mt-1.5"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-zinc-800">
                  <button className="text-xs text-[#04510e] hover:text-[#05611a] font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#04510e] flex items-center justify-center text-white font-semibold text-sm">
                {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 capitalize">{currentRole}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-800 py-2">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
                    {user?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 flex items-center gap-3 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button 
                    onClick={handleSettingsClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 flex items-center gap-3 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-gray-100 dark:border-zinc-800 py-1">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 dark:hover:text-red-300 flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-800 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Confirm Logout</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400">Are you sure you want to leave?</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                You will be logged out of your account and redirected to the home page. Any unsaved progress will be lost.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-zinc-800">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;