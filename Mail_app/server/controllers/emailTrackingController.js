const EmailEvent = require('../models/Device'); 
const UAParser = require('ua-parser-js'); 

const trackEmailOpen = async (req, res) => {
  const { emailId, recipient } = req.query;
  const userAgent = req.headers['user-agent'] || 'unknown';

  try {
    const emailEvent = new EmailEvent({
      emailId,
      recipient,
      openedAt: new Date(),
      deviceType: getDeviceType(userAgent),
    });
    await emailEvent.save();
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': 0,
    });
    res.end();
  } catch (error) {
    console.error('Error tracking email open:', error);
    res.status(500).send({ message: 'Failed to track email open', error });
  }
};

const getDeviceType = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return result.device.type || 'unknown';
};

const getEmailEvents = async (req, res) => {
  try {
    const emailEvents = await EmailEvent.find({});
    res.status(200).json(emailEvents);
  } catch (error) {
    console.error('Error fetching email events:', error);
    res.status(500).send({ message: 'Failed to fetch email events.', error });
  }
};

module.exports = { trackEmailOpen, getEmailEvents };
