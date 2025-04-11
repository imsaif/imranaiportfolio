'use client'; // Added for Framer Motion

import React from 'react';
import { motion } from 'framer-motion'; // Import motion

// Define SVG Icons
const iconClass = "h-6 w-6 mr-3 inline-block text-blue-500 dark:text-blue-400";

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SparklesIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
   </svg>
 );

// Added new icons
const AcademicCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const BadgeCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ChatAlt2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ResumePage = () => {
  const resumeData = {
    about: `As a product designer at NewGlobe, I apply my skills and knowledge in user experience (UX) and artificial intelligence (AI) to create products that improve the learning outcomes of millions of students around the world. I have over six years of experience in UX design, working on analytical and data visualization products for the healthcare industry at Optum before joining NewGlobe in 2023.

My passion for design stems from my curiosity about how people think and interact with technology. I have a master's degree in psychology and a postgraduate program in visual and user experience design from the Indian Institute of Technology. I follow a user-centric and iterative process that involves understanding the problem, researching existing solutions, brainstorming ideas, prototyping, testing, and improving. I collaborate with developers, product managers, and educators to deliver solutions that are simple, intuitive, and impactful.`,
    experience: [
      {
        title: 'Product Designer',
        company: 'NewGlobe',
        duration: 'Feb 2023 - Present · 2 yrs 3 mos',
        location: 'Hyderabad, Telangana, India · On-site',
        description: 'Designing products that transform educational outcomes.',
        skills: ['Generative AI', 'Product Design', 'UX Research'], // Added UX Research based on Optum role
      },
      {
        title: 'UX Designer',
        company: 'Optum',
        duration: 'Jun 2017 - Jan 2023 · 5 yrs 8 mos',
        location: 'Chennai, Tamil Nadu, India',
        description: 'Building products that improve healthcare.',
        skills: ['User Interface Design', 'UX Research', 'Data Visualization', 'Analytical Skills', 'Prototyping', 'User Testing', 'Collaboration'], // Expanded based on context
      },
      {
        title: 'Designer',
        company: 'Freelance',
        duration: 'Jan 2015 - May 2017 · 2 yrs 5 mos',
        location: 'New Delhi, Istanbul, Amsterdam',
        description: 'Worked remotely and on-site with different startups co-ordinating with dev and product teams.',
        skills: ['Product Management', 'Project Management', 'UI Design', 'UX Design', 'Client Coordination'], // Expanded based on context
      },
      {
        title: 'Team Lead - Usability Analyst - Contract',
        company: 'Google',
        duration: 'Sep 2013 - Dec 2014 · 1 yr 4 mos',
        location: 'Hyderabad Area, India',
        description: 'Usability Reviews for Google News and Google Maps. Managed a team of 15 full-time employees.',
        skills: ['Usability Testing', 'Team Leadership', 'Google News', 'Google Maps', 'Reporting'], // Expanded based on context
      },
      {
        title: 'Usability Analyst - Contract',
        company: 'Google',
        duration: 'Jun 2011 - Aug 2013 · 2 yrs 3 mos',
        location: 'Hyderabad',
        description: 'Usability reviews for Google News.',
        skills: ['Usability Testing', 'Google News', 'Analysis'], // Expanded based on context
      },
    ],
    education: [
      {
        institution: 'Indian Institute of Technology Hyderabad',
        degree: 'Post Graduate Program in Visual & User Experience Design',
        field: 'Design and Applied Arts',
        duration: 'Jun 2022 - Dec 2022',
        skills: ['Design Systems', 'Digital Storytelling', 'Design Thinking', 'Visual Design', 'User Experience (UX)'],
      },
      {
        institution: 'Acharya Nagarjuna University',
        degree: 'Master of Science - MSc',
        field: 'Psychology',
        duration: '2010 - 2012',
      },
    ],
    licensesCertifications: [
      { name: 'Product-Led Growth Certified', issuer: 'ProductLed', date: 'Mar 2024', id: '41671', skills: ['Product Management', 'Product Development'] },
      { name: 'Generative AI Fundamentals', issuer: 'Google', date: 'Jan 2024', id: '7759676' },
      { name: 'Introduction to Large Language Models', issuer: 'Google', date: 'Jan 2024', id: '7754338' },
      { name: 'Introduction to Responsible AI', issuer: 'Google', date: 'Jan 2024', id: '7757145' },
      { name: 'Design Thinking - Scored 99%', issuer: 'IxDF - The Interaction Design Foundation', date: 'Dec 2018', id: '24696' },
      { name: 'Human Computer Interaction - Scored 89%', issuer: 'IxDF - The Interaction Design Foundation', date: 'Mar 2018', id: '24696' },
      { name: 'Gestalt Psychology & Web Design - Scored 99%', issuer: 'IxDF - The Interaction Design Foundation', date: 'Sep 2017', id: '24696' },
      { name: 'UX Design From Scratch - Scored 98%', issuer: 'IxDF - The Interaction Design Foundation', date: 'Sep 2017', id: '24696' },
    ],
    skills: [
      'User Experience (UX)', 'User Interface (UI) Design', 'Product Design', 'UX Research', 
      'Generative AI', 'AI Prompt Engineering', 'Responsible AI', 'AI Ethics', 
      'Data Visualization', 'Analytical Skills', 'Prototyping', 'User Testing', 'Usability Testing',
      'Design Systems', 'Visual Design', 'Design Thinking', 'Human Computer Interaction (HCI)', 
      'Product Management', 'Product Development', 'Project Management', 'Team Leadership', 
      'Collaboration'
    ],
    publications: [
        {
            role: 'Book Reviewer/Critic',
            title: `Observing User Experience : A Practitioner's Guide to User Research`,
            date: 'Apr 11, 2017',
            description: `I was honored to be invited by Elsevir Research to act as a critic/reviewer for the book. The aim was to review the book completely and provide detailed insights from a readers perspective, market and updated technologies.

Observing the User Experience: A Practitioner's Guide to User Research aims to bridge the gap between what digital companies think they know about their users and the actual user experience. Individuals engaged in digital product and service development often fail to conduct user research. The book presents concepts and techniques to provide an understanding of how people experience products and services. The techniques are drawn from the worlds of human-computer interaction, marketing, and social sciences.`
        }
    ],
    recommendations: [
      {
        author: 'Soorya Ramesh',
        title: 'Azure AI, Sr PM @ Microsoft',
        date: 'August 19, 2018',
        context: 'Soorya worked with Imran on the same team',
        text: `Working with Imran Saif has been a pleasure. He comes up with creative and innovative designs that give unprecedented clarity to the product. Imran Saif's work ethic combined with his creativity and attention to detail lead to great user experiences. He is a great team player, he even gave us a lot of insight on UX and the theory behind it. Any team would be lucky to have him drive their product's UX.`,
      },
      {
        author: 'Vignesh G',
        title: 'Senior BI Analyst at EXL pvt ltd',
        date: 'August 14, 2018',
        context: 'Vignesh worked with Imran on the same team',
        text: `I had the opportunity to work with Imran Saif in the same team. His questioning ability is great, he infact gets to the root of problems to identify what is best for the user. He has been a great resource for me to learn about user experience. Great team member.`,
      },
      {
        author: 'Naveenraj Rajasekaran',
        title: 'Sr. Manager at EXL Health',
        date: 'November 21, 2017',
        context: 'Naveenraj managed Imran directly',
        text: `Imran Saif is extremely passionate about user experience. He strives to think from a different perspective unlike developers and product owners. What is interesting about him is the way he wants to make things simpler for users. It is fun to work with him, he makes sure that he drives users perspective in every product or developer meeting.`,
      },
    ],
    honorsAwards: [
      {
        title: 'Award of Excellent Performance & Compassion - Optum Analytics',
        issuer: 'United Health Group',
        date: 'Dec 2018',
        description: `Be it interaction design, production design, visual design, product analytics or Toastmasters...Saif is not only forthcoming in taking up variety in execution but also executes them with absolute passion & dedication - all with minimal assistance. Few notable examples: Interaction/ Visual design: Worked on interactions and visuals by analyzing the capabilities and limitations of the Django framework. Product analytics: Volunteered to independently steer product analytics effort Production design: Catering to ad-hoc logo requests from members with high-quality Toastmasters: Elected as Vice President of Public Relations for the ABCO Chennai Club Thank you Saif for your flexibility and compassion!`,
        associatedWith: 'Optum',
      },
      {
        title: 'Award of Excellent Performance & Collaboration - Optum Analytics',
        issuer: 'United Health Group',
        date: 'Nov 2018',
        description: `In one of our flagship products Saif was involved recently with providing necessary visual guidance for the development team overseas. Saif had collaborated with the Product Manager in gathering the necessary requirements and with minimal guidance got up and running with things that were necessary to accomplish his tasks. He had not only turned over the requests on time but also went to additional lengths to analyze and identify additional visual improvements which were not originally in the ask. When he was asked to take additional requests which were important for the product he showed his genuine willingness to accept them in the right spirit and executed them on time with good quality and lesser hand-holding. I'd like Saif to preserve his quality of collaboration with people he has not worked with in the past and quickly getting them to like him and his openness.`,
        associatedWith: 'Optum',
      },
      {
        title: 'Top 10% of the Class - Gestalt Psychology & Web',
        issuer: 'Interaction Design Foundation',
        date: 'Jun 2018',
        description: 'Awarded as the top 10% in class',
      },
      {
        title: 'Best Volunteer',
        issuer: 'SAFA',
        date: 'Apr 2013',
      },
      {
        title: 'Award for Exceptional Performance - Google',
        issuer: 'Google India',
        date: 'Apr 2012',
        associatedWith: 'Google',
      },
    ],
  };

  // Helper function to render skills list
  const renderSkills = (skills?: string[]) => {
    if (!skills || skills.length === 0) return null;
    return (
      <ul className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <li key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600">
            {skill}
          </li>
        ))}
      </ul>
    );
  };

  // Reusable Section Title Component
  const SectionTitle = ({ title, icon }: { title: string, icon?: React.ReactNode }) => (
    <div className="mb-8"> 
      <h2 className="flex items-center text-3xl font-bold text-gray-800 dark:text-white pb-0"> 
        {icon} 
        {title}
      </h2>
      {/* Gradient line div - Removed mt-1 */}
      <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div> 
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
       <style jsx global>{`
          @keyframes gradient-shift {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
          }
          
          .animate-gradient-text {
            animation: gradient-shift 3s ease infinite;
          }
        `}</style>

      <header className="text-center pt-32 pb-16">
        <motion.h1 
          className="
            text-5xl md:text-6xl font-bold 
            text-transparent bg-clip-text 
            animate-gradient-text
          "
           style={{
            backgroundImage: "linear-gradient(90deg, #d94f9d, #9333ea, #d94f9d)",
            backgroundSize: "200% auto"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Imran Mohammed
        </motion.h1>
      </header>

      {/* This div is now the styled content card, BELOW the header */}
      {/* Added subtle ring effect */}
      <div className="max-w-6xl mx-auto p-8 md:p-12 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-16 ring-1 ring-purple-500/30 dark:ring-purple-600/30">
        
        {/* About Section */}
        <section className="mb-12">
          <SectionTitle title="About" icon={<UserIcon />} />
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">{resumeData.about}</p>
        </section>

        {/* Experience/Skills/Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Experience Section */}
          <section className="md:col-span-2">
            <SectionTitle title="Experience" icon={<BriefcaseIcon />} />
            <div className="space-y-10">
              {resumeData.experience.map((job, index) => (
                <div key={index} className="relative pl-10 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-1 before:bg-gray-300 dark:before:bg-gray-600 last:before:h-[calc(100%-2rem)] first:before:top-5 p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                  <div className="absolute left-1 top-2.5 w-5 h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{job.title}</h3>
                  <p className="text-base font-medium text-gray-600 dark:text-gray-400">{job.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {job.duration} | {job.location}
                  </p>
                  <p className="text-base mb-3">{job.description}</p>
                  {renderSkills(job.skills)}
                </div>
              ))}
            </div>
          </section>

          {/* Right Column (Skills and Education) */}
          <div className="md:col-span-1 space-y-12">
            {/* Skills Section */}
            <section>
               <SectionTitle title="Skills" icon={<SparklesIcon />} />
               <ul className="flex flex-wrap gap-3">
                  {resumeData.skills.map((skill, index) => (
                   <li key={index} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm">
                     {skill}
                   </li>
                  ))}
               </ul>
             </section>

            {/* Education Section */}
            <section>
              <SectionTitle title="Education" icon={<AcademicCapIcon />} /> 
              <div className="space-y-8">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm transition duration-200 ease-in-out hover:shadow-md hover:ring-1 hover:ring-purple-200 dark:hover:ring-purple-600/50">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.institution}</h3>
                    <p className="text-base font-semibold text-gray-700 dark:text-gray-100">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.duration}</p>
                    {renderSkills(edu.skills)}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Recommendations Section - Pass ChatAlt2Icon */} 
        <section className="mb-12">
           <SectionTitle title="Recommendations" icon={<ChatAlt2Icon />} />
           <div className="space-y-8">
             {resumeData.recommendations.map((rec, index) => (
               <blockquote key={index} className="relative pl-10 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-sm border-l-4 border-blue-500 dark:border-blue-400 transition duration-200 ease-in-out hover:shadow-md">
                 <span className="absolute left-2 top-1 text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-50">
                   "
                 </span>
                 <p className="mb-3 text-gray-800 dark:text-gray-200 italic z-10 relative">
                    {rec.text.replace(/^"|"$/g, '')} 
                 </p>
                 <footer className="text-sm not-italic text-gray-600 dark:text-gray-400 z-10 relative">
                   <span className="font-semibold text-gray-700 dark:text-gray-300">{rec.author}</span>, {rec.title}
                   <br/>
                   <span>{rec.date}, {rec.context}</span>
                 </footer>
               </blockquote>
             ))}
           </div>
         </section>

        {/* Licenses & Certifications Section - Pass BadgeCheckIcon */} 
        <section className="mb-12">
          <SectionTitle title="Licenses & Certifications" icon={<BadgeCheckIcon />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.licensesCertifications.map((cert, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm transition duration-200 ease-in-out hover:shadow-md hover:ring-1 hover:ring-purple-200 dark:hover:ring-purple-600/50">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{cert.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Issued by {cert.issuer} · {cert.date}</p>
                {cert.id && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Credential ID: {cert.id}</p>}
                {renderSkills(cert.skills)}
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section - Pass BookOpenIcon */} 
        <section className="mb-12">
           <SectionTitle title="Publications" icon={<BookOpenIcon />} />
           <div className="space-y-6">
             {resumeData.publications.map((pub, index) => (
               <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition duration-200 ease-in-out hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
                 <h3 className="text-lg font-bold text-gray-800 dark:text-white">{pub.role}</h3>
                 <p className="text-base font-medium text-gray-600 dark:text-gray-400 italic">{pub.title} · {pub.date}</p>
                 <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-snug whitespace-pre-line">{pub.description}</p>
               </div>
             ))}
           </div>
         </section>

        {/* Honors & Awards Section - Pass StarIcon */} 
        <section>
           <SectionTitle title="Honors & Awards" icon={<StarIcon />} />
           <div className="space-y-6">
             {resumeData.honorsAwards.map((award, index) => (
               <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition duration-200 ease-in-out hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
                 <h3 className="text-lg font-bold text-gray-800 dark:text-white">{award.title}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Issued by {award.issuer} · {award.date}</p>
                 {award.associatedWith && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Associated with {award.associatedWith}</p>}
                 {award.description && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-snug">{award.description}</p>}
               </div>
             ))}
           </div>
         </section>

         {/* Connect Button Section */} 
         <div className="mt-16 text-center"> 
           <a
             href="https://www.linkedin.com/in/imsaif/"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out transform hover:scale-105"
           >
             Connect with Me on LinkedIn
             {/* Optional: Add an icon here if desired */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
             </svg>
           </a>
         </div>

      </div> 
    </div>
  );
};

export default ResumePage; 