
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
          <div>
            <h4>Address</h4>
            <p>1234 Main Street Block-C</p>
            <p>Delhi-110092</p>
            <p>India</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>info@annabank.com</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>+91 23456 78901</p>
            <p>+91 88459 25744</p>
          </div>
        </div>
        <p>© 2023 Anna Bank. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
