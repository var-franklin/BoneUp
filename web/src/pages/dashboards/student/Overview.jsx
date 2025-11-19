// file path: web/src/pages/dashboards/student/Overview.jsx

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
    platformActivity: 89,
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

  const pendingActions = [
    { id: 1, action: "Review new instructor application", user: "Dr. Mark Anderson", priority: "high" },
    { id: 2, action: "Approve course content update", course: "Fish Species Identification", priority: "medium" },
    { id: 3, action: "Review student report", student: "Kevin Brown", priority: "medium" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">Student Dashboard</h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-1">Platform overview and learning progress</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mt-1">{stats.totalUsers}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">{stats.totalStudents} students, {stats.totalInstructors} instructors</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mt-1">{stats.totalCourses}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">{stats.activeCourses} active courses</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Platform Activity</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mt-1">{stats.platformActivity}%</p>
              <p className="text-xs text-green-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#04510e] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Avg Engagement</p>
              <p className="text-3xl font-bold mt-1">{stats.avgEngagement}%</p>
              <p className="text-xs text-green-100 mt-1">{stats.totalLessons} total lessons</p>
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
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Top Performing Courses</h2>
                <button className="text-sm text-[#04510e] hover:text-[#05611a] font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {courseStats.map((course, index) => (
                <div key={index} className="border border-gray-200 dark:border-zinc-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-zinc-100">{course.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-sm font-medium bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 px-3 py-1 rounded-full border border-green-200 dark:border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-zinc-500 mb-1">Enrolled Students</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-zinc-100">{course.enrolled}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-zinc-500 mb-1">Avg Completion</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-zinc-100">{course.completion}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-[#04510e] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-zinc-800">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'user' ? 'bg-[#04510e]' :
                      activity.type === 'course' ? 'bg-green-500 dark:bg-emerald-400' :
                      activity.type === 'completion' ? 'bg-purple-500 dark:bg-purple-400' :
                      activity.type === 'update' ? 'bg-amber-500 dark:bg-amber-400' : 'bg-gray-500 dark:bg-zinc-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                        <span className="text-[#04510e]">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Pending Actions</h2>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {pendingActions.map((item) => (
                <div key={item.id} className={`p-3 rounded-lg border ${
                  item.priority === 'high' 
                    ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30' 
                    : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900/30'
                }`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{item.action}</p>
                  <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1">
                    {item.user || item.course || item.student}
                  </p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                    item.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {item.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-sm text-gray-600 dark:text-zinc-400">New Users (Today)</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100">12</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-sm text-gray-600 dark:text-zinc-400">Active Sessions</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100">42</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-sm text-gray-600 dark:text-zinc-400">Courses Published</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100">2 this week</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-zinc-400">Avg Session Time</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100">24 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;