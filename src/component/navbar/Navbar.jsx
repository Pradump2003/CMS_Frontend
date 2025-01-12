import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-blue-500">
      <div className="flex-1">
        {/* <a href="/" className="btn btn-ghost text-xl text-white">
          CMS
        </a> */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "active-link btn btn-ghost text-xl text-white"
              : "btn btn-ghost text-xl text-white"
          }
        >
          Blog List
        </NavLink>
        <NavLink
          to="/add-blog"
          className={({ isActive }) =>
            isActive
              ? "active-link btn btn-ghost text-xl text-white"
              : "btn btn-ghost text-xl text-white"
          }
        >
          Add Blog
        </NavLink>
      </div>
    </div>
  );
}
