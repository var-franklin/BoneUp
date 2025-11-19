// file path: web/src/pages/dashboards/admin/UserManagement.jsx

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Shield,
  GraduationCap,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  Download,
  Upload
} from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    {
      id: 1,
      name: "Prof. Michael Chen",
      email: "m.chen@university.edu",
      role: "instructor",
      status: "active",
      courses: 4,
      students: 52,
      joinedDate: "Jan 15, 2024",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Prof. Lisa Wong",
      email: "l.wong@university.edu",
      role: "instructor",
      status: "active",
      courses: 3,
      students: 38,
      joinedDate: "Feb 10, 2024",
      lastActive: "1 hour ago"
    },
    {
      id: 3,
      name: "John Doe",
      email: "john.doe@student.edu",
      role: "student",
      status: "active",
      enrolledCourses: 3,
      completedLessons: 18,
      joinedDate: "Mar 5, 2024",
      lastActive: "30 minutes ago"
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "jane.smith@student.edu",
      role: "student",
      status: "active",
      enrolledCourses: 4,
      completedLessons: 24,
      joinedDate: "Mar 8, 2024",
      lastActive: "1 hour ago"
    },
    {
      id: 5,
      name: "Prof. David Smith",
      email: "d.smith@university.edu",
      role: "instructor",
      status: "inactive",
      courses: 2,
      students: 15,
      joinedDate: "Jan 20, 2024",
      lastActive: "2 weeks ago"
    },
    {
      id: 6,
      name: "Sarah Williams",
      email: "sarah.w@student.edu",
      role: "student",
      status: "active",
      enrolledCourses: 3,
      completedLessons: 15,
      joinedDate: "Mar 12, 2024",
      lastActive: "3 hours ago"
    },
    {
      id: 7,
      name: "Mark Brown",
      email: "mark.b@student.edu",
      role: "student",
      status: "inactive",
      enrolledCourses: 2,
      completedLessons: 5,
      joinedDate: "Feb 28, 2024",
      lastActive: "1 week ago"
    },
    {
      id: 8,
      name: "Prof. Emily Davis",
      email: "e.davis@university.edu",
      role: "instructor",
      status: "active",
      courses: 5,
      students: 67,
      joinedDate: "Jan 5, 2024",
      lastActive: "45 minutes ago"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role) => {
    const styles = {
      "instructor": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: GraduationCap },
      "student": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: Users }
    };
    const style = styles[role];
    const Icon = style.icon;
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      "active": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: UserCheck },
      "inactive": { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", icon: UserX }
    };
    const style = styles[status];
    const Icon = style.icon;
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === "active").length,
    instructors: users.filter(u => u.role === "instructor").length,
    students: users.filter(u => u.role === "student").length
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all platform users</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.instructors}</p>
              <p className="text-sm text-gray-600">Instructors</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.students}</p>
              <p className="text-sm text-gray-600">Students</p>
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="instructor">Instructors</option>
              <option value="student">Students</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "instructor" ? (
                      <div className="text-sm text-gray-600">
                        <p>{user.courses} courses</p>
                        <p className="text-xs text-gray-500">{user.students} students</p>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <p>{user.enrolledCourses} enrolled</p>
                        <p className="text-xs text-gray-500">{user.completedLessons} completed</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
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
      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center mt-6">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;