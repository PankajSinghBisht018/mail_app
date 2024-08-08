import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/services/helper';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>Mail Vista - Templates  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <div className="absolute inset-0 z-0"></div>
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Select a Template</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div
              key={template._id}
              className="bg-white text-black rounded-lg shadow-lg cursor-pointer w-full flex flex-col transition-transform transform hover:scale-105"
              onClick={() => handleSelectTemplate(template)}
            >
              {template.imageUrl && (
                <div className="flex-1">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-2">{template.name}</h2>
                <button
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md w-full"
                  onClick={() => handleSelectTemplate(template)}
                >
                  Select Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;
