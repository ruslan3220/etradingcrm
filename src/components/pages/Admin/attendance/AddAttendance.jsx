import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { usePagination, Pagination } from "pagination-react-js";
import CurrentTime from "../../CurrentTime";
import axios from "axios"
import { FcOk } from 'react-icons/fc'
import {GiCancel} from 'react-icons/gi'

const AddAttendance = () => {
  const [query, setQuery] = useState("");
  // Yoqlama
  const [items, setItems] = useState([]);
  const [error, setError] = useState("")
  const tok = window.localStorage.token
  const tokenn = tok.slice(1, (tok.length) -1)

  useEffect(() => {
    fetch("https://api.etradingcrm.uz/api/Employee/All")
      .then((response) => response.json())
      .then((data) => {
        const deletedEmployees = data.filter(
          (item) => item.isDeleted === false
        );
        setItems(deletedEmployees);
      });
  }, []);


  const { currentPage, entriesPerPage, entries } = usePagination(1, 11);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(items);
  const [inputData, setInputData] = useState([]);


  useEffect(() => {
    fetch("https://api.etradingcrm.uz/api/Employee/All")
      .then((response) => response.json())
      .then((data) => {
        const deletedEmployees = data.filter(
          (item) => item.isDeleted === false
        );
        setUsers(deletedEmployees);
      });
  }, []);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  var day = ('0' + currentDate.getDate()).slice(-2);
  let dat = year + "-" + month + "-" + day
  const [employeeId, setEmployeeId] = useState("");

  const handleSaveUser = () => {
    const newData = users.map((user) => ({
      employeeId: user.id,
      "day": year + "-" + month + "-" + day,
      isMainWork:
        inputData[`isMainWork_${user.id}`] !== undefined
          ? inputData[`isMainWork_${user.id}`]
          : true,
      lateHours: Number(inputData[`lateHours_${user.id}`]),
      extraWorkHours: Number(inputData[`extraWorkHours_${user.id}`]),
    }));

    console.log(newData,"new");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization", `Bearer ${tokenn}`
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newData),
      redirect: "follow",
    };

    
    fetch("https://api.etradingcrm.uz/api/Attendance", requestOptions)
    .then((response) => {
      response.text()
      if (response.ok) {
        handleRefreshClick();
         setIsModalOpen(false)
       } else {
         throw new Error('Kerakli ma`lumotlarni to`ldiring!');
       } 
    })
    .then((result) => console.log(result))
    .catch( (error) => {
      setError(error.message);
    })
  
    
  };

  const handleWarning = () => {
    if (error) {
      return <div className="warning">{error}</div>;
    }
    return null;
  };


  // // Yoqlama edit 

  const [data, setData] = useState([]);
  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://api.etradingcrm.uz/api/Attendance/All')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        throw new Error('Ozroq Kuting!');
      });
  };

const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  
  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModal = () => {
    setIsModalOpenEdit(false);
  };

  const saveChanges = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization", `Bearer ${tokenn}`
    );
  
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(data), 
      redirect: "follow",
    };
  
    fetch("https://api.etradingcrm.uz/api/Attendance", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result, "resulttt boldi"))
      .catch((error) => console.log("error", error));
      setIsModalOpen(false)
      handleRefreshClick()
  };
  
  const handleInputChange = (id, field, value) => {
    const updatedData = data.map(user => {
      if (user.id === id) {
        return {
          ...user,
          [field]: value
        };
      }
      return user;
    });
  
    if (field === 'checkbox' && !value) {
      updatedData.forEach(user => {
        if (user.id === id) {
          user.checkbox = 'default_checkbox_value';
        }
      });
    }
   setData(updatedData);
  };

const currentDates = new Date().toISOString().slice(0, 10); // Bugungi sana
const [selectedDate, setSelectedDate] = useState(dat);
const [filteredData, setFilteredData] = useState([]);
const ff = filteredData.map(item=> item).filter(user=>user.day == selectedDate);

useEffect(() => {
  fetichData();
}, []);

const fetichData = async () => {
  try {
    const response = await fetch(`https://api.etradingcrm.uz/api/Attendance/All?sort=day&day${selectedDate}`);
    // console.log(response);
    const responseData = await response.json();
    const sortedData = responseData.sort((a, b) => a.day.localeCompare(b.day));
    // console.log(sortedData, "sortData");
    setFilteredData(sortedData);
  } catch (error) {
    throw new Error('Ozroq Kuting!');
  }
};

const handleDateChange = (event) => {
  const selectedDate = event.target.value;
  setSelectedDate(selectedDate);
};

