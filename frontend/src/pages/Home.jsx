import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fafbff] dark:bg-dark-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background glows for light mode */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none dark:hidden animate-pulse-slow"></div>
      <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none dark:hidden"></div>
      <div className="absolute top-[60%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none dark:hidden"></div>
      <div className="absolute top-[80%] right-[10%] w-[550px] h-[550px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none dark:hidden animate-pulse-slow"></div>

      {/* Modern thin grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]"></div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
