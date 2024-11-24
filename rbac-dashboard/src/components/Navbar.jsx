import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h1>Admin Dashboard</h1>
    <ul>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/roles">Roles</NavLink>
      </li>
      
    </ul>
  </nav>
);

export default Navbar;
