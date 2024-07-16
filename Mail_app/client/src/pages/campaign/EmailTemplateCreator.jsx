import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import sample from './savefile.json';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SendIcon from '@mui/icons-material/Send';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmailTemplateCreator = () => {
  const location = useLocation();
  const emailEditorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(new Date());

  useEffect(() => {
    if (editorLoaded) {
      onLoad();
    }
  }, [editorLoaded]);

  const handleEditorLoad = () => {
    setEditorLoaded(true);
  };

  const onLoad = () => {
    const { state } = location;
    if (state && state.design) {
      emailEditorRef.current.editor.loadDesign(state.design);
    } else {
      emailEditorRef.current.editor.loadDesign(sample);
    }
  };

  const exportHtml = () => {
    return new Promise((resolve, reject) => {
      if (emailEditorRef.current && emailEditorRef.current.editor) {
        emailEditorRef.current.editor.exportHtml((data) => {
          if (data) {
            const { html, design } = data;
            resolve({ html, design });
          } else {
            reject(new Error('Failed to export HTML'));
          }
        });
      } else {
        reject(new Error('Email editor is not ready.'));
      }
    });
  };

  const saveDesign = () => {
    if (emailEditorRef.current && emailEditorRef.current.editor) {
      emailEditorRef.current.editor.saveDesign((design) => {
        console.log('Saved Design:', JSON.stringify(design, null, 2));
        toast.success('Design JSON has been logged in your developer console.');
      });
    } else {
      console.error('Email editor is not ready.');
      toast.error('Email editor is not ready.');
    }
  };

  const sendEmail = async () => {
    const { from, to, subject, campaignName } = location.state || {};

    if (!from || !to || !subject || !campaignName) {
      console.error('Missing required data (from, to, subject, campaignName)');
      toast.error('Missing required data (from, to, subject, campaignName)');
      return;
    }

    try {
      const { html, design } = await exportHtml();

      axios.post('http://localhost:8000/api/temp-email', {
        from,
        to,
        subject,
        campaignName,
        htmlContent: html || '<p>Default email content goes here.</p>',
        design: JSON.stringify(design),
        recipients: to.split(',').map((email) => email.trim()),
      })
        .then((response) => {
          console.log('Email sent successfully', response);
          toast.success('Email sent successfully');
        })
        .catch((error) => {
          console.error('Error sending email', error);
          toast.error('Error sending email');
        });
    } catch (error) {
      console.error('Error exporting HTML', error);
      toast.error('Error exporting HTML');
    }
  };

  const scheduleEmail = async () => {
    const { from, to, subject, campaignName } = location.state || {};

    if (!from || !to || !subject || !campaignName) {
      console.error('Missing required data (from, to, subject, campaignName)');
      toast.error('Missing required data (from, to, subject, campaignName)');
      return;
    }

    try {
      const { html, design } = await exportHtml();

      axios.post('http://localhost:8000/api/temp-email', {
        from,
        to,
        subject,
        campaignName,
        htmlContent: html || '<p>Default email content goes here.</p>',
        design: JSON.stringify(design),
        recipients: to.split(',').map((email) => email.trim()),
        scheduledDate,
      })
        .then((response) => {
          console.log('Email scheduled successfully', response);
          toast.success('Email scheduled successfully');
          setScheduleDialogOpen(false);
        })
        .catch((error) => {
          console.error('Error scheduling email', error);
          toast.error('Error scheduling email');
        });
    } catch (error) {
      console.error('Error exporting HTML', error);
      toast.error('Error exporting HTML');
    }
  };

  const generateEmailContent = async () => {
    const { subject } = location.state || {};

    if (!subject) {
      toast.error('Subject is missing');
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyAZDaf7usmQ7am6FfWC7J367UKFLalBqUo');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Generate a email template content paragraph aleast 80 words on ${subject}.`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = response.text();
      text = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      setGeneratedContent(text);
    } catch (error) {
      console.error('Error generating email content:', error);
      toast.error('Error generating email content');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      toast.success('Content copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast.error('Could not copy text');
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Email Template Editor</h1>
      <div className="mb-4 flex justify-center items-center">
        <EmailEditor ref={emailEditorRef} onLoad={handleEditorLoad} minHeight="70vh" />
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={saveDesign}
          variant="contained"
          startIcon={<SaveIcon />}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
        >
          Save Design
        </Button>
        <Button
          onClick={sendEmail}
          variant="contained"
          startIcon={<SendIcon />}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
        >
          Send Email
        </Button>
        <Button
          onClick={generateEmailContent}
          variant="contained"
          startIcon={<PsychologyIcon />}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
        >
          Generate Email Content
        </Button>
        <Button
          onClick={() => setScheduleDialogOpen(true)}
          variant="contained"
          startIcon={<ScheduleIcon />}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
        >
          Schedule Email
        </Button>
      </div>

      {generatedContent && (
        <div className="mt-8 flex flex-col space-y-5">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4 text-left">Generated Email Content:</h2>
            <Button
              onClick={copyToClipboard}
              variant="contained"
              startIcon={<ContentCopyIcon />}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
            >
              Copy Content
            </Button>
          </div>
          <div
            className="bg-opacity-80 bg-black text-white p-4 rounded-lg font-bold min-h-fit"
            style={{ whiteSpace: 'pre-line' }}
          >
            <p>{generatedContent}</p>
          </div>
        </div>
      )}

      <Dialog open={scheduleDialogOpen} onClose={() => setScheduleDialogOpen(false)}>
        <DialogTitle>Schedule Email</DialogTitle>
        <DialogContent>
          <DatePicker
            selected={scheduledDate}
            onChange={(date) => setScheduledDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialogOpen(false)} variant='contained' className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white">
            Cancel
          </Button>
          <Button onClick={scheduleEmail} variant='contained' className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default EmailTemplateCreator;
