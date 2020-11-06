import React from 'react';
import SubmitButton from '../buttons/submit_button';

const ProfileForm = (props) => {
  return (
    <div className="profile-form-section">
      <h3 className="profile-form-title">{props.formTitle}</h3>
      <form onSubmit={props.submitAction}>
        {
          props.fields.map( (field) => {
            if ( field.label ) {
              return (
                <span key={field.name}>
                  <label className="profile-label">{field.label}</label>
                  <input required id={field.name} className="profile-input onelogin-input" name={field.name} type={field.type || "text"} defaultValue={field.defaultValue || ""} key={field.name}/>
                </span>
              )
            }
            else {
              return <input required className="profile-input" name={field.name} type={field.type || "text"} defaultValue={field.defaultValue || ""} key={field.name}/>
            }
          } )
        }
        <SubmitButton text="Update Profile"/>
      </form>
    </div>
  )
}

export default ProfileForm;
