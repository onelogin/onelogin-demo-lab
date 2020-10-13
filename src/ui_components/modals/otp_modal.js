import React from 'react';

import SubmitButton from '../submit_button/submit_button';

const OTPModal = (props) => {
  return props.isOpen ? (
    <div className="modal-background">
      <div className="modal-card">
        <form className="otp-input-form" onSubmit={props.action}>
          <input className="otp-input-form-field" placeholder="One Time Password" name="otp"/><br/>
          <SubmitButton text="Confirm"/>
        </form>
      </div>
    </div>

  ) : null;
}

export default OTPModal;
