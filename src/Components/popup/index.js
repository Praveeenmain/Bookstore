import React from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom'; // Import Link from your routing library
import 'reactjs-popup/dist/index.css';
import './index.css';

const ReactPopUp = () => (
  <div className="popup-container">
    <Popup
      trigger={
        <button className="trigger-button" type="button">
           Order Status
        </button>
      }
    >
      <div>
        <p> Your order is successfully recieved</p>
        <Link to="/">Home</Link> 
      </div>
    </Popup>
  </div>
);

export default ReactPopUp;
