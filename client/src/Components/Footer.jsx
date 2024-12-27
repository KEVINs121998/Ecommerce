import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Contact Section */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="tel:+1234567890" className="flex items-center text-white hover:text-blue-500">
                <FaPhone className="mr-2" /> +1 (234) 567-890
              </a>
              <a href="mailto:support@example.com" className="flex items-center text-white hover:text-blue-500">
                <FaEnvelope className="mr-2" /> support@example.com
              </a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-700"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;