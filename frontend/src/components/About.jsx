import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Award } from 'lucide-react';

const About = () => {
  const educationData = [
    {
      title: 'Bachelor of Technology in Computer Science',
      organization: 'Malla Reddy University',
      duration: '2023 - 2027',
      description: 'Focused on Data Structures, Algorithms, Database Management Systems, Software Engineering, and Web Development.'
    },
    {
      title: 'Intermediate',
      organization: 'Holy Cross jr. College',
      duration: '2021 - 2023',
      description: 'Specialized coursework in Physics, Chemistry and Mathematics.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">About Me</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Transforming Ideas into Interactive Applications
          </p>
          <div className="h-1 w-12 bg-primary-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Bio & Objective Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              Professional Biography
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I am a driven Web Developer finishing my Computer Science degree with a strong foundation in modern web architectures. Over the last few years, I've immersed myself in JavaScript/TypeScript ecosystems, specializing in React.js on the frontend and Node.js on the backend.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              My core coding philosophy centers around visual excellence, performance, and clean architectural design. I love solving complex structural challenges, writing highly optimized REST APIs, and designing responsive glassmorphic interfaces that delight users.
            </p>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="p-4 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-primary-500">20+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Projects Done</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-primary-500">10+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">Certifications</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-primary-500">100%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Commitment</span>
              </div>
            </div>
          </div>

          {/* Career Objectives Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 bg-primary-500/10 text-primary-500 rounded-xl">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Career Objectives</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Where I strive to make an impact</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                To secure a challenging role as a Full Stack Web Developer in a progressive technology company where I can apply my advanced programming skills in React, Node.js, and Databases to deliver business value while expanding my mastery of cloud architectures.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">What I Focus On</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Design, speed and security</p>
                </div>
              </div>
              <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                  Responsive design & premium UI aesthetics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                  Scalable rest architectures (Node.js)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                  Robust database performance & data modeling
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline-Based Education Section */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-3">
              <GraduationCap className="text-primary-500" size={24} />
              Education History
            </h3>
          </div>

          {/* Timeline Cards Container */}
          <div className="relative timeline-line pl-8 md:pl-0 pt-8 pb-4">
            {educationData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative mb-12 md:w-1/2 md:even:ml-auto md:odd:mr-auto md:even:pl-12 md:odd:pr-12 md:odd:text-right"
              >
                {/* Timeline Icon Node */}
                <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950 border border-primary-500 text-primary-500 flex items-center justify-center -translate-x-1/2 z-20 md:left-1/2">
                  <GraduationCap size={14} />
                </div>

                {/* Timeline Card */}
                <div className="p-6 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 md:group-hover:w-full md:group-hover:opacity-5 transition-all duration-300"></div>
                  
                  <span className="inline-block px-3 py-1 bg-primary-500/10 dark:bg-primary-500/5 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-semibold mb-3">
                    {item.duration}
                  </span>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    {item.organization}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
