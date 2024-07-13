import create from 'zustand';

const useCampaignStore = create((set) => ({
  campaigns: [],
  addCampaign: (campaign) => set((state) => ({
    campaigns: [...state.campaigns, campaign],
  })),
  updateCampaign: (updatedCampaign) => set((state) => ({
    campaigns: state.campaigns.map(campaign =>
      campaign.name === updatedCampaign.name ? updatedCampaign : campaign
    ),
  })),
}));

export default useCampaignStore;
