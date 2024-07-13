const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');
const cron = require('node-cron');

const sendEmailTemplate = async (req, res) => {
  const { htmlContent, recipients, subject, from, scheduledDate } = req.body;

  if (scheduledDate) {
    try {
      await Promise.all(recipients.map(async (recipient) => {
        const emailTemplate = new EmailTemplate({
          subject,
          htmlContent,
          recipient,
          sender: from,
          scheduledDate,
          isScheduled: true,
        });
        await emailTemplate.save();
      }));

      res.status(200).send({ message: 'Emails scheduled successfully!' });
    } catch (error) {
      console.error('Error scheduling email:', error);
      res.status(500).send({ message: 'Failed to schedule emails.', error });
    }
  } else {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await Promise.all(recipients.map(async (recipient) => {
        let info = await transporter.sendMail({
          from,
          to: recipient,
          subject,
          html: htmlContent,
        });
        console.log('Message sent: %s', info.messageId);

        const emailTemplate = new EmailTemplate({
          subject,
          htmlContent,
          recipient,
          sender: from,
          messageId: info.messageId,
          sentAt: new Date(),
          sent: true,
        });
        await emailTemplate.save();
      }));

      res.status(200).send({ message: 'Emails sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Failed to send emails.', error });
    }
  }
};

const getEmailEvents = async (req, res) => {
  try {
    const emailEvents = await EmailTemplate.find({});
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
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(templateUsageCounts);
  } catch (error) {
    console.error('Error fetching template usage counts:', error);
    res.status(500).send({ message: 'Failed to fetch template usage counts.', error });
  }
};

cron.schedule('* * * * *', async () => {
  const now = new Date();

  try {
    const emailsToSend = await EmailTemplate.find({ scheduledDate: { $lte: now }, sent: false, isScheduled: true });

    emailsToSend.forEach(async (emailDetails) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
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

module.exports = { sendEmailTemplate, getEmailEvents, getTemplateUsageCounts };
