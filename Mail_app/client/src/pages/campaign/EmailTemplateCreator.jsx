import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from '../../services/helper';
import GridPattern from '@/components/magicui/grid-pattern';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Helmet } from 'react-helmet-async';

const EmailTemplateCreator = () => {
  const location = useLocation();
  const emailEditorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (editorLoaded) {
      onLoad();
      if (window.innerWidth < 768) {
        toast.info('Edit on desktop for best experience');
      }
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
      emailEditorRef.current.editor.loadDesign({});
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
    const userId = user.id;
    const token = await getToken(); 

    if (!from || !to || !subject || !campaignName || !userId) {
      toast.error('Missing required data');
      return;
    }

    try {
      const { html, design } = await exportHtml();

      await axios.post(
        `${API_URL}/api/temp-email`,
        {
          from,
          to,
          subject,
          campaignName,
          htmlContent: html || '<p>Default email content goes here.</p>',
          design: JSON.stringify(design),
          recipients: to.split(',').map((email) => email.trim()),
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      toast.success('Email sent successfully');
    } catch (error) {
      toast.error('Error sending email');
    }
  };

  const scheduleEmail = async () => {
    const { from, to, subject, campaignName } = location.state || {};
    const userId = user.id;
    const token = await getToken(); 

    if (!from || !to || !subject || !campaignName || !userId) {
      toast.error('Missing required data');
      return;
    }

    try {
      const { html, design } = await exportHtml();

      await axios.post(
        `${API_URL}/api/temp-email`,
        {
          from,
          to,
          subject,
          campaignName,
          htmlContent: html || '<p>Default email content goes here.</p>',
          design: JSON.stringify(design),
          recipients: to.split(',').map((email) => email.trim()),
          scheduledDate,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      toast.success('Email scheduled successfully');
      setScheduleDialogOpen(false);
    } catch (error) {
      toast.error('Error scheduling email');
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
      const prompt = `Generate an email template content paragraph at least 80 words on ${subject}.`;
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
    <div className="relative min-h-screen">
      <Helmet>
        <title>Mail Vista - Editor  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <div className="absolute inset-0 z-0">
        <GridPattern />
      </div>
      <div className="relative z-10 min-h-screen px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Email Template Editor</h1>
        <div className="mb-4 flex justify-center items-center">
          <div id="email-editor-container">
            <EmailEditor
              ref={emailEditorRef}
              onLoad={handleEditorLoad}
              minHeight="70vh"
              className="w-full"
              options={{
                appearance: {
                  theme: 'modern_dark',
                  panels: {
                    tools: {
                      dock: 'left',
                    },
                  },
                },
                features: {
                  imageEditor: false,
                  undoRedo: true,
                },
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={saveDesign}
            variant="contained"
            startIcon={<SaveIcon />}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 font-bold rounded-md"
          >
            Save Design
          </Button>
          <Button
            onClick={sendEmail}
            variant="contained"
            startIcon={<SendIcon />}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 font-bold rounded-md"
          >
            Send Email
          </Button>
          <Button
            onClick={generateEmailContent}
            variant="contained"
            startIcon={<PsychologyIcon />}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md text-white"
          >
            Generate Email Content
          </Button>
          <Button
            onClick={() => setScheduleDialogOpen(true)}
            variant="contained"
            startIcon={<ScheduleIcon />}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 font-bold rounded-md"
          >
            Schedule Email
          </Button>
        </div>

        {generatedContent && (
          <div className="mt-8 flex flex-col space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Generated Email Content:</h2>
              <Button
                onClick={copyToClipboard}
                variant="contained"
                startIcon={<ContentCopyIcon />}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 font-bold rounded-md"
              >
                Copy Content
              </Button>
            </div>
            <div
              className="bg-opacity-80 bg-black text-white p-4 rounded-lg font-bold"
              style={{ whiteSpace: 'pre-line' }}
            >
              {generatedContent}
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
              className="w-full p-2 mt-4 text-center border-2 border-yellow-500 rounded-md"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={scheduleEmail}>Schedule</Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </div>
    </div>
  );
};

export default EmailTemplateCreator;
