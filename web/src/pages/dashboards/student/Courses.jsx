// file path: BoneUP-Web/src/pages/dashboards/student/Courses.jsx

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText,
  Search,
  Plus,
  X,
  LogOut,
  AlertCircle
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Courses = () => {
  const { token } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("my-courses");
  const [myCourses, setMyCourses] = useState([]);
  const [browseCourses, setBrowseCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [joiningByCode, setJoiningByCode] = useState(false);

  useEffect(() => {
    if (activeTab === "my-courses") {
      fetchMyCourses();
    } else {
      fetchBrowseCourses();
    }
  }, [activeTab]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/courses/my-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchBrowseCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/courses/browse`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBrowseCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to load available courses");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinByCode = async () => {
    if (!courseCode.trim()) {
      toast.error("Please enter a course code");
      return;
    }

    try {
      setJoiningByCode(true);
      await axios.post(`${API_URL}/api/courses/join/code`, 
        { course_code: courseCode.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Successfully joined course!");
      setCourseCode("");
      setShowJoinModal(false);
      fetchMyCourses();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to join course";
      toast.error(message);
    } finally {
      setJoiningByCode(false);
    }
  };

  const handleRequestJoin = async (courseId) => {
    try {
      await axios.post(`${API_URL}/api/courses/join/request/${courseId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Enrollment request sent!");
      fetchBrowseCourses();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to send request";
      toast.error(message);
    }
  };

  const handleLeaveCourse = async (courseId, courseName) => {
    if (!window.confirm(`Are you sure you want to leave "${courseName}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/courses/leave/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Successfully left course");
      fetchMyCourses();
    } catch (error) {
      toast.error("Failed to leave course");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      "accepted": "bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 border-green-200 dark:border-emerald-500/30",
      "pending": "bg-yellow-50 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30",
      "rejected": "bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30"
    };
    const labels = {
      "accepted": "Enrolled",
      "pending": "Pending",
      "rejected": "Rejected"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredMyCourses = myCourses.filter(course => 
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBrowseCourses = browseCourses.filter(course => 
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Courses</h1>
        <p className="text-gray-600 dark:text-zinc-400 mt-2">Browse and manage your courses</p>
      </div>

      {/* Stats Overview for My Courses */}
      {activeTab === "my-courses" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-700 dark:text-[#04510e]" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  {myCourses.filter(c => c.enrollment_status === "accepted").length}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Enrolled</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  {myCourses.filter(c => c.enrollment_status === "pending").length}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  {myCourses.reduce((sum, c) => sum + (c.my_attempts || 0), 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Total Attempts</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  {myCourses.reduce((sum, c) => sum + (c.material_count || 0), 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Materials</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs and Actions */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("my-courses")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "my-courses"
                  ? "bg-[#04510e] text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "browse"
                  ? "bg-[#04510e] text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
              }`}
            >
              Browse Courses
            </button>
          </div>

          <div className="flex gap-2 flex-1 max-w-md">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-all text-sm"
              />
            </div>
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-4 py-2 bg-[#04510e] text-white text-sm font-medium rounded-lg hover:bg-[#05611a] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Join by Code
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04510e] mx-auto"></div>
          <p className="text-gray-600 dark:text-zinc-400 mt-4">Loading courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "my-courses" 
            ? filteredMyCourses.map((course) => (
                <MyCourseCard 
                  key={course.id} 
                  course={course} 
                  onLeave={handleLeaveCourse}
                  getStatusBadge={getStatusBadge}
                />
              ))
            : filteredBrowseCourses.map((course) => (
                <BrowseCourseCard 
                  key={course.id} 
                  course={course}
                  onRequestJoin={handleRequestJoin}
                  getStatusBadge={getStatusBadge}
                />
              ))
          }
        </div>
      )}

      {/* Empty State */}
      {!loading && (
        (activeTab === "my-courses" && filteredMyCourses.length === 0) ||
        (activeTab === "browse" && filteredBrowseCourses.length === 0)
      ) && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">
            {activeTab === "my-courses" ? "No enrolled courses" : "No courses available"}
          </h3>
          <p className="text-gray-600 dark:text-zinc-400">
            {activeTab === "my-courses" 
              ? "Join a course by code or browse available courses" 
              : "Check back later for new courses"}
          </p>
        </div>
      )}

      {/* Join by Code Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Join Course by Code</h3>
              <button 
                onClick={() => setShowJoinModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">
              Enter the 6-character course code provided by your instructor
            </p>
            <input
              type="text"
              placeholder="e.g., ABC123"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-all mb-4 text-center text-lg font-mono"
            />
            <button
              onClick={handleJoinByCode}
              disabled={joiningByCode || courseCode.length !== 6}
              className="w-full px-4 py-2 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joiningByCode ? "Joining..." : "Join Course"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// My Course Card Component
const MyCourseCard = ({ course, onLeave, getStatusBadge }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-zinc-700 transition-all">
      <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
          </div>
          {getStatusBadge(course.enrollment_status)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">{course.name}</h3>
        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">{course.description || "No description"}</p>
        <p className="text-xs text-gray-500 dark:text-zinc-500">Instructor: {course.instructor_name}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
          <div>
            <p className="text-xs text-gray-500 dark:text-zinc-500">Materials</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{course.material_count || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-zinc-500">Attempts</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{course.my_attempts || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-zinc-500">Avg Score</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
              {course.avg_score ? Math.round(course.avg_score) : 0}%
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {course.enrollment_status === "accepted" && (
            <>
              <button className="flex-1 px-4 py-2 bg-[#04510e] text-white text-sm font-medium rounded-md hover:bg-[#05611a] transition-colors">
                View Course
              </button>
              <button 
                onClick={() => onLeave(course.id, course.name)}
                className="px-4 py-2 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                title="Leave course"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
          {course.enrollment_status === "pending" && (
            <div className="flex-1 px-4 py-2 bg-yellow-50 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-sm text-center rounded-md border border-yellow-200 dark:border-yellow-500/30">
              Waiting for approval
            </div>
          )}
          {course.enrollment_status === "rejected" && (
            <div className="flex-1 px-4 py-2 bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-sm text-center rounded-md border border-red-200 dark:border-red-500/30 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Request rejected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Browse Course Card Component
const BrowseCourseCard = ({ course, onRequestJoin, getStatusBadge }) => {
  const canJoin = !course.enrollment_status;
  const isPending = course.enrollment_status === "pending";
  const isEnrolled = course.enrollment_status === "accepted";

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-zinc-700 transition-all">
      <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
          </div>
          {course.enrollment_status && getStatusBadge(course.enrollment_status)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">{course.name}</h3>
        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">{course.description || "No description"}</p>
        <p className="text-xs text-gray-500 dark:text-zinc-500">Instructor: {course.instructor_name}</p>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-sm text-gray-600 dark:text-zinc-400">{course.student_count || 0} students</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-sm text-gray-600 dark:text-zinc-400">{course.material_count || 0} materials</span>
          </div>
        </div>

        {canJoin && (
          <button 
            onClick={() => onRequestJoin(course.id)}
            className="w-full px-4 py-2 bg-[#04510e] text-white text-sm font-medium rounded-md hover:bg-[#05611a] transition-colors"
          >
            Request to Join
          </button>
        )}
        {isPending && (
          <div className="w-full px-4 py-2 bg-yellow-50 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-sm text-center rounded-md border border-yellow-200 dark:border-yellow-500/30">
            Request pending
          </div>
        )}
        {isEnrolled && (
          <div className="w-full px-4 py-2 bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 text-sm text-center rounded-md border border-green-200 dark:border-emerald-500/30">
            Already enrolled
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;