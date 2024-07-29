const Campaign = require('../models/Campaign');
const User = require('../models/User'); 

exports.getUserCampaigns = async (req, res) => {
  const clerkUserId = req.auth.userId;

  try {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const campaigns = await Campaign.find({ createdBy: user._id });
    res.json(campaigns);
  } catch (error) {
    console.error('Failed to fetch user campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

exports.createCampaign = async (req, res) => {
  const clerkUserId = req.auth.userId; 
  const campaignData = req.body;

  try {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newCampaign = await Campaign.create({ ...campaignData, createdBy: user._id });
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Failed to create campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const clerkUserId = req.auth.userId; 
  const updateData = req.body;

  try {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedCampaign = await Campaign.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      updateData,
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found or not authorized' });
    }

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Failed to update campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;
  const clerkUserId = req.auth.userId; 

  try {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deletedCampaign = await Campaign.findOneAndDelete({ _id: id, createdBy: user._id });

    if (!deletedCampaign) {
      return res.status(404).json({ error: 'Campaign not found or not authorized' });
    }

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Failed to delete campaign:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    console.error('Failed to fetch all campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

