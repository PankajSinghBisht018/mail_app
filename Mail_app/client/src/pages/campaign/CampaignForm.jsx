import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, CardActions, Typography } from '@mui/material';
import useCampaignStore from '../../store/useCampaignStore';
import { motion } from 'framer-motion';

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const campaigns = useCampaignStore((state) => state.campaigns);
  const fetchCampaigns = useCampaignStore((state) => state.fetchCampaigns);
  const addCampaign = useCampaignStore((state) => state.addCampaign);
  const updateCampaign = useCampaignStore((state) => state.updateCampaign);
  const [campaignName, setCampaignName] = useState('');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    subject: '',
  });
  const [savedText, setSavedText] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    const campaign = campaigns.find((c) => c._id === id);
    if (campaign) {
      setCampaignName(campaign.name);
      setFormData({
        from: campaign.from,
        to: campaign.to,
        subject: campaign.subject,
      });
    }
  }, [campaigns, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!campaignName) {
      alert('Please enter a campaign name');
      return;
    }
    if (id) {
      updateCampaign({ _id: id, name: campaignName, ...formData });
    } else {
      addCampaign({ name: campaignName, ...formData });
    }
    setSavedText(`From: ${formData.from}\nTo: ${formData.to}\nSubject: ${formData.subject}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setSavedText('');
  };

  const handleCreateTemplate = () => {
    setDialogVisible(true);
  };

  const handleNewTemplate = () => {
    navigate(`/create-template`, { state: { ...formData, campaignName, design: null } });
  };

  const handleUseCustomTemplate = () => {
    navigate(`/select-template`, { state: { ...formData, campaignName } });
  };

  return (
    <motion.div className="flex-1 min-h-screen bg-gradient-to-r from-black to-purple-900 text-white p-4 flex flex-col justify-center items-center"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Typography variant="h4" component="h1" className="text-center mb-8 ">
        {id ? 'Edit Campaign' : 'Create Campaign'}
      </Typography>
      <Card className="w-full max-w-md">
        <CardContent className="bg-white text-black rounded-lg shadow-lg p-6">
          {!savedText && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                id="campaignName"
                name="campaignName"
                label="Campaign Name"
                variant="outlined"
                fullWidth
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
                className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl text-black"
              />
              <TextField
                id="from"
                name="from"
                label="From"
                variant="outlined"
                fullWidth
                value={formData.from}
                onChange={handleChange}
                required
                className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl text-black"
              />
              <TextField
                id="to"
                name="to"
                label="To"
                variant="outlined"
                fullWidth
                value={formData.to}
                onChange={handleChange}
                required
                className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl text-black"
              />
              <TextField
                id="subject"
                name="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                value={formData.subject}
                onChange={handleChange}
                required
                className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl text-black"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-blue-100 pr-4 pl-4"
              >
                Save
              </Button>
            </form>
          )}
          {savedText && (
            <div className="text-center space-x-4 space-y-4">
              <Typography variant="body1">
                <span className="font-bold">From:</span> {formData.from}
              </Typography>
              <Typography variant="body1">
                <span className="font-bold">To:</span> {formData.to}
              </Typography>
              <Typography variant="body1">
                <span className="font-bold">Subject:</span> {formData.subject}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-blue-100"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateTemplate}
                className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-blue-100"
              >
                Generate Email Template
              </Button>
            </div>
          )}
        </CardContent>
        <CardActions className="flex justify-end p-4">
          <Dialog open={isDialogVisible} onClose={() => setDialogVisible(false)}>
            <DialogTitle>Choose Template Option</DialogTitle>
            <DialogContent className="space-y-4">
              <Button variant="contained" color="primary" onClick={handleNewTemplate} fullWidth className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-blue-100  ">
                Create Own Template
              </Button>
              <Button variant="contained" color="primary" onClick={handleUseCustomTemplate} fullWidth className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-blue-100  ">
                Use Custom Template
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogVisible(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default CampaignForm;
