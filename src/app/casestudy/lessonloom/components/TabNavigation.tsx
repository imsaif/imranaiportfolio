'use client';

import { MdBusinessCenter, MdBuildCircle } from 'react-icons/md';

interface TabNavigationProps {
  activeTab: 'strategic' | 'tactical';
  onTabChange: (tab: 'strategic' | 'tactical') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center gap-0">
          {/* Strategic Tab */}
          <button
            onClick={() => onTabChange('strategic')}
            className={`flex-1 py-4 px-6 transition-all duration-300 border-b-2 font-medium flex items-center justify-center gap-2 ${
              activeTab === 'strategic'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <MdBusinessCenter size={20} />
            <span>Strategic Impact</span>
          </button>

          {/* Tactical Tab */}
          <button
            onClick={() => onTabChange('tactical')}
            className={`flex-1 py-4 px-6 transition-all duration-300 border-b-2 font-medium flex items-center justify-center gap-2 ${
              activeTab === 'tactical'
                ? 'border-purple-600 text-purple-600 bg-purple-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <MdBuildCircle size={20} />
            <span>Tactical Execution</span>
          </button>
        </div>
      </div>
    </div>
  );
}
