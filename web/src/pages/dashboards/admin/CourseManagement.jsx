// file path: web/src/pages/dashboards/admin/CourseManagement.jsx

import { useState } from "react";
import { 
  BookOpen, 
  Search,
  Eye, 
  Edit,
  Trash2,
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Filter,
  Download,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  const courses = [
    {
      id: 1,
      name: "Basic Fish Anatomy",
      instructor: "Prof. Michael Chen",
      instructorEmail: "m.chen@university.edu",
      description: "Fundamental bone structure and anatomy of common fish species",
      status: "published",
      level: "Beginner",
      enrolled: 45,
      lessons: 8,
      duration: "4 hours",
      avgProgress: 78,
      avgScore: 85,
      rating: 4.8,
      reviews: 32,
      createdDate: "Jan 15, 2024",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Filleting Techniques",
      instructor: "Prof. Lisa Wong",
      instructorEmail: "l.wong@university.edu",
      description: "Master the art of filleting various types of fish",
      status: "published",
      level: "Intermediate",
      enrolled: 38,
      lessons: 10,
      duration: "6 hours",
      avgProgress: 65,
      avgScore: 78,
      rating: 4.6,
      reviews: 28,
      createdDate: "Feb 10, 2024",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      name: "Advanced Deboning",
      instructor: "Prof. Emily Davis",
      instructorEmail: "e.davis@university.edu",
      description: "Advanced techniques for complete fish deboning",
      status: "published",
      level: "Advanced",
      enrolled: 28,
      lessons: 12,
      duration: "8 hours",
      avgProgress: 52,
      avgScore: 72,
      rating: 4.9,
      reviews: 15,
      createdDate: "Jan 20, 2024",
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      name: "Knife Skills & Safety",
      instructor: "Prof. David Smith",
      instructorEmail: "d.smith@university.edu",
      description: "Essential knife handling and safety practices",
      status: "pending",
      level: "Beginner",
      enrolled: 0,
      lessons: 6,
      duration: "3 hours",
      avgProgress: 0,
      avgScore: 0,
      rating: 0,
      reviews: 0,
      createdDate: "Mar 15, 2024",
      lastUpdated: "5 hours ago"
    },
    {
      id: 5,
      name: "Fish Species Identification",
      instructor: "Prof. Emily Davis",
      instructorEmail: "e.davis@university.edu",
      description: "Identify and understand different fish species",
      status: "published",
      level: "Beginner",
      enrolled: 52,
      lessons: 5,
      duration: "2 hours",
      avgProgress: 88,
      avgScore: 90,
      rating: 4.7,
      reviews: 45,
      createdDate: "Feb 5, 2024",
      lastUpdated: "2 weeks ago"
    },
    {
      id: 6,
      name: "Professional Presentation",
      instructor: "Prof. Michael Chen",
      instructorEmail: "m.chen@university.edu",
      description: "Present and plate deboned fish professionally",
      status: "draft",
      level: "Advanced",
      enrolled: 0,
      lessons: 7,
      duration: "5 hours",
      avgProgress: 0,
      avgScore: 0,
      rating: 0,
      reviews: 0,
      createdDate: "Mar 10, 2024",
      lastUpdated: "1 day ago"
    },
    {
      id: 7,
      name: "Sustainable Fishing Practices",
      instructor: "Prof. Lisa Wong",
      instructorEmail: "l.wong@university.edu",
      description: "Learn about sustainable and ethical fishing methods",
      status: "published",
      level: "Intermediate",
      enrolled: 35,
      lessons: 9,
      duration: "5 hours",
      avgProgress: 70,
      avgScore: 82,
      rating: 4.5,
      reviews: 30,
      createdDate: "Feb 20, 2024",
      lastUpdated: "4 days ago"
    },
    {
      id: 8,
      name: "Commercial Fish Processing",
      instructor: "Prof. David Smith",
      instructorEmail: "d.smith@university.edu",
      description: "Industrial-scale fish processing techniques",
      status: "archived",
      level: "Advanced",
      enrolled: 12,
      lessons: 10,
      duration: "7 hours",
      avgProgress: 45,
      avgScore: 68,
      rating: 4.2,
      reviews: 8,
      createdDate: "Jan 5, 2024",
      lastUpdated: "1 month ago"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "published": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
      "pending": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock },
      "draft": { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", icon: AlertCircle },
      "archived": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle }
    };
    const style = styles[status];
    const Icon = style.icon;
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border} flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const styles = {
      "Beginner": "bg-green-50 text-green-700 border-green-200",
      "Intermediate": "bg-amber-50 text-amber-700 border-amber-200",
      "Advanced": "bg-red-50 text-red-700 border-red-200"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md border text-xs font-medium ${styles[level]}`}>
        {level}
      </span>
    );
  };

  const stats = {
    totalCourses: courses.length,
    published: courses.filter(c => c.status === "published").length,
    pending: courses.filter(c => c.status === "pending").length,
    totalEnrolled: courses.reduce((acc, c) => acc + c.enrolled, 0)
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">Manage all platform courses</p>
          </div>
          <button className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.published}</p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalEnrolled}</p>
              <p className="text-sm text-gray-600">Total Enrollments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            {/* Course Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {getStatusBadge(course.status)}
                    {getLevelBadge(course.level)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-purple-700">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span>{course.instructor}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Enrolled</p>
                    <p className="text-sm font-medium text-gray-900">{course.enrolled}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Lessons</p>
                    <p className="text-sm font-medium text-gray-900">{course.lessons}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900">{course.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            {course.status === "published" && course.enrolled > 0 && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Avg Progress</p>
                    <p className="text-lg font-semibold text-gray-900">{course.avgProgress}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Avg Score</p>
                    <p className="text-lg font-semibold text-gray-900">{course.avgScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Rating</p>
                    <p className="text-lg font-semibold text-gray-900">⭐ {course.rating}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Course Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Updated {course.lastUpdated}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {course.status === "pending" && (
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;