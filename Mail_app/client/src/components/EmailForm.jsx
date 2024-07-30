import React, { useState, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { API_URL } from '../services/helper';

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    sender: '',
    recipient: '',
    cc: '',
    bcc: '',
    scheduleDate: null,
  });

  const { user } = useUser();
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendNow = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/send-email`, {
        ...emailData,
        sender: user ? user.primaryEmailAddress : '',
        scheduleDate: null,
      });
      if (response.data.success) {
        showToast('success', 'Success', response.data.message);
        resetForm();
      } else {
        showToast('error', 'Failed to send email', response.data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showToast('error', 'Failed to send email');
    }
  };

  const handleSchedule = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/send-email`, emailData);
      if (response.data.message) {
        showToast('success', 'Success', response.data.message); 
        resetForm();
      } else {
        showToast('error', 'Failed to schedule email', response.data.message || 'Failed to schedule email');
      }
    } catch (error) {
      console.error('Error scheduling email:', error);
      showToast('error', 'Failed to schedule email');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailData.scheduleDate) {
      handleSchedule();
    } else {
      handleSendNow();
    }
  };

  const resetForm = () => {
    setEmailData({
      subject: '',
      body: '',
      sender: user ? user.primaryEmailAddress : '', 
      recipient: '',
      cc: '',
      bcc: '',
      scheduleDate: null,
    });
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-2xl space-y-4 mt-10 text-black mb-4">
      <h1 className="text-xl font-bold text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="subject" className="w-20 font-semibold text-gray-600">Subject:</label>
          <span className="p-float-label flex-1">
            <InputText id="subject" name="subject" value={emailData.subject} onChange={handleChange} className="w-full border-4" />
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="recipient" className="w-20 font-semibold text-gray-600">Recipient:</label>
          <span className="p-float-label flex-1">
            <InputText id="recipient" name="recipient" value={emailData.recipient} onChange={handleChange} className="w-full border-4" />
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="body" className="w-20 font-semibold text-gray-600">Body:</label>
          <span className="p-float-label flex-1">
            <InputTextarea id="body" name="body" value={emailData.body} onChange={handleChange} rows={5} className="w-full border-4" style={{ fontSize: '24px' }} />
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="sender" className="w-20 font-semibold text-gray-600">Sender:</label>
          <span className="p-float-label flex-1">
            <InputText id="sender" name="sender" value={user ? user.primaryEmailAddress : ''} readOnly className="w-full border-4" />
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="cc" className="w-20 font-semibold text-gray-600">CC:</label>
          <span className="p-float-label flex-1">
            <InputText id="cc" name="cc" value={emailData.cc} onChange={handleChange} className="w-full border-4" />
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="bcc" className="w-20 font-semibold text-gray-600">BCC:</label>
          <span className="p-float-label flex-1">
            <InputText id="bcc" name="bcc" value={emailData.bcc} onChange={handleChange} className="w-full border-4" />
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="scheduleDate" className="w-20 font-semibold text-gray-600">Schedule:</label>
          <span className="p-float-label flex-1">
            <Calendar id="scheduleDate" name="scheduleDate" value={emailData.scheduleDate} onChange={handleChange} showTime showSeconds className="w-full border-4" placeholder="Select Schedule Date & Time" />
          </span>
        </div>
        <div className="flex space-x-4">
          <Button 
            label="Send Now" 
            icon="pi pi-check" 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-yellow-100 rounded-md pr-4 pl-4 hover:from-yellow-400 hover:to-yellow-300"
          />
          <Button 
            label="Schedule Email" 
            icon="pi pi-calendar" 
            type="button" 
            onClick={handleSchedule} 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-yellow-100 rounded-md pr-4 pl-4 hover:from-yellow-400 hover:to-yellow-300"
          />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default EmailForm;
