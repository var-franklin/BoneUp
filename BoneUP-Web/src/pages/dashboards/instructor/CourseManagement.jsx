// file path: BoneUP-Web/src/pages/dashboards/instructor/CourseManagement.jsx

import { useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Clock,
  BarChart3,
  FileText,
  Video,
  PlayCircle,
  CheckCircle,
  Settings
} from "lucide-react";

const CourseManagement = () => {
  const [filter, setFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      name: "Basic Fish Anatomy",
      description: "Fundamental bone structure and anatomy of common fish species",
      status: "published",
      enrolled: 32,
      lessons: 8,
      duration: "4 hours",
      level: "Beginner",
      avgProgress: 75,
      avgScore: 85,
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Filleting Techniques",
      description: "Master the art of filleting various types of fish",
      status: "published",
      enrolled: 28,
      lessons: 10,
      duration: "6 hours",
      level: "Intermediate",
      avgProgress: 62,
      avgScore: 78,
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      name: "Advanced Deboning",
      description: "Advanced techniques for complete fish deboning",
      status: "published",
      enrolled: 15,
      lessons: 12,
      duration: "8 hours",
      level: "Advanced",
      avgProgress: 45,
      avgScore: 72,
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      name: "Knife Skills & Safety",
      description: "Essential knife handling and safety practices",
      status: "draft",
      enrolled: 0,
      lessons: 6,
      duration: "3 hours",
      level: "Beginner",
      avgProgress: 0,
      avgScore: 0,
      lastUpdated: "5 hours ago"
    },
    {
      id: 5,
      name: "Fish Species Identification",
      description: "Identify and understand different fish species",
      status: "published",
      enrolled: 25,
      lessons: 5,
      duration: "2 hours",
      level: "Beginner",
      avgProgress: 88,
      avgScore: 90,
      lastUpdated: "2 weeks ago"
    },
    {
      id: 6,
      name: "Professional Presentation",
      description: "Present and plate deboned fish professionally",
      status: "draft",
      enrolled: 0,
      lessons: 7,
      duration: "5 hours",
      level: "Advanced",
      avgProgress: 0,
      avgScore: 0,
      lastUpdated: "1 day ago"
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === "all") return true;
    return course.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "published": "bg-green-50 text-green-700 border-green-200",
      "draft": "bg-gray-50 text-gray-600 border-gray-200"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
        {status === "published" ? "Published" : "Draft"}
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">Create and manage your course content</p>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-5 h-5" />
            Create New Course
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
              <p className="text-2xl font-semibold text-gray-900">{courses.length}</p>
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
              <p className="text-2xl font-semibold text-gray-900">
                {courses.filter(c => c.status === "published").length}
              </p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {courses.filter(c => c.status === "draft").length}
              </p>
              <p className="text-sm text-gray-600">Drafts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {courses.reduce((acc, c) => acc + c.enrolled, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Enrolled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "published"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "draft"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Drafts
          </button>
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
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(course.status)}
                    {getLevelBadge(course.level)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
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
                  <Video className="w-4 h-4 text-gray-400" />
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Avg Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{course.avgProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.avgProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Avg Score</span>
                      <span className="text-sm font-semibold text-gray-900">{course.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.avgScore}%` }}
                      ></div>
                    </div>
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
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Stats
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
          <p className="text-gray-600 mb-4">Get started by creating your first course</p>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;