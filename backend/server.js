const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // For local testing. In production, specify frontend URL.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/upload', require('./routes/upload'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Seed admin user on start if none exists
const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'adminpassword123';
      
      await Admin.create({
        username,
        password // Encrypted via Mongoose pre-save hook
      });
      console.log('---------------------------------------------');
      console.log('Seeded Initial Admin Account!');
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
      console.log('---------------------------------------------');
    } else {
      console.log('Admin user database check: admin exists.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

// Seed initial project on start if none exists
const seedProjects = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          title: 'BMR College Portal',
          description: 'A responsive, high-performance web portal for BMR College. Features modern styling, interactive student features, courses overview, academic announcements, and query forms designed for a seamless mobile-first user experience.',
          image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
          gitHubLink: 'https://github.com/Nagesh576/bmr-college-frontend',
          liveLink: 'https://bmr-college-frontend.vercel.app/',
          technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'API Integration'],
          category: 'frontend',
          featured: true
        },
        {
          title: 'FlashFrame 35 Website',
          description: 'A premium, cinematic booking and portfolio website for photography and videography brands. Features custom admin panel management, media organization via Cloudinary, and dynamic scheduling integrations.',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
          gitHubLink: 'https://github.com/Nagesh576/flashframe_35',
          liveLink: 'https://flashframe-35.vercel.app/',
          technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'MongoDB', 'Cloudinary'],
          category: 'fullstack',
          featured: true
        },
        {
          title: 'Telangana Tourism Web Application',
          description: 'A modern, responsive web application showcasing the rich culture, heritage, temples, festivals, and tourist destinations of Telangana. Features an interactive map of all 33 districts, global search, and customized guides for 1000+ temples and 50+ heritage sites.',
          image: 'https://github.com/user-attachments/assets/b08c61f7-e090-4513-86cc-85a198185915',
          gitHubLink: 'https://github.com/Nagesh576/Telangana-Tourism-',
          liveLink: 'https://telangana-tourism-xi.vercel.app/',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
          category: 'frontend',
          featured: true
        },
        {
          title: 'Holy Cross Junior College Website',
          description: 'A responsive, user-friendly website designed for Holy Cross Junior College, Alirajpet, Siddipet. It provides accessible details about the college history, admission processes, courses offered, campus overview, and direct contact forms.',
          image: 'https://github.com/user-attachments/assets/1cad6cf5-b69c-4d1f-9a60-5cff295f62e3',
          gitHubLink: 'https://github.com/Nagesh576/Holycrossclg',
          liveLink: 'https://holycrossclg-68hw.vercel.app/',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
          category: 'frontend',
          featured: true
        }
      ]);
      console.log('Seeded Initial Projects!');
    } else {
      console.log('Projects database check: projects exist.');
    }
  } catch (error) {
    console.error('Error seeding projects:', error.message);
  }
};

// Seed initial certificates on start if none exist
const seedCertificates = async () => {
  try {
    const certificateCount = await Certificate.countDocuments();
    if (certificateCount === 0) {
      await Certificate.create([
        {
          name: 'ESummit\'26 Certificate of Appreciation',
          issuer: 'Malla Reddy University & Unifesto',
          issueDate: 'March 18, 2026',
          credentialUrl: '',
          image: '/uploads/certificates/mruh-esummit-26.png',
          fileUrl: '/uploads/certificates/mruh-esummit-26.png'
        },
        {
          name: 'The Rise of Agentic AI Completion Certificate',
          issuer: 'Microsoft Learn Student Ambassador & MLSC-MRUH',
          issueDate: 'September 18, 2025',
          credentialUrl: '',
          image: '/uploads/certificates/rise-of-agentic-ai.jpg',
          fileUrl: '/uploads/certificates/rise-of-agentic-ai.jpg'
        },
        {
          name: 'HackWithHyderabad Hackathon Certificate',
          issuer: 'Devnovate & HackWithIndia',
          issueDate: '2025',
          credentialUrl: '',
          image: '/uploads/certificates/hack-with-hyderabad.jpg',
          fileUrl: '/uploads/certificates/hack-with-hyderabad.jpg'
        },
        {
          name: 'Google Cloud Agentic AI Day Certificate',
          issuer: 'Google Cloud & Hack2skill',
          issueDate: 'October 2025',
          credentialUrl: '',
          image: '/uploads/certificates/google-cloud-agentic-ai-day.jpg',
          fileUrl: '/uploads/certificates/google-cloud-agentic-ai-day.jpg'
        },
        {
          name: 'AI-ML Virtual Internship Certificate',
          issuer: 'Google for Developers (EduSkills & AICTE)',
          issueDate: 'March 2026',
          credentialUrl: '',
          image: '/uploads/certificates/ai-ml-virtual-internship-certificate.png',
          fileUrl: '/uploads/certificates/ai-ml-virtual-internship-certificate.png'
        },
        {
          name: 'AWS Cloud Practitioner Essentials',
          issuer: 'AWS Training & Certification',
          issueDate: 'March 25, 2026',
          credentialUrl: '',
          image: '/uploads/certificates/aws-certified-cloud-practitioner.png',
          fileUrl: '/uploads/certificates/aws-certified-cloud-practitioner.png'
        }
      ]);
      console.log('Seeded Initial Certificates!');
    } else {
      console.log('Certificates database check: certificates exist.');
    }
  } catch (error) {
    console.error('Error seeding certificates:', error.message);
  }
};

// Seed admin, projects & certificates
seedAdmin();
seedProjects();
seedCertificates();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
