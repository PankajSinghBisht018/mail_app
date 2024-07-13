import React from 'react';
import { Link } from 'react-router-dom';
import useCampaignStore from '../../store/useCampaignStore';

const CampaignsList = () => {
  const campaigns = useCampaignStore(state => state.campaigns);

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">All Campaigns</h1>
      <ul className="list-none p-0 text-center">
        {campaigns.map((campaign, index) => (
          <li key={index} className="mb-4">
            <Link to={`/campaign-details/${campaign.name}`} className="text-lg text-blue-500">
              {campaign.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignsList;
