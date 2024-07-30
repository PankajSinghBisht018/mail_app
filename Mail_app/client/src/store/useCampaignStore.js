import { create } from 'zustand';
import { API_URL } from '../services/helper';

const useCampaignStore = create((set) => ({
  campaigns: [],
  
  addCampaign: async (campaign, token) => {
    try {
      const response = await fetch(`${API_URL}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(campaign),
      });
      const newCampaign = await response.json();
      set((state) => ({
        campaigns: [...state.campaigns, newCampaign],
      }));
    } catch (error) {
      console.error('Failed to add campaign:', error);
    }
  },
  
  fetchCampaigns: async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/campaigns`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const campaigns = await response.json();
      set({ campaigns });
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  },

  deleteCampaign: async (campaignId, token) => {
    try {
      await fetch(`${API_URL}/api/campaigns/${campaignId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({
        campaigns: state.campaigns.filter(campaign => campaign._id !== campaignId),
      }));
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  },
  
  updateCampaign: async (campaignId, updatedCampaign, token) => {
    try {
      const response = await fetch(`${API_URL}/api/campaigns/${campaignId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCampaign),
      });
      const updatedData = await response.json();
      set((state) => ({
        campaigns: state.campaigns.map(campaign =>
          campaign._id === campaignId ? updatedData : campaign
        ),
      }));
    } catch (error) {
      console.error('Failed to update campaign:', error);
    }
  },
}));

export default useCampaignStore;
