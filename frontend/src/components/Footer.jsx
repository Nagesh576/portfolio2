import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

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


const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
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
    } else {
      window.location.href = '/' + href;
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-dark-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
          
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
              Nagesh <span className="text-primary-500 font-medium text-sm">/ Web Developer</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Building premium digital solutions with React, Node, and MongoDB.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://github.com/Nagesh576"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white dark:bg-dark-900 border border-slate-200/50 dark:border-slate-800 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/nagesh-rudraram-a10998284/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white dark:bg-dark-900 border border-slate-200/50 dark:border-slate-800 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-500 transition-colors"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://www.instagram.com/nagesh_rudraram/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white dark:bg-dark-900 border border-slate-200/50 dark:border-slate-800 rounded-lg text-slate-400 dark:text-slate-500 hover:text-pink-500 transition-colors"
            >
              <InstagramIcon size={16} />
            </a>
          </div>

        </div>

        {/* Copyright and back to top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Nagesh. All rights reserved. Made with 💻 &amp; React.
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-dark-900 border border-slate-200/50 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors text-slate-500 dark:text-slate-400"
          >
            Back to Top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
