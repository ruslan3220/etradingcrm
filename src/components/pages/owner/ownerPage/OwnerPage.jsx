import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employees from '../employees/Employees'
import Attendance from '../attendance/Attendance'
import Salary from '../salary/Salary'
import SoldProducts from '../soldProducts/SoldProducts'
import InputProducts from '../inputProducts/InputProducts'
import Orders from '../orders/Orders'
import StoreRoom from '../storeRoom/StoreRoom'
import ProductPrice from '../productPrice/ProductPrice'
import OwnerSidebar from '../OwnerSidebar'
import FinishedProducts from '../FinishedProduct/FinishedProducts'
import Dashboard from '../../Dashboard'
import Pdp from '../productPrice/Pdp'
import { Link, NavLink } from "react-router-dom";
import {GiHamburgerMenu}  from "react-icons/gi"
import {TbLogout2 } from "react-icons/tb"
import ResponsiveLogo from "../../../../assets/image_2023-08-25_12-09-34.png"

const OwnerPage = ({ children }) => {
  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "login";

  };

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holatini saqlash uchun useState()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: "",
    },
    {
      path: "/Employees",
      name: "Xodimlar",
      icon: "",
    },
    {
      path: "/Attendance",
      name: "Yo'qlama",
      icon: "",
    },
    {
      path: "/Salary",
      name: "Oylik maosh",
      icon: "",
    },
    {
      path: "/SoldProducts",
      name: "Sotilgan Tovar",
      icon: "",
    },
    {
      path: "/InputProduct",
      name: "Qabul qilingan tovar",
      icon: "",
    },
    {
      path: "/Order",
      name: "Buyurtmalar",
      icon: "",
    },
    {
      path: "/StoreRoom",
      name: "Sklad",
      icon: "",
    },
    {
      path: "/FinishedProducts",
      name: "Finished Product",
      icon: "",
    },
    {
      path: "/ProductPrice",
      name: "Tan narxlar",
      icon: "",
    },
  ];


  return (
    <>
      <BrowserRouter >
         <div className="routerContainer">
            <button className="hamburgerBtn" onClick={openModal}><GiHamburgerMenu className="GiHamburgerMenu"/></button>
            <img className="routerContainerHeading" src={ResponsiveLogo} alt="SiteLogo" />
         </div> 
        <OwnerSidebar >
          <Routes>
            <Route path="/*" element={""} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/Employees" element={<Employees/>} />
            <Route path="/Attendance" element={<Attendance />} />
            <Route path="/Salary" element={<Salary />} />
            <Route path="/SoldProducts" element={<SoldProducts />} />
            <Route path="/InputProduct" element={<InputProducts />} />
            <Route path="/Order" element={<Orders />} />
            <Route path="/StoreRoom" element={<StoreRoom />} />
            <Route path="/FinishedProducts" element={<FinishedProducts />} />
            <Route path='ProductPrice/Pdp/:id' element={<Pdp/>} />
            <Route path="/ProductPrice" element={<ProductPrice />} />
          </Routes>
        </OwnerSidebar>




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

      </BrowserRouter>

    </>
  )
}

export default OwnerPage