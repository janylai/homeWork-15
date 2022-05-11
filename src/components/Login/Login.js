import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const reducerEmail = (prevState, action) => {
  if (action.type === 'USER_INFO') {
    return{
      ...prevState,
      value:action.isValue
    }
  }
  if (action.type === 'USER_EMAIL') {
    return{
      ...prevState,
      isValid: prevState.value.includes('@')
    }
  }
  return prevState
}

const reducerPassword = (prevState, action) => {
   if (action.type === 'USER_PASSWORD') {
     return{
       ...prevState,
       pass: action.valuePassword,
     }
   }
   if (action.type === 'BLUR') {
     return{
       ...prevState,
       isPassword: prevState.pass.trim().length>6,
     }
   }
   return prevState
}



const Login = (props) => {
  
  // const [enteredEmail, setEnteredEmail] = useState(''); // write some email
  // const [emailIsValid, setEmailIsValid] = useState(); // check is email valid or not
  // const [enteredPassword, setEnteredPassword] = useState(''); // write some password
  // const [passwordIsValid, setPasswordIsValid] = useState(); // check is password valid or not
  const [formIsValid, setFormIsValid] = useState(false); // email and password are valid


  const [email, dispatchEmail] = useReducer(reducerEmail, {
    value: '',
    isValid: '',
  })

  const [password, dispatchPassword] = useReducer(reducerPassword, {
    pass: '',
    isPassword: '',
  })

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(email.value.includes('@') && password.pass.trim().length > 6);
      console.log('changed');
    }, 3000);

    
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [email.value, password.pass]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INFO', isValue: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_PASSWORD', valuePassword: event.target.value})
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: 'USER_EMAIL',})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.value, password.pass);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${email.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${password.isPassword === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.pass}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
