const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a project description']
  },
  image: {
    type: String,
    default: '/uploads/projects/placeholder.jpg'
  },
  gitHubLink: {
    type: String,
    trim: true,
    default: ''
  },
  liveLink: {
    type: String,
    trim: true,
    default: ''
  },
  technologies: {
    type: [String],
    required: [true, 'Please add technologies used']
  },
  category: {
    type: String,
    required: [true, 'Please specify project category'],
    enum: ['frontend', 'backend', 'fullstack', 'other'],
    default: 'fullstack'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
