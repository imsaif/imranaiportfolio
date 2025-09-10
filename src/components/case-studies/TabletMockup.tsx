import React from 'react';

interface TabletMockupProps {
  children: React.ReactNode;
  className?: string;
}

const TabletMockup: React.FC<TabletMockupProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Tablet body */}
      <div className="relative bg-gray-900 rounded-3xl p-4 shadow-2xl">
        {/* Screen bezel */}
        <div className="relative bg-black rounded-2xl p-2">
          {/* Actual screen */}
          <div 
            className="bg-white rounded-xl overflow-hidden shadow-inner"
            style={{ width: '500px', height: '650px' }}
          >
            {children}
          </div>
        </div>
        
        {/* Home button */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-10 h-10 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Camera */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
        </div>
      </div>
      
      {/* Drop shadow */}
      <div className="absolute inset-0 bg-black opacity-20 rounded-3xl transform translate-y-6 translate-x-2 -z-10 blur-xl"></div>
    </div>
  );
};

export default TabletMockup;