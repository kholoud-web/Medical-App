import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const linkClass =
    "hover:text-white transition-colors duration-200";

  return (
    <footer className="bg-[#0A1F44] text-gray-300 py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <img src="./logo.svg" alt="Logo" className="h-16 w-auto" />
          <p className="text-sm">
            Your trusted platform for quality healthcare services and connecting
            with verified doctors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink to="/" className={linkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/services" className={linkClass}>Services</NavLink>
            </li>
            <li>
              <NavLink to="/find-doctor" className={linkClass}>Find Doctor</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>About</NavLink>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink to="/faq" className={linkClass}>FAQ</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy" className={linkClass}>
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className={linkClass}>
                Terms of Service
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-2">Contact Info</h4>
          <p className="text-sm">support@diagnosis.com</p>
          <p className="text-sm">+1 (555) 123-4567</p>
          <p className="text-sm">
            123 Medical Ave, Suite 100
            <br />
            New York, NY 10001
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} Diagnosis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
