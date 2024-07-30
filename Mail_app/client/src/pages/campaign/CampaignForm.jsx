import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, CardContent,CardActions , Typography,} from '@mui/material';
import useCampaignStore from '../../store/useCampaignStore';
import { motion } from 'framer-motion';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { useAuth } from '@clerk/clerk-react';

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useAuth();
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
    const fetchData = async () => {
      try {
        const token = await getToken(); 
        if (token) {
          await fetchCampaigns(token);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [fetchCampaigns, getToken]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!campaignName) {
      alert('Please enter a campaign name');
      return;
    }
  
    const token = await getToken();
    if (!token) {
      alert('Unable to retrieve authentication token');
      return;
    }
  
    try {
      if (id) {
        await updateCampaign(id, { name: campaignName, ...formData }, token);
        setSavedText(`Campaign updated successfully:\nFrom: ${formData.from}\nTo: ${formData.to}\nSubject: ${formData.subject}`);
      } else {
        await addCampaign({ name: campaignName, ...formData }, token);
        setSavedText(`Campaign created successfully:\nFrom: ${formData.from}\nTo: ${formData.to}\nSubject: ${formData.subject}`);
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Failed to save campaign Please try again.');
    }
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
    navigate(`/campaign/select-template`, { state: { ...formData, campaignName } });
  };

  return (
    <div className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="h4" component="h1" className="text-center mb-4 text-black">
          {id ? 'Edit Campaign' : 'Create Campaign'}
        </Typography>
        <Typography variant="body1" component="p" className="text-center mb-4 text-black">
          {id ? 'Update the details of your campaign below.' : 'Fill out the form below to create a new campaign.'}
        </Typography>
        <NeonGradientCard className="bg-white rounded-lg backdrop-filter mt-4 backdrop-blur-md shadow-md">
          <CardContent className="p-4 sm:p-6">
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
                  className="bg-white rounded-xl shadow-md text-black"
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
                  className="bg-white rounded-xl shadow-md text-black"
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
                  className="bg-white rounded-xl shadow-md text-black"
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
                  className="bg-white rounded-xl shadow-md text-black"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md text-blue-100"
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
                  onClick={handleCreateTemplate}
                  className="w-full sm:w-1/2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md text-blue-100"
                >
                  Create Template
                </Button>
              </div>
            )}
          </CardContent>
          <CardActions className="flex justify-end p-4">
            <Dialog open={isDialogVisible} onClose={() => setDialogVisible(false)}>
              <DialogTitle>Choose Template Option</DialogTitle>
              <DialogContent className="space-y-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNewTemplate}
                  fullWidth
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md text-blue-100"
                >
                  Create Own Template
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUseCustomTemplate}
                  fullWidth
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md text-blue-100"
                >
                  Use Custom Template
                </Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogVisible(false)} color="inherit">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </NeonGradientCard>
      </motion.div>
    </div>
  );
};

export default CampaignForm;
