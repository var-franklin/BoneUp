import React from 'react'

const Hero = () => {
  return (
    <div className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#04510e] mb-6">
            Your Virtual Fish{' '}
            <span className="text-green-600">Deboning Lab</span>
          </h1>
          
          {/* Sub Headline */}
          <p className="text-xl sm:text-2xl text-green-800 mb-12 font-medium">
            Learn. Practice. Perfect.
          </p>
          
          {/* Description */}
          <p className="text-lg text-black mb-12 max-w-2xl mx-auto leading-relaxed">
            Master the art of fish deboning through interactive virtual practice. 
            Build your skills with guided tutorials and hands-on simulations.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-[#04510e] hover:bg-green-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              Start Learning
            </button>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Hero