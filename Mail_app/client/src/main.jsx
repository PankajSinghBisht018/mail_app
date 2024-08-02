import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { light, neobrutalism } from '@clerk/themes';
import App from './App';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const afterSignInUrl = import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPublishableKey}
    signInFallbackRedirectUrl={afterSignInUrl}
    appearance={{
    baseTheme: light,
    signIn: { baseTheme: neobrutalism },
    signUp: { baseTheme: neobrutalism  }
  }}>
    <App />
  </ClerkProvider>
);
