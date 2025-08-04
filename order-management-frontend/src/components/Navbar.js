import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#222', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', marginRight: '20px' }}>🏠 Dashboard</Link>
      <Link to="/create" style={{ color: 'white', marginRight: '20px' }}>➕ Add Order</Link>
      <Link to="/orders" style={{ color: 'white' }}>📋 View Orders</Link>
    </nav>
  );
}

export default Navbar;
