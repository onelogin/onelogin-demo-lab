import React from 'react';
import SubmitButton from '../buttons/submit_button';

const ProfileForm = (props) => {
  return (
    <div className="profile-form-section">
      <form className="left-aligned-input-form" onSubmit={props.submitAction}>
      <h4>{props.formTitle}</h4>
        {
          props.fields.map( field => {
            if ( field.label ) {
              return <input required id={field.name} placeholder={field.label} className="onelogin-input input-form-field" name={field.name} type={field.type || "text"} defaultValue={field.defaultValue || ""} key={field.name}/>
            }
            else {
              return <input required className="onelogin-input input-form-field" name={field.name} type={field.type || "text"} defaultValue={field.defaultValue || ""} key={field.name}/>
            }
          } )
        }
        <SubmitButton text="Submit"/>
      </form>
    </div>
  )
}

export default ProfileForm;
