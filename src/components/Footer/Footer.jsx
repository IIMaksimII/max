
import React from 'react';

import './footer.css';

const Footer = () => {
    return (
        <footer className="dark-footer">
          <div className="container">
           
            
            
          </div>
          <hr /> {/* Разделительная линия */}
          <div className="horizontal-container">
            <div className="social-media">
              <span>VK</span>
              <span>Telegram</span>
              <span>YouTube</span>
            </div>
            <div className="payment-systems">
              <span>Visa</span>
              <span>Мир</span>
            </div>
          </div>
        </footer>
      );
    };
  
  export default Footer;