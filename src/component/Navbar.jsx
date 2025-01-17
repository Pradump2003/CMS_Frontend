import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-blue-500">
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "link btn px-4 py-2 text-xl text-white bg-green-500 rounded-md no-underline"
              : "btn px-4 py-2 text-xl text-white bg-gray-500 rounded-md "
          }
        >
          Blog List
        </NavLink>
        <NavLink
          to="/add-blog"
          className={({ isActive }) =>
            isActive
              ? "link btn px-4 py-2 text-xl text-white bg-green-500 rounded-md no-underline"
              : "btn px-4 py-2 text-xl text-white bg-gray-500 rounded-md"
          }
        >
          Add Blog
        </NavLink>
      </div>
    </div>
  );
}
