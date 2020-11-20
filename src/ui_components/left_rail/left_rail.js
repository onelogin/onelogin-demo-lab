import React, { Component } from 'react';
import { Link } from "react-router-dom";

const LeftRail = ({activePage}) => {
  return (
    <div className="left-rail">
      <h2 className="section-heading">End User Scenarios</h2>
      <ul>
        <li>
          <Link to="/" className={activePage == "login" ? "active-left-rail-item" : "link"}>Log In (Basic)</Link>
        </li>
        <li>
          <Link to="/signup" className={activePage == "signup" ? "active-left-rail-item" : "link"}>Sign Up (Basic)</Link>
        </li>
        <li>
          <Link to="/signup_smart_mfa" className={activePage == "signup_smart_mfa" ? "active-left-rail-item" : "link"}>Sign Up + Smart MFA</Link>
        </li>
        <li>
          <Link to="/" className="link">Coming Soon</Link>
        </li>
      </ul>
    </div>
  )
}

export default LeftRail
