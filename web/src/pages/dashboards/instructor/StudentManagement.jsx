// file path: web/src/pages/dashboards/instructor/StudentManagement.jsx

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";
import { 
  Users, 
  Search, 
  Mail, 
  MessageSquare,
  Award,
  BookOpen,
  Eye,
  AlertCircle,
  CheckCircle,
  UserCheck,
  UserX,
  Trash2,
  Clock,
  TrendingUp
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const StudentManagement = () => {
  const { token } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("accepted");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [filterStatus]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/instructor/students`, {
        params: { status: filterStatus },
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data.students);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(`${API_URL}/api/instructor/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedStudent(response.data.student);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Failed to fetch student details:", error);
      toast.error("Failed to load student details");
    }
  };

  const handleAcceptStudent = async (studentId) => {
    try {
      await axios.post(`${API_URL}/api/instructor/students/${studentId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Student accepted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Failed to accept student:", error);
      toast.error("Failed to accept student");
    }
  };

  const handleRejectStudent = async (studentId) => {
    try {
      await axios.post(`${API_URL}/api/instructor/students/${studentId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Student rejected");
      fetchStudents();
    } catch (error) {
      console.error("Failed to reject student:", error);
      toast.error("Failed to reject student");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to remove this student from your class?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/instructor/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Student removed successfully");
      fetchStudents();
    } catch (error) {
      console.error("Failed to remove student:", error);
      toast.error("Failed to remove student");
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "accepted": "bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 border-green-200 dark:border-emerald-500/30",
      "pending": "bg-yellow-50 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30",
      "rejected": "bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPerformanceBadge = (performance) => {
    const styles = {
      "excellent": { bg: "bg-green-50 dark:bg-emerald-500/20", text: "text-green-700 dark:text-emerald-400", border: "border-green-200 dark:border-emerald-500/30", icon: CheckCircle },
      "good": { bg: "bg-blue-50 dark:bg-blue-500/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-500/30", icon: TrendingUp },
      "needs-attention": { bg: "bg-red-50 dark:bg-red-500/20", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-500/30", icon: AlertCircle }
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
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 75) return "text-blue-600 dark:text-blue-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getAvatarInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Student Management</h1>
        <p className="text-gray-600 dark:text-zinc-400 mt-2">Monitor and manage student progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-700 dark:text-[#04510e]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {students.filter(s => s.enrollment_status === "accepted").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Students</p>
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
                {students.filter(s => s.enrollment_status === "pending").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + (s.avg_score || 0), 0) / students.length) : 0}%
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Avg Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {students.filter(s => s.performance === "needs-attention").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Need Attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-zinc-400" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("accepted")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "accepted"
                  ? "bg-[#04510e] text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
              }`}
            >
              Accepted
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "pending"
                  ? "bg-[#04510e] text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "rejected"
                  ? "bg-[#04510e] text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04510e] mx-auto"></div>
          <p className="text-gray-600 dark:text-zinc-400 mt-4">Loading students...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Attempts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#04510e] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getAvatarInitials(student.full_name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{student.full_name || "N/A"}</p>
                          <p className="text-xs text-gray-500 dark:text-zinc-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.enrollment_status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPerformanceBadge(student.performance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-[#04510e] h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-zinc-400">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getScoreColor(student.avg_score)}`}>
                        {student.avg_score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{student.total_attempts || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-400">
                      {formatDate(student.requested_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {student.enrollment_status === "pending" && (
                          <>
                            <button 
                              onClick={() => handleAcceptStudent(student.id)}
                              className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/20 rounded-md transition-colors"
                              title="Accept"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectStudent(student.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-md transition-colors"
                              title="Reject"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {student.enrollment_status === "accepted" && (
                          <>
                            <button 
                              onClick={() => fetchStudentDetails(student.id)}
                              className="p-2 text-gray-600 dark:text-zinc-400 hover:text-[#04510e] dark:hover:text-[#04510e] hover:bg-green-50 dark:hover:bg-[#04510e]/20 rounded-md transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRemoveStudent(student.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-md transition-colors"
                              title="Remove from class"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredStudents.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center mt-6">
          <Users className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">No students found</h3>
          <p className="text-gray-600 dark:text-zinc-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <StudentDetailsModal 
          student={selectedStudent} 
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

// Student Details Modal Component
const StudentDetailsModal = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">Student Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#04510e] rounded-full flex items-center justify-center text-white font-semibold text-xl">
              {student.full_name?.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "??"}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">{student.full_name || "N/A"}</h3>
              <p className="text-gray-600 dark:text-zinc-400">{student.email}</p>
              <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
                Enrolled: {new Date(student.enrolled_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Attempts</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{student.statistics.total_attempts}</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-zinc-400">Avg Score</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{student.statistics.avg_score}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-zinc-400">Best Score</p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{student.statistics.best_score}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-zinc-400">Lowest Score</p>
              <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{student.statistics.lowest_score}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-zinc-400">Hints Used</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{student.statistics.total_hints_used}</p>
            </div>
          </div>

          {/* Bio */}
          {student.bio && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Bio</h4>
              <p className="text-gray-600 dark:text-zinc-400">{student.bio}</p>
            </div>
          )}

          {/* Recent Attempts */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Recent Attempts</h4>
            <div className="space-y-2">
              {student.recent_attempts.length === 0 ? (
                <p className="text-gray-500 dark:text-zinc-400">No attempts yet</p>
              ) : (
                student.recent_attempts.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold ${
                        attempt.score >= 90 ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                        attempt.score >= 75 ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                        attempt.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                        'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                      }`}>
                        {attempt.score}%
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Attempt #{attempt.id}</p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">{attempt.time_ago}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-zinc-400">
                        {attempt.hints_used} {attempt.hints_used === 1 ? 'hint' : 'hints'}
                      </p>
                      {attempt.completed && (
                        <span className="text-xs text-green-600 dark:text-green-400">Completed</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;