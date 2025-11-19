import React from 'react'
import { Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#04510e] to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Left Side - Client & Institution */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/img/cvsu_logo.png" 
                alt="CvSU Logo" 
                className="w-16 h-16"
              />
              <div>
                <h3 className="font-bold text-lg">Cavite State University</h3>
                <p className="text-green-100 text-sm">Naic Campus</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-green-50 text-sm leading-relaxed mb-3">
                Developed for <span className="font-semibold text-white">Fisheries, Aquatic, and Sciences Department</span> at Cavite State University - Naic Campus
              </p>
              <p className="text-green-100 text-sm leading-relaxed">
                CvSUHimay is an FSM-powered virtual fish deboning training platform designed to enhance fisheries education through interactive simulation and structured learning.
              </p>
            </div>
          </div>

          {/* Right Side - Developers */}
          <div className="md:text-right">
            <h3 className="font-bold text-lg mb-6">Development Team</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-white text-sm mb-1">Gavriell C. Pangan</p>
                <div className="flex items-center md:justify-end gap-2">
                  <Mail className="w-4 h-4 text-green-200 flex-shrink-0" />
                  <p className="text-xs text-green-100">nc.gavriell.pangan@cvsu.edu.ph</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-white text-sm mb-1">Jhonlorence A. Hilario</p>
                <div className="flex items-center md:justify-end gap-2">
                  <Mail className="w-4 h-4 text-green-200 flex-shrink-0" />
                  <p className="text-xs text-green-100">nc.jhonlorence.hilario@cvsu.edu.ph</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-white text-sm mb-1">Franklin Gian G. Sarmiento</p>
                <div className="flex items-center md:justify-end gap-2">
                  <Mail className="w-4 h-4 text-green-200 flex-shrink-0" />
                  <p className="text-xs text-green-100">nc.franklingian.sarmiento@cvsu.edu.ph</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-green-700 py-8 text-center">
          <p className="text-green-100 text-sm">
            © 2025 CvSUHimay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer