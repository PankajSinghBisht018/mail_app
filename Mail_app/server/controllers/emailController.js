const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const nodeCron = require('node-cron');
const Email = require('../models/Email');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailTemplatePath = path.join(__dirname, '../templates/emailTemplate.html');

const sendEmailNow = async (emailData) => {
  try {
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    const emailHtml = emailTemplate
      .replace('{{subject}}', emailData.subject)
      .replace('{{body}}', emailData.body);

    let sender;
    if (typeof emailData.sender === 'string') {
      sender = emailData.sender; 
    } else if (typeof emailData.sender === 'object' && emailData.sender.emailAddress) {
      sender = emailData.sender.emailAddress; 
    } else {
      throw new Error('Invalid sender format');
    }

    const mailOptions = {
      from: sender,
      to: emailData.recipient,
      cc: emailData.cc,
      bcc: emailData.bcc,
      subject: emailData.subject,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    const newEmail = new Email({
      subject: emailData.subject,
      body: emailData.body,
      sender: sender,
      recipient: emailData.recipient,
      cc: emailData.cc,
      bcc: emailData.bcc,
    });
    await newEmail.save();

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

const scheduleEmail = (emailData, scheduleDate) => {
  const sendAt = new Date(scheduleDate);
  const cronTime = `${sendAt.getSeconds()} ${sendAt.getMinutes()} ${sendAt.getHours()} ${sendAt.getDate()} ${sendAt.getMonth() + 1} *`;

  nodeCron.schedule(cronTime, () => {
    sendEmailNow(emailData);
  });
};

const sendEmail = async (req, res) => {
  const { subject, body, sender, recipient, cc, bcc, scheduleDate } = req.body;

  try {
    const emailData = { subject, body, sender, recipient, cc, bcc };

    if (scheduleDate) {
      scheduleEmail(emailData, scheduleDate);
      res.status(200).json({ message: 'Email scheduled successfully' });
    } else {
      const result = await sendEmailNow(emailData); 
      res.status(200).json(result);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: error.message || 'Failed to send email' });
  }
};

module.exports = {
  sendEmail, 
};
