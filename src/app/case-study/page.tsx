'use client';

import { motion } from 'framer-motion';
import CaseStudyHeader from '@/components/CaseStudyHeader';
import CaseStudyNav from '@/components/CaseStudyNav';

export default function CaseStudy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <CaseStudyNav />
        
        {/* Hero Section with enhanced styling */}
        <section className="mb-20 relative">
          {/* Decorative element */}
          <div className="absolute -top-10 -left-20 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl opacity-20 z-0"></div>
          
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CaseStudyHeader level="h1">
              CourseForge: Automated Lesson Generation Platform
            </CaseStudyHeader>
            
            <motion.div 
              className="prose prose-lg max-w-none mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
             
            </motion.div>
            
            <div className="prose prose-lg max-w-none mb-10 bg-white p-8 rounded-lg shadow-sm border-l-4 border-indigo-500">
              <p className="m-0">
                As a product designer for CourseForge, I led the design process for an innovative platform that automates the creation of educational materials using AI and templating systems. This case study walks through how our design team approached this complex challenge – from understanding user needs and pain points to crafting an intuitive interface that empowers educators to create high-quality content at scale.
              </p>
            </div>
          </motion.div>
        </section>
        
        {/* Project Overview with styled cards */}
        <section className="mb-20">
          <CaseStudyHeader>
            Project Overview
          </CaseStudyHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Role</h3>
              <p>Product Designer</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-indigo-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Organization</h3>
              <p>NewGlobe</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-pink-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-pink-700">Technologies</h3>
              <p>Vue.js, .NET Core, Python, Azure OpenAI, AWS S3</p>
            </motion.div>
          </div>
        </section>
        
        {/* Challenge section with visual enhancements */}
        <section className="mb-20 relative">
          {/* Decorative element */}
          <div className="absolute -right-20 top-20 w-72 h-72 bg-indigo-100 rounded-full filter blur-3xl opacity-20 z-0"></div>
          
          <div className="relative z-10">
            <CaseStudyHeader>
              The Challenge
            </CaseStudyHeader>
            
            <div className="prose prose-lg max-w-none p-6 bg-gradient-to-br from-white to-purple-50 rounded-lg border border-gray-100">
              <p>
                NewGlobe, a global education organization, faced significant obstacles when creating teaching materials across multiple countries:
              </p>
              
              <ul className="space-y-3 mt-4">
                <li className="flex items-start">
                  <span className="inline-flex justify-center items-center w-6 h-6 mr-2 mt-1 rounded-full bg-purple-100 text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong className="text-purple-700">Time-intensive process</strong>: Content teams spent months developing customized teacher guides</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex justify-center items-center w-6 h-6 mr-2 mt-1 rounded-full bg-indigo-100 text-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong className="text-indigo-700">Resource constraints</strong>: Skilled curriculum designers were pulled into repetitive formatting tasks</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex justify-center items-center w-6 h-6 mr-2 mt-1 rounded-full bg-pink-100 text-pink-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong className="text-pink-700">Quality consistency</strong>: Materials varied based on individual writers' interpretations</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex justify-center items-center w-6 h-6 mr-2 mt-1 rounded-full bg-purple-100 text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong className="text-purple-700">Localization bottlenecks</strong>: Adapting content for different regions created expansion delays</span>
                </li>
              </ul>
              
              <p className="mt-6 bg-white p-4 rounded border-l-4 border-indigo-500 shadow-sm">
                Content creators needed a solution that would free them from tedious formatting work while maintaining their pedagogical expertise in the process.
              </p>
            </div>
          </div>
        </section>
        
        {/* Design Process */}
        <section className="mb-28">
          <CaseStudyHeader>
            Design Process
          </CaseStudyHeader>
          
          <div className="space-y-12 max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CaseStudyHeader level="h3" showGradientLine={false}>
                Research & Discovery
              </CaseStudyHeader>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  I began by deeply understanding the existing content creation workflow through:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-4 text-purple-700 flex items-center">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-3 rounded-full bg-purple-100 text-purple-700 text-lg font-bold">1</span>
                      User Interviews
                    </h4>
                    <ul className="space-y-2 pl-0 list-none">
                      <li className="flex items-baseline">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Shadowed 8 instructional designers</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Conducted interviews with 12 curriculum specialists</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Ran collaborative workshops with translation teams</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-3 rounded-full bg-indigo-100 text-indigo-700 text-lg font-bold">2</span>
                      Content Analysis
                    </h4>
                    <ul className="space-y-2 pl-0 list-none">
                      <li className="flex items-baseline">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>Analyzed 150+ teacher guides</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>Mapped recurring patterns</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>Created information architecture diagrams</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-4 text-pink-700 flex items-center">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-3 rounded-full bg-pink-100 text-pink-700 text-lg font-bold">3</span>
                      Pain Point Analysis
                    </h4>
                    <ul className="space-y-2 pl-0 list-none">
                      <li className="flex items-baseline">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Created journey maps</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Quantified time spent on tasks</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Developed empathy maps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CaseStudyHeader level="h3" showGradientLine={false}>
                Key Insights
              </CaseStudyHeader>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  Our research revealed critical insights that shaped our design approach:
                </p>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg mt-6">
                  <ol className="space-y-4 pl-0 list-none">
                    <li className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-4 rounded-full bg-purple-100 text-purple-700 text-lg font-bold shrink-0">1</span>
                      <div>
                        <strong className="text-purple-700">Creators valued pedagogical decisions, not formatting:</strong>
                        <p className="mt-1 text-gray-700 italic">"I spend 70% of my time making things look right rather than thinking about how students will learn."</p>
                      </div>
                    </li>
                    <li className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-4 rounded-full bg-indigo-100 text-indigo-700 text-lg font-bold shrink-0">2</span>
                      <div>
                        <strong className="text-indigo-700">Templates were mental models, not just documents:</strong>
                        <p className="mt-1 text-gray-700 italic">"We already have mental templates we follow, but they're not captured anywhere."</p>
                      </div>
                    </li>
                    <li className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-4 rounded-full bg-pink-100 text-pink-700 text-lg font-bold shrink-0">3</span>
                      <div>
                        <strong className="text-pink-700">Content needs varied by subject:</strong>
                        <p className="mt-1 text-gray-700 italic">"Math lessons follow very predictable patterns, while reading comprehension needs more flexibility."</p>
                      </div>
                    </li>
                    <li className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-4 rounded-full bg-purple-100 text-purple-700 text-lg font-bold shrink-0">4</span>
                      <div>
                        <strong className="text-purple-700">Visual clarity was essential:</strong>
                        <p className="mt-1 text-gray-700 italic">"I need to see exactly how the final lesson will appear to teachers."</p>
                      </div>
                    </li>
                    <li className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                      <span className="inline-flex justify-center items-center w-8 h-8 mr-4 rounded-full bg-indigo-100 text-indigo-700 text-lg font-bold shrink-0">5</span>
                      <div>
                        <strong className="text-indigo-700">Trust in automation was fragile:</strong>
                        <p className="mt-1 text-gray-700 italic">"I'd use automation if I could verify and adjust the output easily."</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CaseStudyHeader level="h3" showGradientLine={false}>
                Design Exploration
              </CaseStudyHeader>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  During the design process, I explored several conceptual approaches:
                </p>
                
                {/* Concept 1: Template-Driven Generation */}
                <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm opacity-90">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-500 ml-2">Concept 1: Template-Driven Generation</span>
                    </div>
                    <div className="text-xs text-gray-500 px-2">
                      Explored Concept
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-medium mb-3">Template-First Approach</h5>
                        <p className="text-sm text-gray-600 mb-4">
                          Design focused on creating flexible templates with specialized syntax that could be populated with various content.
                        </p>
                        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                          <li>Reusable formats across subjects</li>
                          <li>Predictable output structure</li>
                          <li>Higher initial setup time</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                        <div className="border-b border-gray-300 pb-2 mb-3">
                          <div className="font-medium">Lesson Template</div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white p-2 border border-gray-300 rounded">
                            <div className="text-sm font-medium">{"{title}"}</div>
                            <div className="text-xs text-gray-500">Grade {"{grade}"} • {"{subject}"}</div>
                          </div>
                          <div className="bg-white p-2 border border-gray-300 rounded">
                            <div className="text-xs font-medium">Learning Objective</div>
                            <div className="text-xs text-gray-600">{"{learning_objective}"}</div>
                          </div>
                          <div className="bg-white p-2 border border-gray-300 rounded">
                            <div className="text-xs font-medium">Materials</div>
                            <div className="text-xs text-gray-600">{"{materials_list}"}</div>
                          </div>
                          <div className="bg-white p-2 border border-gray-300 rounded">
                            <div className="text-xs font-medium">Instructions</div>
                            <div className="text-xs text-gray-600">{"{activity_instructions}"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Concept 2: Content-First Approach */}
                <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm opacity-90">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-500 ml-2">Concept 2: Content-First Approach</span>
                    </div>
                    <div className="text-xs text-gray-500 px-2">
                      Explored Concept
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-medium mb-3">Content-Driven Design</h5>
                        <p className="text-sm text-gray-600 mb-4">
                          Design focused on organizing content parameters in spreadsheets first, with formats applied later.
                        </p>
                        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                          <li>Content planning separated from formatting</li>
                          <li>More flexible content organization</li>
                          <li>Easier for curriculum specialists</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                        <div className="flex space-x-2 mb-4">
                          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Subject</div>
                          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Grade</div>
                          <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">Topic</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
                          <div className="text-sm mb-2">Content Parameters</div>
                          <div className="flex flex-wrap gap-2">
                            <div className="px-2 py-1 bg-gray-100 rounded text-xs">Duration: 45min</div>
                            <div className="px-2 py-1 bg-gray-100 rounded text-xs">Group size: 4</div>
                            <div className="px-2 py-1 bg-gray-100 rounded text-xs">Difficulty: Medium</div>
                            <div className="px-2 py-1 bg-gray-100 rounded text-xs">Standards: 3.NBT.2</div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="text-sm mb-2">Format Options</div>
                          <div className="flex space-x-2">
                            <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center bg-blue-500 text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-xs">Worksheet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Concept 3: Hybrid Approach */}
                <div className="my-8 border-2 border-purple-500 rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-white to-purple-50">
                  <div className="bg-purple-100 px-4 py-3 border-b border-purple-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-700 ml-2 font-medium">Concept 3: Hybrid Approach (Final Design)</span>
                    </div>
                    <div className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Selected Approach ✓
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-medium mb-3">Template + Content Integration</h5>
                        <p className="text-sm text-gray-600 mb-4">
                          The final design combined template flexibility with content-driven planning.
                        </p>
                        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                          <li>Centralized content control</li>
                          <li>Modular template system</li>
                          <li>Simplified generation workflow</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="bg-white px-3 py-1 border border-gray-300 rounded text-xs">Content Spreadsheet</div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <div className="bg-white px-3 py-1 border border-gray-300 rounded text-xs">Template Library</div>
                        </div>
                        <div className="bg-white border border-gray-300 rounded-lg p-3 mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs font-medium">Matching System</div>
                            <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Active</div>
                          </div>
                          <div className="border-t border-dashed border-gray-300 pt-2">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-xs">Content ID: L001</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                                <span className="text-xs">Template: Math-Basic</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-300 rounded-lg p-3">
                          <div className="text-xs mb-2">Preview Output</div>
                          <div className="border border-dashed border-gray-300 p-2 rounded bg-gray-50">
                            <div className="text-xs text-center text-gray-500">Generated Lesson</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Design Solution */}
        <section className="mb-28">
          <CaseStudyHeader>
            Design Solution
          </CaseStudyHeader>
          
          <div className="space-y-12 max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">Information Architecture</h3>
              
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  I designed a system with three main components:
                </p>
                
                <ul className="space-y-2 pl-0 list-none">
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Content Spreadsheet</strong>: Centralized data structure where users define lesson parameters
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Template Library</strong>: Repository of lesson formats with specialized syntax for automation
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Generation Interface</strong>: Process management and review interface
                  </li>
                </ul>
                
                <p className="mt-4 mb-6">
                  This architecture separated content planning from content generation, allowing specialists to focus on curriculum decisions while automation handled implementation.
                </p>

                {/* Content Spreadsheet Wireframe */}
                <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-500 ml-2">Content Spreadsheet</span>
                  </div>
                  <div className="p-0 bg-white overflow-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson ID</th>
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materials</th>
                          <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border text-sm">L001</td>
                          <td className="px-4 py-2 border text-sm">Grade 3</td>
                          <td className="px-4 py-2 border text-sm">Math</td>
                          <td className="px-4 py-2 border text-sm">Fractions</td>
                          <td className="px-4 py-2 border text-sm">45 min</td>
                          <td className="px-4 py-2 border text-sm">Paper strips, scissors</td>
                          <td className="px-4 py-2 border text-sm">Group work</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2 border text-sm">L002</td>
                          <td className="px-4 py-2 border text-sm">Grade 3</td>
                          <td className="px-4 py-2 border text-sm">Math</td>
                          <td className="px-4 py-2 border text-sm">Addition</td>
                          <td className="px-4 py-2 border text-sm">30 min</td>
                          <td className="px-4 py-2 border text-sm">Counters, worksheets</td>
                          <td className="px-4 py-2 border text-sm">Individual practice</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border text-sm">L003</td>
                          <td className="px-4 py-2 border text-sm">Grade 3</td>
                          <td className="px-4 py-2 border text-sm">Science</td>
                          <td className="px-4 py-2 border text-sm">Plants</td>
                          <td className="px-4 py-2 border text-sm">60 min</td>
                          <td className="px-4 py-2 border text-sm">Seeds, cups, soil</td>
                          <td className="px-4 py-2 border text-sm">Experiment</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Template Library Wireframe */}
                <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-500 ml-2">Template Library</span>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-purple-50 cursor-pointer transition">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">Math Lesson - Basic</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Last edited: 2 days ago</div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-purple-50 cursor-pointer transition">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">Reading - Comprehension</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Last edited: 5 days ago</div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-purple-50 cursor-pointer transition">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-pink-100 text-pink-700 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">Science - Experiment</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Last edited: 1 week ago</div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-purple-50 cursor-pointer transition">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">English - Creative Writing</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Last edited: 2 weeks ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generation Interface Wireframe */}
                <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-500 ml-2">Generation Interface</span>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium mb-3">Generation Queue</div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                            <div className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              <span>L001 - Grade 3 Math: Fractions</span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                          </div>
                          <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                            <div className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span>L002 - Grade 3 Math: Addition</span>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex items-center">
                              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                              <span>L003 - Grade 3 Science: Plants</span>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Queued</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium mb-3">Statistics</div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs">Progress</span>
                              <span className="text-xs font-medium">33%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-purple-50 p-2 rounded text-center">
                              <div className="text-lg font-bold text-purple-700">1/3</div>
                              <div className="text-xs text-gray-500">Completed</div>
                            </div>
                            <div className="bg-indigo-50 p-2 rounded text-center">
                              <div className="text-lg font-bold text-indigo-700">~15m</div>
                              <div className="text-xs text-gray-500">Est. Time</div>
                            </div>
                          </div>
                          
                          <button className="mt-2 w-full py-2 bg-purple-600 text-white rounded text-sm">
                            Download Complete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">Visual System & Interface Design</h3>
              
              <div className="prose prose-lg max-w-none space-y-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-purple-700">1. Template Syntax System</h4>
                  
                  <p className="mb-4">
                    One of my key design challenges was creating a visual language that would clearly communicate different types of automation. Working with content specialists, I developed a syntax system using familiar word processing concepts:
                  </p>
                  
                  <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-500 ml-2">Template Editor</span>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="font-mono text-sm">
                        <p className="mb-2">{"<Lesson Title>"}</p>
                        <p className="mb-2">{"Subject: "}<span className="text-red-600">{"{{SUBJECT}}"}</span></p>
                        <p className="mb-2">{"Grade Level: "}<span className="text-red-600">{"{{GRADE}}"}</span></p>
                        <p className="mb-2">{"Duration: "}<span className="text-red-600">{"{{DURATION}}"}</span> minutes</p>
                        <p className="mb-4">{"---"}</p>
                        <p className="mb-2">{"## Learning Objectives"}</p>
                        <p className="mb-2">{"By the end of this lesson, students will be able to:"}</p>
                        <p className="mb-2">{" - "}<span className="bg-yellow-200 px-1">{"Generate specific objectives for {{SUBJECT}} appropriate for {{GRADE}}"}</span></p>
                        <p className="mb-4">{"---"}</p>
                        <p className="mb-2">{"## Introduction"}</p>
                        <p className="mb-2">{" "}<span className="bg-yellow-200 px-1">{"Generate an engaging introduction about {{TOPIC}} for {{GRADE}} students"}</span></p>
                        <p className="mb-2">{"Key Vocabulary: "}<span className="underline">{"{{key_terms}}"}</span></p>
                        <p className="mb-2">{"---"}</p>
                        <p className="mb-2">{"## Main Activity"}</p>
                        <p className="mb-2">{" "}<span className="bg-yellow-200 px-1">{"Generate step-by-step instructions for {{ACTIVITY_TYPE}}"}</span></p>
                        <p className="mb-2">{"Materials: "}<span className="text-red-600">{"{{MATERIALS}}"}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 pl-0 list-none mt-6">
                    <li className="flex items-baseline">
                      <span className="font-semibold mr-2 text-red-600">Red text:</span>
                      <span>Content from spreadsheets (mail-merge)</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="font-semibold mr-2 underline">Underlined text:</span>
                      <span>Generated content that would be reused (variables)</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="font-semibold mr-2 bg-yellow-200 px-1">Yellow highlighting:</span>
                      <span>One-time content generation</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="font-semibold mr-2">[Brackets]:</span>
                      <span>Content tagging and retrieval</span>
                    </li>
                  </ul>
                  
                  <p className="mt-4">
                    This syntax enabled users to visually scan templates and immediately understand which parts would be automated versus manually defined.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-purple-700">2. Generation Workflow</h4>
                  
                  <p className="mb-4">
                    I designed a step-by-step workflow that provided transparency and control:
                  </p>
                  
                  <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-sm text-gray-500 ml-2">Generate lessons</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <button className="bg-transparent border-none p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-8 bg-white">
                      {/* New workflow based on image */}
                      <div className="flex justify-between items-center mb-12 relative">
                        {/* Progress bar */}
                        <div className="absolute h-[1px] bg-gray-200 top-5 left-0 right-0 z-0"></div>
                        
                        {/* Step 1: Upload template library - Current */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-3">
                            <span>1</span>
                          </div>
                          <span className="text-sm font-medium text-indigo-600">Upload template library</span>
                        </div>
                        
                        {/* Step 2: Upload spreadsheet */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-3">
                            <span>2</span>
                          </div>
                          <span className="text-sm text-gray-500">Upload spreadsheet</span>
                        </div>
                        
                        {/* Step 3: Select content */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-3">
                            <span>3</span>
                          </div>
                          <span className="text-sm text-gray-500">Select content</span>
                        </div>
                        
                        {/* Step 4: Select lessons */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-3">
                            <span>4</span>
                          </div>
                          <span className="text-sm text-gray-500">Select lessons</span>
                        </div>
                        
                        {/* Step 5: Generate lessons */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-3">
                            <span>5</span>
                          </div>
                          <span className="text-sm text-gray-500">Generate lessons</span>
                        </div>
                        
                        {/* Step 6: Summary */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-3">
                            <span>6</span>
                          </div>
                          <span className="text-sm text-gray-500">Summary</span>
                        </div>
                      </div>
                      
                      {/* Upload template library content */}
                      <div className="border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-medium mb-2">Upload template library</h3>
                          <p className="text-gray-500">Drag and drop template library here to upload.</p>
                          <p className="text-gray-500">Template library should be in .docx format.</p>
                        </div>
                        
                        <div className="w-16 h-16 mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        
                        <button className="flex items-center px-5 py-2 bg-white border border-indigo-600 rounded-md text-indigo-600 font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Choose file
                        </button>
                      </div>
                      
                      {/* Footer with proceed button */}
                      <div className="flex justify-end mt-8">
                        <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md">
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 pl-0 list-none">
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Upload Template Library:</span>
                      <span>Visual confirmation of successful template upload</span>
                    </li>
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Upload Content Spreadsheet:</span>
                      <span>Data validation with clear error messaging</span>
                    </li>
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Select Content Tab:</span>
                      <span>Choice of which set of lessons to generate</span>
                    </li>
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Select Lessons:</span>
                      <span>Flexible selection of individual or batched lessons</span>
                    </li>
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Preview First Lesson:</span>
                      <span>Review point before batch generation</span>
                    </li>
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Generation Progress:</span>
                      <span>Visual feedback on generation status</span>
                    </li>
                    <li className="mb-2 flex items-baseline">
                      <span className="font-semibold mr-2 text-purple-700">Download Results:</span>
                      <span>Easy access to completed materials</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-purple-700">3. Review & Iteration Interface</h4>
                  
                  <p className="mb-4">
                    The review interface was crucial for building trust in the system:
                  </p>
                  
                  <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-500 ml-2">Review Interface</span>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded p-4">
                          <div className="text-sm text-gray-500 mb-2">Template</div>
                          <div className="font-mono text-xs">
                            <p className="mb-1">{"## Introduction"}</p>
                            <p className="mb-1 bg-yellow-200 px-1">{"Generate an engaging introduction about {{TOPIC}} for {{GRADE}} students"}</p>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded p-4">
                          <div className="text-sm text-gray-500 mb-2">Generated Output</div>
                          <div className="font-mono text-xs">
                            <p className="mb-1">{"## Introduction"}</p>
                            <p className="mb-1">{"Welcome to our exciting lesson on fractions! Today we'll discover how fractions are used in everyday life and why they're important for 3rd grade math skills."}</p>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded p-4 md:col-span-2">
                          <div className="text-sm text-gray-500 mb-2">Edit Controls</div>
                          <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs">Accept</div>
                            <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Edit</div>
                            <div className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs">Regenerate</div>
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">View Metadata</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 pl-0 list-none">
                    <li className="mb-2">Side-by-side comparison of template and generated output</li>
                    <li className="mb-2">Inline editing capabilities for quick adjustments</li>
                    <li className="mb-2">Generation metadata to understand the source of each content element</li>
                    <li className="mb-2">Option to regenerate specific sections while preserving others</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Prototype & Testing Section */}
        <section className="mb-28">
          <CaseStudyHeader>
            Prototype & Testing
          </CaseStudyHeader>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                I created interactive prototypes in Figma to test the user experience with real curriculum specialists:
              </p>
              
              {/* Template Creation Test Wireframe */}
              <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-500 ml-2">Prototype 1: Template Creation Test</span>
                  </div>
                  <div className="text-xs text-gray-500 px-2 bg-blue-100 rounded-full">
                    User Testing
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium mb-3">Test Objectives</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                        <li>Evaluate how easily users could understand the template syntax</li>
                        <li>Test comprehension of different syntax elements (red text, highlighting, etc.)</li>
                        <li>Measure time to create a basic template</li>
                        <li>Identify points of confusion in the template creation process</li>
                      </ul>
                      
                      <div className="mt-4 bg-purple-50 p-3 rounded-lg">
                        <h5 className="text-sm font-medium mb-2">Key Findings</h5>
                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                          <li>Users struggled with distinguishing between variable types</li>
                          <li>Syntax highlighting significantly improved comprehension</li>
                          <li>Average time to create first template: 12 minutes</li>
                          <li>Template preview was essential for user confidence</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="border-b border-gray-200 pb-2 mb-3 flex justify-between items-center">
                        <span className="text-sm font-medium">Template Editor Prototype</span>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">?</div>
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mb-3">
                        <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">File</div>
                        <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Edit</div>
                        <div className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs font-medium">Format</div>
                        <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">View</div>
                        <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Help</div>
                      </div>
                      
                      <div className="border border-gray-200 rounded p-3 bg-gray-50">
                        <div className="text-xs font-mono leading-relaxed">
                          <p className="mb-1">{"<Lesson Title: "}<span className="text-red-600">{"{{TOPIC}}"}</span>{" for "}<span className="text-red-600">{"{{GRADE}}"}</span>{">"}</p>
                          <p className="mb-1">{"Subject: "}<span className="text-red-600">{"{{SUBJECT}}"}</span></p>
                          <p className="mb-1">{"Duration: "}<span className="text-red-600">{"{{DURATION}}"}</span>{" minutes"}</p>
                          <p className="mb-2">{"---"}</p>
                          <p className="mb-1">{"## Learning Objectives"}</p>
                          <p className="mb-1 bg-yellow-100 px-1">{"Generate 3 age-appropriate learning objectives for this {{SUBJECT}} lesson."}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between">
                        <div className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs">Syntax Guide</div>
                        <div className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Preview Template</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Planning Test Wireframe */}
              <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-500 ml-2">Prototype 2: Content Planning Test</span>
                  </div>
                  <div className="text-xs text-gray-500 px-2 bg-blue-100 rounded-full">
                    User Testing
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium mb-3">Test Objectives</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                        <li>Assess the spreadsheet structure's intuitiveness</li>
                        <li>Test content organization workflows</li>
                        <li>Evaluate validation feedback for data errors</li>
                        <li>Measure how quickly users could input a full lesson set</li>
                      </ul>
                      
                      <div className="mt-4 bg-purple-50 p-3 rounded-lg">
                        <h5 className="text-sm font-medium mb-2">Key Findings</h5>
                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                          <li>Users preferred templates for spreadsheet setup</li>
                          <li>Column validation significantly reduced errors</li>
                          <li>Batch operations were highly requested</li>
                          <li>Immediate validation feedback increased confidence</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="border-b border-gray-200 pb-2 mb-3 flex justify-between items-center">
                        <span className="text-sm font-medium">Spreadsheet Import Prototype</span>
                        <div className="flex space-x-2">
                          <div className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Sample Template</div>
                          <div className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Validate</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-xs font-medium">Upload Spreadsheet</div>
                          <div className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs">Browse Files</div>
                        </div>
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-xs text-gray-500 text-center">Drag and drop your content spreadsheet<br/>or click to browse</p>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="text-xs font-medium mb-2">Required Columns</div>
                        <div className="flex flex-wrap gap-2">
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Lesson ID ✓</div>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Subject ✓</div>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Grade ✓</div>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Topic ✓</div>
                          <div className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Duration ✗</div>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Materials ✓</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Generation & Review Test Wireframe */}
              <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-500 ml-2">Prototype 3: Generation & Review Test</span>
                  </div>
                  <div className="text-xs text-gray-500 px-2 bg-blue-100 rounded-full">
                    User Testing
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium mb-3">Test Objectives</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                        <li>Measured users' comfort with the review process</li>
                        <li>Tested editing workflows for generated content</li>
                        <li>Evaluated trust in AI-generated outputs</li>
                        <li>Identified preferred feedback mechanisms</li>
                      </ul>
                      
                      <div className="mt-4 bg-purple-50 p-3 rounded-lg">
                        <h5 className="text-sm font-medium mb-2">Key Findings</h5>
                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                          <li>Side-by-side comparison was critical for trust</li>
                          <li>Users wanted more granular regeneration controls</li>
                          <li>Edit history was highly valued for collaboration</li>
                          <li>Preview before batch generation reduced anxiety</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="border-b border-gray-200 pb-2 mb-3 flex justify-between items-center">
                        <span className="text-sm font-medium">Review Interface Prototype</span>
                        <div className="flex space-x-2">
                          <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Previous</div>
                          <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Next</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-gray-50 border border-gray-200 rounded p-2">
                          <div className="text-xs text-gray-500 mb-1">Template</div>
                          <div className="text-xs font-mono">
                            <p className="mb-1 text-gray-700">{"## Introduction"}</p>
                            <p className="mb-1 bg-yellow-100 px-1 text-gray-700">{"Generate an engaging introduction to {{TOPIC}} suitable for {{GRADE}} students."}</p>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded p-2">
                          <div className="text-xs text-gray-500 mb-1">Generated Content</div>
                          <div className="text-xs font-mono">
                            <p className="mb-1 text-gray-700">{"## Introduction"}</p>
                            <p className="mb-1 text-gray-700">{"Today we're going to explore fractions! Did you know that fractions are like sharing a pizza with friends? Let's discover how we use fractions every day."}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Accept
                        </div>
                        <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </div>
                        <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          Regenerate
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded p-2 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Metadata & Context</div>
                        <div className="text-xs text-gray-600">
                          <p>Lesson ID: L001 | Grade: 3 | Subject: Math | Topic: Fractions</p>
                          <p>Generated at: 2:45 PM | Model: GPT-4 | Template: Math-Basic</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testing Iterations Visualization */}
              <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-sm text-gray-500 ml-2">Testing Iterations</span>
                </div>
                <div className="p-6 bg-white">
                  <div className="relative">
                    <div className="absolute h-1 bg-gray-200 top-6 left-[10%] right-[10%] z-0"></div>
                    
                    <div className="flex justify-between relative z-10">
                      <div className="text-center w-1/4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto border-2 border-purple-200">
                          <span className="font-medium">1</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-medium">First Round</div>
                          <div className="text-xs text-gray-500">8 participants</div>
                        </div>
                      </div>
                      
                      <div className="text-center w-1/4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto border-2 border-purple-200">
                          <span className="font-medium">2</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-medium">Refinements</div>
                          <div className="text-xs text-gray-500">Interface updates</div>
                        </div>
                      </div>
                      
                      <div className="text-center w-1/4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto border-2 border-purple-200">
                          <span className="font-medium">3</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-medium">Second Round</div>
                          <div className="text-xs text-gray-500">6 participants</div>
                        </div>
                      </div>
                      
                      <div className="text-center w-1/4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto border-2 border-purple-200">
                          <span className="font-medium">4</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-medium">Final Design</div>
                          <div className="text-xs text-gray-500">Implementation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h5 className="text-sm font-medium mb-2">Key Improvements</h5>
                      <ul className="text-xs text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Added syntax highlighting in the template editor for better visibility</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Simplified the spreadsheet structure based on user confusion points</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Enhanced the review interface with more prominent editing controls</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Added example libraries to help users understand effective templates</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h5 className="text-sm font-medium mb-2">Usability Metrics</h5>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Task Completion Rate</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>User Satisfaction</span>
                            <span className="font-medium">4.5/5</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Time on Task Reduction</span>
                            <span className="font-medium">78%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-6 mb-4 text-gray-700">
                User feedback from testing directly informed our design decisions and led to significant improvements in the final product. The iterative testing approach ensured that we addressed real user needs at every stage of development.
              </p>
            </div>
          </div>
        </section>
        
        {/* Implementation & Collaboration Section */}
        <section className="mb-28">
          <CaseStudyHeader>
            Implementation & Collaboration
          </CaseStudyHeader>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="mb-5">
                Working closely with developers, I translated design concepts into implementation specifications:
              </p>
              
              <ul className="space-y-3 pl-0 list-none">
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Design System Components:</span>
                  <span>Created a component library for the CourseForge interface</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Visual Specification Documentation:</span>
                  <span>Detailed specs for custom elements</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Interactive Prototypes:</span>
                  <span>Prototypes showing state transitions and interactions</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Regular Design Reviews:</span>
                  <span>Collaborative sessions with developers to review implementation</span>
                </li>
              </ul>
              
              <p className="mt-5 mb-4">
                I participated in technical discussions to ensure the user experience remained central to implementation decisions:
              </p>
              
              <ul className="space-y-2 pl-0 list-none">
                <li className="mb-2">Collaborated on API design to support the workflow requirements</li>
                <li className="mb-2">Provided input on error handling and recovery experiences</li>
                <li className="mb-2">Helped prioritize technical features based on user impact</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Results & Impact - Enhance with visually appealing metrics */}
        <section className="mb-28">
          <CaseStudyHeader>
            Results & Impact
          </CaseStudyHeader>
          
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
            <p>
              The CourseForge platform transformed content creation at NewGlobe:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-purple-700 mb-2">80%</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Time Savings</h4>
                <p className="text-gray-600 text-sm">Reduction in time to create a full course</p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-indigo-700 mb-2">92%</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">User Adoption</h4>
                <p className="text-gray-600 text-sm">Content team members actively using the system</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-pink-700 mb-2">3x</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Efficiency</h4>
                <p className="text-gray-600 text-sm">More course development managed simultaneously</p>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold mt-12 mb-4 border-b border-gray-200 pb-2">Qualitative Impact</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className="italic text-gray-700 mb-3">"CourseForge lets me focus on what's important - the teaching approaches and quality of explanations"</p>
                <p className="text-sm text-gray-500 font-medium">— Curriculum Designer</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
                <p className="italic text-gray-700 mb-3">"Our lessons are more consistent and follow best practices automatically"</p>
                <p className="text-sm text-gray-500 font-medium">— Content Team Lead</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-pink-500 md:col-span-2">
                <p className="italic text-gray-700 mb-3">"I'm spending more time on creative examples and local relevance instead of formatting"</p>
                <p className="text-sm text-gray-500 font-medium">— Instructional Designer</p>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold mt-12 mb-4 border-b border-gray-200 pb-2">Design Success Metrics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-bold mr-4">
                  87%
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-1">Task Completion</p>
                  <p className="text-gray-600 text-sm">First-time users</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold mr-4">
                  73%
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-1">Reduced Support</p>
                  <p className="text-gray-600 text-sm">Fewer help desk tickets</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xl font-bold mr-4">
                  4.5
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-1">User Satisfaction</p>
                  <p className="text-gray-600 text-sm">Average rating (out of 5)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technical Implementation */}
        <section className="mb-28">
          <CaseStudyHeader>
            Technical Implementation Highlights
          </CaseStudyHeader>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                While my primary focus was on the user experience, I worked closely with our engineering team to ensure the design vision was properly implemented:
              </p>
              
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">System Architecture</h3>
              
              <p className="mb-4">
                CourseForge was built with a multi-tier architecture:
              </p>
              
              <ul className="space-y-2 pl-0 list-none mb-8">
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Frontend:</span>
                  <span>Vue.js web application within the NewGlobe Portal</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Backend API:</span>
                  <span>.NET Core API managing templates, spreadsheets, and generation jobs</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Generation Service:</span>
                  <span>Python API interfacing with Azure OpenAI</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Storage:</span>
                  <span>AWS S3 for templates, spreadsheets, and generated lessons</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Integration:</span>
                  <span>Azure AI Translation Service for multi-language support</span>
                </li>
              </ul>
              
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">Generation Pipeline</h3>
              
              <p className="mb-4">
                The system processes each lesson through three phases that directly align with our design specifications:
              </p>
              
              <ul className="space-y-2 pl-0 list-none mb-6">
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Mail Merge Phase:</span>
                  <span>Integrates content from spreadsheets into templates</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">Variable Generation Phase:</span>
                  <span>Creates and tags reusable content elements</span>
                </li>
                <li className="mb-3 flex items-baseline">
                  <span className="font-semibold mr-2 text-purple-700">One-off Generation Phase:</span>
                  <span>Generates context-specific content based on highlighted prompts</span>
                </li>
              </ul>
              
              <p>
                This technical implementation was directly shaped by our design research that identified how users mentally approached content creation.
              </p>
            </div>
          </div>
        </section>
        
        {/* Reflections & Learnings */}
        <section className="mb-28">
          <CaseStudyHeader>
            Reflections & Learnings
          </CaseStudyHeader>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">Design Challenges</h3>
              
              <div className="prose prose-lg max-w-none">
                <ul className="space-y-4 pl-0 list-none">
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Balancing Flexibility & Structure:</strong> Finding the right balance between automated guidance and creative freedom required multiple iterations.
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Visual Language Complexity:</strong> Creating an intuitive visual syntax that non-technical users could easily master was challenging.
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Building Trust in AI:</strong> Designing transparency features that helped users understand and trust automated generation required careful attention.
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-5 text-gray-800">Key Takeaways</h3>
              
              <div className="prose prose-lg max-w-none">
                <ul className="space-y-4 pl-0 list-none">
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Start with user workflows, not features:</strong> Understanding how content creators thought about their work was more valuable than focusing on technical capabilities.
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Make the invisible visible:</strong> Creating visual representations of mental models that existed in users' heads but weren't documented was transformative.
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Progressive disclosure is essential for complex systems:</strong> Layering complexity allowed users to grow with the system rather than being overwhelmed.
                  </li>
                  <li className="mb-3">
                    <strong className="text-purple-700 font-semibold">Hybrid automation requires clear boundaries:</strong> Users needed to clearly understand what aspects were automated versus manually controlled.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Conclusion - Enhanced styling */}
        <section className="mb-28">
          <CaseStudyHeader>
            Conclusion
          </CaseStudyHeader>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-800 mb-6 leading-relaxed">
                CourseForge represents the power of thoughtful design to transform complex workflows. By deeply understanding users' needs and creating intuitive interfaces for AI interaction, we were able to dramatically improve efficiency while enhancing quality.
              </p>
              
              <p className="mb-6">
                As a product designer, this project reinforced that successful AI integration isn't about removing humans from the process – it's about amplifying their expertise and creativity by handling the repetitive elements that don't require human judgment.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border-l-4 border-purple-500 mt-8">
                <p className="m-0 text-gray-800">
                  The design approach we developed has applications beyond education, offering a framework for any domain where experts need to create structured content at scale.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 