// file path: BoneUP-Web/src/pages/dashboards/admin/ActivityLogs.jsx

import { useState } from "react";
import { 
  Activity,
  Search,
  Filter,
  Download,
  Calendar,
  UserPlus,
  BookOpen,
  Settings,
  AlertCircle,
  CheckCircle,
  Info,
  Shield,
  Clock
} from "lucide-react";

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("today");

  const activityLogs = [
    {
      id: 1,
      type: "user",
      action: "User Registration",
      description: "New student account created",
      user: "Sarah Johnson",
      email: "sarah.j@student.edu",
      timestamp: "2024-03-26 14:32:15",
      ip: "192.168.1.45",
      status: "success",
      severity: "info"
    },
    {
      id: 2,
      type: "course",
      action: "Course Published",
      description: "Advanced Filleting course published",
      user: "Prof. Michael Chen",
      email: "m.chen@university.edu",
      timestamp: "2024-03-26 13:15:42",
      ip: "192.168.1.23",
      status: "success",
      severity: "info"
    },
    {
      id: 3,
      type: "system",
      action: "System Backup",
      description: "Automated system backup completed successfully",
      user: "System",
      email: "system@boneup.edu",
      timestamp: "2024-03-26 12:00:00",
      ip: "localhost",
      status: "success",
      severity: "low"
    },
    {
      id: 4,
      type: "security",
      action: "Failed Login Attempt",
      description: "Multiple failed login attempts detected",
      user: "Unknown",
      email: "suspicious@email.com",
      timestamp: "2024-03-26 11:45:23",
      ip: "185.220.101.45",
      status: "warning",
      severity: "high"
    },
    {
      id: 5,
      type: "user",
      action: "Password Changed",
      description: "User changed their password",
      user: "John Doe",
      email: "john.doe@student.edu",
      timestamp: "2024-03-26 10:30:18",
      ip: "192.168.1.67",
      status: "success",
      severity: "info"
    },
    {
      id: 6,
      type: "course",
      action: "Course Content Updated",
      description: "Lesson materials updated in Basic Fish Anatomy",
      user: "Prof. Lisa Wong",
      email: "l.wong@university.edu",
      timestamp: "2024-03-26 09:20:35",
      ip: "192.168.1.89",
      status: "success",
      severity: "info"
    },
    {
      id: 7,
      type: "admin",
      action: "User Role Modified",
      description: "User role changed from Student to Instructor",
      user: "Admin",
      email: "admin@boneup.edu",
      timestamp: "2024-03-26 08:15:42",
      ip: "192.168.1.1",
      status: "success",
      severity: "medium"
    },
    {
      id: 8,
      type: "system",
      action: "Database Maintenance",
      description: "Scheduled database optimization completed",
      user: "System",
      email: "system@boneup.edu",
      timestamp: "2024-03-26 06:00:00",
      ip: "localhost",
      status: "success",
      severity: "low"
    },
    {
      id: 9,
      type: "security",
      action: "Account Locked",
      description: "Account temporarily locked due to suspicious activity",
      user: "Mark Brown",
      email: "mark.b@student.edu",
      timestamp: "2024-03-25 22:15:30",
      ip: "192.168.1.34",
      status: "warning",
      severity: "high"
    },
    {
      id: 10,
      type: "user",
      action: "Course Enrollment",
      description: "Student enrolled in Advanced Deboning course",
      user: "Emily Davis",
      email: "emily.d@student.edu",
      timestamp: "2024-03-25 20:45:12",
      ip: "192.168.1.56",
      status: "success",
      severity: "info"
    }
  ];

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) => {
    const icons = {
      "user": UserPlus,
      "course": BookOpen,
      "system": Settings,
      "security": Shield,
      "admin": Shield
    };
    const Icon = icons[type] || Info;
    return <Icon className="w-4 h-4" />;
  };

  const getTypeBadge = (type) => {
    const styles = {
      "user": "bg-blue-50 text-blue-700 border-blue-200",
      "course": "bg-green-50 text-green-700 border-green-200",
      "system": "bg-gray-50 text-gray-700 border-gray-200",
      "security": "bg-red-50 text-red-700 border-red-200",
      "admin": "bg-purple-50 text-purple-700 border-purple-200"
    };
    return (
      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${styles[type]} flex items-center gap-1 w-fit`}>
        {getTypeIcon(type)}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      "success": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
      "warning": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: AlertCircle },
      "error": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertCircle }
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

  const getSeverityColor = (severity) => {
    const colors = {
      "low": "bg-gray-200",
      "info": "bg-blue-200",
      "medium": "bg-amber-200",
      "high": "bg-red-200"
    };
    return colors[severity] || "bg-gray-200";
  };

  const stats = {
    total: activityLogs.length,
    today: activityLogs.filter(log => log.timestamp.includes("2024-03-26")).length,
    warnings: activityLogs.filter(log => log.status === "warning").length,
    security: activityLogs.filter(log => log.type === "security").length
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Activity Logs</h1>
            <p className="text-gray-600 mt-2">Monitor system and user activities</p>
          </div>
          <button className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.today}</p>
              <p className="text-sm text-gray-600">Today</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.warnings}</p>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stats.security}</p>
              <p className="text-sm text-gray-600">Security Events</p>
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
              placeholder="Search logs by action, user, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="user">User</option>
              <option value="course">Course</option>
              <option value="system">System</option>
              <option value="security">Security</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(log.severity)}`}></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(log.type)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{log.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.user}</p>
                      <p className="text-xs text-gray-500">{log.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center mt-6">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity logs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;