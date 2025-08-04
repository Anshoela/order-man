import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  {orders.map((order) => {
  console.log("✅ URL from backend: ", order.invoiceFileUrl);

})}

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>📋 All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
             <tr key={orders.orderId}>
      <td>{orders.customerName}</td>
      <td>{orders.orderAmount}</td>
      <td>
        <a href={orders.invoiceFileUrl} target="_blank" rel="noreferrer">PDF</a>
      </td>
    </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;
