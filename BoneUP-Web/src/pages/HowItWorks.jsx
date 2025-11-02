import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import { GitBranch, Zap, BarChart3, BookOpen, CheckCircle, ArrowRight, Play, Target, Brain, Code, ChevronRight } from 'lucide-react'

const HowItWorks = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const isAuthenticated = !!user

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (user.role === 'student') {
        navigate('/student/dashboard/simulations')
      } else if (user.role === 'instructor') {
        navigate('/instructor/dashboard')
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard')
      }
    } else {
      navigate('/signin')
    }
  }

  const fsmSteps = [
    {
      number: "1",
      title: "Initial State",
      description: "The system begins at a defined starting point with the fish intact and ready for processing.",
      icon: Play,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      number: "2",
      title: "User Action (Input)",
      description: "You perform an action such as selecting a tool, making a cut, or attempting a specific deboning technique.",
      icon: Target,
      color: "bg-blue-100 text-blue-600"
    },
    {
      number: "3",
      title: "FSM Processing",
      description: "The system evaluates your action against the current state's requirements using the transition function.",
      icon: Brain,
      color: "bg-purple-100 text-purple-600"
    },
    {
      number: "4",
      title: "State Transition or Feedback",
      description: "Correct actions advance you to the next state. Incorrect actions trigger real-time, context-specific error feedback.",
      icon: GitBranch,
      color: "bg-amber-100 text-amber-600"
    }
  ]

  const keyFeatures = [
    {
      icon: GitBranch,
      title: "FSM-Driven Simulation",
      description: "Each deboning step is a distinct state in the Finite State Machine, ensuring structured and sequential learning.",
      technical: "Utilizes Mealy FSM model where output depends on both current state and input action"
    },
    {
      icon: Zap,
      title: "Real-Time State-Based Feedback",
      description: "Receive immediate, context-aware guidance based on your exact position in the deboning process.",
      technical: "Output function G generates specific error messages or success indicators for each state-input combination"
    },
    {
      icon: CheckCircle,
      title: "Structured Task Flow",
      description: "Progress through the deboning procedure in a logical, step-by-step manner that mirrors professional standards.",
      technical: "Transition function T enforces mastery by requiring correct actions before state advancement"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your performance with detailed metrics on state accuracy, completion rates, and time spent per step.",
      technical: "Deterministic logging of all state transitions, errors, and timing data for educational diagnostics"
    }
  ]

  const benefits = [
    {
      title: "Safe Learning Environment",
      description: "Practice complex deboning techniques without the pressure or waste of working with actual fish.",
      icon: CheckCircle
    },
    {
      title: "Consistent Training Standards",
      description: "Every learner follows the same FSM-validated sequence, ensuring uniform skill development.",
      icon: CheckCircle
    },
    {
      title: "Adaptive Learning Pace",
      description: "Progress at your own speed with the system tracking your mastery of each state before advancing.",
      icon: CheckCircle
    },
    {
      title: "Data-Driven Insights",
      description: "Instructors receive detailed analytics on where students struggle and excel in the process.",
      icon: CheckCircle
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#04510e] to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              How BoneUp! Works
            </h1>
            <p className="text-xl text-green-50 leading-relaxed mb-8">
              Discover the FSM-powered technology behind our interactive fish deboning training platform
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 bg-white text-[#04510e] hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isAuthenticated ? 'Go to Simulations' : 'Get Started'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* What is FSM Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#04510e]/10 text-[#04510e] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Code className="w-4 h-4" />
              Core Technology
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Finite State Machine (FSM) Algorithm
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              BoneUp! is built on a <span className="font-semibold text-slate-900">Finite State Machine (FSM)</span> algorithm - a mathematical model that represents the deboning process as a sequence of discrete states and transitions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Unlike traditional rule-based systems that become complex and difficult to maintain, our FSM approach provides:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-slate-600">
                <CheckCircle className="w-5 h-5 text-[#04510e] flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold text-slate-900">Structured logic</span> that's easy to understand and maintain</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <CheckCircle className="w-5 h-5 text-[#04510e] flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold text-slate-900">Deterministic behavior</span> ensuring consistent training experiences</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <CheckCircle className="w-5 h-5 text-[#04510e] flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold text-slate-900">Precise tracking</span> of every learner action and outcome</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">FSM Components in BoneUp!</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="font-semibold text-[#04510e] mb-1">States (Q)</div>
                <div className="text-sm text-slate-600">Each deboning step (e.g., "Split Dorsal Side", "Remove Backbone")</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="font-semibold text-[#04510e] mb-1">Input Alphabet (Σ)</div>
                <div className="text-sm text-slate-600">Learner actions (e.g., "Correct Cut", "Wrong Tool", "Skip Step")</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="font-semibold text-[#04510e] mb-1">Transition Function (T)</div>
                <div className="text-sm text-slate-600">Determines if correct action moves you to next state</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="font-semibold text-[#04510e] mb-1">Output Function (G)</div>
                <div className="text-sm text-slate-600">Generates real-time feedback based on state and input</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Step by Step */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Learning Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each simulation follows a precise FSM cycle, guiding you through the deboning process with intelligent feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fsmSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="bg-white rounded-lg p-6 border border-slate-200 relative">
                  {index < fsmSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                  <div className={`inline-flex p-3 ${step.color} rounded-lg mb-4`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">
                    Step {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Example Flow */}
          <div className="mt-12 bg-white rounded-xl p-8 border-2 border-[#04510e]/20">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#04510e]" />
              Example: Bangus (Milkfish) Deboning
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="flex-shrink-0 w-6 h-6 bg-[#04510e] text-white rounded-full flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <span className="font-semibold text-slate-900">Current State:</span> "Split Dorsal Side"
                  <span className="text-slate-500 ml-2">→ You must make a precise cut along the dorsal line</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs">✓</div>
                <div>
                  <span className="font-semibold text-emerald-700">Correct Action:</span> You perform the cut correctly
                  <span className="text-slate-500 ml-2">→ FSM transitions to "Expose Backbone" state</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="flex-shrink-0 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-xs">✗</div>
                <div>
                  <span className="font-semibold text-rose-700">Incorrect Action:</span> You cut too deep or use wrong tool
                  <span className="text-slate-500 ml-2">→ FSM stays in current state, provides specific error feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our FSM-driven approach delivers powerful features that traditional training methods cannot match
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {keyFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="bg-white rounded-lg border border-slate-200 p-6 hover:border-[#04510e]/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-[#04510e]/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-[#04510e]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-900">
                        <span className="font-semibold">Technical:</span> {feature.technical}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-slate-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why FSM-Based Learning?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The advantages of our structured, state-driven approach to fish deboning education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-6 h-6 text-[#04510e] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
            <div className="bg-[#04510e] text-white px-6 py-4">
              <h3 className="text-xl font-bold">FSM vs Traditional Rule-Based Systems</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Criteria</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-rose-700">Traditional Rule-Based</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-700">FSM (BoneUp!)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">Structure</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Implicit logic, nested if-else blocks</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Formal mathematical model with clear states</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">Scalability</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Difficult; complexity grows rapidly</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Modular; uses finite, discrete states</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">Maintainability</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Low; prone to "spaghetti code"</td>
                    <td className="px-6 py-4 text-sm text-slate-600">High; logic is explicit and separated</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">Consistency</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Difficult to guarantee</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Deterministic; strictly governed behavior</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#04510e] to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience FSM-Powered Learning?
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            {isAuthenticated 
              ? 'Access your personalized simulations and start mastering fish deboning today.'
              : 'Join BoneUp! and start your journey to mastering fish deboning with intelligent, structured training.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 bg-white text-[#04510e] hover:bg-green-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/fish-guide"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Explore Fish Species
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks