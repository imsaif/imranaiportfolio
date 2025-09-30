'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCenterFocusStrong, MdGroup, MdLightbulb } from 'react-icons/md';
import { leadershipPhilosophy } from '@/data/leadership';

const LeadershipPhilosophy = () => {
  const [activeTab, setActiveTab] = useState<'principles' | 'teamBuilding' | 'innovation'>('principles');

  const getTabIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`;
    switch (iconName) {
      case 'principles':
        return <MdCenterFocusStrong className={iconClass} />;
      case 'teamBuilding':
        return <MdGroup className={iconClass} />;
      case 'innovation':
        return <MdLightbulb className={iconClass} />;
      default:
        return <MdCenterFocusStrong className={iconClass} />;
    }
  };

  const tabs = [
    { id: 'principles', label: 'Core Principles', iconName: 'principles' },
    { id: 'teamBuilding', label: 'Team Building', iconName: 'teamBuilding' },
    { id: 'innovation', label: 'Innovation', iconName: 'innovation' }
  ] as const;

  // Animation variants for tab switching only

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'principles':
        return (
          <motion.div
            key="principles"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 flex-1 flex flex-col"
          >
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {leadershipPhilosophy.principles.approach}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Core Principles:
              </h4>
              {leadershipPhilosophy.principles.items.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{principle}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'teamBuilding':
        return (
          <motion.div
            key="teamBuilding"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 flex-1 flex flex-col"
          >
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {leadershipPhilosophy.teamBuilding.approach}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Key Methods:
              </h4>
              {leadershipPhilosophy.teamBuilding.methods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{method}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'innovation':
        return (
          <motion.div
            key="innovation"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 flex-1 flex flex-col"
          >
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {leadershipPhilosophy.innovation.approach}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Innovation Framework:
              </h4>
              {leadershipPhilosophy.innovation.methods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{method}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-gray-50">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight"
          >
            My Approach to Design Leadership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted leading-relaxed max-w-2xl mx-auto"
          >
            Building exceptional design teams through clear principles, supportive culture, and systematic innovation
          </motion.p>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-8">
            {/* Horizontal Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div
                className="relative flex items-center p-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #7075e0, #e0637c)',
                }}
              >
                <div className="relative flex items-center bg-white rounded-full">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <div
                        className={`relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTabFill"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'linear-gradient(135deg, #7075e0, #e0637c)',
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                        <span className="relative flex-shrink-0">
                          {getTabIcon(tab.iconName, activeTab === tab.id)}
                        </span>
                        <span className="relative font-medium text-sm sm:text-base">{tab.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm min-h-[400px] flex flex-col"
                whileHover={{ boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {renderContent()}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipPhilosophy;