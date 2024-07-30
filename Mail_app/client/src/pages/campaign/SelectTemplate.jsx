import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import templatesData from './savefile.json';
import Template1Image from '../../images/template1.png';
import Template2Image from '../../images/template2.png';
import Template3Image from '../../images/template3.png';
import Template4Image from '../../images/template4.png';
import Template5Image from '../../images/template5.png';


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
      case 'template5.png':
        return Template5Image;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
      </div>
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Select a Template</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {templatesData.map((template, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg shadow-lg cursor-pointer w-full max-w-xs md:max-w-sm lg:max-w-md flex flex-col"
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="flex-1 flex flex-col p-4">
                {template.imageName && (
                  <img
                    src={getImagePath(template.imageName)}
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
