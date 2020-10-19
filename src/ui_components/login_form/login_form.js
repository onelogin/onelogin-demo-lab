import React from 'react';

import SubmitButton from '../submit_button/submit_button';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <input id="Email" placeholder="Email" type="email" name="emailAddress"/><br/>
      <input id="Password" placeholder="Password" type="password" name="password"/><br/><br/>
      <SubmitButton text="Log In"/>
    </form>
  );
}
export default LoginForm;
