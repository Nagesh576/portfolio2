import React, { useState } from 'react';
import API from '../utils/api';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquareCode, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill out all required fields' });
      return;
    }

    try {
      setStatus({ loading: true, success: false, error: null });
      const response = await API.post('/messages', formData);
      
      if (response.data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: response.data.error || 'Something went wrong' });
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.error || 'Failed to connect to server. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -mr-48"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">Get In Touch</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Let's Collaborate on Your Next Project
          </p>
          <div className="h-1 w-12 bg-primary-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Contact Information
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Have an exciting project idea, looking for a software engineer, or just want to say hello? Drop me a message and I'll respond within 24 hours.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 my-6">
              <div className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-primary-500/10 text-primary-500 rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</h4>
                  <a href="mailto:nagesh@example.com" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-500">
                    nagesh@example.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Current Location</h4>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Hyderabad (Open to Remote / Relocation)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-violet-500/10 text-violet-500 rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Working Hours</h4>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Mon - Sat, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div className="text-slate-400 text-xs dark:text-slate-600 flex items-center gap-2">
              <MessageSquareCode size={16} /> Secure DB storage enabled.
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-dark-950 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden"
            >
              {/* Status messages banner */}
              {status.success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3">
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold">Success!</span> Your message was sent and stored in the database. I will get back to you soon.
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-3">
                  <AlertTriangle size={20} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold">Oops!</span> {status.error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-800 dark:text-slate-200 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-800 dark:text-slate-200 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3.5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-800 dark:text-slate-200 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline or requirements..."
                    className="w-full px-4 py-3.5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-800 dark:text-slate-200 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/60 text-white rounded-xl font-semibold shadow-glow-primary transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  {status.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
