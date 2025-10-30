import React from 'react'
import Navbar from '../components/Navbar'
import { Scissors, Search, Zap, Eye, ChevronRight, BookOpen, PlayCircle, Target } from 'lucide-react'

const Tools = () => {
  const tools = [
    {
      id: 1,
      name: "Virtual Fillet Knife",
      description: "Practice proper knife handling and fillet techniques",
      icon: Scissors,
      difficulty: "Beginner",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      id: 2,
      name: "Bone Detection Scanner",
      description: "Learn to identify and locate fish bones accurately",
      icon: Search,
      difficulty: "Intermediate",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      id: 3,
      name: "Precision Deboning Tool",
      description: "Master advanced deboning techniques with specialized tools",
      icon: Zap,
      difficulty: "Advanced",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600"
    },
    {
      id: 4,
      name: "Fish Anatomy Viewer",
      description: "Interactive 3D model showing fish bone structure",
      icon: Eye,
      difficulty: "All Levels",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ]

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
      <Navbar/>
      
      {/* Header Section */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Virtual Deboning Tools</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Practice with professional-grade virtual tools designed to help you master fish deboning techniques
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <div key={tool.id} className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 overflow-hidden group hover:shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 ${tool.iconBg} rounded-lg`}>
                      <IconComponent className={`w-6 h-6 ${tool.iconColor}`} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{tool.name}</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">{tool.description}</p>
                  
                  <div className="flex gap-3 mb-6">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                      Launch Tool
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span className="font-medium">Your Progress</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${Math.floor(Math.random() * 100)}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Start Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Start Guide</h2>
            <p className="text-slate-600">New to virtual deboning? Start with these recommended steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
              <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Learn the Basics</h3>
              <p className="text-sm text-slate-600">Start with the Fish Anatomy Viewer to understand bone structure</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
              <div className="inline-flex p-3 bg-emerald-100 rounded-lg mb-4">
                <PlayCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Practice Handling</h3>
              <p className="text-sm text-slate-600">Use the Virtual Fillet Knife to develop proper technique</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
              <div className="inline-flex p-3 bg-purple-100 rounded-lg mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Master Advanced Skills</h3>
              <p className="text-sm text-slate-600">Progress to specialized tools for expert-level deboning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tools