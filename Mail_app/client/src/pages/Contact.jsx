import React, { useState } from 'react';
import EmailForm from '../components/EmailForm';
import { motion } from 'framer-motion';
import GridPattern from '@/components/magicui/grid-pattern';
import TypingAnimation from '@/components/magicui/typing-animation';
import ChatBot from '@/components/ChatBot';
import { Helmet } from 'react-helmet-async';

function Contact() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topicDescription, setTopicDescription] = useState('');

  const handleTopicChange = (event) => {
    const { value } = event.target;
    setSelectedTopic(value);

    let description = '';
    switch (value) {
      case 'support':
        description = 'Need help with technical issues? Our support team is here to assist you with any problems you may encounter. Reach out via email or phone during our business hours for prompt and professional assistance. Your satisfaction is our priority.';
        break;
      case 'account':
        description = 'If you have any issues accessing your account, please let us know.';
        break;
      default:
        description = 'For any additional queries, please email us or start a chat for immediate assistance';
    }

    setTopicDescription(description);
  };

  return (

    <motion.div className="relative min-h-screen"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Mail Vista - Contact  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>

      <GridPattern className="absolute inset-0 z-0" patternColor="white" />
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <TypingAnimation
            className="text-4xl font-bold"
            text="Contact Us"
          />
        </h1>
        <p className="text-lg mb-6 text-center">
          <TypingAnimation
            className="text-lg"
            text="For any inquiries or assistance, please select a topic and fill out the form below."
          />
        </p>

        <div className="mb-6">
          <label htmlFor="topic" className="block text-lg mb-2">Topic</label>
          <select
            name="topic"
            id="topic"
            className="w-full p-2 rounded text-black"
            value={selectedTopic}
            onChange={handleTopicChange}
          >
            <option value="">Please select a topic</option>
            <option value="support">Technical Support</option>
            <option value="account">Account Access</option>
          </select>
        </div>

        {topicDescription && (
          <p className="mb-6 text-lg">{topicDescription}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1 flex flex-col">
            <EmailForm />
          </div>
          <div className="md:col-span-1 flex flex-col">
            <div className="hidden md:block mb-4">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-5795988-4849052.png?f=webp"
                alt="Contact Illustration"
                className="w-sm h-auto rounded"
              />
            </div>
            <div className="flex-1">
              <iframe
                title="Google Map"
                className="w-full h-full rounded"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCZS_5kDhDp5up6rw52TNFfGqelZZMtBDs&q=Delhi,India"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </motion.div>
  );
}

export default Contact;
