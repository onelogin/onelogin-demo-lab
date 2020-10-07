import React, { Component } from 'react';
import { Link } from "react-router-dom";
class LeftRail extends Component {
  render(){
    return (
      <div className="left-rail">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stats">My Statistics</Link>
          </li>
          <li>
            <Link to="/rating">Rating - To Remove</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftRail
