import React from 'react';
import EmailForm from '../components/EmailForm';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div className="bg-gradient-to-br from-black to-purple-900 min-h-screen text-white"
      initial={{ opacity: 10, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 md:px-8">
        <div className="md:flex md:flex-col justify-center">
          <div className="md:px-4 md:py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">
              For any inquiries or assistance, please feel free to contact call us but  Sorry i forgot my phone number 🤯
            </p>
            <div className="md:w-fit">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-5795988-4849052.png?f=webp"
                alt="Contact Image"
                className="w-min h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-center md:items-center">
          <motion.div className="mx-auto max-w-lg"
          >

            <EmailForm />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
