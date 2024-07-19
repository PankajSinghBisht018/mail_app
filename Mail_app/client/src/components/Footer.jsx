import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-purple-600 p-4 py-4 flex justify-center text-purple-950 text-center relative bottom-0 w-full">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Mail App. All rights reserved.
      </p>
      <p>
        <Link to="/feedback" className="hover:underline px-2">
          Feedback us
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
