import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';

function Features() {
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };
  return (
    <motion.div
      className="bg-gradient-to-br from-black to-purple-900 min-h-screen py-4 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Our Email Template Service</h2>
          <p className="text-lg text-white mb-8">
            Enhance your email marketing with our comprehensive email template service.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <Card className="p-4 shadow-lg rounded-lg bg-white text-gray-900">
            <motion.i
              className="pi pi-envelope text-3xl text-primary mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            ></motion.i>
            <h3 className="text-xl font-bold mb-2">Email Templates</h3>
            <p className="text-base mb-4">
              Choose from a variety of professionally designed email templates to suit your needs.
            </p>
            <Button label="Learn More" className="p-button-primary" />
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white text-gray-900">
            <motion.i
              className="pi pi-check-circle text-3xl text-primary mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            ></motion.i>
            <h3 className="text-xl font-bold mb-2">Easy Integration</h3>
            <p className="text-base mb-4">
              Seamlessly integrate our email template service with your existing applications.
            </p>
            <Button label="Learn More" className="p-button-primary" />
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white text-gray-900">
            <motion.i
              className="pi pi-lock text-3xl text-primary mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            ></motion.i>
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-base mb-4">
              Ensure your emails are sent securely with our robust and reliable platform.
            </p>
            <Button label="Learn More" className="p-button-primary" />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Features;
