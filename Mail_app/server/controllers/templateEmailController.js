const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');
const cron = require('node-cron');
const { v4: uuidv4 } = require('uuid');

const sendEmailTemplate = async (req, res) => {
  const { htmlContent, recipients, subject, from, scheduledDate } = req.body;
  const userId = req.auth.userId;

  if (!userId) {
    return res.status(400).send({ message: 'User ID not found in auth' });
  }

  const trackingId = uuidv4();
  const trackingUrl = `https://mail-app-backend-eosb.onrender.com/api/track-email/${trackingId}`;

  const modifiedHtmlContent = htmlContent +
    `<img src="${trackingUrl}" width="1" height="1" style="display:none;" />`;

  if (scheduledDate) {
    try {
      await Promise.all(recipients.map(async (recipient) => {
        const emailTemplate = new EmailTemplate({
          subject,
          htmlContent: modifiedHtmlContent,
          recipient,
          sender: from,
          scheduledDate,
          trackingId,
          isScheduled: true,
          userId,
        });
        await emailTemplate.save();
      }));
      res.status(200).send({ message: 'Emails scheduled successfully!' });
    } catch (error) {
      console.error('Error scheduling email:', error);
      res.status(500).send({ message: 'Failed to schedule emails.', error });
    }
  } else {
    sendEmailsImmediately(recipients, subject, modifiedHtmlContent, from, res, userId, trackingId);
  }
};

const sendEmailsImmediately = async (recipients, subject, htmlContent, from, res, userId, trackingId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await Promise.all(recipients.map(async (recipient) => {
      const info = await transporter.sendMail({
        from,
        to: recipient,
        subject,
        html: htmlContent,
      });

      const emailTemplate = new EmailTemplate({
        subject,
        htmlContent,
        recipient,
        sender: from,
        messageId: info.messageId,
        sentAt: new Date(),
        sent: true,
        userId,
        trackingId,
      });
      await emailTemplate.save();
    }));
    res.status(200).send({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send emails.', error });
  }
};

const getEmailEvents = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const emailEvents = await EmailTemplate.find({ userId });
    res.status(200).json(emailEvents);
  } catch (error) {
    console.error('Error fetching email events:', error);
    res.status(500).send({ message: 'Failed to fetch email events.', error });
  }
};

const getEmailEventsForGraph = async (req, res) => {
  try {
    const emailEvents = await EmailTemplate.find();
    res.status(200).json(emailEvents);
  } catch (error) {
    console.error('Error fetching email events:', error);
    res.status(500).send({ message: 'Failed to fetch email events.', error });
  }
};

const getTemplateUsageCounts = async (req, res) => {
  try {
    const templateUsageCounts = await EmailTemplate.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(templateUsageCounts);
  } catch (error) {
    console.error('Error fetching template usage counts:', error);
    res.status(500).send({ message: 'Failed to fetch template usage counts.', error });
  }
};

const cancelEmailSchedule = async (req, res) => {
  const { id } = req.params;
  const userId = req.auth.userId;

  try {
    const email = await EmailTemplate.findOne({ _id: id, userId });
    if (!email) {
      return res.status(404).send({ message: 'Email not found' });
    }
    email.canceled = true;
    email.sent = false;
    await email.save();

    res.status(200).send({ message: 'Email schedule canceled successfully' });
  } catch (error) {
    console.error('Error canceling email:', error);
    res.status(500).send({ message: 'Failed to cancel email', error });
  }
};

const sendEmailNow = async (req, res) => {
  const { id } = req.params;
  const userId = req.auth.userId;

  try {
    const email = await EmailTemplate.findOne({ _id: id, userId });
    if (!email) {
      return res.status(404).send({ message: 'Email not found' });
    }

    if (email.canceled) {
      return res.status(400).send({ message: 'Email is canceled and cannot be sent' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: email.sender,
      to: email.recipient,
      subject: email.subject,
      html: email.htmlContent,
    });

    email.messageId = info.messageId;
    email.sentAt = new Date();
    email.sent = true;
    await email.save();

    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email', error });
  }
};

cron.schedule('* * * * *', async () => {
  const now = new Date();

  try {
    const emailsToSend = await EmailTemplate.find({
      scheduledDate: { $lte: now },
      sent: false,
      isScheduled: true,
      canceled: false,
    });

    emailsToSend.forEach(async (emailDetails) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: emailDetails.sender,
        to: emailDetails.recipient,
        subject: emailDetails.subject,
        html: emailDetails.htmlContent,
      });

      console.log('Scheduled email sent: %s', info.messageId);

      emailDetails.messageId = info.messageId;
      emailDetails.sentAt = new Date();
      emailDetails.sent = true;
      await emailDetails.save();
    });

    console.log('Checked for scheduled emails');
  } catch (error) {
    console.error('Error checking for scheduled emails:', error);
  }
});

module.exports = { sendEmailTemplate, getEmailEvents, getEmailEventsForGraph, getTemplateUsageCounts, cancelEmailSchedule, sendEmailNow };
