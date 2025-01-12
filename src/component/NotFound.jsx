import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Oops! The page you're looking for doesn't exist.</h2>
      <p>
        Sorry, we couldn't find the page you're looking for. Please check the
        URL or go back to the homepage.
      </p>
      <NavLink to="/">Go to Home</NavLink>
    </div>
  );
}
