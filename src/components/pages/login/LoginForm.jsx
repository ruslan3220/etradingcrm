import React, { useState } from 'react';
import "./login.css"

const LoginForm = ({ handleLogin }) => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({ ...prevLoginData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData);
    setLoginData({ login: '', password: '' });
  };

  return (
    <div className="formContainer">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">Login</h2>

  
        <input
          placeholder='Login'
          type="login"
          name="login"
          id="login"
          className="login-form__input"
          value={loginData.login}
          onChange={handleChange}
          required
        />
  

 
        <input
        placeholder='Password'
          type="password"
          name="password"
          id="password"
          className="login-form__input"
          value={loginData.password}
          onChange={handleChange}
          required
        />

      <button type="submit" className="login-form__button">
        Kirish
      </button>

      {/* <div className="warning"></div> */}
    </form>
    </div>
  );
};


export default LoginForm;