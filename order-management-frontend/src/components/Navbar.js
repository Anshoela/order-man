import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#222', padding: '10px' }}>
      <Link to="/order/:id" style={{ color: 'white', marginRight: '20px' }}>View Orders</Link>
      <Link to="/create" style={{ color: 'white', marginRight: '20px' }}>➕ Add Order</Link>
      <Link to="/orders" style={{ color: 'white' }}>🏠 Dashboard</Link>
    </nav>
  );
}

export default Navbar;
