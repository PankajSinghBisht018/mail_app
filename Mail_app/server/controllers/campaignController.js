const Campaign = require('../models/Campaign');


exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};


exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = await Campaign.create(req.body);
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Failed to create campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(updatedCampaign);
  } catch (error) {
    console.error('Failed to update campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    if (!deletedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Failed to delete campaign:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};
