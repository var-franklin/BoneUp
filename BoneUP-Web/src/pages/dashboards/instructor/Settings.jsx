// file path: BoneUP-Web/src/pages/dashboards/instructor/Settings.jsx

import { useState, useContext } from "react";
import { User, Bell, Lock, Camera, Shield, Key, FileText, Download, FileCheck, Trash2 } from "lucide-react";
import { AppContext } from "../../../context/AppContext";

const Settings = () => {
  const { user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("profile");

  const [notifications, setNotifications] = useState({
    emailStudentProgress: true,
    emailNewEnrollment: true,
    emailAssignmentSubmission: true,
    pushStudentQuestions: true,
    pushCourseUpdates: true
  });

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "privacy", name: "Privacy", icon: Lock }
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Settings</h1>
        <p className="text-gray-600 dark:text-zinc-400 mt-2">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#04510e] text-white"
                      : "text-gray-700 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Profile Information</h2>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Update your personal details</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-[#04510e] flex items-center justify-center text-white text-3xl font-semibold">
                    {(user?.full_name || user?.email || "I")[0].toUpperCase()}
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-[#04510e] text-white text-sm font-medium rounded-lg hover:bg-[#05611a] transition-colors flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </button>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.full_name || ""}
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Share your expertise and teaching philosophy..."
                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors">
                    Save Changes
                  </button>
                  <button className="px-6 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Notification Preferences</h2>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Manage how you receive updates</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Student Progress Updates</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Get notified about student achievements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailStudentProgress}
                          onChange={(e) => setNotifications({...notifications, emailStudentProgress: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">New Enrollments</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">When students enroll in your courses</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNewEnrollment}
                          onChange={(e) => setNotifications({...notifications, emailNewEnrollment: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Assignment Submissions</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">When students submit assignments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailAssignmentSubmission}
                          onChange={(e) => setNotifications({...notifications, emailAssignmentSubmission: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Student Questions</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">When students ask questions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushStudentQuestions}
                          onChange={(e) => setNotifications({...notifications, pushStudentQuestions: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Course Updates</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Platform updates and announcements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushCourseUpdates}
                          onChange={(e) => setNotifications({...notifications, pushCourseUpdates: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
                  <button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Privacy & Security</h2>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Manage your account security</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Password</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">Keep your account secure with a strong password</p>
                  <button className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                    Change Password
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Two-Factor Authentication</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">Add extra security to your account</p>
                  <button className="px-4 py-2.5 bg-[#04510e] text-white text-sm font-medium rounded-lg hover:bg-[#05611a] transition-colors flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Enable 2FA
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Data & Privacy</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-left flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download My Data
                    </button>
                    <button className="w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-left flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      View Privacy Policy
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-red-200 dark:border-red-900">
                  <div className="flex items-center gap-2 mb-3">
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="text-sm font-semibold text-red-900 dark:text-red-400">Danger Zone</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;