import React from 'react';
import "./Footer.css";

function Footer() {

    const year = new Date().getFullYear();

  return (
    <div className="footer__container">
        <h5>&copy;{` Matt Urbeck ${year}`}</h5>
    </div>
  )
}

export default Footer