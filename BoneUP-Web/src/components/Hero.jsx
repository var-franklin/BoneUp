import React from 'react'

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your Virtual Fish{' '}
            <span className="text-blue-600">Deboning Lab</span>
          </h1>
          
          {/* Sub Headline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 font-medium">
            Learn. Practice. Perfect.
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Master the art of fish deboning through interactive virtual practice. 
            Build your skills with guided tutorials and hands-on simulations.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Start Learning
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-lg border-2 border-gray-200 transition-all duration-200 shadow-md hover:shadow-lg">
              View Fish Guide
            </button>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Hero