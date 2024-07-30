import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { light, shadesOfPurple } from '@clerk/themes';
import App from './App';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPublishableKey}
    appearance={{
    baseTheme: light,
    signIn: { baseTheme: shadesOfPurple },
    signUp: { baseTheme: shadesOfPurple }
  }}>
    <App />
  </ClerkProvider>
);
