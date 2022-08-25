import { useRef } from 'react';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration(props) {
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API    
    const enteredEmail = emailInputRef.current.value;
    if(!enteredEmail || !enteredEmail.includes('@')){
      return ;
    }
    props.onRegister(enteredEmail);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
