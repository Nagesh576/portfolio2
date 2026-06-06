const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/auth');

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = [
    path.join(__dirname, '../uploads'),
    path.join(__dirname, '../uploads/projects'),
    path.join(__dirname, '../uploads/certificates'),
    path.join(__dirname, '../uploads/resume')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};
createUploadDirs();

// Storage config for general uploads (projects/certificates)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = req.query.type || 'projects'; // projects, certificates
    let dest = path.join(__dirname, '../uploads/projects');

    if (fileType === 'certificates') {
      dest = path.join(__dirname, '../uploads/certificates');
    }

    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Storage config for Resume PDF uploads
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/resume'));
  },
  filename: (req, file, cb) => {
    // Keep a fixed name or clear unique name
    cb(null, `resume${path.extname(file.originalname)}`);
  }
});

// File filter (images only)
const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

// File filter (PDF only)
const pdfFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase() === '.pdf';
  const mimetype = file.mimetype === 'application/pdf';

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('PDF files only!'), false);
  }
};

// Multer Upload middleware instances
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: imageFilter
}).single('image');

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: pdfFilter
}).single('resume');

// @desc    Upload project/certificate image
// @route   POST /api/upload/image
// @access  Private
router.post('/image', protect, (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const type = req.query.type || 'projects';
    const relativePath = `/uploads/${type}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      filePath: relativePath
    });
  });
});

// @desc    Upload Resume PDF
// @route   POST /api/upload/resume
// @access  Private
router.post('/resume', protect, (req, res) => {
  uploadResume(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const relativePath = `/uploads/resume/${req.file.filename}`;

    res.status(200).json({
      success: true,
      filePath: relativePath
    });
  });
});

module.exports = router;
