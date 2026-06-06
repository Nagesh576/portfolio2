import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { 
  Briefcase, Award, MailOpen, Settings, LogOut, ArrowLeft,
  Plus, Trash2, Edit, FileText, CheckCircle, AlertTriangle, ExternalLink, Image, Upload
} from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout, loading, isAuthenticated, changePassword } = useAuth();
  const navigate = useNavigate();
  
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState('projects');

  // DB resources states
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // Loading & Action states
  const [fetching, setFetching] = useState(false);
  const [notification, setNotification] = useState({ success: false, message: null });

  // Dialog Modals State
  const [projectModal, setProjectModal] = useState({ isOpen: false, editMode: false, data: null });
  const [certificateModal, setCertificateModal] = useState({ isOpen: false, editMode: false, data: null });

  // Forms state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'fullstack',
    technologies: '',
    gitHubLink: '',
    liveLink: '',
    image: '',
    featured: false
  });

  const [certificateForm, setCertificateForm] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    image: '',
    fileUrl: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Load resources based on active tab
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'projects') fetchProjects();
      if (activeTab === 'certificates') fetchCertificates();
      if (activeTab === 'messages') fetchMessages();
    }
  }, [activeTab, isAuthenticated]);

  const triggerNotification = (success, msg) => {
    setNotification({ success, message: msg });
    setTimeout(() => setNotification({ success: false, message: null }), 4000);
  };

  // --- API Fetches ---
  const fetchProjects = async () => {
    try {
      setFetching(true);
      const res = await API.get('/projects');
      if (res.data.success) setProjects(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      setFetching(true);
      const res = await API.get('/certificates');
      if (res.data.success) setCertificates(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setFetching(true);
      const res = await API.get('/messages');
      if (res.data.success) setMessages(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  // --- File Upload Helpers ---
  const handleImageUpload = async (e, type = 'projects') => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadProgress(`Uploading ${file.name}...`);
      const res = await API.post(`/upload/image?type=${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        if (activeTab === 'projects') {
          setProjectForm(prev => ({ ...prev, image: res.data.filePath }));
        } else if (activeTab === 'certificates') {
          setCertificateForm(prev => ({ ...prev, image: res.data.filePath }));
        }
        triggerNotification(true, 'Image uploaded successfully!');
      }
    } catch (err) {
      triggerNotification(false, err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploadProgress(null);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setUploadProgress(`Uploading resume...`);
      const res = await API.post('/upload/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        triggerNotification(true, 'Resume PDF updated successfully!');
      }
    } catch (err) {
      triggerNotification(false, err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setUploadProgress(null);
    }
  };

  // --- Projects Actions ---
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setProjectForm({
        title: proj.title,
        description: proj.description,
        category: proj.category,
        technologies: proj.technologies.join(', '),
        gitHubLink: proj.gitHubLink || '',
        liveLink: proj.liveLink || '',
        image: proj.image || '',
        featured: proj.featured || false
      });
      setProjectModal({ isOpen: true, editMode: true, data: proj });
    } else {
      setProjectForm({
        title: '',
        description: '',
        category: 'fullstack',
        technologies: '',
        gitHubLink: '',
        liveLink: '',
        image: '',
        featured: false
      });
      setProjectModal({ isOpen: true, editMode: false, data: null });
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (projectModal.editMode) {
        const res = await API.put(`/projects/${projectModal.data._id}`, payload);
        if (res.data.success) {
          triggerNotification(true, 'Project updated successfully');
          fetchProjects();
        }
      } else {
        const res = await API.post('/projects', payload);
        if (res.data.success) {
          triggerNotification(true, 'Project created successfully');
          fetchProjects();
        }
      }
      setProjectModal({ isOpen: false, editMode: false, data: null });
    } catch (err) {
      triggerNotification(false, err.response?.data?.error || 'Project operation failed');
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await API.delete(`/projects/${id}`);
      if (res.data.success) {
        triggerNotification(true, 'Project deleted');
        fetchProjects();
      }
    } catch (err) {
      triggerNotification(false, 'Failed to delete project');
    }
  };

  // --- Certificates Actions ---
  const handleOpenCertificateModal = (cert = null) => {
    if (cert) {
      setCertificateForm({
        name: cert.name,
        issuer: cert.issuer,
        issueDate: cert.issueDate,
        credentialUrl: cert.credentialUrl || '',
        image: cert.image || '',
        fileUrl: cert.fileUrl || ''
      });
      setCertificateModal({ isOpen: true, editMode: true, data: cert });
    } else {
      setCertificateForm({
        name: '',
        issuer: '',
        issueDate: '',
        credentialUrl: '',
        image: '',
        fileUrl: ''
      });
      setCertificateModal({ isOpen: true, editMode: false, data: null });
    }
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (certificateModal.editMode) {
        const res = await API.put(`/certificates/${certificateModal.data._id}`, certificateForm);
        if (res.data.success) {
          triggerNotification(true, 'Certificate updated');
          fetchCertificates();
        }
      } else {
        const res = await API.post('/certificates', certificateForm);
        if (res.data.success) {
          triggerNotification(true, 'Certificate created');
          fetchCertificates();
        }
      }
      setCertificateModal({ isOpen: false, editMode: false, data: null });
    } catch (err) {
      triggerNotification(false, err.response?.data?.error || 'Certificate operation failed');
    }
  };

  const handleCertificateDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      const res = await API.delete(`/certificates/${id}`);
      if (res.data.success) {
        triggerNotification(true, 'Certificate deleted');
        fetchCertificates();
      }
    } catch (err) {
      triggerNotification(false, 'Failed to delete certificate');
    }
  };

  // --- Messages Actions ---
  const handleMessageDelete = async (id) => {
    if (!window.confirm('Delete this message submission?')) return;
    try {
      const res = await API.delete(`/messages/${id}`);
      if (res.data.success) {
        triggerNotification(true, 'Message submission deleted');
        fetchMessages();
      }
    } catch (err) {
      triggerNotification(false, 'Failed to delete message');
    }
  };

  // --- Settings Password Change ---
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      triggerNotification(false, 'New passwords do not match');
      return;
    }

    try {
      const res = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      if (res.success) {
        triggerNotification(true, 'Password changed successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      triggerNotification(false, err.message);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-950 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm">Authorizing admin access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-[#07070a] shadow-sm z-30 border-b border-slate-100 dark:border-slate-800/80 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-900 text-slate-500 dark:text-slate-400">
            <ArrowLeft size={18} />
          </a>
          <div>
            <h1 className="font-extrabold text-lg flex items-center gap-2">
              Portfolio Control <span className="px-2 py-0.5 rounded bg-primary-500/10 text-primary-500 text-[10px] font-bold">ADMIN</span>
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Welcome, {admin?.username}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-4 py-2 border border-rose-500/20 rounded-xl text-rose-500 hover:bg-rose-500/5 text-xs font-semibold transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </header>

      {/* Main Grid Workspace */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pt-28 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Left Dashboard Tabs Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          {[
            { id: 'projects', label: 'Manage Projects', icon: <Briefcase size={18} /> },
            { id: 'certificates', label: 'Certifications', icon: <Award size={18} /> },
            { id: 'messages', label: 'Form Submissions', icon: <MailOpen size={18} /> },
            { id: 'settings', label: 'Global Settings', icon: <Settings size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-glow-primary'
                  : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Right Tab Content Panel */}
        <main className="lg:col-span-9 bg-white dark:bg-dark-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative min-h-[500px]">
          
          {/* Action Notification popup banner */}
          {notification.message && (
            <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-sm z-45 absolute top-4 right-4 shadow-lg animate-bounce ${
              notification.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              {notification.success ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
              <span>{notification.message}</span>
            </div>
          )}

          {/* Upload Progress loader */}
          {uploadProgress && (
            <div className="mb-6 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
              <span>{uploadProgress}</span>
            </div>
          )}

          {/* Render Tab Contents */}
          {fetching ? (
            <div className="flex flex-col items-center justify-center h-[300px] gap-2">
              <div className="w-8 h-8 border-4 border-primary-200 dark:border-primary-950 border-t-primary-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 text-xs">Fetching records...</p>
            </div>
          ) : (
            <>
              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">Projects</h2>
                      <p className="text-xs text-slate-400">Add, edit, or delete items on the portfolio</p>
                    </div>
                    <button
                      onClick={() => handleOpenProjectModal()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-glow-primary"
                    >
                      <Plus size={14} /> Add Project
                    </button>
                  </div>

                  {projects.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 dark:text-slate-500">
                      No projects found. Add your first project using the button above.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {projects.map(proj => (
                        <div key={proj._id} className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-4 mb-2">
                              <h3 className="font-bold text-slate-800 dark:text-white leading-tight">{proj.title}</h3>
                              <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-dark-900 text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                                {proj.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-3 mb-4">{proj.description}</p>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                              {proj.featured ? '⭐️ Featured' : ''}
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleOpenProjectModal(proj)}
                                className="p-2 rounded-lg text-slate-500 hover:bg-slate-200/60 dark:hover:bg-dark-900 hover:text-slate-800 dark:hover:text-white"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleProjectDelete(proj._id)}
                                className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CERTIFICATIONS TAB */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">Certifications</h2>
                      <p className="text-xs text-slate-400">Manage certificates displaying in credentials block</p>
                    </div>
                    <button
                      onClick={() => handleOpenCertificateModal()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-glow-primary"
                    >
                      <Plus size={14} /> Add Certificate
                    </button>
                  </div>

                  {certificates.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 dark:text-slate-500">
                      No certifications listed. Add certifications to build your credentials profile.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {certificates.map(cert => (
                        <div key={cert._id} className="p-4 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-sm">{cert.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cert.issuer} &bull; {cert.issueDate}</p>
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => handleOpenCertificateModal(cert)}
                              className="p-2 rounded-lg text-slate-500 hover:bg-slate-200/60 dark:hover:bg-dark-900"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleCertificateDelete(cert._id)}
                              className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MESSAGES SUBMISSIONS TAB */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold">Contact Messages</h2>
                    <p className="text-xs text-slate-400">View message submissions sent via the portfolio contact form</p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 dark:text-slate-500">
                      No message submissions in the database yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div key={msg._id} className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-100 dark:border-slate-800/80 space-y-3 relative group">
                          <button
                            onClick={() => handleMessageDelete(msg._id)}
                            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Delete Submission"
                          >
                            <Trash2 size={15} />
                          </button>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
                            <div>
                              <span className="text-slate-400 dark:text-slate-500 font-bold uppercase block text-[9px] tracking-wider">Sender</span>
                              <span className="font-bold text-slate-800 dark:text-white">{msg.name}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 dark:text-slate-500 font-bold uppercase block text-[9px] tracking-wider">Email</span>
                              <a href={`mailto:${msg.email}`} className="text-primary-500 hover:underline font-semibold">{msg.email}</a>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject: {msg.subject}</span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed mt-2 bg-white dark:bg-dark-900/60 p-3 rounded-xl border border-slate-200/30 dark:border-white/5">
                              {msg.message}
                            </p>
                          </div>
                          
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono text-right">
                            Received: {new Date(msg.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-10">
                  {/* CV Resume Upload */}
                  <div className="p-6 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <h3 className="font-bold text-base flex items-center gap-2">
                        <FileText size={18} className="text-primary-500" /> Resume / CV Management
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        Upload your professional resume PDF file here. It will overwrite the default target path `/uploads/resume/resume.pdf` for downloads.
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer text-xs font-bold shadow-sm transition-colors">
                        <Upload size={14} />
                        Select Resume PDF
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[10px] text-slate-400">PDF documents only. Max size 10MB.</span>
                    </div>
                  </div>

                  {/* Change Password Form */}
                  <div className="p-6 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <h3 className="font-bold text-base flex items-center gap-2">
                        <Settings size={18} className="text-cyan-500" /> Administrative Security Settings
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        Update the security password for accessing the dashboard panel.
                      </p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                        <input
                          type="password"
                          required
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                          <input
                            type="password"
                            required
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
                          <input
                            type="password"
                            required
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-glow-primary hover:shadow-lg transition-all"
                      >
                        Update Credentials
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* PROJECT DIALOG MODAL */}
      {projectModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form 
            onSubmit={handleProjectSubmit}
            className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-dark-950 flex justify-between items-center flex-shrink-0">
              <h3 className="font-extrabold text-slate-800 dark:text-white">
                {projectModal.editMode ? 'Edit Project Profile' : 'Register New Project'}
              </h3>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-4 flex-grow">
              
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Finance Analytics Platform"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  >
                    <option value="fullstack">Full-Stack</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Summarize the project objectives, architecture and features..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 resize-none"
                ></textarea>
              </div>

              {/* Technologies */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Technologies (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB, Express"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* GitHub and Live Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GitHub Link</label>
                  <input
                    type="url"
                    value={projectForm.gitHubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, gitHubLink: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Demo Link</label>
                  <input
                    type="url"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              {/* File Image Upload */}
              <div className="p-4 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Project Thumbnail Image</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/uploads/projects/thumbnail.jpg"
                    className="flex-grow px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none"
                  />
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer text-xs font-bold shadow-sm">
                    <Image size={14} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'projects')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Featured Switch */}
              <label className="flex items-center gap-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-800 bg-slate-50"
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Pin project to Featured list</span>
              </label>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-dark-950 border-t border-slate-100 dark:border-slate-800/80 flex justify-end gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setProjectModal({ isOpen: false, editMode: false, data: null })}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-glow-primary"
              >
                {projectModal.editMode ? 'Save Edits' : 'Register Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CERTIFICATE DIALOG MODAL */}
      {certificateModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form 
            onSubmit={handleCertificateSubmit}
            className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-dark-950 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 dark:text-white">
                {certificateModal.editMode ? 'Edit Certification Record' : 'Register Certification'}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Certification Name</label>
                <input
                  type="text"
                  required
                  value={certificateForm.name}
                  onChange={(e) => setCertificateForm({ ...certificateForm, name: e.target.value })}
                  placeholder="e.g. AWS Solutions Architect"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Issuer & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Issuer</label>
                  <input
                    type="text"
                    required
                    value={certificateForm.issuer}
                    onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Issue Date</label>
                  <input
                    type="text"
                    required
                    value={certificateForm.issueDate}
                    onChange={(e) => setCertificateForm({ ...certificateForm, issueDate: e.target.value })}
                    placeholder="e.g. October 2025"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Credential Url */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verification URL</label>
                <input
                  type="url"
                  value={certificateForm.credentialUrl}
                  onChange={(e) => setCertificateForm({ ...certificateForm, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none"
                />
              </div>

              {/* Image Upload */}
              <div className="p-4 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Certificate Image Preview</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={certificateForm.image}
                    onChange={(e) => setCertificateForm({ ...certificateForm, image: e.target.value })}
                    placeholder="/uploads/certificates/cert.jpg"
                    className="flex-grow px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none"
                  />
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer text-xs font-bold shadow-sm">
                    <Image size={14} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'certificates')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-dark-950 border-t border-slate-100 dark:border-slate-800/80 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCertificateModal({ isOpen: false, editMode: false, data: null })}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-glow-primary"
              >
                {certificateModal.editMode ? 'Save Edits' : 'Register Certificate'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
