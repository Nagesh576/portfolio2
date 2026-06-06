import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Database, Code } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Monitor className="text-primary-500" size={24} />,
      skills: [
        { name: 'React.js', percentage: 90 },
        { name: 'JavaScript (ES6+)', percentage: 85 },
        { name: 'Tailwind CSS', percentage: 95 },
        { name: 'HTML5 & CSS3', percentage: 95 },
      ]
    },
    {
      title: 'Backend Development',
      icon: <Server className="text-cyan-500" size={24} />,
      skills: [
        { name: 'Node.js', percentage: 80 },
        { name: 'Express.js', percentage: 85 },
        { name: 'RESTful APIs', percentage: 90 },
      ]
    },
    {
      title: 'Databases & Infrastructure',
      icon: <Database className="text-indigo-500" size={24} />,
      skills: [
        { name: 'MongoDB', percentage: 80 },
        { name: 'MySQL', percentage: 75 },
      ]
    },
    {
      title: 'Programming Languages',
      icon: <Code className="text-violet-500" size={24} />,
      skills: [
        { name: 'Java', percentage: 85 },
        { name: 'Python', percentage: 70 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-dark-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -ml-48"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">Skills</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Technical Arsenal & Expertise
          </p>
          <div className="h-1 w-12 bg-primary-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="p-8 bg-white dark:bg-dark-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-[#0f0f15] rounded-full translate-x-12 -translate-y-12 -z-10"></div>
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {skill.name}
                      </span>
                      <span className="font-bold text-primary-500">
                        {skill.percentage}%
                      </span>
                    </div>
                    
                    {/* Bar container */}
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-dark-950 rounded-full overflow-hidden border border-slate-200/30 dark:border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: skillIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full shadow-glow-primary"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
