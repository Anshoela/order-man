import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css';

function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    orderAmount: '',
    file: null
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderPayload = {
      customerName: formData.customerName,
      orderAmount: parseFloat(formData.orderAmount),
    };

    const data = new FormData();
    data.append("order", new Blob([JSON.stringify(orderPayload)], { type: "application/json" }));
    data.append("file", formData.file);

    try {
      const response = await axios.post("http://localhost:8080/orders", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(`✅ Order created with ID: ${response.data.orderId}`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create order.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>
        <div>
          <label>Order Amount:</label>
          <input type="number" name="orderAmount" value={formData.orderAmount} onChange={handleChange} required />
        </div>
        <div>
          <label>Invoice File (PDF):</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <button type="submit">Submit Order</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderForm;
