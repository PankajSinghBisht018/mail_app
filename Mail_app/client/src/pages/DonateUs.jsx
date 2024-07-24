import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import logo from './campainglogo.png';
import { API_URL } from '../services/helper';

const validationSchema = Yup.object().shape({
  donationAmount: Yup.number()
    .typeError('Please enter a valid number')
    .required('Donation amount is required'),
  donorName: Yup.string().required('Your name is required'),
  donorEmail: Yup.string().email('Invalid email').required('Your email is required'),
  message: Yup.string(),
  currency: Yup.string().required('Currency select is required'),
});

function DonateUs() {
  const initialValues = {
    donationAmount: '',
    donorName: '',
    donorEmail: '',
    message: '',
    currency: 'INR',
  };

  const currencies = [
    { label: 'INR', value: 'INR' },
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
  ];

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(`${API_URL}/api/donate`, values)
      .then((response) => {
        console.log('Donation successful:', response.data);
        resetForm();
      })
      .catch((error) => {
        console.error('Error donating:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-black to-purple-900 text-white min-h-fit md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-black">
          <div>
            <img src={logo} alt="Campaign Image" className="w-full h-auto rounded-lg" />
          </div>
          <div className="flex flex-col justify-center px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left text-white">Donate Us</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, isValid }) => (
                <Form className="flex flex-col space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-inputgroup"
                  >
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-indian-rupee"></i>
                    </span>
                    <Field as={InputText} name="donationAmount" className="w-full" />
                  </motion.div>
                  <ErrorMessage name="donationAmount" component="div" className="text-red-500" />

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Field as={InputText} name="donorName" className="w-full" />
                    <ErrorMessage name="donorName" component="div" className="text-red-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Field as={InputText} name="donorEmail" className="w-full" type="email" />
                    <ErrorMessage name="donorEmail" component="div" className="text-red-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Field as={InputTextarea} name="message" rows={3} autoResize className="w-full" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Field as={Dropdown} name="currency" options={currencies} placeholder="Select Currency" className="w-full" />
                    <ErrorMessage name="currency" component="div" className="text-red-500" />
                  </motion.div>

                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    disabled={isSubmitting || !isValid}
                    className="p-button p-button-primary p-button-lg self-center md:self-start bg-white rounded-2xl px-4 bg-gradient-to-r from-blue-500 to-purple-600" 
                  >
                    Donate Now
                    <i className="pi pi-heart ml-2"></i>
                  </motion.button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DonateUs;
