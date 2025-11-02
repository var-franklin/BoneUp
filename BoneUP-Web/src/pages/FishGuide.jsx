import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import { Fish, Waves, Droplets, Star, ChevronRight, BookOpen, Video, Trophy, BarChart3, X, GitBranch, AlertCircle, Lock } from 'lucide-react'

const FishGuide = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFish, setSelectedFish] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  // Check if user is authenticated
  const isAuthenticated = !!user

  const categories = [
    { id: 'all', name: 'All Fish', icon: Fish },
    { id: 'freshwater', name: 'Freshwater', icon: Droplets },
    { id: 'brackish', name: 'Brackish Water', icon: Waves },
    { id: 'popular', name: 'Most Popular', icon: Star }
  ]

  const fishData = [
    {
      id: 1,
      name: "Bangus (Milkfish)",
      scientificName: "Chanos chanos",
      category: "brackish",
      difficulty: "Advanced",
      stateCount: 12,
      bones: "Complex Y-bones, pin bones, rib bones",
      technique: "Traditional Filipino deboning method",
      tips: "Requires patience and precision for Y-bone removal",
      popular: true,
      description: "The primary focus of BoneUp! training. Bangus deboning is a skilled craft requiring mastery of complex bone structures, particularly the challenging Y-bones unique to milkfish.",
      fsmStates: [
        "Initial State - Fish Preparation",
        "Split Dorsal Side",
        "Expose Backbone",
        "Remove Backbone Carefully",
        "Identify Y-Bone Pattern",
        "Remove Y-Bones (Left Side)",
        "Remove Y-Bones (Right Side)",
        "Remove Rib Bones",
        "Remove Pin Bones",
        "Clean Cavity",
        "Quality Check",
        "Final State - Deboned Fish"
      ]
    },
    {
      id: 2,
      name: "Tilapia",
      scientificName: "Oreochromis niloticus",
      category: "freshwater",
      difficulty: "Beginner",
      stateCount: 7,
      bones: "Standard bone structure, backbone, ribs",
      technique: "Basic filleting",
      tips: "Ideal for learning fundamental deboning techniques",
      popular: true,
      description: "Commonly farmed freshwater fish perfect for beginners. Simple bone structure allows students to learn basic FSM transitions and deboning fundamentals.",
      fsmStates: [
        "Initial State - Fish Preparation",
        "Make Initial Cut Behind Gills",
        "Cut Along Backbone",
        "Separate Fillet from Ribs",
        "Remove Pin Bones",
        "Quality Check",
        "Final State - Clean Fillet"
      ]
    },
    {
      id: 3,
      name: "Galunggong (Round Scad)",
      scientificName: "Decapterus macrosoma",
      category: "brackish",
      difficulty: "Intermediate",
      stateCount: 8,
      bones: "Fine rib bones, backbone",
      technique: "Precision filleting",
      tips: "Small size requires careful handling and precision",
      popular: true,
      description: "Popular Philippine fish with moderate complexity. Good for intermediate students transitioning from basic to advanced techniques.",
      fsmStates: [
        "Initial State - Fish Preparation",
        "Head Removal",
        "Cut Along Dorsal Line",
        "Remove Backbone",
        "Separate Fillets",
        "Remove Fine Rib Bones",
        "Quality Check",
        "Final State - Clean Fillet"
      ]
    },
    {
      id: 4,
      name: "Maya-maya (Red Snapper)",
      scientificName: "Lutjanus campechanus",
      category: "brackish",
      difficulty: "Intermediate",
      stateCount: 9,
      bones: "Complex rib structure, firm backbone",
      technique: "Professional filleting",
      tips: "Follow natural bone structure, maintain fillet integrity",
      popular: false,
      description: "Premium fish with firm flesh and moderate bone complexity. Excellent for developing professional-level filleting skills.",
      fsmStates: [
        "Initial State - Fish Preparation",
        "Position Fish Correctly",
        "Initial Incision Behind Gills",
        "Cut Along Backbone",
        "Navigate Rib Cage",
        "Separate Fillet Cleanly",
        "Remove Pin Bones",
        "Quality Assessment",
        "Final State - Restaurant-Quality Fillet"
      ]
    },
    {
      id: 5,
      name: "Hito (Catfish)",
      scientificName: "Clarias batrachus",
      category: "freshwater",
      difficulty: "Beginner",
      stateCount: 6,
      bones: "Simple backbone structure",
      technique: "Skinning and filleting",
      tips: "Remove skin first for easier processing",
      popular: false,
      description: "Local freshwater fish with straightforward bone structure. Good for learning basic state transitions and building confidence.",
      fsmStates: [
        "Initial State - Fish Preparation",
        "Remove Skin",
        "Cut Along Backbone",
        "Separate Fillet",
        "Remove Remaining Bones",
        "Final State - Clean Fillet"
      ]
    },
    {
      id: 6,
      name: "Lapu-lapu (Grouper)",
      scientificName: "Epinephelus coioides",
      category: "brackish",
      difficulty: "Advanced",
      stateCount: 10,
      bones: "Large backbone, complex rib structure",
      technique: "Advanced professional filleting",
      tips: "Large size requires strength and precise knife control",
      popular: false,
      description: "Large, premium fish requiring advanced techniques. Challenges students with size, bone complexity, and professional presentation standards.",
      fsmStates: [
        "Initial State - Fish Preparation",
        "Secure Large Fish",
        "Initial Cut Behind Pectoral Fin",
        "Navigate Along Backbone",
        "Separate from Rib Cage",
        "Remove Fillet Cleanly",
        "Repeat for Second Side",
        "Remove Pin Bones",
        "Quality Control Check",
        "Final State - Premium Fillet"
      ]
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

  const handlePracticeClick = (fish) => {
    if (isAuthenticated) {
      // Check user role and redirect accordingly
      if (user.role === 'student') {
        navigate('/student/dashboard/simulations')
      } else if (user.role === 'instructor') {
        navigate('/instructor/dashboard')
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard')
      }
    } else {
      setShowAuthModal(true)
    }
  }

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-amber-100 rounded-full">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
          Authentication Required
        </h3>
        <p className="text-slate-600 text-center mb-6">
          Please sign in to access the interactive fish deboning simulations and track your progress.
        </p>
        <div className="flex gap-3">
          <Link
            to="/signin"
            className="flex-1 bg-[#04510e] hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
          >
            Sign In
          </Link>
          <Link
            to="/get-started"
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors text-center"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setShowAuthModal(false)}
          className="w-full mt-3 text-slate-500 hover:text-slate-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="border-b border-white/20 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
              Fish Deboning Guide
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              FSM-based interactive simulations for Philippine fisheries education. Master the art of fish deboning through structured, state-driven learning.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#04510e] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Preview Mode:</span> This guide provides an overview of fish species and FSM state structures. 
              To access full interactive simulations, detailed step-by-step instructions, and progress tracking, please {isAuthenticated ? 'enroll in a course' : 'sign in and enroll in a course'} through the Student Dashboard.
            </p>
          </div>
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
                  <div className="p-2 bg-[#04510e]/10 rounded-lg">
                    <Fish className="w-6 h-6 text-[#04510e]" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(fish.difficulty)}`}>
                    {fish.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{fish.name}</h3>
                <p className="text-xs text-slate-500 italic mb-3">{fish.scientificName}</p>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {fish.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <GitBranch className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">FSM States:</span>
                    <span className="text-slate-700 font-semibold">{fish.stateCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Bone Type:</span>
                    <span className="text-slate-700 font-medium text-right">{fish.bones.split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Technique:</span>
                    <span className="text-slate-700 font-medium text-right">{fish.technique}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Tip:</span> {fish.tips}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedFish(fish)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#04510e] hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    View FSM States
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handlePracticeClick(fish)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Complete Learning System</h2>
            <p className="text-slate-600">Access the full BoneUp! platform features through the Student Dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Course Materials</h3>
              <p className="text-sm text-slate-600">Comprehensive guides and FSM documentation for each fish species</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-emerald-100 rounded-lg mb-4">
                <Video className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Interactive Simulations</h3>
              <p className="text-sm text-slate-600">FSM-driven step-by-step practice with real-time feedback</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-purple-100 rounded-lg mb-4">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Achievements</h3>
              <p className="text-sm text-slate-600">Track mastery levels and earn certifications</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
              <div className="inline-flex p-3 bg-amber-100 rounded-lg mb-4">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-slate-600">Monitor state accuracy and completion rates</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            {isAuthenticated ? (
              <Link
                to={user.role === 'student' ? '/student/dashboard/courses' : `/${user.role}/dashboard`}
                className="inline-flex items-center gap-2 bg-[#04510e] hover:bg-green-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Go to Dashboard
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-[#04510e] hover:bg-green-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Enroll in a Course
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Fish Detail Modal with FSM States */}
      {selectedFish && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedFish.name}</h2>
                <p className="text-sm text-slate-500 italic">{selectedFish.scientificName}</p>
              </div>
              <button 
                onClick={() => setSelectedFish(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-[#04510e]/10 rounded-lg">
                  <Fish className="w-20 h-20 text-[#04510e]" />
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

              {/* FSM States Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-slate-900">FSM State Sequence</h4>
                  <span className="ml-auto text-sm text-blue-600 font-medium">
                    {selectedFish.stateCount} States
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedFish.fsmStates.map((state, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-slate-700 leading-6">{state}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">Note:</span> Full interactive simulation with real-time feedback, error handling, and progress tracking available in enrolled courses.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => handlePracticeClick(selectedFish)}
                  className="flex-1 bg-[#04510e] hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
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

      {/* Auth Modal */}
      {showAuthModal && <AuthModal />}
    </div>
  )
}

export default FishGuide