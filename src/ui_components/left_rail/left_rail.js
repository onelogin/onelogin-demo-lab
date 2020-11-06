import React, { Component } from 'react';
import { Link } from "react-router-dom";
class LeftRail extends Component {
  render(){
    return (
      <div className="left-rail">
        <ul>
          <li>
            <Link to="/" className="link">Home</Link>
          </li>
          <li>
            <Link to="/stats" className="link">My Statistics</Link>
          </li>
          <li>
            <Link to="/rating" className="link">Rating - To Remove</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftRail
