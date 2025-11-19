//file path: web/src/pages/dashboards/student/Simulations.jsx

import { Gamepad2, Star, Clock, Play, Zap, Trophy, CheckCircle } from "lucide-react";

const Simulations = () => {
	const simulation = {
		id: 1,
		name: "Bangus (Milkfish) Deboning",
		description: "Master the complete bangus deboning process through interactive step-by-step guidance",
		difficulty: "Intermediate",
		duration: "30 min",
		attempts: 15,
		bestScore: 87,
		available: true,
		icon: Gamepad2,
		steps: [
			"Split along the dorsal side",
			"Remove backbone carefully",
			"Extract lateral bones",
			"Clean and prepare final portion"
		]
	};

	const getScoreColor = (score) => {
		if (score >= 90) return "text-[#04510e]";
		if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
		if (score >= 60) return "text-amber-600 dark:text-amber-400";
		return "text-red-600 dark:text-red-400";
	};

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Bangus Deboning Simulation</h1>
				<p className="text-gray-600 dark:text-zinc-400 mt-2">Practice your bangus deboning skills with interactive 3D simulation and real-time feedback</p>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center">
							<Gamepad2 className="w-5 h-5 text-green-700 dark:text-[#04510e]" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{simulation.attempts}</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Total Attempts</p>
						</div>
					</div>
				</div>
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-green-50 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
							<Star className="w-5 h-5 text-green-600 dark:text-emerald-400" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{simulation.bestScore}%</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Best Score</p>
						</div>
					</div>
				</div>
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
							<Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{simulation.duration}</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Average Duration</p>
						</div>
					</div>
				</div>
				<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
							<Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
								{simulation.bestScore >= 90 ? "1" : "0"}
							</p>
							<p className="text-sm text-gray-600 dark:text-zinc-400">Mastery Achieved</p>
						</div>
					</div>
				</div>
			</div>

			{/* Feature Banner */}
			<div className="bg-[#04510e] rounded-lg p-6 mb-8 text-white shadow-sm">
				<div className="flex items-center justify-between">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Zap className="w-6 h-6" />
							<h2 className="text-2xl font-semibold">Interactive Bangus Deboning Training</h2>
						</div>
						<p className="text-green-100 mb-4">
							Learn the complete bangus deboning process with step-by-step guidance and real-time feedback
						</p>
						<button className="px-6 py-2.5 bg-white text-[#04510e] font-medium rounded-md hover:bg-green-50 transition-colors flex items-center gap-2">
							<Play className="w-4 h-4" />
							Start Practice
						</button>
					</div>
					<div className="hidden md:block">
						<Gamepad2 className="w-24 h-24 text-white opacity-20" />
					</div>
				</div>
			</div>

			{/* Main Simulation Card */}
			<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all mb-8">
				{/* Simulation Header */}
				<div className="p-6 border-b border-gray-100 dark:border-zinc-800">
					<div className="flex items-start justify-between mb-4">
						<div className="w-12 h-12 bg-green-50 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center hover:bg-green-100 dark:hover:bg-[#04510e]/30 transition-colors">
							<Gamepad2 className="w-6 h-6 text-green-700 dark:text-[#04510e]" />
						</div>
						<span className="px-2.5 py-1 rounded-md border text-xs font-medium bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30">
							{simulation.difficulty}
						</span>
					</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-3">{simulation.name}</h3>
					<p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">{simulation.description}</p>
					
					{/* Sequential Steps Preview */}
					<div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-100 dark:border-zinc-700">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-3">Deboning Steps:</h4>
						<div className="space-y-2">
							{simulation.steps.map((step, index) => (
								<div key={index} className="flex items-center gap-2">
									<div className="w-6 h-6 bg-[#04510e] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
										{index + 1}
									</div>
									<span className="text-sm text-gray-700 dark:text-zinc-300">{step}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Simulation Details */}
				<div className="p-6">
					<div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
							<div>
								<p className="text-xs text-gray-500 dark:text-zinc-500">Duration</p>
								<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{simulation.duration}</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Gamepad2 className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
							<div>
								<p className="text-xs text-gray-500 dark:text-zinc-500">Your Attempts</p>
								<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{simulation.attempts}</p>
							</div>
						</div>
					</div>

					<div className="mb-4 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700">
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600 dark:text-zinc-400">Your Best Score</span>
							<span className={`text-2xl font-semibold ${getScoreColor(simulation.bestScore)}`}>
								{simulation.bestScore}%
							</span>
						</div>
					</div>

					<button className="w-full px-4 py-2.5 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 bg-[#04510e] text-white hover:bg-[#033a0a]">
						<Play className="w-4 h-4" />
						{simulation.attempts > 0 ? "Practice Again" : "Start Simulation"}
					</button>
				</div>
			</div>

			{/* Learning Approach Section */}
			<div className="bg-green-50 dark:bg-[#04510e]/10 border border-green-200 dark:border-[#04510e]/30 rounded-lg p-6 mb-6">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 bg-green-100 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
						<CheckCircle className="w-5 h-5 text-[#04510e]" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Sequential Mastery Approach</h3>
						<p className="text-sm text-gray-700 dark:text-zinc-300 mb-3">
							Our simulation uses a step-by-step learning method where you must complete each deboning stage correctly before advancing to the next. This ensures you master each technique before moving forward.
						</p>
						<ul className="space-y-2 text-sm text-gray-700 dark:text-zinc-300">
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Complete each step correctly to progress to the next stage</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Receive immediate feedback on your technique and positioning</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Build muscle memory through repeated, guided practice</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Tips Section */}
			<div className="bg-green-50 dark:bg-[#04510e]/10 border border-green-200 dark:border-[#04510e]/30 rounded-lg p-6">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 bg-green-100 dark:bg-[#04510e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
						<Zap className="w-5 h-5 text-[#04510e]" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Bangus Deboning Tips</h3>
						<ul className="space-y-2 text-sm text-gray-700 dark:text-zinc-300">
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>When splitting the dorsal side, maintain a steady angle along the backbone to ensure clean separation</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Remove the backbone carefully by starting from the head end and working toward the tail</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Extract lateral bones systematically, checking for any remaining small bones after each section</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Follow the visual guides and highlighted areas for optimal cutting paths</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#04510e] mt-0.5">•</span>
								<span>Aim for 90% or higher score to demonstrate mastery of the complete deboning process</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Simulations;