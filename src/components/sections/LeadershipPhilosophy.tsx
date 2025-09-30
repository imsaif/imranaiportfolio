'use client';

import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { leadershipPhilosophy } from '@/data/leadership';

const LeadershipPhilosophy = () => {
  const [activeTab, setActiveTab] = useState<'principles' | 'teamBuilding' | 'innovation'>('principles');

  const tabs = [
    { id: 'principles', label: 'Core Principles', icon: '🎯' },
    { id: 'teamBuilding', label: 'Team Building', icon: '👥' },
    { id: 'innovation', label: 'Innovation', icon: '💡' }
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'principles':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {leadershipPhilosophy.principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'teamBuilding':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {leadershipPhilosophy.teamBuilding.approach}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Methods:</h4>
              {leadershipPhilosophy.teamBuilding.methods.map((method, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{method}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'innovation':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {leadershipPhilosophy.innovation.approach}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Innovation Framework:</h4>
              {leadershipPhilosophy.innovation.methods.map((method, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{method}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-gray-50">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            My Approach to Design Leadership
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Building exceptional design teams through clear principles, supportive culture, and systematic innovation
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vertical Tab Navigation */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipPhilosophy;