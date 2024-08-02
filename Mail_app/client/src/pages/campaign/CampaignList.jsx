import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Search as SearchIcon } from '@mui/icons-material';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import useCampaignStore from '../../store/useCampaignStore';
import { useUser, useAuth } from '@clerk/clerk-react';

const CampaignsList = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const fetchCampaigns = useCampaignStore((state) => state.fetchCampaigns);
  const campaigns = useCampaignStore((state) => state.campaigns);
  const deleteCampaign = useCampaignStore((state) => state.deleteCampaign);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCampaigns = async () => {
      const token = await getToken();
      await fetchCampaigns(token);
      setLoading(false);
    };

    if (user) {
      loadCampaigns();
    }
  }, [fetchCampaigns, getToken, user]);

  const handleDelete = async (campaign) => {
    setSelectedCampaign(campaign);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCampaign) {
      const token = await getToken();
      await deleteCampaign(selectedCampaign._id, token);
      setSelectedCampaign(null);
    }
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCampaign(null);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative z-10 p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Campaigns</h1>
        <div className="relative bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="flex justify-start my-2">
            <TextField 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              placeholder="Search by campaign name"
              className="mr-2 rounded-full"
              size="small"
              sx={{ marginBottom: '20px', width: '300px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                className: 'rounded-full',
              }}
            />
          </div>
          {loading ? (
            <div className="animate-pulse">
              <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
              <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
              <Skeleton className="h-96 bg-gray-600 rounded-md mb-2" />
            </div>
          ) : (
            <Table className="bg-gray-200">
              <TableCaption>A list of your campaigns.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign._id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/campaign/campaign-form/${campaign._id}`}
                        className="text-base text-yellow-700 hover:underline"
                      >
                        {campaign.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleDelete(campaign)}
                        startIcon={<DeleteIcon />}
                        size="small"
                        className="bg-yellow-600 text-black"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="text-right font-bold">
                    Total Campaigns: {campaigns.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </div>
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
              className="bg-yellow-500 text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-yellow-500 text-black"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CampaignsList;
