import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Code2, AlertCircle } from 'lucide-react';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width={size} height={size}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);


// Static mock fallback projects to show if DB is empty
const mockProjects = [
  {
    _id: 'mock-bmr-college',
    title: 'BMR College Portal',
    description: 'A responsive, high-performance web portal for BMR College. Features modern styling, interactive student features, courses overview, academic announcements, and query forms designed for a seamless mobile-first user experience.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'API Integration'],
    category: 'frontend',
    gitHubLink: 'https://github.com/Nagesh576/bmr-college-frontend',
    liveLink: 'https://bmr-college-frontend.vercel.app/',
    featured: true
  },
  {
    _id: 'mock-flashframe',
    title: 'FlashFrame 35 Website',
    description: 'A premium, cinematic booking and portfolio website for photography and videography brands. Features custom admin panel management, media organization via Cloudinary, and dynamic scheduling integrations.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'MongoDB', 'Cloudinary'],
    category: 'fullstack',
    gitHubLink: 'https://github.com/Nagesh576/flashframe_35',
    liveLink: 'https://flashframe-35.vercel.app/',
    featured: true
  },
  {
    _id: 'mock-telangana-tourism',
    title: 'Telangana Tourism Web Application',
    description: 'A modern, responsive web application showcasing the rich culture, heritage, temples, festivals, and tourist destinations of Telangana. Features an interactive map of all 33 districts, global search, and customized guides for 1000+ temples and 50+ heritage sites.',
    image: 'https://github.com/user-attachments/assets/b08c61f7-e090-4513-86cc-85a198185915',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    category: 'frontend',
    gitHubLink: 'https://github.com/Nagesh576/Telangana-Tourism-',
    liveLink: 'https://telangana-tourism-xi.vercel.app/',
    featured: true
  },
  {
    _id: 'mock-holycrossclg',
    title: 'Holy Cross Junior College Website',
    description: 'A responsive, user-friendly website designed for Holy Cross Junior College, Alirajpet, Siddipet. It provides accessible details about the college history, admission processes, courses offered, campus overview, and direct contact forms.',
    image: 'https://github.com/user-attachments/assets/1cad6cf5-b69c-4d1f-9a60-5cff295f62e3',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    category: 'frontend',
    gitHubLink: 'https://github.com/Nagesh576/Holycrossclg',
    liveLink: 'https://holycrossclg-68hw.vercel.app/',
    featured: true
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');

  const categories = ['all', 'fullstack', 'frontend', 'backend'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await API.get('/projects');
      if (response.data.success && response.data.data.length > 0) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error.message);
    }
  };

  // Run filtering when search, category, or projects change
  useEffect(() => {
    let result = [...projects];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Specific Technology
    if (selectedTech !== 'all') {
      result = result.filter(p => p.technologies.some(tech => tech.toLowerCase() === selectedTech.toLowerCase()));
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  // Extract all unique technologies from project list
  const getAllUniqueTech = () => {
    const techSet = new Set();
    projects.forEach(p => {
      if (p.technologies) {
        p.technologies.forEach(t => techSet.add(t));
      }
    });
    return ['all', ...Array.from(techSet)];
  };

  const uniqueTech = getAllUniqueTech();

  // Helper to format category labels
  const formatCatLabel = (cat) => {
    if (cat === 'all') return 'All Projects';
    if (cat === 'fullstack') return 'Full-Stack';
    if (cat === 'frontend') return 'Frontend';
    if (cat === 'backend') return 'Backend';
    return cat;
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-dark-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">Portfolio Projects</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            My Creative Work Showcase
          </p>
          <div className="h-1 w-12 bg-primary-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Filter Toolbar Container */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search by title, description or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-700 dark:text-slate-300 transition-colors"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white shadow-glow-primary'
                      : 'bg-slate-50 dark:bg-dark-950 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-dark-800'
                  }`}
                >
                  {formatCatLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Technology Tag Pills Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mr-2 flex items-center gap-1">
              <Code2 size={14} /> Filter Tech:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-2">
              {uniqueTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedTech === tech
                      ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/30'
                      : 'bg-slate-50 dark:bg-dark-950 text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                  }`}
                >
                  {tech === 'all' ? 'All Tech' : tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-950 border-t-primary-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm">Loading projects...</p>
          </div>
        ) : (
          <>
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-100 dark:border-slate-800/50 max-w-lg mx-auto">
                <AlertCircle className="mx-auto text-amber-500 mb-4" size={36} />
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No Projects Found</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  We couldn't find any projects matching your search parameters. Try expanding your filters or search queries.
                </p>
              </div>
            ) : (
              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => {
                    // Build image source URL
                    let imageSrc = project.image;
                    if (!imageSrc) {
                      // Fallback vector container with styling
                      imageSrc = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%230f0f15"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" fill="%238b5cf6">Coding Project</text></svg>';
                    } else if (imageSrc.startsWith('/uploads')) {
                      // Prepend backend domain
                      const apiBase = import.meta.env.VITE_API_URL 
                        ? import.meta.env.VITE_API_URL.replace('/api', '')
                        : 'http://localhost:5000';
                      imageSrc = `${apiBase}${project.image}`;
                    }

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={project._id}
                        className="bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden group shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
                      >
                        {/* Project Image Frame */}
                        <div className="relative overflow-hidden aspect-[16/10] bg-slate-900">
                          <img
                            src={imageSrc}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            {project.gitHubLink && (
                              <a
                                href={project.gitHubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-sm transition-transform hover:scale-110"
                                title="View Code"
                              >
                                <GithubIcon size={20} />
                              </a>
                            )}
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-glow-primary transition-transform hover:scale-110"
                                title="Live Demo"
                              >
                                <ExternalLink size={20} />
                              </a>
                            )}
                          </div>
                          <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        {/* Card Details */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-snug group-hover:text-primary-500 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-4 flex-grow line-clamp-4">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {project.technologies.slice(0, 4).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-slate-100 dark:bg-dark-900 border border-slate-200/30 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-semibold rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2 py-1 bg-slate-100 dark:bg-dark-900 border border-slate-200/30 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-semibold rounded">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
