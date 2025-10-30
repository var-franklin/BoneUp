import { useState } from "react";
import { Calendar, TrendingUp, Target, Award, Clock, BarChart3, Zap, CheckCircle } from "lucide-react";

const Progress = () => {
	const [selectedTimeframe, setSelectedTimeframe] = useState("week");
	const [selectedSkill, setSelectedSkill] = useState(null);

	const weeklyActivity = [
		{ day: "Mon", lessons: 2, simulations: 1, hours: 1.5 },
		{ day: "Tue", lessons: 3, simulations: 2, hours: 2.5 },
		{ day: "Wed", lessons: 1, simulations: 1, hours: 1.0 },
		{ day: "Thu", lessons: 4, simulations: 2, hours: 3.0 },
		{ day: "Fri", lessons: 2, simulations: 3, hours: 2.5 },
		{ day: "Sat", lessons: 1, simulations: 0, hours: 0.5 },
		{ day: "Sun", lessons: 0, simulations: 1, hours: 1.0 }
	];

	const monthlyActivity = [
		{ day: "Week 1", lessons: 12, simulations: 8, hours: 10.5 },
		{ day: "Week 2", lessons: 15, simulations: 10, hours: 13.0 },
		{ day: "Week 3", lessons: 13, simulations: 7, hours: 11.5 },
		{ day: "Week 4", lessons: 11, simulations: 9, hours: 9.5 }
	];

	const activityData = selectedTimeframe === "week" ? weeklyActivity : monthlyActivity;

	const skillProgress = [
		{ 
			skill: "Filleting", 
			progress: 85, 
			level: "Advanced",
			description: "Precision cutting and bone removal",
			lastPracticed: "2 hours ago"
		},
		{ 
			skill: "Deboning", 
			progress: 70, 
			level: "Intermediate",
			description: "Complete bone structure removal",
			lastPracticed: "1 day ago"
		},
		{ 
			skill: "Knife Skills", 
			progress: 90, 
			level: "Expert",
			description: "Professional knife handling",
			lastPracticed: "5 hours ago"
		},
		{ 
			skill: "Anatomy Knowledge", 
			progress: 75, 
			level: "Advanced",
			description: "Fish bone structure understanding",
			lastPracticed: "3 hours ago"
		},
		{ 
			skill: "Speed & Efficiency", 
			progress: 60, 
			level: "Intermediate",
			description: "Fast and accurate processing",
			lastPracticed: "1 day ago"
		},
		{ 
			skill: "Presentation", 
			progress: 45, 
			level: "Beginner",
			description: "Professional plating techniques",
			lastPracticed: "2 days ago"
		}
	];

	const recentScores = [
		{ date: "Oct 28", simulation: "Salmon Filleting", score: 92, improvement: "+4" },
		{ date: "Oct 27", simulation: "Tilapia Deboning", score: 88, improvement: "+2" },
		{ date: "Oct 26", simulation: "Tuna Preparation", score: 85, improvement: "+7" },
		{ date: "Oct 25", simulation: "Salmon Filleting", score: 78, improvement: "-3" },
		{ date: "Oct 24", simulation: "Mackerel Deboning", score: 82, improvement: "+5" }
	];

	const milestones = [
		{ 
			title: "First Course Completed", 
			date: "Oct 20, 2024", 
			completed: true,
			icon: "📚",
			description: "Completed Basic Fish Anatomy course"
		},
		{ 
			title: "10 Simulations Completed", 
			date: "Oct 22, 2024", 
			completed: true,
			icon: "🎮",
			description: "Practiced across multiple fish types"
		},
		{ 
			title: "7-Day Streak Achieved", 
			date: "Oct 25, 2024", 
			completed: true,
			icon: "🔥",
			description: "Maintained consistent learning"
		},
		{ 
			title: "50 Lessons Completed", 
			date: "In Progress", 
			completed: false,
			icon: "🎯",
			description: "24/50 lessons completed"
		},
		{ 
			title: "All Beginner Courses", 
			date: "Upcoming", 
			completed: false,
			icon: "👑",
			description: "Complete all beginner-level courses"
		}
	];

	const maxLessons = Math.max(...activityData.map(d => d.lessons));
	const maxHours = Math.max(...activityData.map(d => d.hours));

	const getLevelColor = (level) => {
		const colors = {
			"Beginner": "text-green-600",
			"Intermediate": "text-yellow-600",
			"Advanced": "text-orange-600",
			"Expert": "text-purple-600"
		};
		return colors[level] || "text-gray-600";
	};

	const getProgressColor = (progress) => {
		if (progress >= 80) return "from-green-500 to-emerald-500";
		if (progress >= 60) return "from-blue-500 to-cyan-500";
		if (progress >= 40) return "from-yellow-500 to-orange-500";
		return "from-red-500 to-pink-500";
	};

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
				<p className="text-gray-500 mt-1">Monitor your learning journey and skill development</p>
			</div>

			{/* Overall Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 shadow-sm text-white">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
							<TrendingUp className="w-6 h-6" />
						</div>
						<div>
							<p className="text-3xl font-bold">50%</p>
							<p className="text-sm text-blue-100">Overall Progress</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<CheckCircle className="w-6 h-6 text-green-600" />
						</div>
						<div>
							<p className="text-3xl font-bold text-gray-900">24</p>
							<p className="text-sm text-gray-500">Lessons Completed</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<Clock className="w-6 h-6 text-purple-600" />
						</div>
						<div>
							<p className="text-3xl font-bold text-gray-900">15.5</p>
							<p className="text-sm text-gray-500">Hours Practiced</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
							<Zap className="w-6 h-6 text-orange-600" />
						</div>
						<div>
							<p className="text-3xl font-bold text-gray-900">7</p>
							<p className="text-sm text-gray-500">Day Streak</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
				{/* Weekly Activity Chart */}
				<div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Activity Overview</h2>
								<p className="text-sm text-gray-500 mt-1">Your learning activity over time</p>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => setSelectedTimeframe("week")}
									className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
										selectedTimeframe === "week"
											? "bg-blue-600 text-white"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									Week
								</button>
								<button
									onClick={() => setSelectedTimeframe("month")}
									className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
										selectedTimeframe === "month"
											? "bg-blue-600 text-white"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									Month
								</button>
							</div>
						</div>
					</div>
					<div className="p-6">
						<div className="space-y-6">
							{/* Lessons Chart */}
							<div>
								<div className="flex items-center gap-2 mb-3">
									<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									<p className="text-sm font-medium text-gray-700">Lessons Completed</p>
								</div>
								<div className="flex items-end justify-between gap-2 h-32">
									{activityData.map((day, index) => (
										<div key={index} className="flex-1 flex flex-col items-center gap-2 group">
											<div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
												<div
													className="absolute bottom-0 w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600 cursor-pointer"
													style={{ height: `${(day.lessons / maxLessons) * 100}%` }}
												></div>
											</div>
											<span className="text-xs font-medium text-gray-600">{day.day}</span>
											<span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
												{day.lessons}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Hours Chart */}
							<div>
								<div className="flex items-center gap-2 mb-3">
									<div className="w-3 h-3 bg-teal-500 rounded-full"></div>
									<p className="text-sm font-medium text-gray-700">Practice Hours</p>
								</div>
								<div className="flex items-end justify-between gap-2 h-32">
									{activityData.map((day, index) => (
										<div key={index} className="flex-1 flex flex-col items-center gap-2 group">
											<div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
												<div
													className="absolute bottom-0 w-full bg-teal-500 rounded-t transition-all hover:bg-teal-600 cursor-pointer"
													style={{ height: `${(day.hours / maxHours) * 100}%` }}
												></div>
											</div>
											<span className="text-xs font-medium text-gray-600">{day.day}</span>
											<span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
												{day.hours}h
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Scores */}
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">Recent Scores</h2>
					</div>
					<div className="divide-y divide-gray-200">
						{recentScores.map((score, index) => (
							<div key={index} className="p-4 hover:bg-gray-50 transition-colors">
								<div className="flex items-center justify-between mb-1">
									<span className="text-sm font-medium text-gray-900">{score.simulation}</span>
									<div className="flex items-center gap-2">
										<span className={`text-lg font-bold ${
											score.score >= 90 ? "text-green-600" :
											score.score >= 80 ? "text-blue-600" :
											score.score >= 70 ? "text-yellow-600" : "text-red-600"
										}`}>
											{score.score}%
										</span>
										<span className={`text-xs font-medium ${
											score.improvement.startsWith('+') ? "text-green-600" : "text-red-600"
										}`}>
											{score.improvement}
										</span>
									</div>
								</div>
								<span className="text-xs text-gray-500">{score.date}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Skill Progress */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">Skill Development</h2>
						<p className="text-sm text-gray-500 mt-1">Track your progress in different skill areas</p>
					</div>
					<div className="p-6 space-y-4">
						{skillProgress.map((skill, index) => (
							<div 
								key={index}
								className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
									selectedSkill === index 
										? "border-blue-500 bg-blue-50" 
										: "border-gray-100 hover:border-gray-200"
								}`}
								onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-900">{skill.skill}</p>
										<p className={`text-xs font-medium ${getLevelColor(skill.level)}`}>
											{skill.level}
										</p>
									</div>
									<span className="text-sm font-bold text-gray-900">{skill.progress}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
									<div
										className={`bg-gradient-to-r ${getProgressColor(skill.progress)} h-2 rounded-full transition-all`}
										style={{ width: `${skill.progress}%` }}
									></div>
								</div>
								{selectedSkill === index && (
									<div className="mt-3 pt-3 border-t border-gray-200">
										<p className="text-xs text-gray-600 mb-2">{skill.description}</p>
										<div className="flex items-center gap-2 text-xs text-gray-500">
											<Clock className="w-3 h-3" />
											<span>Last practiced: {skill.lastPracticed}</span>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Milestones */}
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">Milestones</h2>
						<p className="text-sm text-gray-500 mt-1">Major achievements in your learning journey</p>
					</div>
					<div className="p-6 space-y-4">
						{milestones.map((milestone, index) => (
							<div 
								key={index} 
								className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
									milestone.completed 
										? "bg-green-50 border border-green-200" 
										: "bg-gray-50 border border-gray-200"
								}`}
							>
								<div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl ${
									milestone.completed ? "bg-green-100" : "bg-gray-100"
								}`}>
									{milestone.completed ? "✓" : milestone.icon}
								</div>
								<div className="flex-1">
									<p className={`text-sm font-medium ${
										milestone.completed ? "text-gray-900" : "text-gray-500"
									}`}>
										{milestone.title}
									</p>
									<p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
									<p className="text-xs text-gray-500 mt-1 font-medium">{milestone.date}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Insights */}
			<div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 shadow-sm">
				<h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
					<Zap className="w-5 h-5" />
					<span>Learning Insights</span>
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
						<div className="flex items-center gap-2 mb-2">
							<Calendar className="w-4 h-4 text-blue-600" />
							<p className="text-sm font-medium text-gray-900">Most Active Day</p>
						</div>
						<p className="text-2xl font-bold text-blue-600">Thursday</p>
						<p className="text-xs text-gray-500 mt-1">4 lessons, 3.0 hours</p>
					</div>
					<div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
						<div className="flex items-center gap-2 mb-2">
							<Target className="w-4 h-4 text-blue-600" />
							<p className="text-sm font-medium text-gray-900">Average Score</p>
						</div>
						<p className="text-2xl font-bold text-blue-600">85%</p>
						<p className="text-xs text-gray-500 mt-1">Above class average (78%)</p>
					</div>
					<div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
						<div className="flex items-center gap-2 mb-2">
							<TrendingUp className="w-4 h-4 text-blue-600" />
							<p className="text-sm font-medium text-gray-900">Improvement Rate</p>
						</div>
						<p className="text-2xl font-bold text-blue-600">+12%</p>
						<p className="text-xs text-gray-500 mt-1">Compared to last week</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Progress;