// file path: BoneUP-Web/src/App.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import FishGuide from "./pages/FishGuide";
import Tools from "./pages/Tools";
import SignIn from "./pages/auth/SignIn";
import GetStarted from "./pages/auth/GetStarted";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import InstructorDashboard from "./pages/dashboards/InstructorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Student Dashboard Pages
import StudentOverview from "./pages/dashboards/student/Overview";
import StudentCourses from "./pages/dashboards/student/Courses";
import Simulations from "./pages/dashboards/student/Simulations";
import Progress from "./pages/dashboards/student/Progress";
import Achievements from "./pages/dashboards/student/Achievements";
import StudentSettings from "./pages/dashboards/student/Settings";

// Instructor Dashboard Pages
import InstructorOverview from "./pages/dashboards/instructor/Overview";
import CourseManagement from "./pages/dashboards/instructor/CourseManagement";
import StudentManagement from "./pages/dashboards/instructor/StudentManagement";
import InstructorSettings from "./pages/dashboards/instructor/Settings";

// Admin Dashboard Pages
import AdminOverview from "./pages/dashboards/admin/Overview";
import UserManagement from "./pages/dashboards/admin/UserManagement";
import AdminCourseManagement from "./pages/dashboards/admin/CourseManagement";
import Analytics from "./pages/dashboards/admin/Analytics";
import Announcements from "./pages/dashboards/admin/Announcements";
import ActivityLogs from "./pages/dashboards/admin/ActivityLogs";
import SystemSettings from "./pages/dashboards/admin/Settings";

const App = () => {
	return (
		<div>
			<Toaster position="top-right" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tools" element={<Tools />} />
				<Route path="/fish-guide" element={<FishGuide />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/get-started" element={<GetStarted />} />
				
				{/* Protected Student Routes with Nested Routes */}
				<Route
					path="/student/dashboard"
					element={
						<ProtectedRoute allowedRoles={["student"]}>
							<StudentDashboard />
						</ProtectedRoute>
					}
				>
					<Route index element={<StudentOverview />} />
					<Route path="courses" element={<StudentCourses />} />
					<Route path="simulations" element={<Simulations />} />
					<Route path="progress" element={<Progress />} />
					<Route path="achievements" element={<Achievements />} />
					<Route path="settings" element={<StudentSettings />} />
				</Route>

				{/* Protected Instructor Routes with Nested Routes */}
				<Route
					path="/instructor/dashboard"
					element={
						<ProtectedRoute allowedRoles={["instructor"]}>
							<InstructorDashboard />
						</ProtectedRoute>
					}
				>
					<Route index element={<InstructorOverview />} />
					<Route path="courses" element={<CourseManagement />} />
					<Route path="students" element={<StudentManagement />} />
					<Route path="settings" element={<InstructorSettings />} />
				</Route>

				{/* Protected Admin Routes with Nested Routes */}
				<Route
					path="/admin/dashboard"
					element={
						<ProtectedRoute allowedRoles={["admin"]}>
							<AdminDashboard />
						</ProtectedRoute>
					}
				>
					<Route index element={<AdminOverview />} />
					<Route path="users" element={<UserManagement />} />
					<Route path="courses" element={<AdminCourseManagement />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="announcements" element={<Announcements />} />
					<Route path="activity-logs" element={<ActivityLogs />} />
					<Route path="settings" element={<SystemSettings />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;