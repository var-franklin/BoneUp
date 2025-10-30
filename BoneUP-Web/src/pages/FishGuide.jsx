import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Fish, Waves, Droplets, Star, ChevronRight, Award, BookOpen, Video, Trophy, BarChart3, X } from 'lucide-react'

const FishGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFish, setSelectedFish] = useState(null)

  const categories = [
    { id: 'all', name: 'All Fish', icon: Fish },
    { id: 'freshwater', name: 'Freshwater', icon: Droplets },
    { id: 'saltwater', name: 'Saltwater', icon: Waves },
    { id: 'popular', name: 'Most Popular', icon: Star }
  ]

  const fishData = [
    {
      id: 1,
      name: "Atlantic Salmon",
      category: "saltwater",
      difficulty: "Beginner",
      bones: "Pin bones, backbone",
      technique: "Fillet cut",
      tips: "Remove pin bones with tweezers after filleting",
      popular: true,
      description: "Large, meaty fish with relatively simple bone structure. Perfect for beginners learning basic filleting techniques."
    },
    {
      id: 2,
      name: "Rainbow Trout",
      category: "freshwater",
      difficulty: "Beginner",
      bones: "Fine rib bones, backbone",
      technique: "Whole fish deboning",
      tips: "Work slowly around the rib cage area",
      popular: true,
      description: "Common freshwater fish with delicate flesh. Great for practicing precision and gentle handling."
    },
    {
      id: 3,
      name: "Sea Bass",
      category: "saltwater",
      difficulty: "Intermediate",
      bones: "Complex rib structure",
      technique: "Professional filleting",
      tips: "Follow the natural curve of the fish",
      popular: true,
      description: "Premium fish with firm flesh and moderate bone complexity. Excellent for intermediate skill development."
    },
    {
      id: 4,
      name: "Pike",
      category: "freshwater",
      difficulty: "Advanced",
      bones: "Y-bones, complex structure",
      technique: "Five-fillet method",
      tips: "Requires specialized Y-bone removal technique",
      popular: false,
      description: "Challenging fish with unique Y-bone structure. Advanced technique required for proper deboning."
    },
    {
      id: 5,
      name: "Flounder",
      category: "saltwater",
      difficulty: "Intermediate",
      bones: "Flat fish bone pattern",
      technique: "Four-fillet method",
      tips: "Start from the head, work toward the tail",
      popular: false,
      description: "Flat fish requiring specialized technique. Good for learning different bone patterns."
    },
    {
      id: 6,
      name: "Mackerel",
      category: "saltwater",
      difficulty: "Beginner",
      bones: "Standard bone structure",
      technique: "Quick fillet",
      tips: "Sharp knife essential for clean cuts",
      popular: false,
      description: "Small, oily fish with straightforward bone structure. Quick to process and great for beginners."
    }
  ]

  const filteredFish = fishData.filter(fish => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'popular') return fish.popular
    return fish.category === selectedCategory
  })

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Advanced': return 'bg-rose-50 text-rose-700 border-rose-200'
      default: return 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Header Section */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Fish Deboning Guide</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Comprehensive guide to deboning different fish species with detailed techniques and professional tips
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Fish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredFish.map((fish) => (
            <div 
              key={fish.id} 
              className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 overflow-hidden group hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Fish className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(fish.difficulty)}`}>
                    {fish.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{fish.name}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {fish.description}
                </p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Bone Type</span>
                    <span className="text-slate-700 font-medium">{fish.bones}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Technique</span>
                    <span className="text-slate-700 font-medium">{fish.technique}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 mb-5 border border-blue-100">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Tip:</span> {fish.tips}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedFish(fish)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                    Practice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Resources */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Learning Resources</h2>
            <p className="text-slate-600">Everything you need to master fish deboning techniques</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Study Guides</h3>
              <p className="text-sm text-slate-600">Downloadable guides for each fish type</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-emerald-100 rounded-lg mb-4">
                <Video className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-slate-600">Step-by-step video demonstrations</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-purple-100 rounded-lg mb-4">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Practice Tests</h3>
              <p className="text-sm text-slate-600">Test your knowledge and skills</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-amber-100 rounded-lg mb-4">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-sm text-slate-600">Monitor your learning journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fish Detail Modal */}
      {selectedFish && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{selectedFish.name}</h2>
              <button 
                onClick={() => setSelectedFish(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <Fish className="w-20 h-20 text-blue-600" />
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">{selectedFish.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Difficulty Level</h4>
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(selectedFish.difficulty)}`}>
                    {selectedFish.difficulty}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Bone Structure</h4>
                  <p className="text-slate-600 text-sm">{selectedFish.bones}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Start Practice Session
                </button>
                <button 
                  onClick={() => setSelectedFish(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FishGuide