const allDat = ff.map(item => item.isMainWork)
const trueDat = ff.map(item => item.isMainWork).filter(use=>use === true)
const falseDat = ff.map(item => item.isMainWork).filter(use=>use === false)


  return (
    <div>
      <div className="employeesTable">
        <table>
          <th>
            <tr className="th__title">
              <td className="thItemName">Ismi</td>
              <td className="thItemPosition">Lavozimi</td>
              <td className="thItemLateHours">Kechikish</td>
              <td className="thItemMainWork">Asosiy</td>
              <td className="thItemExtrawork">Qo'shimcha</td>
            </tr>
          </th>

          <div className="input__div">
            <div className="">
              <input
                className="searchInput"
                type="search"
                placeholder="Workers name"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
            </div>

            <div>
             <input type="date" value={selectedDate} onChange={handleDateChange} />
            </div>

            <div className="currentDateTime">
              <CurrentTime />
            </div>

            <div className="attendanceBtns">
                  <button className="btnAdd" onClick={handleOpenModal} id="myBtn">
                    <b className="txtAdd">Add</b>
                    <FaPlus color="white" />
                  </button>
                  <button className="btnEdit" onClick={openModalEdit}><b className="txtAdd" >Edit</b></button>
            </div>

            {/* Post yoqlama  */}

            <div>
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3 className="AttendanceInputHeading">Xodimlar</h3>


                <div className="AttdendanceInputs">
                    {users.map((user) => (
                      <div className="AttendanceInputItems">
                        <h3  className="AttendanceInputName"
                        key={user.id}
                        onClick={() => setEmployeeId(user?.id)}                       
                        >
                          
                          {user?.name}
                        </h3>
                      

                        <input
                          className="AttendanceCheckboxInput"
                          type="checkbox"
                          name={`isMainWork_${user.id}`}
                          checked={
                            inputData[`isMainWork_${user.id}`] ??
                            user.isMainWork ??
                            true
                          }
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setInputData((prevData) => ({
                              ...prevData,
                              [`isMainWork_${user.id}`]: isChecked,
                            }));
                          }}
                        />

                        <input
                          className="AttendanceLateHoursInput"
                          placeholder="Kechikish"
                          type="number"
                          name={`lateHours_${user.id}`}
                          value={
                            inputData[`lateHours_${user.id}`] || user.lateHours
                          }
                          onChange={(e) =>
                            setInputData((prevData) => ({
                              ...prevData,
                              [`lateHours_${user.id}`]: e.target.value,
                            }))
                          }
                        />
                       
                        <input
                          placeholder="Qo'shimcha ish"
                          className="AttendanceExtraWorkInput"
                          type="number"
                          name={`extraWorkHours_${user.id}`}
                          value={inputData[`extraWorkHours_${user.id}`] || ""}
                          onChange={(e) =>
                            setInputData((prevData) => ({
                              ...prevData,
                              [`extraWorkHours_${user.id}`]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ))}
                </div>


                    <button className="AttendanceModalSaveBtn" onClick={handleSaveUser}><b>Save</b></button>
                    <button className="AttendanceModalCloseBtn" onClick={handleCloseModal}><b>Close</b></button>
                    {handleWarning()}
                  </div>
                </div>
              )}
            </div>

            {/* Edit yoqlama  */}

            
            <div>
    

      {isModalOpenEdit && (
        <div className="modald">
          <div className="modald-content">
            <h3 className="AttendanceInputHeading">Yo'qlamani o'zgartirish</h3>
            <div className="AttdendanceInputs">
            {ff.map(user => (

                  <div key={user.id} className="AttendanceInputItems">
                    
                  <h3 className="AttendanceInputName">{user.firstName}</h3>
              
              
                  <input
                    className="AttendanceCheckboxInput"
                    type="checkbox"
                    defaultChecked={user.isMainWork}
                    onChange={e =>
                      handleInputChange(user.id, 'isMainWork', e.target.checked)
                    }
                  />
                  <input
                    className="AttendanceLateHoursInput"
                    type="number"
                    defaultValue={user.lateHours}
                    placeholder="lateHours"
                    onChange={e =>
                      handleInputChange(user.id, 'lateHours', e.target.value)
                    }
                  />
                  <input
                    className="AttendanceExtraWorkInput"
                    type="number"
                    defaultValue={user.extraWorkHours}
                    placeholder="extraWorkHours"
                    name="extraWorkHours"
                    onChange={e =>
                    handleInputChange(user.id, 'extraWorkHours', e.target.value)
                    }
                  />
                </div>

                )
                  
                  
                  )
            
          }
            </div>
            <div>
                    <button className="AttendanceEditSaveBtn" onClick={saveChanges}><b>Save</b></button>
                    <button className="AttendanceEditCloseBtn" onClick={closeModal}><b>Close</b></button>
            </div>

            


          </div>
        </div>
      )}
    </div>

            {/* Edit yoqlama  */}

          </div>
          <tbody>
          {ff.filter((row) => row.firstName.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast).map(item =>  
            <tr className="tr__title"  key={item.id} >
                  <td
                    key={item.id}
                    className="trItemName"
                    component="th"
                    scope="row"
                  >
                    {item.firstName}
                  </td>

                  <td className="trItemPosition" align="right">
                    {item.position}
                  </td>

                  <td className="trItemLateHours" align="right">
                     {item.lateHours}
                  </td>

                  <td className="trItemMainWork" align="right">
                     <p>{item.isMainWork === true ? <FcOk/> : item.isMainWork === false ? <GiCancel/> : ''}</p>
                  </td>

              
                  <td className="trItemExtraWork" align="right">
                    {item.extraWorkHours}
                  </td>
                </tr>
            
            
            )}
            
          </tbody>

          <div className="statistics">
            <span className="profit">
              Bor {trueDat.length} ta / {Math.round((trueDat.length)/(allDat.length)*100)} %
            </span>
            <span className="spend">
              Yo'q {falseDat.length} ta / {Math.round((falseDat.length)/(allDat.length)*100)} %
            </span>
          </div>


{/* Pagination  */}
          <Pagination
            entriesPerPage={entriesPerPage.get}
            totalEntries={ff.length}
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
        </table>
      </div>
    </div>
  );
};

export default AddAttendance;
