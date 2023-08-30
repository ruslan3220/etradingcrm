import React, { useState , useEffect} from 'react';
import { Redirect, Switch, redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import AdminPage from '../Admin/AdminPage/AdminPage';
import OwnerPage from '../owner/ownerPage/OwnerPage';
import "./login.css"
import { UseToken } from '../../hook/LoginHook';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const {setAdToken} = UseToken()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Agar token localStorage da mavjud bo'lsa, isLoggedIn holatini true qilish kerak
      setIsLoggedIn(true);
      // Role ni ham o'zgartirish kerak
      setUserRole(localStorage.getItem('userRole'));
    }
  }, []);

  const clearLocalStorageAfterInterval = () => {
    const lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const currentTime = new Date().getTime();
    const interval = 4 * 60 * 60 * 1000; // 4 soat = 4 * 60 * 60 * 1000 millisekund
  
    if (lastUpdateTime && currentTime - lastUpdateTime > interval) {
      localStorage.clear(); // Lokal saqlashni tozalash
    }
  
    localStorage.setItem('lastUpdateTime', currentTime);
  };
  

  const handleLogin = async (loginData) => {
    try {
      const response = await fetch('https://api.etradingcrm.uz/api/Auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setAdToken(data.token)
        if (data.userRole === 'Admin' || data.userRole === 'Owner') {
          setIsLoggedIn(true);
          setUserRole(data.userRole);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userRole', data.userRole);
          // console.log(data.token);

        } else {
          throw new Error('Sizga ruxsat berilmagan!');
        }
      } else {
        throw new Error('Login yoki Parol xato!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWarning = () => {
    if (error) {
      return <div className="warning">{error}</div>;
    }
    return null;
  };
 
  const renderPage = () => {
    switch (userRole) {
      case 'Admin':
        return <AdminPage/>;
      case 'Owner':
        return <OwnerPage/>;
      default:
        return null;
    }
  };

  if (isLoggedIn) {
    return renderPage();
  }

  return (
    <div className="login">
      <LoginForm handleLogin={handleLogin} />
      {handleWarning()}
    </div>
  );
};

export default Login;

