import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Campaign from './pages/campaign/Campaign';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Cart from './components/Cart';
import CampaignForm from './pages/campaign/CampaignForm';
import CampaignsList from './pages/campaign/CampaignList';
import EmailTemplateCreator from './pages/campaign/EmailTemplateCreator';
import SelectTemplate from './pages/campaign/SelectTemplate';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';
import Developer from './pages/Developer';
import ProtectedRoute from './components/ProtectedRoute';
import { SignedIn } from '@clerk/clerk-react';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
        </Routes>
          <SignedIn> 
          <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/campaign-form" element={<CampaignForm />} /> 
          <Route path="/campaign-form/:id" element={<CampaignForm />} />
          <Route path="/all-campaigns" element={<CampaignsList />} />
          <Route path="/create-template" element={<EmailTemplateCreator />} />
          <Route path="/select-template" element={<SelectTemplate />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Admin /></ProtectedRoute>} />
          <Route path="/developer" element={<ProtectedRoute roles={['developer']}><Developer /></ProtectedRoute>} />
        </Routes> 
         </SignedIn>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
