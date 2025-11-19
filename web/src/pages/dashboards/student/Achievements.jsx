//file path: web/src/pages/dashboards/student/Achievements.jsx

import { useState } from "react";
import { 
  Trophy, 
  Zap, 
  BookOpen, 
  Target, 
  Flame, 
  Crown, 
  Star,
  Award,
  TrendingUp,
  Clock,
  Sunrise,
  CheckCircle,
  Lock
} from "lucide-react";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first lesson",
      icon: Target,
      category: "learning",
      unlocked: true,
      unlockedDate: "Oct 15, 2024",
      points: 10,
      rarity: "common"
    },
    {
      id: 2,
      name: "Quick Learner",
      description: "Complete 5 lessons in one day",
      icon: Zap,
      category: "learning",
      unlocked: true,
      unlockedDate: "Oct 18, 2024",
      points: 25,
      rarity: "uncommon"
    },
    {
      id: 3,
      name: "Practice Master",
      description: "Complete 10 simulation practices",
      icon: Trophy,
      category: "practice",
      unlocked: true,
      unlockedDate: "Oct 22, 2024",
      points: 50,
      rarity: "rare"
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "Achieve 100% in any simulation",
      icon: Star,
      category: "practice",
      unlocked: false,
      points: 75,
      rarity: "epic"
    },
    {
      id: 5,
      name: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: Flame,
      category: "streak",
      unlocked: true,
      unlockedDate: "Oct 25, 2024",
      points: 30,
      rarity: "uncommon"
    },
    {
      id: 6,
      name: "Master Deboner",
      description: "Complete all courses with 90% or higher",
      icon: Crown,
      category: "mastery",
      unlocked: false,
      points: 200,
      rarity: "legendary"
    },
    {
      id: 7,
      name: "Knowledge Seeker",
      description: "Complete 25 lessons",
      icon: BookOpen,
      category: "learning",
      unlocked: false,
      points: 40,
      rarity: "uncommon"
    },
    {
      id: 8,
      name: "Simulation Expert",
      description: "Score 90% or higher in 5 simulations",
      icon: Target,
      category: "practice",
      unlocked: false,
      points: 60,
      rarity: "rare"
    },
    {
      id: 9,
      name: "Month Master",
      description: "Maintain a 30-day learning streak",
      icon: Flame,
      category: "streak",
      unlocked: false,
      points: 100,
      rarity: "epic"
    },
    {
      id: 10,
      name: "Speed Demon",
      description: "Complete a simulation in record time",
      icon: Zap,
      category: "practice",
      unlocked: false,
      points: 45,
      rarity: "rare"
    },
    {
      id: 11,
      name: "Course Crusher",
      description: "Complete your first course",
      icon: Award,
      category: "mastery",
      unlocked: true,
      unlockedDate: "Oct 20, 2024",
      points: 50,
      rarity: "rare"
    },
    {
      id: 12,
      name: "Early Bird",
      description: "Complete a lesson before 8 AM",
      icon: Sunrise,
      category: "special",
      unlocked: false,
      points: 15,
      rarity: "common"
    }
  ];

  const categories = [
    { id: "all", name: "All", icon: Trophy },
    { id: "learning", name: "Learning", icon: BookOpen },
    { id: "practice", name: "Practice", icon: Target },
    { id: "streak", name: "Streaks", icon: Flame },
    { id: "mastery", name: "Mastery", icon: Crown },
    { id: "special", name: "Special", icon: Star }
  ];

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity) => {
    const colors = {
      common: "text-gray-600 dark:text-zinc-400",
      uncommon: "text-green-600 dark:text-green-400",
      rare: "text-teal-600 dark:text-teal-400",
      epic: "text-purple-600 dark:text-purple-400",
      legendary: "text-amber-600 dark:text-amber-400"
    };
    return colors[rarity];
  };

  const getRarityIconBg = (rarity) => {
    const colors = {
      common: "bg-gray-100 dark:bg-zinc-700",
      uncommon: "bg-green-100 dark:bg-green-500/20",
      rare: "bg-teal-100 dark:bg-teal-500/20",
      epic: "bg-purple-100 dark:bg-purple-500/20",
      legendary: "bg-amber-100 dark:bg-amber-500/20"
    };
    return colors[rarity];
  };

  const getRarityBadge = (rarity) => {
    const badges = {
      common: "bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700",
      uncommon: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30",
      rare: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-500/30",
      epic: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
      legendary: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30"
    };
    return badges[rarity];
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-zinc-100">Achievements</h1>
        <p className="text-gray-600 dark:text-zinc-400 mt-2">Track your progress and unlock rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{unlockedCount}/{achievements.length}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Unlocked</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">{totalPoints}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Total Points</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {achievements.filter(a => a.unlocked && a.rarity === "rare").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Rare Badges</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-zinc-100">Achievement Progress</h3>
          <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">
            {unlockedCount} of {achievements.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
          <div
            className="bg-[#04510e] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-[#04510e] text-white shadow-sm"
                    : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all ${
                !achievement.unlocked && "opacity-60"
              }`}
            >
              {/* Achievement Header */}
              <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${achievement.unlocked ? getRarityIconBg(achievement.rarity) : "bg-gray-100 dark:bg-zinc-800"} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${achievement.unlocked ? getRarityColor(achievement.rarity) : "text-gray-400 dark:text-zinc-600"}`} />
                  </div>
                  {achievement.unlocked ? (
                    <span className={`px-2.5 py-1 rounded-md border text-xs font-medium ${getRarityBadge(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-md border text-xs font-medium bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-700 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">{achievement.description}</p>
              </div>

              {/* Achievement Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      {achievement.points} pts
                    </span>
                  </div>
                  {achievement.unlocked && achievement.unlockedDate && (
                    <span className="text-xs text-gray-500 dark:text-zinc-500">
                      {achievement.unlockedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rarity Legend */}
      <div className="mt-8 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Rarity Levels</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {["common", "uncommon", "rare", "epic", "legendary"].map((rarity) => (
            <div key={rarity} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${
                rarity === "common" ? "bg-gray-600 dark:bg-zinc-400" :
                rarity === "uncommon" ? "bg-green-600 dark:bg-green-400" :
                rarity === "rare" ? "bg-teal-600 dark:bg-teal-400" :
                rarity === "epic" ? "bg-purple-600 dark:bg-purple-400" :
                "bg-amber-600 dark:bg-amber-400"
              }`}></div>
              <span className="text-sm text-gray-700 dark:text-zinc-300 capitalize">{rarity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;