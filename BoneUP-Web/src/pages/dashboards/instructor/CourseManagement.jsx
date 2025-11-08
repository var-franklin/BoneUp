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
  CheckCircle,
  Fish,
  Target
} from "lucide-react";

const CourseManagement = () => {
  const [filter, setFilter] = useState("all");

  const courses = [
    {
      id: 1,
      name: "Introduction to Fish Deboning",
      description: "Fundamental concepts, tools, and safety procedures for fish deboning",
      status: "published",
      enrolled: 45,
      lessons: 8,
      duration: "3 hours",
      level: "Beginner",
      avgProgress: 82,
      avgScore: 88,
      lastUpdated: "3 days ago",
      fishSpecies: "General (Multiple species)",
      topics: ["Fish anatomy basics", "Tool identification", "Safety procedures", "Basic cutting techniques"]
    },
    {
      id: 2,
      name: "Bangus (Milkfish) Deboning Mastery",
      description: "Complete step-by-step training for traditional Filipino bangus deboning including Y-bone removal",
      status: "published",
      enrolled: 52,
      lessons: 12,
      duration: "8 hours",
      level: "Advanced",
      avgProgress: 68,
      avgScore: 75,
      lastUpdated: "1 day ago",
      fishSpecies: "Bangus (Milkfish)",
      topics: ["Dorsal splitting technique", "Backbone removal", "Y-bone identification", "Y-bone extraction methods"]
    },
    {
      id: 3,
      name: "Tilapia Filleting Techniques",
      description: "Master basic filleting skills with standard bone structure fish",
      status: "published",
      enrolled: 38,
      lessons: 7,
      duration: "4 hours",
      level: "Beginner",
      avgProgress: 85,
      avgScore: 90,
      lastUpdated: "5 days ago",
      fishSpecies: "Tilapia",
      topics: ["Gill cut technique", "Backbone separation", "Fillet removal", "Pin bone extraction"]
    },
    {
      id: 4,
      name: "Galunggong (Round Scad) Processing",
      description: "Precision filleting techniques for small-bodied fish with fine bones",
      status: "published",
      enrolled: 28,
      lessons: 8,
      duration: "5 hours",
      level: "Intermediate",
      avgProgress: 71,
      avgScore: 80,
      lastUpdated: "1 week ago",
      fishSpecies: "Galunggong (Round Scad)",
      topics: ["Small fish handling", "Head removal", "Dorsal line cutting", "Fine bone removal"]
    },
    {
      id: 5,
      name: "Maya-maya (Red Snapper) Professional Filleting",
      description: "Professional-grade filleting for premium fish species",
      status: "published",
      enrolled: 22,
      lessons: 9,
      duration: "6 hours",
      level: "Intermediate",
      avgProgress: 65,
      avgScore: 77,
      lastUpdated: "4 days ago",
      fishSpecies: "Maya-maya (Red Snapper)",
      topics: ["Premium fish handling", "Rib cage navigation", "Fillet presentation", "Quality standards"]
    },
    {
      id: 6,
      name: "Lapu-lapu (Grouper) Advanced Processing",
      description: "Advanced techniques for large-bodied premium fish species",
      status: "published",
      enrolled: 15,
      lessons: 10,
      duration: "7 hours",
      level: "Advanced",
      avgProgress: 58,
      avgScore: 72,
      lastUpdated: "2 days ago",
      fishSpecies: "Lapu-lapu (Grouper)",
      topics: ["Large fish securing", "Strength and control", "Premium fillet standards", "Waste minimization"]
    },
    {
      id: 7,
      name: "Advanced Deboning: Multi-Species Comparison",
      description: "Comparative study of deboning techniques across different fish species",
      status: "draft",
      enrolled: 0,
      lessons: 15,
      duration: "10 hours",
      level: "Advanced",
      avgProgress: 0,
      avgScore: 0,
      lastUpdated: "2 hours ago",
      fishSpecies: "Multiple Species",
      topics: ["Species-specific adaptations", "Bone structure comparison", "Technique optimization"]
    },
    {
      id: 8,
      name: "Fish Anatomy and Bone Structure",
      description: "Comprehensive study of fish skeletal systems and anatomy for effective deboning",
      status: "draft",
      enrolled: 0,
      lessons: 10,
      duration: "5 hours",
      level: "Beginner",
      avgProgress: 0,
      avgScore: 0,
      lastUpdated: "1 day ago",
      fishSpecies: "General (Theoretical)",
      topics: ["Skeletal anatomy", "Bone types", "Species variations", "Anatomical landmarks"]
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === "all") return true;
    return course.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "published": "bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 border-green-200 dark:border-emerald-500/30",
      "draft": "bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-700"
    };
    const labels = {
      "published": "Published",
      "draft": "Draft"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const styles = {
      "Beginner": "bg-green-50 dark:bg-[#04510e]/20 text-green-700 dark:text-[#04510e] border-green-200 dark:border-[#04510e]/30",
      "Intermediate": "bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
      "Advanced": "bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30"
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
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Course Management</h1>
            <p className="text-gray-600 dark:text-zinc-400 mt-2">Manage fish deboning training courses and learning materials</p>
          </div>
          <button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-5 h-5" />
            Create New Course
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-700 dark:text-[#04510e]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{courses.length}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {courses.filter(c => c.status === "published").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Published</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {courses.filter(c => c.status === "draft").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Drafts</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {courses.reduce((acc, c) => acc + c.enrolled, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Enrolled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-[#04510e] text-white shadow-sm"
                : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "published"
                ? "bg-[#04510e] text-white shadow-sm"
                : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "draft"
                ? "bg-[#04510e] text-white shadow-sm"
                : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-zinc-700 transition-all cursor-pointer group"
          >
            {/* Course Header */}
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-[#04510e]/30 transition-colors">
                  <Fish className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
                </div>
                {getLevelBadge(course.level)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">{course.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-zinc-500 font-medium">Species:</span>
                <span className="text-xs text-gray-700 dark:text-zinc-300">{course.fishSpecies}</span>
              </div>
            </div>

            {/* Course Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                {getStatusBadge(course.status)}
                <span className="text-xs text-gray-500 dark:text-zinc-500">Updated {course.lastUpdated}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Students</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{course.enrolled}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Lessons</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{course.lessons}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{course.duration}</p>
                  </div>
                </div>
              </div>

              {/* Performance Stats (Only for published courses with students) */}
              {course.status === "published" && course.enrolled > 0 && (
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-zinc-400">Avg Progress</span>
                    <span className="font-medium text-gray-900 dark:text-zinc-100">{course.avgProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.avgProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-zinc-400">Avg Score</span>
                    <span className="font-medium text-gray-900 dark:text-zinc-100">{course.avgScore}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-[#04510e] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.avgScore}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <button className="col-span-2 px-4 py-2.5 bg-[#04510e] text-white text-sm font-medium rounded-md hover:bg-[#05611a] transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">No courses found</h3>
          <p className="text-gray-600 dark:text-zinc-400 mb-4">Get started by creating your first course</p>
          <button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;