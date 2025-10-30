// file path: BoneUP-Web/src/pages/dashboards/instructor/StudentManagement.jsx

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  BookOpen,
  Target,
  BarChart3,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "JD",
      enrolledCourses: 3,
      completedLessons: 18,
      avgScore: 85,
      lastActive: "2 hours ago",
      status: "active",
      progress: 75,
      streak: 5,
      performance: "excellent"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "JS",
      enrolledCourses: 4,
      completedLessons: 24,
      avgScore: 95,
      lastActive: "1 hour ago",
      status: "active",
      progress: 88,
      streak: 12,
      performance: "excellent"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      avatar: "MJ",
      enrolledCourses: 2,
      completedLessons: 8,
      avgScore: 72,
      lastActive: "1 day ago",
      status: "active",
      progress: 45,
      streak: 2,
      performance: "good"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      avatar: "SW",
      enrolledCourses: 3,
      completedLessons: 15,
      avgScore: 88,
      lastActive: "3 hours ago",
      status: "active",
      progress: 68,
      streak: 8,
      performance: "excellent"
    },
    {
      id: 5,
      name: "Mark Brown",
      email: "mark.b@example.com",
      avatar: "MB",
      enrolledCourses: 2,
      completedLessons: 5,
      avgScore: 65,
      lastActive: "5 days ago",
      status: "inactive",
      progress: 28,
      streak: 0,
      performance: "needs-attention"
    },
    {
      id: 6,
      name: "Lisa Garcia",
      email: "lisa.g@example.com",
      avatar: "LG",
      enrolledCourses: 3,
      completedLessons: 12,
      avgScore: 58,
      lastActive: "2 days ago",
      status: "active",
      progress: 52,
      streak: 1,
      performance: "needs-attention"
    },
    {
      id: 7,
      name: "Tom Wilson",
      email: "tom.w@example.com",
      avatar: "TW",
      enrolledCourses: 4,
      completedLessons: 20,
      avgScore: 89,
      lastActive: "4 hours ago",
      status: "active",
      progress: 82,
      streak: 9,
      performance: "excellent"
    },
    {
      id: 8,
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "ED",
      enrolledCourses: 3,
      completedLessons: 16,
      avgScore: 91,
      lastActive: "30 minutes ago",
      status: "active",
      progress: 71,
      streak: 11,
      performance: "excellent"
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "active": "bg-green-50 text-green-700 border-green-200",
      "inactive": "bg-gray-50 text-gray-600 border-gray-200"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
        {status === "active" ? "Active" : "Inactive"}
      </span>
    );
  };

  const getPerformanceBadge = (performance) => {
    const styles = {
      "excellent": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
      "good": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: CheckCircle },
      "needs-attention": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertCircle }
    };
    const style = styles[performance];
    const Icon = style.icon;
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {performance === "excellent" ? "Excellent" : performance === "good" ? "Good" : "Needs Attention"}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Student Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage student progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {students.filter(s => s.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(students.reduce((acc, s) => acc + s.avgScore, 0) / students.length)}%
              </p>
              <p className="text-sm text-gray-600">Avg Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {students.filter(s => s.performance === "needs-attention").length}
              </p>
              <p className="text-sm text-gray-600">Need Attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "active"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus("inactive")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "inactive"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPerformanceBadge(student.performance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${getScoreColor(student.avgScore)}`}>
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{student.enrolledCourses}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center mt-6">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;