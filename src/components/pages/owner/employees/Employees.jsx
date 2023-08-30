import { UseToken } from "../../../hook/LoginHook";
import React, { useState, useEffect } from "react";
import { usePagination, Pagination } from "pagination-react-js";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import CurrentTime from "../../CurrentTime";
import "./Employees.css"
const Employees = () => {
  const d = "Bearer";

  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://api.etradingcrm.uz/api/Employee/All");
  }, []);

  const [items, setItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);

  const { currentPage, entriesPerPage, entries } = usePagination(1, 11);

  // Hooks
  const [date, setDate] = useState();
  const { adToken, setAdToken } = UseToken();

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [passportId, setPassportId] = useState("");
  const a = window.localStorage.token;

  useEffect(() => {
    axios
      .get("https://api.etradingcrm.uz/api/Employee/All")
      .then((res) => {
        const items = res.data.filter((items) => items.isDeleted === false);
        // console.log(res.data);
        setItems(items);
      })
      .catch((err) => console.log(err));
  }, []);




  
  const totalSalary = items.reduce((total, item) => total + item.salary, 0);

  // datakeladi

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const initialDate = `${year}-${month}`;

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [modalUser, setModalUser] = useState(null);

  const openModal = (user) => {
    setModalUser(user);
  };

  const closeModal = () => {
    setModalUser(null);
  };


  const filterAttendancesByDate = (attendances, day) => {
    if (!attendances || attendances.day === initialDate) {
      return [];
    }

    return attendances.filter((attendance) => {
      return attendance.day && attendance.day.includes(day);
    });
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  return (
    <div>
      <table>
        <thead>
          <tr className="th__title" style={{ listStyle: "none" }}>
            <td className="thItem">
              <b>Ismi</b>
            </td>
            <td className="thItem">
              <b>Lavozimi</b>
            </td>
            <td className="thItem">
              <b>Ish Haqi</b>
            </td>
            <td className="thItem">
              <b>Telefon raqami</b>
            </td>
          </tr>
        </thead>
      </table>

      <div className="input__div">
        <div>
          <input
            className="searchInput"
            type="search"
            placeholder="Search . . ."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>

        <div>
          <input
            type="month"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>


        <div className="currentDateTime">
          <CurrentTime />
        </div>

        
      </div>

      <table className="tbody">
        <tbody>
          {items
            .filter((row) => row.name.toLowerCase().includes(query))
            .slice(entries.indexOfFirst, entries.indexOfLast)
            .map((item) => (
              <tr className="tr__title" key={item.id}>
                <td onClick={() => openModal(item)} className="trItem" component="th" scope="row">
                  {item.name}
                </td>
                <td className="trItem" align="right">
                  {item.position}
                </td>
                <td className="trItem" align="right">
                  {item.salary}
                </td>
                <td className="trItem" align="right">
                  {item.phone}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {modalUser && (
        <div className="modaluser">
          <h3 className="ModalUserName">
            {modalUser.name}
            <span> haqida ma'lumot</span>{" "}
          </h3>
          <br />
          <div className="modalUserInfo">
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">Name:</b> {modalUser.name}{" "}
            </span>
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">LastName:</b>{" "}
              {modalUser.lastName}{" "}
            </span>
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">Passport ID:</b>{" "}
              {modalUser.passportId}{" "}
            </span>
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">Position:</b>{" "}
              {modalUser.position}{" "}
            </span>
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">Phone number:</b>{" "}
              {modalUser.phone}{" "}
            </span>
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">Salary:</b> {modalUser.salary}{" "}
            </span>
            <span className="modalUserInfoSpan">
              <b className="modalUserInfoName">Experience:</b>{" "}
              {modalUser.experience}{" "}
            </span>
          </div>

          {selectedDate ? (
           <>
              <h3 className="selectedDate">Attendance</h3>
              <ul className="modalUserAttendanceContent">
                {filterAttendancesByDate(
                  modalUser.attendances,
                  selectedDate
                ).map((attendance, index) => (
                  <div className="">
                    <li className="ModalUserInfoAttendance" key={index}>
                      <b>{index + 1}.</b>
                      {attendance.lateHours}

                      

                      
                      {attendance.isMainWork === true ? (
                        <FcOk />
                      ) : attendance.isMainWork === false ? (
                        <GiCancel />
                      ) : (
                        ""
                      )}


                      <span>{attendance.extraWorkHours}</span>

                      {attendance.day}
                    </li>
                  </div>
                ))}
              </ul>
            </>
          ) : (
            <>
              <br />
              <h3 className="ModalUserName">Attendance:</h3>
              <ol>
                {modalUser.attendances.map((attendance, index) => (
                  <li className="ModalUserInfoAttendance" key={index}>
                    <b>{index + 1}.</b>
                    <span className="ModalUserAttendanceSpan">
                      {attendance.lateHours}
                    </span>
                    <span className="ModalUserAttendanceSpan">
                      {" "}
                      {attendance.isMainWork === true ? (
                        <FcOk />
                      ) : attendance.isMainWork === false ? (
                        <GiCancel />
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="ModalUserAttendanceSpan">
                      {attendance.extraWorkHours}{" "}
                    </span>
                    <span className="ModalUserAttendanceSpan">
                      {attendance.day}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}
          <button className="AttendanceEditCloseBtn" onClick={closeModal}>
            Close Modal
          </button>
        </div>
      )}


      <div className="statistics">
        <span className="profit">Umumiy xodimlar soni: {items.length}</span>
        <span className="spend">Umumiy oylik maosh: {totalSalary} UZS</span>
      </div>

      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={items.length}
        currentPage={{ get: currentPage.get, set: currentPage.set }}
        offset={3}
        classNames={{
          wrapper: "pagination",
          item: "pagination-item",
          itemActive: "pagination-item-active",
          navPrev: "pagination-item nav-item",
          navNext: "pagination-item nav-item",
          navStart: "pagination-item nav-item",
          navEnd: "pagination-item nav-item",
          navPrevCustom: "pagination-item",
          navNextCustom: "pagination-item",
        }}
        showFirstNumberAlways={true}
        showLastNumberAlways={true}
        navStart="&#171;"
        navEnd="&#187;"
        navPrev="&#x2039;"
        navNext="&#x203a;"
        navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
        navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
      />
    </div>
  );
};

export default Employees;
