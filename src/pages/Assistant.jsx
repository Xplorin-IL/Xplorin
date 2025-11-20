import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChatBot from '../components/ChatBot';

const Assistant = () => {
  const { user } = useSelector((state) => state.auth);
  
  const getFirstName = (name) => {
    if (!name) return "User";
    return name.split(" ")[0];
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: 'url(/images/homeTanyaCikoAmpera.png)' }}
    >

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-8 flex flex-col min-h-screen">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-red-900">Hi, {getFirstName(user?.full_name || user?.username)}!</h1>
          </div>

          <div className="flex flex-col items-center justify-center w-full relative flex-1">
            {/* Mascot - Ciko Body Behind ChatBot */}
            <div className="absolute inset-0 flex justify-left items-center pointer-events-none">
              {/* Body Ciko */}
              <div className="relative flex items-center justify-center transform -translate-y-48 translate-x-45">
                <img
                  src="/images/bodyCiko.png"
                  alt="Ciko Body"
                  className="w-70 h-86 object-contain opacity-100"
                />
              </div>
            </div>


            {/* Chat Bot Component with Hands Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
              {/* Hands Container - Overlay on ChatBot */}
              <div className="absolute top-1/20  left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-50 flex justify-between items-start px-8 pointer-events-none z-20">
                <img
                  src="/images/tanganCiko.png"
                  alt="Ciko Hand Left"
                  className="w-48 h-48 object-contain"
                />
              </div>

              {/* ChatBot */}
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assistant;