import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Download, X, Calendar, ShieldCheck } from 'lucide-react';

// Static mock certificates to display if DB is empty
const mockCertificates = [
  {
    _id: 'cert-mruh-esummit-26',
    name: 'ESummit\'26 Certificate of Appreciation',
    issuer: 'Malla Reddy University & Unifesto',
    issueDate: 'March 18, 2026',
    credentialUrl: '',
    image: '/mruh-esummit-26.png',
    fileUrl: '/mruh-esummit-26.png'
  },
  {
    _id: 'cert-rise-of-agentic-ai',
    name: 'The Rise of Agentic AI Completion Certificate',
    issuer: 'Microsoft Learn Student Ambassador & MLSC-MRUH',
    issueDate: 'September 18, 2025',
    credentialUrl: '',
    image: '/rise-of-agentic-ai.jpg',
    fileUrl: '/rise-of-agentic-ai.jpg'
  },
  {
    _id: 'cert-hack-with-hyderabad',
    name: 'HackWithHyderabad Hackathon Certificate',
    issuer: 'Devnovate & HackWithIndia',
    issueDate: '2025',
    credentialUrl: '',
    image: '/hack-with-hyderabad.jpg',
    fileUrl: '/hack-with-hyderabad.jpg'
  },
  {
    _id: 'cert-agentic-ai-day',
    name: 'Google Cloud Agentic AI Day Certificate',
    issuer: 'Google Cloud & Hack2skill',
    issueDate: 'October 2025',
    credentialUrl: '',
    image: '/google-cloud-agentic-ai-day.jpg',
    fileUrl: '/google-cloud-agentic-ai-day.jpg'
  },
  {
    _id: 'cert-aiml-internship',
    name: 'AI-ML Virtual Internship Certificate',
    issuer: 'Google for Developers (EduSkills & AICTE)',
    issueDate: 'March 2026',
    credentialUrl: '',
    image: '/ai-ml-virtual-internship-certificate.png',
    fileUrl: '/ai-ml-virtual-internship-certificate.png'
  },
  {
    _id: 'cert-1',
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training & Certification',
    issueDate: 'March 25, 2026',
    credentialUrl: '',
    image: '/aws-certified-cloud-practitioner.png',
    fileUrl: '/aws-certified-cloud-practitioner.png'
  }
];

const Certifications = () => {
  const [certificates, setCertificates] = useState(mockCertificates);
  const [loading, setLoading] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await API.get('/certificates');
      if (response.data.success && response.data.data.length > 0) {
        setCertificates(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch certificates:', error.message);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      // Return a premium looking default vector certificate background
      return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="596" height="396" x="2" y="2" rx="10" fill="%230f0f15" stroke="%238b5cf6" stroke-width="4"/><rect width="560" height="360" x="20" y="20" fill="none" stroke="%23334155" stroke-width="2"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="24" fill="%23a78bfa">CERTIFICATE OF ACHIEVEMENT</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">This is to certify completion of professional syllabus</text><circle cx="300" cy="300" r="30" fill="%238b5cf6" opacity="0.3"/><circle cx="300" cy="300" r="20" fill="%238b5cf6"/></svg>';
    }

    if (imagePath.startsWith('/uploads')) {
      const apiBase = import.meta.env.VITE_API_URL 
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'http://localhost:5000';
      return `${apiBase}${imagePath}`;
    }
    return imagePath;
  };

  const handleDownload = (cert) => {
    // If upload PDF/file exists, download it, else open credential verification URL
    const fileLink = cert.fileUrl || cert.image;
    if (fileLink) {
      let absoluteLink = fileLink;
      if (fileLink.startsWith('/uploads')) {
        const apiBase = import.meta.env.VITE_API_URL 
          ? import.meta.env.VITE_API_URL.replace('/api', '')
          : 'http://localhost:5000';
        absoluteLink = `${apiBase}${fileLink}`;
      }
      window.open(absoluteLink, '_blank');
    } else if (cert.credentialUrl) {
      window.open(cert.credentialUrl, '_blank');
    }
  };

  return (
    <section id="certifications" className="py-24 bg-slate-50 dark:bg-dark-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">Certifications</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Professional Credentials & Licenses
          </p>
          <div className="h-1 w-12 bg-primary-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Certificates Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-950 border-t-primary-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm">Loading certificates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={cert._id}
                onClick={() => setActiveCertificate(cert)}
                className="p-6 bg-white dark:bg-dark-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-primary-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>

                <div className="space-y-4">
                  {/* Icon Block */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-primary-500/10 text-primary-500 rounded-xl">
                      <Award size={22} />
                    </div>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <Calendar size={12} />
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-primary-500 transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/50">
                  <span className="text-xs font-bold text-primary-500 dark:text-primary-400 flex items-center gap-1">
                    <ShieldCheck size={14} /> Verified Credential
                  </span>
                  <div className="flex gap-1">
                    <span className="p-2 rounded-lg bg-slate-50 dark:bg-dark-950 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <ExternalLink size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Overlay Previewer */}
        <AnimatePresence>
          {activeCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setActiveCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header controls */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-dark-950">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{activeCertificate.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activeCertificate.issuer}</p>
                  </div>
                  <button
                    onClick={() => setActiveCertificate(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Preview Image */}
                <div className="p-4 flex items-center justify-center bg-slate-100 dark:bg-dark-950 aspect-[4/3] max-h-[350px] overflow-hidden">
                  <img
                    src={getImageUrl(activeCertificate.image)}
                    alt={activeCertificate.name}
                    className="max-w-full max-h-full object-contain rounded border border-slate-200 dark:border-slate-800 shadow"
                  />
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-slate-50 dark:bg-dark-950 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <Calendar size={14} /> Issued: {activeCertificate.issueDate}
                  </span>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    {activeCertificate.credentialUrl && (
                      <a
                        href={activeCertificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 w-full sm:w-auto font-semibold"
                      >
                        <ExternalLink size={16} />
                        Verify
                      </a>
                    )}
                    <button
                      onClick={() => handleDownload(activeCertificate)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-glow-primary hover:shadow-lg transition-all w-full sm:w-auto font-semibold"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Certifications;
