import React from 'react';
import LeftRail from '../left_rail/left_rail';
import Header from '../header/header';

const AppWrapper = ({currentUser, activePage, children}) => {
  return(
    <div className="App">
      <Header user={currentUser}/>
      <div className="app-body">
        <LeftRail activePage={activePage}/>
        <div className="page-component">{children}</div>
      </div>
    </div>
  )
}

export default AppWrapper
