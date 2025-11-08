import { useState } from "react";
import { BookOpen, CheckCircle, Clock, Award, TrendingUp, Play, Lock } from "lucide-react";

const Courses = () => {
	const [filter, setFilter] = useState("all");

	const allCourses = [
		{
			id: 1,
			name: "Basic Fish Anatomy",
			description: "Learn the fundamental bone structure and anatomy of common fish species",
			progress: 75,
			lessons: 8,
			completed: 6,
			duration: "4 hours",
			level: "Beginner",
			status: "in-progress",
			icon: BookOpen
		},
		{
			id: 2,
			name: "Filleting Techniques",
			description: "Master the art of filleting various types of fish with precision",
			progress: 45,
			lessons: 10,
			completed: 4,
			duration: "6 hours",
			level: "Intermediate",
			status: "in-progress",
			icon: TrendingUp
		},
		{
			id: 3,
			name: "Advanced Deboning",
			description: "Advanced techniques for complete fish deboning and preparation",
			progress: 20,
			lessons: 12,
			completed: 2,
			duration: "8 hours",
			level: "Advanced",
			status: "in-progress",
			icon: Award
		},
		{
			id: 4,
			name: "Knife Skills & Safety",
			description: "Essential knife handling and safety practices for fish preparation",
			progress: 0,
			lessons: 6,
			completed: 0,
			duration: "3 hours",
			level: "Beginner",
			status: "not-started",
			icon: Clock
		},
		{
			id: 5,
			name: "Fish Species Identification",
			description: "Identify and understand different fish species and their characteristics",
			progress: 100,
			lessons: 5,
			completed: 5,
			duration: "2 hours",
			level: "Beginner",
			status: "completed",
			icon: CheckCircle
		},
		{
			id: 6,
			name: "Professional Presentation",
			description: "Learn how to present and plate deboned fish professionally",
			progress: 0,
			lessons: 7,
			completed: 0,
			duration: "5 hours",
			level: "Advanced",
			status: "not-started",
			icon: BookOpen
		}
	];

	const filteredCourses = allCourses.filter(course => {
		if (filter === "all") return true;
		return course.status === filter;
	});

	const getStatusBadge = (status) => {
		const styles = {
			"in-progress": "bg-green-50 dark:bg-[#04510e]/20 text-green-700 dark:text-[#04510e] border-green-200 dark:border-[#04510e]/30",
			"completed": "bg-green-50 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 border-green-200 dark:border-emerald-500/30",
			"not-started": "bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-700"
		};
		const labels = {
			"in-progress": "In Progress",
			"completed": "Completed",
			"not-started": "Not Started"
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
				<h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">My Courses</h1>
				<p className="text-gray-600 dark:text-zinc-400 mt-2">Browse and manage your learning courses</p>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
							<BookOpen className="w-5 h-5 text-green-700 dark:text-[#04510e]" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
								{allCourses.filter(c => c.status === "in-progress").length}
							</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">In Progress</p>
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
								{allCourses.filter(c => c.status === "completed").length}
							</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Completed</p>
						</div>
					</div>
				</div>
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gray-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
							<Lock className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
								{allCourses.filter(c => c.status === "not-started").length}
							</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Not Started</p>
						</div>
					</div>
				</div>
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
							<Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{allCourses.length}</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Total Courses</p>
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
						onClick={() => setFilter("in-progress")}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							filter === "in-progress"
								? "bg-[#04510e] text-white shadow-sm"
								: "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
						}`}
					>
						In Progress
					</button>
					<button
						onClick={() => setFilter("completed")}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							filter === "completed"
								? "bg-[#04510e] text-white shadow-sm"
								: "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
						}`}
					>
						Completed
					</button>
					<button
						onClick={() => setFilter("not-started")}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							filter === "not-started"
								? "bg-[#04510e] text-white shadow-sm"
								: "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
						}`}
					>
						Not Started
					</button>
				</div>
			</div>

			{/* Courses Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredCourses.map((course) => {
					const Icon = course.icon;
					return (
						<div
							key={course.id}
							className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-zinc-700 transition-all cursor-pointer group"
						>
							{/* Course Header */}
							<div className="p-6 border-b border-gray-100 dark:border-zinc-800">
								<div className="flex items-start justify-between mb-4">
									<div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-[#04510e]/30 transition-colors">
										<Icon className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
									</div>
									{getLevelBadge(course.level)}
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">{course.name}</h3>
								<p className="text-sm text-gray-600 dark:text-zinc-400">{course.description}</p>
							</div>

							{/* Course Details */}
							<div className="p-6">
								<div className="flex items-center justify-between mb-4">
									{getStatusBadge(course.status)}
								</div>

								<div className="space-y-3 mb-4">
									<div className="flex items-center justify-between text-sm">
										<span className="text-gray-600 dark:text-zinc-400">Progress</span>
										<span className="font-medium text-gray-900 dark:text-zinc-100">{course.progress}%</span>
									</div>
									<div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
										<div
											className="bg-[#04510e] h-2 rounded-full transition-all duration-300"
											style={{ width: `${course.progress}%` }}
										></div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
									<div className="flex items-center gap-2">
										<BookOpen className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
										<div>
											<p className="text-xs text-gray-500 dark:text-zinc-500">Lessons</p>
											<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
												{course.completed}/{course.lessons}
											</p>
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

								<button className="w-full px-4 py-2.5 bg-[#04510e] text-white text-sm font-medium rounded-md hover:bg-[#05611a] transition-colors flex items-center justify-center gap-2 group">
									{course.status === "completed" ? (
										<>
											<CheckCircle className="w-4 h-4" />
											Review Course
										</>
									) : course.status === "in-progress" ? (
										<>
											<Play className="w-4 h-4" />
											Continue
										</>
									) : (
										<>
											<Play className="w-4 h-4" />
											Start Course
										</>
									)}
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Courses;