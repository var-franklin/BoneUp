// file path: BoneUP-Web/src/pages/dashboards/instructor/CourseManagement.jsx

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  FileText,
  Copy,
  Check,
  X,
  Eye,
  Archive,
  MoreVertical
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const CourseManagement = () => {
  const { token } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/courses/instructor/my-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      const response = await axios.post(`${API_URL}/api/courses/instructor/create`, courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Course created! Code: ${response.data.course_code}`);
      setShowCreateModal(false);
      fetchCourses();
    } catch (error) {
      toast.error("Failed to create course");
    }
  };

  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      await axios.put(`${API_URL}/api/courses/instructor/${courseId}`, courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Course updated successfully");
      setShowEditModal(false);
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      toast.error("Failed to update course");
    }
  };

  const handleDeleteCourse = async (courseId, courseName) => {
    if (!window.confirm(`Are you sure you want to delete "${courseName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/courses/instructor/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const handleArchiveCourse = async (courseId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "archived" : "active";
    try {
      await axios.put(`${API_URL}/api/courses/instructor/${courseId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Course ${newStatus === "archived" ? "archived" : "activated"} successfully`);
      fetchCourses();
    } catch (error) {
      toast.error("Failed to update course status");
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Course code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalStudents = courses.reduce((sum, c) => sum + (c.student_count || 0), 0);
  const pendingRequests = courses.reduce((sum, c) => sum + (c.pending_count || 0), 0);
  const activeCourses = courses.filter(c => c.status === "active").length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Course Management</h1>
          <p className="text-gray-600 dark:text-zinc-400 mt-2">Create and manage your courses</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-700 dark:text-[#04510e]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{activeCourses}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Active Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{totalStudents}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{pendingRequests}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {courses.reduce((sum, c) => sum + (c.material_count || 0), 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Materials</p>
            </div>
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
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-zinc-700 transition-all"
            >
              <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                    course.status === "active" 
                      ? "bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 border-green-200 dark:border-emerald-500/30"
                      : "bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-700"
                  }`}>
                    {course.status === "active" ? "Active" : "Archived"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3 line-clamp-2">
                  {course.description || "No description"}
                </p>
                
                {/* Course Code */}
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 p-2 rounded-md">
                  <code className="flex-1 text-sm font-mono text-gray-900 dark:text-zinc-100">{course.course_code}</code>
                  <button
                    onClick={() => copyToClipboard(course.course_code)}
                    className="p-1 text-gray-600 dark:text-zinc-400 hover:text-[#04510e] dark:hover:text-[#04510e] transition-colors"
                    title="Copy course code"
                  >
                    {copiedCode === course.course_code ? (
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Students</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{course.student_count || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Pending</p>
                    <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{course.pending_count || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Materials</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{course.material_count || 0}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    className="flex-1 px-4 py-2 bg-[#04510e] text-white text-sm font-medium rounded-md hover:bg-[#05611a] transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowEditModal(true);
                    }}
                    className="px-4 py-2 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    title="Edit course"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleArchiveCourse(course.id, course.status)}
                    className="px-4 py-2 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    title={course.status === "active" ? "Archive course" : "Activate course"}
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id, course.name)}
                    className="px-4 py-2 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-md hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors"
                    title="Delete course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && courses.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">No courses yet</h3>
          <p className="text-gray-600 dark:text-zinc-400 mb-4">Create your first course to get started</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors"
          >
            Create Course
          </button>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <CourseModal
          title="Create New Course"
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCourse}
        />
      )}

      {/* Edit Course Modal */}
      {showEditModal && selectedCourse && (
        <CourseModal
          title="Edit Course"
          course={selectedCourse}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCourse(null);
          }}
          onSubmit={(data) => handleUpdateCourse(selectedCourse.id, data)}
        />
      )}
    </div>
  );
};

// Course Modal Component
const CourseModal = ({ title, course, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: course?.name || "",
    description: course?.description || ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Course name is required");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-lg w-full">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Course Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Fish Deboning 101"
              className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a brief description of the course..."
              rows={4}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#05611a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : course ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseManagement;