import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-blue-500">
      <div className="navbar-start flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'link btn px-4 py-2 text-xl text-white bg-green-500 rounded-md no-underline font-serif'
              : 'btn px-4 py-2 text-xl text-white bg-gray-500 rounded-md font-serif'
          }
        >
          Blog List
        </NavLink>
        <NavLink
          to="/add-blog"
          className={({ isActive }) =>
            isActive
              ? 'link btn px-4 py-2 text-xl text-white bg-green-500 rounded-md no-underline font-serif'
              : 'btn px-4 py-2 text-xl text-white bg-gray-500 rounded-md font-serif'
          }
        >
          Add Blog
        </NavLink>
      </div>
    </div>
  );
}
