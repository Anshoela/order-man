import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import ViewOrder from './components/ViewOrder';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2 style={{ textAlign: 'center' }}>Welcome to Order System</h2>} />
        <Route path="/create" element={<OrderForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order/:id" element={<ViewOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
