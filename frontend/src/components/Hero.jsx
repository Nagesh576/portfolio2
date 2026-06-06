import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width={size} height={size}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width={size} height={size}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


// Custom Typed Text hook/effect
const Typewriter = ({ words, delay = 150, deleteDelay = 100, waitDelay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const word = words[currentWordIndex];

    if (isDeleting) {
      // Deleting characters
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, deleteDelay);
    } else {
      // Typing characters
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
      }, delay);
    }

    // Finished typing word, wait and start deleting
    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), waitDelay);
    }

    // Finished deleting, move to next word
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, deleteDelay, waitDelay]);

  return (
    <span className="inline-block relative">
      {currentText}
      <span className="inline-block w-[3px] h-[1.1em] bg-primary-500 absolute -right-1 bottom-0.5 animate-pulse"></span>
    </span>
  );
};

const Hero = () => {
  const skills = ['Full-Stack Developer', 'React Specialist', 'Node.js Backend Dev', 'UI/UX Enthusiast'];

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadResume = async () => {
    const apiBase = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '')
      : 'http://localhost:5000';
    const backendUrl = `${apiBase}/uploads/resume/resume.pdf`;
    
    try {
      const response = await fetch(backendUrl, { method: 'HEAD' });
      if (response.ok) {
        window.open(backendUrl, '_blank');
      } else {
        window.open('/resume.pdf', '_blank');
      }
    } catch (error) {
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-slate-50 dark:bg-dark-950 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none -mr-48 -mt-24"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -ml-40 -mb-20"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Intro text */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary-600 dark:text-primary-400 bg-primary-500/10 dark:bg-primary-500/5 border border-primary-500/20 inline-block mb-6">
              WELCOME TO MY PORTFOLIO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6"
          >
            Hi, I'm <span className="text-gradient-purple">Nagesh</span> <br />
            <span className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-400">
              I am a <Typewriter words={skills} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            Passionate software engineer specializing in building high-quality, high-performance, and visually stunning web applications. I design responsive frontend interfaces and secure, scalable backend architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <button
              onClick={() => handleScrollTo('#projects')}
              className="flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-glow-primary hover:shadow-lg transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center group"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-dark-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-dark-800 shadow-sm transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <Download size={18} />
              Download Resume
            </button>

            <button
              onClick={() => handleScrollTo('#contact')}
              className="flex items-center gap-2 px-6 py-3.5 bg-transparent text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 font-semibold transition-all w-full sm:w-auto justify-center"
            >
              <Mail size={18} />
              Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center lg:justify-start gap-4 text-slate-400 dark:text-slate-500"
          >
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-600">Connect with me:</span>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-800"></div>
            <a href="https://github.com/Nagesh576" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/nagesh-rudraram-a10998284/" target="_blank" rel="noreferrer" className="hover:text-primary-500 transition-colors">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://www.instagram.com/nagesh_rudraram/?hl=en" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">
              <InstagramIcon size={20} />
            </a>
          </motion.div>
        </div>

        {/* Profile Graphic/Image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Spinning decorative background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-indigo-600 rounded-3xl rotate-6 scale-95 opacity-20 blur-xl animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-primary-600 rounded-full opacity-10 animate-spin-slow pointer-events-none"></div>

            {/* Glowing border card wrapper */}
            <div className="relative p-2 rounded-3xl bg-gradient-to-tr from-primary-500/30 to-violet-600/30 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-glass-light dark:shadow-glass-dark">
              <div className="overflow-hidden rounded-2xl w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] relative bg-slate-900 flex items-center justify-center">
                {/* Profile Photo */}
                <img
                  src="/profile.jpg"
                  alt="Nagesh Web Developer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
                
                {/* Overlay Text inside profile frame */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                  <h4 className="text-sm font-semibold text-white">Nagesh</h4>
                  <p className="text-xs text-primary-400">Web Developer</p>
                </div>
              </div>
            </div>

            {/* Float badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm text-xs font-bold flex items-center gap-2 dark:text-white"
            >
              <span>🚀</span> Full-Stack Developer
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm text-xs font-bold flex items-center gap-2 dark:text-white"
            >
              <span>💻</span> Clean Coder
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
