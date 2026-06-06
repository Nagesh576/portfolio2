const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// @desc    Submit a contact form message
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Save to Database
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    console.log(`Contact message saved in DB from: ${email}`);

    // Try sending email via Nodemailer
    try {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;
      const receiverEmail = process.env.RECEIVER_EMAIL || emailUser;

      // Only attempt email if credentials look configured and are not the defaults
      if (emailUser && emailPass && !emailUser.includes('your_email') && !emailPass.includes('your_gmail')) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT) || 587,
          secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        const mailOptions = {
          from: `"${name}" <${emailUser}>`, // sender address (using authenticated email)
          replyTo: email, // reply to the sender
          to: receiverEmail, // list of receivers
          subject: `Portfolio Contact: ${subject || 'New Message'}`, // Subject line
          html: `
            <h3>New Message from Portfolio Website</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email notification successfully sent to ${receiverEmail}`);
      } else {
        console.log('Nodemailer skipped: SMTP credentials not fully configured in .env');
      }
    } catch (mailError) {
      // Log error but do not fail the request since database save succeeded!
      console.error('Nodemailer Error: Failed to send email notification:', mailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newMessage
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
