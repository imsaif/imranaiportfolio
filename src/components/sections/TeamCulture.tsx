'use client';

import React from 'react';
import { MdGroup, MdTrendingUp, MdStar, MdFavorite } from 'react-icons/md';
import { teamCultureData } from '@/data/leadership';

const TeamCulture = () => {
  return (
    <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            Building & Leading Teams
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Creating high-performing design teams through intentional culture building and systematic growth
          </p>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-12 text-gray-900">Team Growth Journey</h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {teamCultureData.timeline.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content Card */}
                  <div className="flex-1 w-full max-w-lg">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{item.teamSize}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.year}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{item.description}</p>

                      <div className="space-y-2">
                        {item.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 hidden md:block">
                    <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg"></div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">Team Performance Metrics</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Retention Rate */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdFavorite className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{teamCultureData.metrics.retentionRate}</div>
              <div className="text-sm text-gray-600 font-medium">Retention Rate</div>
            </div>

            {/* Satisfaction Score */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdStar className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{teamCultureData.metrics.satisfactionScore}</div>
              <div className="text-sm text-gray-600 font-medium">Team Satisfaction</div>
            </div>

            {/* Promotions */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdTrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{teamCultureData.metrics.promotions}</div>
              <div className="text-sm text-gray-600 font-medium">Team Promotions</div>
            </div>

            {/* Cross-functional Rating */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdGroup className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{teamCultureData.metrics.crossFunctionalRating}</div>
              <div className="text-sm text-gray-600 font-medium">Cross-team Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCulture;