
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} vote cameroon
          </p>
        </div>

    </footer>
  );
};

export default Footer;
