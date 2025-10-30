import { Gamepad2, Star, Target, Trophy, Clock, Play, Lock, Zap } from "lucide-react";

const Simulations = () => {
	const simulations = [
		{
			id: 1,
			name: "Salmon Filleting",
			description: "Practice filleting techniques on a realistic 3D salmon model",
			difficulty: "Beginner",
			duration: "15 min",
			attempts: 12,
			bestScore: 85,
			available: true,
			icon: Gamepad2
		},
		{
			id: 2,
			name: "Tilapia Deboning",
			description: "Master the deboning process for tilapia with step-by-step guidance",
			difficulty: "Beginner",
			duration: "20 min",
			attempts: 8,
			bestScore: 92,
			available: true,
			icon: Target
		},
		{
			id: 3,
			name: "Tuna Steak Preparation",
			description: "Learn to prepare and portion tuna steaks from a whole fish",
			difficulty: "Intermediate",
			duration: "25 min",
			attempts: 5,
			bestScore: 78,
			available: true,
			icon: Zap
		},
		{
			id: 4,
			name: "Mackerel Complete Deboning",
			description: "Advanced simulation for complete mackerel deboning",
			difficulty: "Intermediate",
			duration: "30 min",
			attempts: 3,
			bestScore: 65,
			available: true,
			icon: Star
		},
		{
			id: 5,
			name: "Whole Snapper Processing",
			description: "Process a whole snapper from scaling to final portioning",
			difficulty: "Advanced",
			duration: "35 min",
			attempts: 0,
			bestScore: null,
			available: false,
			icon: Trophy
		},
		{
			id: 6,
			name: "Multi-Fish Challenge",
			description: "Time-based challenge to process multiple fish species",
			difficulty: "Advanced",
			duration: "45 min",
			attempts: 0,
			bestScore: null,
			available: false,
			icon: Trophy
		}
	];

	const getDifficultyColor = (difficulty) => {
		const colors = {
			Beginner: "bg-green-50 text-green-700 border-green-200",
			Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
			Advanced: "bg-red-50 text-red-700 border-red-200"
		};
		return colors[difficulty];
	};

	const getScoreColor = (score) => {
		if (score >= 90) return "text-green-600";
		if (score >= 75) return "text-blue-600";
		if (score >= 60) return "text-amber-600";
		return "text-red-600";
	};

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-semibold text-gray-900">Practice Simulations</h1>
				<p className="text-gray-600 mt-2">Hone your skills with interactive 3D fish deboning simulations</p>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
							<Gamepad2 className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900">
								{simulations.reduce((acc, sim) => acc + sim.attempts, 0)}
							</p>
							<p className="text-sm text-gray-600">Total Attempts</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
							<Star className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900">
								{Math.round(simulations.filter(s => s.bestScore).reduce((acc, sim) => acc + sim.bestScore, 0) / simulations.filter(s => s.bestScore).length)}
							</p>
							<p className="text-sm text-gray-600">Average Score</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
							<Target className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900">
								{simulations.filter(s => s.available).length}
							</p>
							<p className="text-sm text-gray-600">Available</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
							<Trophy className="w-5 h-5 text-orange-600" />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-900">
								{simulations.filter(s => s.bestScore && s.bestScore >= 90).length}
							</p>
							<p className="text-sm text-gray-600">High Scores</p>
						</div>
					</div>
				</div>
			</div>

			{/* Feature Banner */}
			<div className="bg-blue-600 rounded-lg p-6 mb-8 text-white border border-blue-700 shadow-sm">
				<div className="flex items-center justify-between">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Zap className="w-6 h-6" />
							<h2 className="text-2xl font-semibold">Try Our Latest Simulation!</h2>
						</div>
						<p className="text-blue-100 mb-4">
							New interactive tilapia deboning simulation with real-time feedback
						</p>
						<button className="px-6 py-2.5 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors flex items-center gap-2">
							<Play className="w-4 h-4" />
							Launch Now
						</button>
					</div>
					<div className="hidden md:block">
						<Target className="w-24 h-24 text-blue-500 opacity-50" />
					</div>
				</div>
			</div>

			{/* Simulations Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{simulations.map((sim) => {
					const Icon = sim.icon;
					return (
						<div
							key={sim.id}
							className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all group ${
								!sim.available && "opacity-60"
							}`}
						>
							{/* Simulation Header */}
							<div className="p-6 border-b border-gray-100">
								<div className="flex items-start justify-between mb-4">
									<div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
										sim.available ? "bg-blue-50 group-hover:bg-blue-100" : "bg-gray-50"
									}`}>
										<Icon className={`w-6 h-6 ${sim.available ? "text-blue-600" : "text-gray-400"}`} />
									</div>
									{!sim.available && (
										<div className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
											<Lock className="w-3 h-3" />
											Locked
										</div>
									)}
								</div>
								<div className="flex items-start justify-between mb-3">
									<h3 className="text-lg font-semibold text-gray-900">{sim.name}</h3>
									<span className={`px-2.5 py-1 rounded-md border text-xs font-medium ${getDifficultyColor(sim.difficulty)}`}>
										{sim.difficulty}
									</span>
								</div>
								<p className="text-sm text-gray-600">{sim.description}</p>
							</div>

							{/* Simulation Details */}
							<div className="p-6">
								<div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
									<div className="flex items-center gap-2">
										<Clock className="w-4 h-4 text-gray-400" />
										<div>
											<p className="text-xs text-gray-500">Duration</p>
											<p className="text-sm font-medium text-gray-900">{sim.duration}</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Gamepad2 className="w-4 h-4 text-gray-400" />
										<div>
											<p className="text-xs text-gray-500">Attempts</p>
											<p className="text-sm font-medium text-gray-900">{sim.attempts}</p>
										</div>
									</div>
								</div>

								{sim.bestScore !== null && (
									<div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Best Score</span>
											<span className={`text-2xl font-semibold ${getScoreColor(sim.bestScore)}`}>
												{sim.bestScore}%
											</span>
										</div>
									</div>
								)}

								<button
									className={`w-full px-4 py-2.5 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
										sim.available
											? "bg-blue-600 text-white hover:bg-blue-700"
											: "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
									}`}
									disabled={!sim.available}
								>
									{sim.available ? (
										<>
											<Play className="w-4 h-4" />
											{sim.attempts > 0 ? "Practice Again" : "Start Simulation"}
										</>
									) : (
										<>
											<Lock className="w-4 h-4" />
											Complete Prerequisites
										</>
									)}
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* Tips Section */}
			<div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
						<Zap className="w-5 h-5 text-blue-600" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-3">Simulation Tips</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li className="flex items-start gap-2">
								<span className="text-blue-600 mt-0.5">•</span>
								<span>Take your time and follow the highlighted guides for best results</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-blue-600 mt-0.5">•</span>
								<span>Use the pause button to review your technique at any time</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-blue-600 mt-0.5">•</span>
								<span>Complete beginner simulations to unlock advanced challenges</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-blue-600 mt-0.5">•</span>
								<span>Aim for 90% or higher to earn achievement badges</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Simulations;