'use client';

import React from 'react';
import { MdCode, MdAnalytics, MdBusiness, MdWorkspaces } from 'react-icons/md';
import { collaborationData } from '@/data/leadership';

const Collaboration = () => {
  const getIcon = (title: string) => {
    if (title.includes('Engineering')) return <MdCode className="w-8 h-8 text-blue-600" />;
    if (title.includes('Product')) return <MdAnalytics className="w-8 h-8 text-green-600" />;
    if (title.includes('Business')) return <MdBusiness className="w-8 h-8 text-purple-600" />;
    return <MdWorkspaces className="w-8 h-8 text-gray-600" />;
  };

  const getGradient = (title: string) => {
    if (title.includes('Engineering')) return 'from-blue-500 to-blue-600';
    if (title.includes('Product')) return 'from-green-500 to-green-600';
    if (title.includes('Business')) return 'from-purple-500 to-purple-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-gray-50">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            Cross-Functional Excellence
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Building bridges between design, engineering, product, and business to deliver exceptional outcomes
          </p>
        </div>

        {/* Partnership Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {collaborationData.partnerships.map((partnership, index) => (
            <div key={index} className="group">
              <div className="relative">
                {/* Gradient Background */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${getGradient(partnership.title)} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

                {/* Card Content */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    {getIcon(partnership.title)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {partnership.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {partnership.description}
                  </p>

                  {/* Impact Metric */}
                  <div className="mb-6">
                    <div className="inline-block bg-gradient-to-r from-green-100 to-green-50 px-4 py-2 rounded-lg">
                      <span className="text-green-700 font-semibold">{partnership.impact}</span>
                    </div>
                  </div>

                  {/* Methods */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Methods:</h4>
                    {partnership.methods.map((method, methodIndex) => (
                      <div key={methodIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Facilitation Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Workshop Facilitation & Alignment</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Creating alignment and driving decisions through structured collaborative sessions
            </p>
          </div>

          {/* Workshop Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{collaborationData.workshops.facilitated}</div>
              <div className="text-sm text-gray-600 font-medium">Workshops Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{collaborationData.workshops.participants}+</div>
              <div className="text-sm text-gray-600 font-medium">Participants Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
              <div className="text-sm text-gray-600 font-medium">Faster Decisions</div>
            </div>
          </div>

          {/* Workshop Outcomes */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Key Outcomes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {collaborationData.workshops.outcomes.map((outcome, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-700 text-sm leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;