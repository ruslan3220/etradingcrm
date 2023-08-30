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

const AddEmployees = () => {
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

  const [error, setError] = useState("");

  const [ref, setRef] = useState("");

  const a = window.localStorage.token;

  useEffect(() => {
    axios
      .get("https://api.etradingcrm.uz/api/Employee/All")
      .then((res) => {
        const items = res.data.filter((items) => items.isDeleted === false);
        setItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // Modal

  const handleAdd = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  };

  const handleCli = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  };

  const Token = localStorage.getItem("token");
  // console.log(Token);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputData = {
      name: name,
      lastName: lastName,
      passportId: passportId,
      position: position,
      phone: phone,
      salary: parseInt(salary),
      experience: experience,
    };

    try {
      const response = await fetch("https://api.etradingcrm.uz/api/Employee", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenn}`,
          accept: "*/*",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        handleRefreshClick();
      } else {
        throw new Error("Kerakli ma`lumotlarni to`ldiring!");
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handlePassportIdChange = (event) => {
    setPassportId(event.target.value);
  };
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };
  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  // Del modal

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://api.etradingcrm.uz/api/Employee/${selectedItem.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );

      if (response.ok) {
        const updatedItems = items.filter(
          (item) => item.id !== selectedItem.id
        );
        setItems(updatedItems);

        setShowModal(false);
      } else {
        console.error(
          "Delete request failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Delete request error:", error);
    }
  };

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  // Edit modal

  const handleEditClick = (item) => {
    setSelectedItems(item);
    setName(item.name);
    setLastName(item.lastName);
    setPassportId(item.passportId);
    setPosition(item.position);
    setSalary(item.salary);
    setExperience(item.experience);
    setPhone(item.phone);
    setShowEditModal(true);
  };

  const handleSaveClick = () => {
    const updatedItems = items.map((item) => {
      if (item.id === selectedItems.id) {
        return {
          ...item,
          name,
          lastName,
          passportId,
          salary,
          position,
          experience,
          phone,
        };
      }
      handleRefreshClick();
      return item;
    });

    const id = selectedItems.id;
    const data = JSON.stringify({
      id,
      name,
      lastName,
      passportId,
      position,
      salary,
      experience,
      phone,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${tokenn}`);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch("https://api.etradingcrm.uz/api/Employee/Update", requestOptions)
      .then((response) => response.text())
      .then(() => {
        setItems(updatedItems);
        setShowEditModal(false);
      })
      .catch((error) => console.log("error", error));
  };

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
            <td className="thItemName">
              <b>Ismi</b>
            </td>
            <td className="thItemPosition">
              <b>Lavozimi</b>
            </td>
            <td className="thItemSalary">
              <b>Ish Haqi</b>
            </td>
            <td className="thItemPhone">
              <b>Telefon raqami</b>
            </td>
            <td className="action">
              <b>Action</b>
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

        <button className="btnAdd" onClick={handleAdd} id="myBtn">
          <b className="txtAdd">Add</b>
          <FaPlus color="white" />
        </button>
        {/* Create Employee */}

        <div id="myModal" className="modals">
          <div style={{ padding: "20px 0" }} className="modals-content">
            <span onClick={handleCli} className="close">
              &times;
            </span>
            <form className="modalForm" onSubmit={handleSubmit}>
              <span className="addEmployeeTxt">Xodim qo'shish</span>
              <label className="modalFormLabel" htmlFor="name">
                FirstName:
                <input
                  className="modalFormInput"
                  placeholder="First Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="lastName">
                LastName:
                <input
                  className="modalFormInput"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="passportId">
                Passport ID:
                <input
                  className="modalFormInput"
                  placeholder="Passport ID"
                  type="text"
                  name="passportId"
                  value={passportId}
                  onChange={handlePassportIdChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="position">
                Position:
                <input
                  className="modalFormInput"
                  placeholder="Position"
                  type="text"
                  name="position"
                  value={position}
                  onChange={handlePositionChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="phone">
                Phone number:
                <input
                  className="modalFormInput"
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="salary">
                Salary:
                <input
                  className="modalFormInput"
                  placeholder="Salary"
                  type="number"
                  name="salary"
                  value={salary}
                  onChange={handleSalaryChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="experience">
                Experience:
                <input
                  className="modalFormInput"
                  placeholder="Experience"
                  type="date"
                  name="experience"
                  value={experience}
                  onChange={handleExperienceChange}
                />
              </label>
              <button type="submit" className="modalFormBtn">
                Saved
              </button>
              {handleWarning()}
            </form>
          </div>
        </div>
      </div>

      <table className="tbody">
        <tbody>
          {items
            .filter((row) => row.name.toLowerCase().includes(query))
            .slice(entries.indexOfFirst, entries.indexOfLast)
            .map((item) => (
              <tr className="tr__title" key={item.id}>
                <td
                  onClick={() => openModal(item)}
                  className="trItemName"
                  component="th"
                  scope="row"
                >
                  {item.name}
                </td>
                <td className="trItemPosition" align="right">
                  {item.position}
                </td>
                <td className="trItemSalary" align="right">
                  {item.salary}
                </td>
                <td className="trItemPhone" align="right">
                  {item.phone}
                </td>
                <div className="trItemBtns">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="editBtn"
                    align="right"
                  >
                    {<GrEdit />}
                  </button>
                  <button
                    onClick={() => handleShowModal(item)}
                    id="myButton"
                    className="deleteBtn"
                    align="right"
                  >
                    {<MdDelete />}{" "}
                  </button>
                </div>
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

      <div>
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              {/* Edit Employee */}

              <label className="modalFormLabel" htmlFor="name">
                FirstName:
                <input
                  className="modalFormInput"
                  placeholder="First Name"
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="lastName">
                LastName:
                <input
                  className="modalFormInput"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="passportId">
                Passport ID:
                <input
                  className="modalFormInput"
                  placeholder="Passport ID"
                  type="text"
                  name="passportId"
                  value={passportId}
                  id="passportId"
                  onChange={(e) => setPassportId(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="position">
                Position:
                <input
                  className="modalFormInput"
                  placeholder="Position"
                  type="text"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="phone">
                Phone number:
                <input
                  className="modalFormInput"
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="salary">
                Salary:
                <input
                  className="modalFormInput"
                  placeholder="Salary"
                  type="number"
                  name="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="experience">
                Experience:
                <input
                  className="modalFormInput"
                  placeholder="Experience"
                  type="date"
                  name="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </label>

              <button className="modalFormBtn" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="deleteModalTxt">
              Rostdan ham {selectedItem.name}ni o'chirmoqchimisiz?
            </h2>
            <button className="deleteModalYes" onClick={handleDelete}>
              Yes
            </button>
            <button className="deleteModalNo" onClick={handleHideModal}>
              No
            </button>
          </div>
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

export default AddEmployees;
