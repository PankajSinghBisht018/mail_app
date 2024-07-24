import {create} from 'zustand';
import { API_URL } from '../services/helper';

const useCampaignStore = create((set) => ({
  campaigns: [],
  addCampaign: async (campaign) => {
    try {
      const response = await fetch(`${API_URL}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  updateCampaign: async (updatedCampaign) => {
    try {
      const response = await fetch(`${API_URL}/api/campaigns/${updatedCampaign._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCampaign),
      });
      const updated = await response.json();
      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign._id === updated._id ? updated : campaign
        ),
      }));
    } catch (error) {
      console.error('Failed to update campaign:', error);
    }
  },
  deleteCampaign: async (id) => {
    try {
      await fetch(`${API_URL}/api/campaigns/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        campaigns: state.campaigns.filter((campaign) => campaign._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  },
  fetchCampaigns: async () => {
    try {
      const response = await fetch(`${API_URL}/api/campaigns`);
      const campaigns = await response.json();
      set({ campaigns });
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  },
}));

export default useCampaignStore;
