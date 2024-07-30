import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, YouTube, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-600 to-yellow-800 p-6 text-white">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-gray-200" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="https://twitter.com" className="hover:text-gray-200" aria-label="Twitter">
              <Twitter />
            </a>
            <a href="https://instagram.com" className="hover:text-gray-200" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="https://youtube.com" className="hover:text-gray-200" aria-label="YouTube">
              <YouTube />
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-200" aria-label="LinkedIn">
              <LinkedIn />
            </a>
            <a href="https://gmail.com" className="hover:text-gray-200" aria-label="Email">
              <Email />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4">Products</h3>
          <ul>
            <li><Link to="" className="hover:underline">Why Us?</Link></li>
            <li><Link to="" className="hover:underline">Product Updates</Link></li>
            <li><Link to="" className="hover:underline">Email Marketing</Link></li>
            <li><Link to="" className="hover:underline">Websites</Link></li>
            <li><Link to="" className="hover:underline">Transactional Email</Link></li>
            <li><Link to="" className="hover:underline">How We Compare</Link></li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4">Community</h3>
          <ul>
            <li><Link to="" className="hover:underline">Agencies & Freelancers</Link></li>
            <li><Link to="" className="hover:underline">Developers</Link></li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4">Help</h3>
          <ul>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/feedback" className="hover:underline">Feedback</Link></li>
          </ul>
        </div>
      </div>

      <div className="p-4 text-center text-sm ">
        &copy; {new Date().getFullYear()} Mail App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
