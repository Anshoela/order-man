import React, { useState } from "react";
import axios from "axios";

function ViewOrder() {
  const [id, setId] = useState("");
 const [orders, setOrder] = useState(null); // change to single order object

const handleFetch = async () => {
  if (!id) {
    alert("Please enter an ID");
    return;
  }

    try {
    const response = await axios.get(`http://localhost:8080/orders/${id}`);
    setOrder(response.data); // not array
  } catch (error) {
    console.error("Failed to fetch order", error);
    alert("Error fetching order");
    setOrder(null);
  }
};

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>📋 View Orders by Username</h2>

      <input
        type="text"
        placeholder="Enter id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleFetch}>Fetch Orders</button>

     {orders ? (
  <table border="1" cellPadding="10" width="100%" style={{ marginTop: "20px" }}>
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
        <td>{orders.orderId}</td>
        <td>{orders.customerName}</td>
        <td>{orders.orderAmount}</td>
        <td>{new Date(orders.orderDate).toLocaleString()}</td>
        <td>
          <a href={orders.invoiceFileUrl} target="_blank" rel="noreferrer">PDF</a>
        </td>
      </tr>
    </tbody>
  </table>
) : (
  <p>No orders to show</p>
)}

    </div>
  );
}

export default ViewOrder;
