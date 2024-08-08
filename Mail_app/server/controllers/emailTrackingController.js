const EmailTracking = require('../models/EmailTracking');
const EmailTemplate = require('../models/EmailTemplate');

const transparentImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/ah8ksAAAAAASUVORK5CYII=";

const trackEmail = async (req, res) => {
  const { trackingId } = req.params;
 
  try {
    console.log(`Received tracking request for ID: ${trackingId}`);

    const email = await EmailTemplate.findOne({ trackingId });

    if (email) {
      console.log(`Email found for tracking ID: ${trackingId}`);

      const trackingEntry = await EmailTracking.findOneAndUpdate(
        { emailId: email._id, recipient: email.recipient, userId:email.userId },
        { $inc: { openCount: 1 }, $set: { openedAt: new Date() } },
        { upsert: true, new: true }
      );

      console.log(`Tracking entry updated:`, trackingEntry);

      const imgBuffer = Buffer.from(transparentImage.split(',')[1], 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imgBuffer.length
      });
      res.end(imgBuffer);
    } else {
      console.log(`Tracking ID ${trackingId} not found in database`);
      res.status(404).send({ message: 'Tracking ID not found' });
    }
  } catch (error) {
    console.error('Error tracking email:', error);
    res.status(500).send({ message: 'Failed to track email', error });
  }
};
const getEmailOpenStats = async (req, res) => {
  const userId = req.auth.userId; 

  try {
    const openStats = await EmailTracking.aggregate([
      { $match: { userId } },
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$openedAt" } 
          },
          openCount: 1
        }
      },
      {
        $group: {
          _id: "$date", 
          count: { $sum: "$openCount" } 
        }
      },
      { $sort: { _id: 1 } } 
    ]);

    res.status(200).json(openStats);
  } catch (error) {
    console.error('Error fetching email open stats:', error);
    res.status(500).send({ message: 'Failed to fetch email open stats.', error });
  }
};
module.exports = { trackEmail, getEmailOpenStats };
