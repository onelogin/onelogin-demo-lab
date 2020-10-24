import React from 'react';
import CancelButton from '../cancel_button/cancel_button';
import SubmitButton from '../submit_button/submit_button';

const OTPModal = (props) => {
  return props.isOpen ? (
    <div className="modal-background">
      <div className="modal-card">
        <CancelButton  text="X" />
        <form className="otp-input-form" onSubmit={props.action}>
          <input className="otp-input-form-field onelogin-input" placeholder="One Time Password" name="otp"/><br/>
          <SubmitButton text="Confirm"/>&nbsp;
          <SubmitButton text="Cancel" />
        </form>
      </div>
    </div>

  ) : null;
}

export default OTPModal;
