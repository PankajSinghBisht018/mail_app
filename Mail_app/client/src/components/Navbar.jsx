import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { checkRole } from '../utils/roles';
import { useAuth } from '@clerk/clerk-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      <nav className="bg-gradient-to-l from-pink-100 to-purple-600 p-4 flex justify-between items-center shadow-lg">
        <div className="text-white text-2xl font-bold">Mail App</div>
        <div className="hidden md:flex space-x-8">
          <SignedIn>
            <Link to="/" className="text-purple-900 text-xl font-bold hover:underline">Home</Link>
            <Link to="/contact" className="text-purple-900 text-xl font-bold hover:underline">Contact</Link>
            <Link to="/campaign" className="text-purple-900 text-xl font-bold hover:underline">Campaign</Link>
            <Link to="/pricing" className="text-purple-900 text-xl font-bold hover:underline">Pricing</Link>
            <Link to="/features" className="text-purple-900 text-xl font-bold hover:underline">Features</Link>
            <Link to="/cart" className="text-purple-900 text-xl font-bold hover:underline">Cart</Link>
            {isLoaded && isSignedIn && checkRole('admin') && <Link to="/admin" className="text-purple-900 text-xl font-bold hover:underline">Admin</Link>}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white text-blue-500 hover:bg-gray-100 px-4 py-2 rounded shadow">Login</button>
            </SignInButton>
          </SignedOut>
        </div>
        <div className="md:hidden">
          <Button icon="pi pi-bars" className="p-button-rounded p-button-text" onClick={() => setVisible(true)} />
        </div>
      </nav>

      <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" className="bg-gradient-to-l from-pink-100 to-purple-600 text-white text-lg font-bold">
        <div className="flex flex-col space-y-4">
          <SignedIn>
            <Link to="/" className="font-bold hover:underline" onClick={() => setVisible(false)}>Home</Link>
            <Link to="/contact" className="font-bold hover:underline" onClick={() => setVisible(false)}>Contact</Link>
            <Link to="/campaign" className="font-bold hover:underline" onClick={() => setVisible(false)}>Campaign</Link>
            <Link to="/pricing" className="font-bold hover:underline" onClick={() => setVisible(false)}>Pricing</Link>
            <Link to="/features" className="font-bold hover:underline" onClick={() => setVisible(false)}>Features</Link>
            {isLoaded && isSignedIn && checkRole('admin') && <Link to="/admin" className="font-bold hover:underline" onClick={() => setVisible(false)}>Admin</Link>}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded shadow w-full" onClick={() => setVisible(false)}>Login</button>
            </SignInButton>
          </SignedOut>
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;
