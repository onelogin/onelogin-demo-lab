import React from 'react';
import LeftRail from '../left_rail/left_rail';
import Header from '../header/header';

const AppWrapper = (props) => {
  return(
    <div className="App">
      <Header user={props.currentUser}/>
      <div className="app-body">
        {<LeftRail/>}
        <div className="page-component">{props.children}</div>
      </div>
    </div>
  )
}

export default AppWrapper


