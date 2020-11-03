// import { render } from 'node-sass';
import React, { Component} from 'react';
import CancelButton from '../cancel_button/cancel_button';
import SubmitButton from '../submit_button/submit_button';

const OTPModal = ({close, action}) => (
      <div className="modal-background">
        <div className="modal-card">
        <button className="cancel-button" onClick={close}>X</button>
          <form className="otp-input-form" onSubmit={action}>
            <input className="otp-input-form-field onelogin-input" placeholder="One Time Password" name="otp"/><br/>
            <SubmitButton text="Confirm"/>&nbsp;
            <button className="submit-button" onClick={close}>Cancel</button>
          </form>
        </div>
      </div>
  )

export default OTPModal;
