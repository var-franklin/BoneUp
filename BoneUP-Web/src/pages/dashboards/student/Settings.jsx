import { useState, useContext } from "react";
import { User, Bell, Settings as SettingsIcon, Lock, Camera, Mail, Phone, MapPin, FileText, Key, Shield, Download, FileCheck, Trash2 } from "lucide-react";
import { AppContext } from "../../../context/AppContext";

const Settings = () => {
	const { user } = useContext(AppContext);
	const [activeTab, setActiveTab] = useState("profile");

	// Mock state
	const [notifications, setNotifications] = useState({
		emailLessons: true,
		emailAchievements: true,
		emailReminders: false,
		pushSimulations: true,
		pushStreak: true
	});

	const [preferences, setPreferences] = useState({
		language: "english",
		difficulty: "intermediate",
		autoplay: true,
		subtitles: false
	});

	const tabs = [
		{ id: "profile", name: "Profile", icon: User },
		{ id: "notifications", name: "Notifications", icon: Bell },
		{ id: "preferences", name: "Preferences", icon: SettingsIcon },
		{ id: "privacy", name: "Privacy", icon: Lock }
	];

	return (
		<div className="p-8 bg-gray-50 dark:bg-zinc-950 min-h-screen">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Settings</h1>
				<p className="text-gray-600 dark:text-zinc-400 mt-2">Manage your account and preferences</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Sidebar Tabs */}
				<div className="lg:col-span-1">
					<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm p-2">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
										activeTab === tab.id
											? "bg-green-50 dark:bg-[#04510e] text-[#04510e] dark:text-white"
											: "text-gray-700 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
									}`}
								>
									<Icon className="w-5 h-5" />
									<span>{tab.name}</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* Content Area */}
				<div className="lg:col-span-3">
					{/* Profile Tab */}
					{activeTab === "profile" && (
						<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
							<div className="p-6 border-b border-gray-200 dark:border-zinc-800">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Profile Information</h2>
								<p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Update your personal details and profile picture</p>
							</div>
							<div className="p-6 space-y-6">
								{/* Profile Picture */}
								<div className="flex items-center gap-6">
									<div className="w-20 h-20 rounded-full bg-[#04510e] flex items-center justify-center text-white text-3xl font-semibold">
										{(user?.full_name || user?.email || "U")[0].toUpperCase()}
									</div>
									<div>
										<button className="px-4 py-2 bg-[#04510e] text-white text-sm font-medium rounded-lg hover:bg-[#033a0a] transition-colors flex items-center gap-2">
											<Camera className="w-4 h-4" />
											Change Photo
										</button>
										<p className="text-xs text-gray-500 dark:text-zinc-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
									</div>
								</div>

								{/* Form Fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
											Full Name
										</label>
										<input
											type="text"
											defaultValue={user?.full_name || ""}
											className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
											placeholder="Enter your full name"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
											Email Address
										</label>
										<input
											type="email"
											defaultValue={user?.email || ""}
											className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
											placeholder="your.email@example.com"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
											Phone Number
										</label>
										<input
											type="tel"
											placeholder="+1 (555) 000-0000"
											className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
											Location
										</label>
										<input
											type="text"
											placeholder="City, Country"
											className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
										Bio
									</label>
									<textarea
										rows="4"
										placeholder="Tell us about yourself..."
										className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors resize-none"
									></textarea>
								</div>

								<div className="flex gap-3 pt-4">
									<button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#033a0a] transition-colors">
										Save Changes
									</button>
									<button className="px-6 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Notifications Tab */}
					{activeTab === "notifications" && (
						<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
							<div className="p-6 border-b border-gray-200 dark:border-zinc-800">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Notification Preferences</h2>
								<p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Choose what updates you want to receive</p>
							</div>
							<div className="p-6 space-y-6">
								{/* Email Notifications */}
								<div>
									<div className="flex items-center gap-2 mb-4">
										<Mail className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
										<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Email Notifications</h3>
									</div>
									<div className="space-y-4">
										<div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800">
											<div>
												<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">New Lessons</p>
												<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Get notified when new lessons are available</p>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													checked={notifications.emailLessons}
													onChange={(e) => setNotifications({...notifications, emailLessons: e.target.checked})}
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
											</label>
										</div>
										<div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800">
											<div>
												<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Achievement Unlocked</p>
												<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Receive emails when you earn achievements</p>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													checked={notifications.emailAchievements}
													onChange={(e) => setNotifications({...notifications, emailAchievements: e.target.checked})}
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
											</label>
										</div>
										<div className="flex items-center justify-between py-3">
											<div>
												<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Learning Reminders</p>
												<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Daily reminders to continue learning</p>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													checked={notifications.emailReminders}
													onChange={(e) => setNotifications({...notifications, emailReminders: e.target.checked})}
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
											</label>
										</div>
									</div>
								</div>

								{/* Push Notifications */}
								<div className="pt-6 border-t border-gray-200 dark:border-zinc-800">
									<div className="flex items-center gap-2 mb-4">
										<Bell className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
										<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Push Notifications</h3>
									</div>
									<div className="space-y-4">
										<div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800">
											<div>
												<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Simulation Updates</p>
												<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">New simulations and challenges</p>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													checked={notifications.pushSimulations}
													onChange={(e) => setNotifications({...notifications, pushSimulations: e.target.checked})}
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
											</label>
										</div>
										<div className="flex items-center justify-between py-3">
											<div>
												<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Streak Alerts</p>
												<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Reminders to maintain your learning streak</p>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													checked={notifications.pushStreak}
													onChange={(e) => setNotifications({...notifications, pushStreak: e.target.checked})}
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
											</label>
										</div>
									</div>
								</div>

								<div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
									<button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#033a0a] transition-colors">
										Save Preferences
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Preferences Tab */}
					{activeTab === "preferences" && (
						<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
							<div className="p-6 border-b border-gray-200 dark:border-zinc-800">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Learning Preferences</h2>
								<p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Customize your learning experience</p>
							</div>
							<div className="p-6 space-y-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
										Content Language
									</label>
									<select
										value={preferences.language}
										onChange={(e) => setPreferences({...preferences, language: e.target.value})}
										className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
									>
										<option value="english">English</option>
										<option value="spanish">Spanish</option>
										<option value="french">French</option>
										<option value="german">German</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
										Default Difficulty Level
									</label>
									<select
										value={preferences.difficulty}
										onChange={(e) => setPreferences({...preferences, difficulty: e.target.value})}
										className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-[#04510e] focus:border-transparent transition-colors"
									>
										<option value="beginner">Beginner</option>
										<option value="intermediate">Intermediate</option>
										<option value="advanced">Advanced</option>
									</select>
								</div>

								<div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-zinc-800">
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Autoplay Videos</p>
										<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Automatically play next lesson video</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={preferences.autoplay}
											onChange={(e) => setPreferences({...preferences, autoplay: e.target.checked})}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
									</label>
								</div>

								<div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-zinc-800">
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-zinc-100">Show Subtitles</p>
										<p className="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">Display subtitles in video lessons</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={preferences.subtitles}
											onChange={(e) => setPreferences({...preferences, subtitles: e.target.checked})}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-zinc-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04510e]"></div>
									</label>
								</div>

								<div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
									<button className="px-6 py-2.5 bg-[#04510e] text-white font-medium rounded-lg hover:bg-[#033a0a] transition-colors">
										Save Preferences
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Privacy Tab */}
					{activeTab === "privacy" && (
						<div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
							<div className="p-6 border-b border-gray-200 dark:border-zinc-800">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Privacy & Security</h2>
								<p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Manage your privacy settings and account security</p>
							</div>
							<div className="p-6 space-y-6">
								<div>
									<div className="flex items-center gap-2 mb-3">
										<Key className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
										<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Password</h3>
									</div>
									<p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">Update your password to keep your account secure</p>
									<button className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
										Change Password
									</button>
								</div>

								<div className="pt-6 border-t border-gray-200 dark:border-zinc-800">
									<div className="flex items-center gap-2 mb-3">
										<Shield className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
										<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Two-Factor Authentication</h3>
									</div>
									<p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
										Add an extra layer of security to your account
									</p>
									<button className="px-4 py-2.5 bg-[#04510e] text-white text-sm font-medium rounded-lg hover:bg-[#033a0a] transition-colors flex items-center gap-2">
										<Shield className="w-4 h-4" />
										Enable 2FA
									</button>
								</div>

								<div className="pt-6 border-t border-gray-200 dark:border-zinc-800">
									<div className="flex items-center gap-2 mb-3">
										<FileText className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
										<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Data & Privacy</h3>
									</div>
									<div className="space-y-3">
										<button className="w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-left flex items-center gap-2">
											<Download className="w-4 h-4" />
											Download My Data
										</button>
										<button className="w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-left flex items-center gap-2">
											<FileCheck className="w-4 h-4" />
											View Privacy Policy
										</button>
									</div>
								</div>

								<div className="pt-6 border-t border-red-200 dark:border-red-900">
									<div className="flex items-center gap-2 mb-3">
										<Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
										<h3 className="text-sm font-semibold text-red-900 dark:text-red-400">Danger Zone</h3>
									</div>
									<p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
										Once you delete your account, there is no going back. Please be certain.
									</p>
									<button className="px-4 py-2.5 bg-red-600 dark:bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 dark:hover:bg-red-700 transition-colors flex items-center gap-2">
										<Trash2 className="w-4 h-4" />
										Delete Account
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Settings;