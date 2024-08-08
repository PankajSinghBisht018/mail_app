import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import donationImage from '../images/campainglogo.png';
import { API_URL } from '../services/helper';
import GridPattern from '@/components/magicui/grid-pattern';
import Marquee from '@/components/magicui/marquee';
import { CoolMode } from '@/components/magicui/cool-mode';
import { Helmet } from 'react-helmet-async';

const DonateUs = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [latestDonations, setLatestDonations] = useState([]);

  const amounts = [
    { value: 1000, description: 'Support one child for a month' },
    { value: 3000, description: 'Provide meals for ten children for a month' },
    { value: 9000, description: 'Sponsor a classroom for a month' },
    { value: 30000, description: 'Support the entire school for a month' }
  ];

  const currencies = [
    { label: 'INR', value: 'INR' },
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' }
  ];

  const validationSchema = Yup.object().shape({
    donationAmount: Yup.number()
      .typeError('Please enter a valid number')
      .required('Donation amount is required')
      .oneOf(amounts.map(amount => amount.value), 'Select a valid amount'),
    donorName: Yup.string().required('Your name is required'),
    donorEmail: Yup.string().email('Invalid email').required('Your email is required'),
    message: Yup.string(),
    currency: Yup.string().required('Currency is required'),
  });

  useEffect(() => {
    axios.get(`${API_URL}/api/latest-donations`)
      .then(response => {
        setLatestDonations(response.data);
      })
      .catch(error => {
        console.error('Error fetching latest donations:', error);
      });
  }, []);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(`${API_URL}/api/donate`, values)
      .then((response) => {
        console.log('Donation successful:', response.data);
        resetForm();
        setSelectedAmount('');
      })
      .catch((error) => {
        console.error('Error donating:', error.response ? error.response.data : error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="text-center relative">
        <Helmet>
        <title>Mail Vista - Donate   </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <GridPattern className="absolute inset-0 z-0" patternColor="white" />
      <div className="relative z-10">
        <div className="relative">
          <img src="https://www.genyuvaa.com/images/t_slider_1.jpg" alt="Children" className="w-full h-64 object-cover " />
          <h2 className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-2xl font-bold bg-opacity-50 py-4">Your Donation Will Provide...</h2>
        </div>
        <div className="my-8 mx-5 max-w-screen">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <img src={donationImage} alt="Donation" className="w-full h-auto object-cover rounded-lg" />
            </div>
            <div>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-8">
                {amounts.map((amount) => (
                  <motion.div
                    key={amount.value}
                    onClick={() => setSelectedAmount(amount.value)}
                    className={`p-6 cursor-pointer border rounded-lg ${selectedAmount === amount.value ? 'bg-yellow-100 text-black ' : 'bg-white text-black'} hover:bg-gray-200 transition duration-300 ease-in-out`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold">{`₹${amount.value}`}</h3>
                    <p className="text-sm mt-2">{amount.description}</p>
                  </motion.div>
                ))}
              </div>
              <Formik
                initialValues={{
                  donationAmount: selectedAmount,
                  donorName: '',
                  donorEmail: '',
                  message: '',
                  currency: selectedCurrency
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col space-y-4 max-w-md mx-auto text-black">
                    <Field name="donationAmount" type="hidden" />
                    <Field name="donorName" placeholder="Your Name" className="p-3 border rounded-lg w-full" />
                    <ErrorMessage name="donorName" component="div" className="text-red-500" />
                    <Field name="donorEmail" placeholder="Your Email" type="email" className="p-3 border rounded-lg w-full" />
                    <ErrorMessage name="donorEmail" component="div" className="text-red-500" />
                    <Field name="message" as="textarea" rows="3" placeholder="Message (optional)" className="p-3 border rounded-lg w-full" />
                    <div className="my-4 w-full">
                      <label htmlFor="currency" className="block mb-2 text-left">Currency</label>
                      <Field as="select" name="currency" className="p-3 border rounded-lg w-full">
                        {currencies.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="currency" component="div" className="text-red-500" />
                    </div>

                    <CoolMode>
                      <motion.button
                        type="submit"
                        className="p-3 mt-4 bg-yellow-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        disabled={isSubmitting}
                      >
                        Donate Now
                      </motion.button>
                    </CoolMode>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="bg-yellow-400 py-8 mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">Latest Donations</h3>
          <div className="relative w-full overflow-hidden">
            <Marquee className="flex space-x-4">
              {latestDonations.map((donation) => (
                <div key={donation._id} className="bg-yellow-100 text-black p-4 rounded-lg shadow-lg flex items-center space-x-4 flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{donation.donorName[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{donation.donorName}</h4>
                    <p className="text-xs text-gray-500">{`Amount: ${donation.donationAmount} ${donation.currency}`}</p>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateUs;
