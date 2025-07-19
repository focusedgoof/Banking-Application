import React, { useState } from 'react';
import usersData from '../../Utils/users.json';
import SnackBar from '../Common/SnackBar/SnackBar';
import Form from '../Common/Form/Form';
import PropTypes from 'prop-types';
import './Login.css';
import { setLocalStorage } from '../../Utils/Utils';

const Login = ({ handleLogin }) => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const formFields = [
    { name: 'username', placeholder: 'Username' },
    { name: 'password', placeholder: 'Password', type: 'password' },
  ];

  const handleLoginFormSubmit = async (formData) => {
    const { username, password } = formData;

    if (!username || !password) {
      setSnackbarInfo({
        open:true,
        message: 'Please enter both username and password'
      });
      return;
    }

    const user = usersData.find((u) => u.Username === username && u.Password === password);

    if (user) {
      await setLocalStorage('userData', user);
      handleLogin(user);
    } else {
      setSnackbarInfo({
        open:true,
        message:'Invalid username or password'
      })
    }
  };

  

  const handleSnackbarClose = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  return (
    <div className="login-container">      
      <div className="login-form">
        <h2>Login</h2>
        <Form formFields={formFields} onSubmit={handleLoginFormSubmit} buttonLabel="Login">
          {formFields.map((field) => (
            <div key={field.name} className="form-field">
              <input
                type={field.type || 'text'}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <button type="submit">Log In</button>
        </Form>
      </div>
      <SnackBar {...snackbarInfo} handleClose={handleSnackbarClose} />
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string
};

export default Login;
