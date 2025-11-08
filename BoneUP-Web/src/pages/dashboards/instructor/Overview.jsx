// file path: BoneUP-Web/src/pages/dashboards/instructor/Overview.jsx

import { useState } from "react";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap,
  Target
} from "lucide-react";

const Overview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Mock data
  const stats = {
    totalStudents: 45,
    activeCourses: 6,
    avgCompletion: 68,
    avgScore: 82,
    hoursThisWeek: 124
  };

  const recentActivity = [
    { id: 1, student: "John Doe", action: "Completed Salmon Filleting", time: "2 hours ago", type: "completion" },
    { id: 2, student: "Jane Smith", action: "Scored 95% in Tilapia Simulation", time: "4 hours ago", type: "achievement" },
    { id: 3, student: "Mike Johnson", action: "Started Advanced Deboning", time: "5 hours ago", type: "start" },
    { id: 4, student: "Sarah Williams", action: "Submitted assignment", time: "1 day ago", type: "submission" }
  ];

  const coursePerformance = [
    { name: "Basic Fish Anatomy", enrolled: 32, avgProgress: 75, avgScore: 85 },
    { name: "Filleting Techniques", enrolled: 28, avgProgress: 62, avgScore: 78 },
    { name: "Advanced Deboning", enrolled: 15, avgProgress: 45, avgScore: 72 },
    { name: "Knife Skills & Safety", enrolled: 25, avgProgress: 80, avgScore: 88 }
  ];

  const topPerformers = [
    { name: "Jane Smith", score: 95, completed: 12, avatar: "JS" },
    { name: "Alex Chen", score: 93, completed: 10, avatar: "AC" },
    { name: "Emily Davis", score: 91, completed: 11, avatar: "ED" },
    { name: "Tom Wilson", score: 89, completed: 9, avatar: "TW" }
  ];

  const needsAttention = [
    { name: "Mark Brown", issue: "Low engagement - No activity for 5 days", priority: "high" },
    { name: "Lisa Garcia", issue: "Struggling with Advanced Deboning (45% avg)", priority: "medium" },
    { name: "Kevin Lee", issue: "Missed 3 assignments", priority: "high" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Instructor Dashboard</h1>
        <p className="text-gray-600 dark:text-zinc-400 mt-2">Monitor student progress and manage your courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">Total Students</p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-zinc-100 mt-1">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">Active Courses</p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-zinc-100 mt-1">{stats.activeCourses}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">Avg Completion</p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-zinc-100 mt-1">{stats.avgCompletion}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">Avg Score</p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-zinc-100 mt-1">{stats.avgScore}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#04510e] dark:bg-[#04510e] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100 dark:text-green-100">Hours This Week</p>
              <p className="text-3xl font-semibold mt-1">{stats.hoursThisWeek}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Performance */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Course Performance</h2>
                <button className="text-sm text-[#04510e] dark:text-[#04510e] hover:text-[#05611a] font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {coursePerformance.map((course, index) => (
                <div key={index} className="border border-gray-200 dark:border-zinc-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-zinc-100">{course.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">{course.enrolled} students enrolled</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-zinc-100 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      Avg: {course.avgScore}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-zinc-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{course.avgProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-[#04510e] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.avgProgress}%` }}
                      ></div>
                    </div>
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
                      activity.type === 'completion' ? 'bg-green-500 dark:bg-green-400' :
                      activity.type === 'achievement' ? 'bg-yellow-500 dark:bg-yellow-400' :
                      activity.type === 'start' ? 'bg-blue-500 dark:bg-blue-400' : 'bg-purple-500 dark:bg-purple-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                        <span className="text-[#04510e] dark:text-[#04510e]">{activity.student}</span> {activity.action}
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
          {/* Quick Actions */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Create New Course
              </button>
              <button className="w-full px-4 py-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-medium border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                <Target className="w-4 h-4" />
                Add Assignment
              </button>
              <button className="w-full px-4 py-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-medium border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Send Announcement
              </button>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Top Performers</h2>
            </div>
            <div className="p-6 space-y-4">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#04510e] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{student.name}</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">{student.completed} lessons completed</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">{student.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Needs Attention</h2>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {needsAttention.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  item.priority === 'high' 
                    ? 'bg-red-50 dark:bg-red-500/20 border-red-200 dark:border-red-500/30' 
                    : 'bg-yellow-50 dark:bg-yellow-500/20 border-yellow-200 dark:border-yellow-500/30'
                }`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{item.name}</p>
                  <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1">{item.issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;