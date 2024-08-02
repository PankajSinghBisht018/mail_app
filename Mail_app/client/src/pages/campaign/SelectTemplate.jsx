import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/services/helper';

const SelectTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, subject, campaignName } = location.state || {};
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/templates`);
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleSelectTemplate = (template) => {
    let parsedDesign;
    try {
      parsedDesign = JSON.parse(template.design);
    } catch (error) {
      console.error('Invalid JSON format in template design:', error);
      return; 
    }

    navigate('/create-template', {
      state: {
        design: parsedDesign, 
        from,
        to,
        subject,
        campaignName,
      },
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
      </div>
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Select a Template</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {templates.map((template) => (
            <div
              key={template._id}
              className="bg-white text-black rounded-lg shadow-lg cursor-pointer w-full max-w-xs md:max-w-sm lg:max-w-md flex flex-col"
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="flex-1 flex flex-col p-4">
                {template.imageUrl && (
                  <img
                    src={template.imageUrl} 
                    alt={template.name}
                    className="mb-4 w-full h-56 object-cover rounded-lg"
                  />
                )}
                <h2 className="text-xl font-bold mb-4">{template.name}</h2>
                <div className="mt-auto">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md w-full"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    Select Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;
