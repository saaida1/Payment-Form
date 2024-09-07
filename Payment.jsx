import React, { useState } from 'react';
import './Payment.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Payment = () => {
  const [paymentError, setPaymentError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Collect payment data from form fields
      const formData = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        // Add additional payment data for Stripe
        cardNumber: event.target.cardNumber.value,
        expMonth: event.target.expMonth.value,
        expYear: event.target.expYear.value,
        cvc: event.target.cvc.value,
      };

      // Send payment data to backend API
      const response = await axios.post('http://your-backend-api.com/api/integration/stripe/charge', formData);

      // Handle successful response (e.g., redirect to success page)
      window.location.href = '/SuccessfulPay';
    } catch (error) {
      // Handle error response (e.g., display error message)
      setPaymentError(error.response.data.message);
    }
  };

  return (
    <div className="B">
      <div className="pay-container">
        <h1>Payment Form</h1>
        <p>Please fill out the following form</p>
        <form className="form" id="payment-form" onSubmit={handleSubmit}>
          {/* Form fields */}
          <input className="input" type="text" id="firstName" name="firstName" placeholder="First Name" required />
          <input className="input" type="text" id="lastName" name="lastName" placeholder="Last Name" required />
          <input className="input" type="email" id="email" name="email" placeholder="Email" required />
          <input className="input" type="text" id="cardNumber" name="cardNumber" placeholder="Card Number" required />
          <input className="input" type="text" id="expMonth" name="expMonth" placeholder="Expiration Month" required />
          <input className="input" type="text" id="expYear" name="expYear" placeholder="Expiration Year" required />
          <input className="input" type="text" id="cvc" name="cvc" placeholder="CVC" required />
          
          {/* Submit button */}
          <input className="input" type="submit" value="Submit" />
        </form>

        {/* Display payment error if any */}
        {paymentError && <p className="error">{paymentError}</p>}
      </div>
    </div>
  );
};

export default Payment;
