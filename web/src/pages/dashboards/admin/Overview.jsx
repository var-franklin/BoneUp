// file path: web/src/pages/dashboards/admin/Overview.jsx

import { useState } from "react";
import { 
  Users, 
  BookOpen, 
  GraduationCap,
  TrendingUp, 
  Activity,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  FileText,
  Video
} from "lucide-react";

const Overview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Mock data
  const stats = {
    totalUsers: 156,
    totalStudents: 120,
    totalInstructors: 35,
    totalCourses: 24,
    activeCourses: 18,
    totalLessons: 186,
    platformActivity: 89, // percentage
    avgEngagement: 76
  };

  const recentActivity = [
    { id: 1, user: "Sarah Johnson", action: "registered as Student", time: "5 minutes ago", type: "user" },
    { id: 2, user: "Prof. Mike Chen", action: "published new course: Advanced Filleting", time: "1 hour ago", type: "course" },
    { id: 3, user: "Emily Davis", action: "completed Basic Fish Anatomy", time: "2 hours ago", type: "completion" },
    { id: 4, user: "Prof. Lisa Wong", action: "updated course materials", time: "3 hours ago", type: "update" },
    { id: 5, user: "John Smith", action: "registered as Instructor", time: "5 hours ago", type: "user" },
    { id: 6, user: "Admin", action: "System backup completed", time: "6 hours ago", type: "system" }
  ];

  const courseStats = [
    { name: "Basic Fish Anatomy", instructor: "Prof. Chen", enrolled: 45, completion: 78, status: "active" },
    { name: "Filleting Techniques", instructor: "Prof. Wong", enrolled: 38, completion: 65, status: "active" },
    { name: "Advanced Deboning", instructor: "Prof. Smith", enrolled: 28, completion: 52, status: "active" },
    { name: "Knife Skills & Safety", instructor: "Prof. Davis", enrolled: 35, completion: 85, status: "active" }
  ];

  const systemHealth = [
    { metric: "Server Uptime", value: "99.9%", status: "excellent" },
    { metric: "Active Sessions", value: "42", status: "good" },
    { metric: "Storage Used", value: "68%", status: "good" },
    { metric: "Pending Reviews", value: "3", status: "attention" }
  ];

  const pendingActions = [
    { id: 1, action: "Review new instructor application", user: "Dr. Mark Anderson", priority: "high" },
    { id: 2, action: "Approve course content update", course: "Fish Species Identification", priority: "medium" },
    { id: 3, action: "Review student report", student: "Kevin Brown", priority: "medium" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Platform overview and system management</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.totalStudents} students, {stats.totalInstructors} instructors</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCourses}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.activeCourses} active courses</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Platform Activity</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.platformActivity}%</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Avg Engagement</p>
              <p className="text-3xl font-bold mt-1">{stats.avgEngagement}%</p>
              <p className="text-xs text-blue-100 mt-1">{stats.totalLessons} total lessons</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Courses */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Top Performing Courses</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {courseStats.map((course, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-700 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Enrolled Students</p>
                      <p className="text-lg font-semibold text-gray-900">{course.enrolled}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Avg Completion</p>
                      <p className="text-lg font-semibold text-gray-900">{course.completion}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'course' ? 'bg-green-500' :
                      activity.type === 'completion' ? 'bg-purple-500' :
                      activity.type === 'update' ? 'bg-amber-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="text-blue-600">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* System Health */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            </div>
            <div className="p-6 space-y-4">
              {systemHealth.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.status === 'excellent' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {item.status === 'good' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                    {item.status === 'attention' && <AlertCircle className="w-4 h-4 text-amber-600" />}
                    <span className="text-sm text-gray-700">{item.metric}</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    item.status === 'excellent' ? 'text-green-600' :
                    item.status === 'good' ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Pending Actions</h2>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {pendingActions.map((item) => (
                <div key={item.id} className={`p-3 rounded-lg border ${
                  item.priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {item.user || item.course || item.student}
                  </p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">New Users (Today)</span>
                <span className="text-sm font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="text-sm font-semibold text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Courses Published</span>
                <span className="text-sm font-semibold text-gray-900">2 this week</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Session Time</span>
                <span className="text-sm font-semibold text-gray-900">24 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;