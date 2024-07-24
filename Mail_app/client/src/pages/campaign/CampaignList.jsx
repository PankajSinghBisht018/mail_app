import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useCampaignStore from '../../store/useCampaignStore';

const CampaignsList = () => {
  const campaigns = useCampaignStore((state) => state.campaigns);
  const fetchCampaigns = useCampaignStore((state) => state.fetchCampaigns);
  const deleteCampaign = useCampaignStore((state) => state.deleteCampaign);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleDelete = (campaign) => {
    setSelectedCampaign(campaign);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCampaign) {
      deleteCampaign(selectedCampaign._id);
    }
    setDialogOpen(false);
    setSelectedCampaign(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">All Campaigns</h1>
      <ul className="list-none p-0 text-center">
        {campaigns.map((campaign) => (
          <li key={campaign._id} className="mb-4 flex flex-col sm:flex-row items-center justify-center">
            <Link
              to={`/campaign/campaign-form/${campaign._id}`}
              className="text-base sm:text-lg text-white text-center mb-2 sm:mb-0"
              style={{ textDecoration: 'none', width: '100%' }}
            >
              {campaign.name}
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(campaign)}
              startIcon={<DeleteIcon />}
              size="small"
              style={{ marginLeft: '8px' }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '16px',
            backgroundColor: '#282c34', 
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'white' }}>
            Are you sure you want to delete the campaign "{selectedCampaign?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
