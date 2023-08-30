import React, { useState } from "react";
import  useHistory  from "react";
// import { history }from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import AddAttendance from "../attendance/AddAttendance";
import AddStoreRoom from "../storeRoom/AddStoreRoom";
import AddSalary from "../salary/AddSalary";
import AddSoldProducts from "../soldProducts/AddSoldProducts";
import AddOrder from "../AddOrder/AddOrder";
import AddProductPrice from "../product price/AddProductPrice";
import AddInputProduct from "../inputProducts/AddInputProduct";
import AddEmployees from "../addEmployees/AddEmployees";
import Dashboard from "../../Dashboard";
import AddFinishedProducts from "../AddFinishedProduct/AddFinishedProducts";
import CreateUser from "../CreateUser";
import { Link, NavLink } from "react-router-dom";
import {GiHamburgerMenu}  from "react-icons/gi"
import PdpAdmin from "../product price/PdpAdmin";
import Login  from "../../login/Login";
import LoginForm from "../../login/LoginForm";
import {TbLogout2 } from "react-icons/tb";
import ResponsiveLogo from "../../../../assets/image_2023-08-25_12-09-34.png"

const AdminPage = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holatini saqlash uchun useState()

  // const history = useHistory();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/login";
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
    
    <Router>
         <div className="routerContainer">
         <button className="hamburgerBtn" onClick={openModal}><GiHamburgerMenu className="GiHamburgerMenu"/></button>
          <img className="routerContainerHeading" src={ResponsiveLogo} alt="SiteLogo" />
         {/* <h2 className="routerContainerHeading">ELektroTrading</h2> */}
         </div> 
      <AdminSidebar>        
        <Routes>     
          <Route path="/*" element={""} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/AddEmployees" element={<AddEmployees />} />
          <Route path="/AddAttendance" element={<AddAttendance />} />
          <Route path="/AddSalary" element={<AddSalary />} />
          <Route path="/AddSoldProducts" element={<AddSoldProducts />} />
          <Route path="/AddInputProduct" element={<AddInputProduct />} />
          <Route path="/AddOrder" element={<AddOrder />} />
          <Route path="/AddStoreRoom" element={<AddStoreRoom />} />
          <Route path="/AddFinishedProducts" element={<AddFinishedProducts />}/>
          <Route path="/AddProductPrice" element={<AddProductPrice />} />
          <Route path='/AddProductPrice/PdpAdmin/:id' element={<PdpAdmin/>} />
          <Route path="/CreateUser" element={<CreateUser />} />
        </Routes>
      </AdminSidebar>



{/*  Modal  */}

    
{isModalOpen && (
  <div className="modall">
    <div className="modall-content">
      <div className="tabletModalHeader">
        <h2 className="tabletModalLogo">ElektoTrading</h2>
        <button className="modal-close" onClick={closeModal}>X</button>
      </div>

      <div className="container">
        <div className="">
          <div className="">

            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="tabletModalLink" onClick={closeModal}>
                  <div className="tabletModalLink">
                     <div className="">{item.icon}</div>
                      <div className="">{item.name}</div>
                  </div>

              </NavLink>
            ))}
          </div>
            <button onClick={handleLogout} className="logoutPhone"> <TbLogout2/> Chiqish</button>
        </div>

        <main className="">{children}</main>
      </div>

    </div>
  </div>
)}
    </Router>
  );
};

export default AdminPage;