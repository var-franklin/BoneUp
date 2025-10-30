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
        <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
        <p className="text-gray-500 mt-1">Monitor student progress and manage your courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeCourses}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Completion</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avgCompletion}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avgScore}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Hours This Week</p>
              <p className="text-3xl font-bold mt-1">{stats.hoursThisWeek}</p>
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
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Course Performance</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {coursePerformance.map((course, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.enrolled} students enrolled</p>
                    </div>
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      Avg: {course.avgScore}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{course.avgProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.avgProgress}%` }}
                      ></div>
                    </div>
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
                      activity.type === 'completion' ? 'bg-green-500' :
                      activity.type === 'achievement' ? 'bg-yellow-500' :
                      activity.type === 'start' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="text-blue-600">{activity.student}</span> {activity.action}
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
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Create New Course
              </button>
              <button className="w-full px-4 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Target className="w-4 h-4" />
                Add Assignment
              </button>
              <button className="w-full px-4 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Send Announcement
              </button>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
            </div>
            <div className="p-6 space-y-4">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.completed} lessons completed</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{student.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Needs Attention</h2>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {needsAttention.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  item.priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{item.issue}</p>
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