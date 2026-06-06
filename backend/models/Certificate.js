const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a certificate name'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Please add an issuer name'],
    trim: true
  },
  issueDate: {
    type: String,
    required: [true, 'Please add the issue date']
  },
  credentialUrl: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    default: '/uploads/certificates/placeholder.jpg'
  },
  fileUrl: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
