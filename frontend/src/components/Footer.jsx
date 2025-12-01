import React from "react";
import logo from "../images/logo.png"
const Footer = () => {
  return (
    <footer className="bg-[#CC2405] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Logo and Brand */}
        <div className="flex space-y-2 gap-2">
            <img className="w-10 h-10" src={logo} alt="" />
            <div className="flex flex-col">

          <h2 className="text-2xl font-bold tracking-widest">FitDish</h2>
          <p className="max-w-xs text-gray-200">
            Your ultimate companion for healthy recipes and diet plans.
          </p>
            </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-200">
            <a
              href="https://facebook.com/fitdish"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <svg
                fill="currentColor"
                stroke="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 17 22 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/fitdish"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <svg
                fill="currentColor"
                stroke="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.09 9.09 0 01-2.88 1.1 4.52 4.52 0 00-7.72 4.13 12.82 12.82 0 01-9.3-4.72 4.48 4.48 0 001.39 6.05 4.48 4.48 0 01-2.05-.57v.06a4.53 4.53 0 003.62 4.44 4.52 4.52 0 01-2.04.08 4.53 4.53 0 004.23 3.14 9 9 0 01-5.6 1.93c-.36 0-.71-.02-1.06-.06A12.78 12.78 0 007 21c8.32 0 12.87-6.9 12.87-12.87 0-.2 0-.42-.02-.62A9.22 9.22 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/fitdish"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <svg
                fill="currentColor"
                stroke="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm3.5-2.5a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p>Email: support@fitdish.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} FitDish. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
