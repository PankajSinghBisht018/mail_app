import React, { useRef } from 'react';
import { Container, Typography, Box, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GridPattern from '@/components/magicui/grid-pattern';
import { motion } from 'framer-motion';
import create from '../images/create.png';
import choose from '../images/choose.png';
import form from '../images/form.png';
import select from '../images/select.png';
import sendtemplate from '../images/sendtemplate.png';
import gotocampaign from '../images/gotocampaign.png';
import login from '../images/login.png';
import videoGuide from '../videos/guide.mp4';
import { Helmet } from 'react-helmet-async';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
    h3: {
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    h4: {
      fontWeight: 'bold',
      marginTop: '30px',
      marginBottom: '0.5rem',
    },
    body1: {
      lineHeight: 1.8,
      marginBottom: '1rem',
    },
  },
});

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const GettingStarted = () => {
  const loginRef = useRef(null);
  const campaignRef = useRef(null);
  const createCampaignRef = useRef(null);
  const fillFormRef = useRef(null);
  const templatesRef = useRef(null);
  const selectTemplateRef = useRef(null);
  const sendTemplateRef = useRef(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 60,
      behavior: 'smooth',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
        <Helmet>
          <title>Mail Vista - Getting Started  </title>
          <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
        </Helmet>
        <GridPattern />

        {!isMobile && (
          <Box
            sx={{
              width: '240px',
              position: 'sticky',
              top: 0,
              height: '100vh',
              bgcolor: 'white',
              p: 2,
              boxShadow: 1,
              overflowY: 'auto',
              zIndex: 1,
              borderRight: '1px solid #ddd',
              '& ul': {
                paddingLeft: 0,
              },
              '& li': {
                cursor: 'pointer',
                marginBottom: '10px',
                transition: 'color 0.3s, background-color 0.3s',
                '&:hover': {
                  color: '#000',
                  backgroundColor: '#fdfa72',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  padding: '2px 4px',
                },
              },
            }}
          >
            <Typography variant="h4" gutterBottom>
              Content
            </Typography>
            <ul>
              <li onClick={() => scrollToSection(loginRef)}>Login With Your Account</li>
              <li onClick={() => scrollToSection(campaignRef)}>Go To Campaign</li>
              <li onClick={() => scrollToSection(createCampaignRef)}>Create Your Campaign</li>
              <li onClick={() => scrollToSection(fillFormRef)}>Fill The Campaign Form</li>
              <li onClick={() => scrollToSection(templatesRef)}>Choose Your Templates</li>
              <li onClick={() => scrollToSection(selectTemplateRef)}>Select Your Template</li>
              <li onClick={() => scrollToSection(sendTemplateRef)}>Send Your Template</li>
            </ul>
          </Box>
        )}

        <Container maxWidth="md" sx={{ py: 1, position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h3" align="left" sx={{ paddingTop: '5vh' }} gutterBottom>
              Getting Started with Mail Vista
            </Typography>

            <Typography variant="body1" align="left" gutterBottom>
              Our platform helps you manage and communicate with your clients, customers, and other interested parties. We focus on effective contact management, beautifully designed emails, automated workflows, and data analysis. Ready to get started?
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" align="left" gutterBottom>
                Watch Our Video Guide
              </Typography>
              <motion.video
                width="100%"
                controls
                variants={animationVariants}
                initial="hidden"
                animate="visible"
                sx={{ maxWidth: '100%', height: 'auto' }}
              >
                <source src={videoGuide} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            </Box>

            <Typography variant="h4" align="left" gutterBottom>
              Roadmap
            </Typography>
            <ul className="list-disc list-inside text-left">
              <li>Login With Your Account</li>
              <li>Go To Campaign</li>
              <li>Create Your Campaign</li>
              <li>Fill The Campaign Form</li>
              <li>Choose Your Templates</li>
              <li>Select Your Template</li>
              <li>Send Your Template</li>
            </ul>
          </motion.div>

          <div ref={loginRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Login With Your Account
              </Typography>
              <Typography variant="body1" align="left">
                When you sign up for a Mail Vista account, you'll enter your name and email address, and we'll send you an activation email. Click the link in the activation email to activate your account.
              </Typography>
              <Typography variant="body1" align="left">
                The next time you log in, we'll guide you through the setup steps, including inputting your profile details and connecting your social media accounts. If you sell products online, you'll have the option to connect your store to Mail Vista.
              </Typography>
              <Typography variant="body1" align="left">
                To learn more about account creation, read the article Create an Account. We provide the best authentication using Clerk to ensure secure access to your Mail Vista account.
              </Typography>
              <motion.img
                src={login}
                alt="Login"
                style={{ width: '40%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>

          <div ref={campaignRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Go To Campaign
              </Typography>
              <Typography variant="body1" align="left">
                Navigate to the campaign section to start setting up your marketing campaigns. Here you can access campaign management tools and settings.
              </Typography>
              <motion.img
                src={gotocampaign}
                alt="Go To Campaign"
                style={{ width: '100%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>

          <div ref={createCampaignRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Create Your Campaign
              </Typography>
              <Typography variant="body1" align="left">
                Follow these steps to create a new campaign:
              </Typography>
              <ol className="list-decimal list-inside text-left">
                <li>Click the Create Campaign button.</li>
                <li>Select the type of campaign you want to create.</li>
                <li>Fill out the required details.</li>
                <li>Choose Template Option.</li>
                <li>Save and review your campaign.</li>
              </ol>
              <motion.img
                src={create}
                alt="Create Campaign"
                style={{ width: '40%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>

          <div ref={fillFormRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Fill The Campaign Form
              </Typography>
              <Typography variant="body1" align="left">
                Complete the campaign form with the necessary information to finalize your campaign setup, including campaign name, subject, and recipient details.
              </Typography>
              <motion.img
                src={form}
                alt="Fill The Campaign Form"
                style={{ width: '50%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>

          <div ref={templatesRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Choose Your Template Option
              </Typography>
              <Typography variant="body1" align="left">
                Choose whether you want to create a custom template using the drag-and-drop builder or modify an existing template. Use the builder for fast and easy design adjustments.
              </Typography>
              <motion.img
                src={choose}
                alt="Choose Templates"
                style={{ width: '50%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>

          <div ref={selectTemplateRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Select Your Template
              </Typography>
              <Typography variant="body1" align="left">
                Select the template you want to use for your campaign from the available options.
              </Typography>
              <motion.img
                src={select}
                alt="Select Your Template"
                style={{ width: '100%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>

          <div ref={sendTemplateRef}>
            <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h4" align="left" gutterBottom>
                Send Your Template
              </Typography>
              <Typography variant="body1" align="left">
                Send the selected template to your clients or customers by clicking the Send button. You also have the option to schedule the email to be sent at a later time. Additionally, our AI-powered tools can enhance the content of your email to make it more effective and engaging.
              </Typography>
              <motion.img
                src={sendtemplate}
                alt="Send Your Template"
                style={{ width: '100%', height: 'auto', marginTop: '1rem', border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
                variants={animationVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GettingStarted;
