// import { render } from 'node-sass';
import React, { Component} from 'react';
import SubmitButton from '../buttons/submit_button';

const OTPModal = ({close, action}) => (
  <div>
  <div className="modal-background"onClick={close}></div>
    <div className="modal-card">
    <button className="cancel-button" onClick={close}>X</button>
      <form className="otp-input-form" onSubmit={action}>
        <input className="otp-input-form-field onelogin-input" placeholder="One Time Password" name="otp"/><br/>
        <SubmitButton text="Confirm"/>&nbsp;
      </form>
    </div>
  </div>
)

export default OTPModal;
