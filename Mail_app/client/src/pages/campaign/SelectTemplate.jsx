import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import templatesData from './savefile.json';
import Template1Image from '../../images/template1.png';
import Template2Image from '../../images/template2.png';
import Template3Image from '../../images/template3.png';
import Template4Image from '../../images/template4.png';

const SelectTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, subject, campaignName } = location.state || {};

  const handleSelectTemplate = (template) => {
    navigate('/create-template', {
      state: {
        design: template.design,
        from,
        to,
        subject,
        campaignName,
      },
    });
  };

  const getImagePath = (imageName) => {
    switch (imageName) {
      case 'template1.png':
        return Template1Image;
      case 'template2.png':
        return Template2Image;
      case 'template3.png':
        return Template3Image;
      case 'template4.png':
        return Template4Image;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Select a Template</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {templatesData.map((template, index) => (
          <div
            key={index}
            className="bg-white text-black rounded shadow cursor-pointer w-80 h-96 flex flex-col"
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="flex-1 flex flex-col p-4">
              {template.imageName && (
                <img
                  src={getImagePath(template.imageName)}
                  alt={template.name}
                  className="mb-4 w-full h-56 object-fill"
                />
              )}
              <h2 className="text-xl font-bold mb-4">{template.name}</h2>
              <div className="mt-auto">
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white px-4 py-2  w-full"
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
  );
};

export default SelectTemplate;
