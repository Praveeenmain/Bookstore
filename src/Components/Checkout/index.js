import React, { useState, useContext } from 'react';
import CartContext from '../../Context/cartcontext';
import emailjs from 'emailjs-com';
import './index.css';

import ReactPopUp from '../popup';

const Checkout = () => {
  const { cartList, totalamount } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_city: '',
    payment_method: 'cash_on_delivery',
    user_address_line1:'',
    user_postal_code:'',
    total_amount: totalamount || 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

 
    const formattedItems = cartList.map(item => `- ${item.title} - Quantity: ${item.quantity} - Price: $${item.price}`).join('\n');
    
  
    emailjs.send('service_i2xdtbu', 'template_285ebj9', {
        user_name: userData.user_name,
        user_email:userData.user_email,
        user_phone:userData.user_phone,
        user_city:userData.user_city,
        user_address_line1:userData.user_address_line1,
        payment_method:userData.payment_method,
        total_amount: userData.total_amount,
        user_postal_code:userData.user_postal_code,
        formatted_items: formattedItems,

      } , 'RmjVB85P2sqtDPNJc')
      .then((response) => {
        console.log('Email sent!', response.status, response.text);
        if (response.status===200){
            setShowPopup(true);
        }
       
      })
      .catch((error) => {
        console.error('Email error:', error);
      
      });
  };
  function convertToINR(usdPrice) {
    const priceWithoutSymbol = parseFloat(usdPrice.substring(1));
    return  Math.round(priceWithoutSymbol)*80
 
  }
  return (
    
        showPopup ? <ReactPopUp/> :( <div className="checkout-container">
        <h2>Checkout</h2>
  
        <div className="cart-items">
          <h3>Your Cart Items:</h3>
          <ul>
            {cartList.map((item) => (
              <li key={item.id}>
                {item.title} - Quantity: {item.quantity} - Price:Rs.{convertToINR(item.price)}
              </li>
            ))}
          </ul>
        </div>
  
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="user_name" value={userData.user_name} onChange={handleInputChange} />
          </div>
         
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="user_email" value={userData.user_email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" name="user_phone" value={userData.user_phone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="user_address_line1" value={userData.user_address_line1} onChange={handleInputChange} />
          </div>
          
          <div className="form-group">
            <label>City:</label>
            <input type="text" name="user_city" value={userData.user_city} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>PinCode:</label>
            <input type="text" name="user_postal_code" value={userData.user_postal_code} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="user_country" value={userData.user_country} onChange={handleInputChange} />
          </div>
  
          <div className="form-group">
            <label>Total Amount</label>
            <input type="text" name="total_amount" value={userData.total_amount} readOnly />
          </div>
  
          <div className="form-group">
            <label>Payment Method</label>
            <select name="payment_method" value={userData.payment_method} onChange={handleInputChange}>
         
              <option value="cash_on_delivery">Cash on Delivery</option>
            
            </select>
          </div>
  
          <button type="submit" className="order-button">
            Order
          </button>
        </form>
      </div>)
    
   
  );
};

export default Checkout;