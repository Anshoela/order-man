import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewOrder.css';

function ViewOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderById();
  }, []);

  const fetchOrderById = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error("Order not found", err);
    }
  };

  if (!order) return <p style={{ textAlign: 'center' }}>Loading or Order not found...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🔍 Order Details</h2>
      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Amount:</strong> ₹{order.orderAmount}</p>
      <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
      <p><strong>Invoice:</strong> <a href={order.invoiceFileUrl} target="_blank" rel="noreferrer">View</a></p>
    </div>
  );
}

export default ViewOrder;
