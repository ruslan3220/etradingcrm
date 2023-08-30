import React from "react";
import './AdminSidebar.css'
import { Link, NavLink, redirect } from "react-router-dom";
import Logo from "../../../assets/siteLogoBlue.png"
import Login from "../login/Login";
import { Button } from "react-bootstrap";
import { red } from "@mui/material/colors";
import {TbLogout2 } from "react-icons/tb"



const AdminSidebar = ({ children }) => {

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "login";

  };
  
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: "",
    },
    {
      path: "/AddEmployees",
      name: "Xodimlar",
      icon: "",
    },
    {
      path: "/AddAttendance",
      name: "Yo'qlama",
      icon: "",
    },
    {
      path: "/AddSalary",
      name: "Oylik maosh",
      icon: "",
    },
    {
      path: "/AddSoldProducts",
      name: "Sotilgan Tovar",
      icon: "",
    },
    {
      path: "/AddInputProduct",
      name: "Qabul qilingan tovar",
      icon: "",
    },
    {
      path: "/AddOrder",
      name: "Buyurtmalar",
      icon: "",
    },
    {
      path: "/AddStoreRoom",
      name: "Sklad",
      icon: "",
    },
    {
      path: "/AddFinishedProducts",
      name: "Tayyor Tovarlar",
      icon: "",
    },
    {
      path: "/AddProductPrice",
      name: "Tan narxlar",
      icon: "",
    },
    {
      path: "/CreateUser",
      name: "Create User",
      icon: "",
    },

  ];
  return (
    <div >
      <div className="container">
        <div className="sidebar">
          <div className="top_section">
            <Link to={"/"} className="logo"><img className="siteLogo" src={Logo} alt="site-logo" /></Link>

            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="links">
                  <div className="sidebarLink">
                     <div className="icon">{item.icon}</div>
                      <div className="link__text">{item.name}</div>
                  </div>
              </NavLink>
            ))}

            <Button onClick={handleLogout}  className="logout"> <TbLogout2/> Chiqish</Button>
          </div>
        </div>

        <main className="MainSidebar">{children}</main>
      </div>
    </div>
  );
};

export default AdminSidebar;
