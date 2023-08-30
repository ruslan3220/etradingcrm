import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { usePagination, Pagination } from "pagination-react-js";
import CurrentTime from "../../CurrentTime";
import axios from "axios"
import { FcOk } from 'react-icons/fc'
import {GiCancel} from 'react-icons/gi'

const Attendance = () => {
  const [query, setQuery] = useState("");
  // Yoqlama
  const [items, setItems] = useState([]);

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
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

      setIsModalOpen(false)
    	// handleRefreshClick()
  };

  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
 

const currentDates = new Date().toISOString().slice(0, 10); // Bugungi sana
const [selectedDate, setSelectedDate] = useState(currentDates);
const [filteredData, setFilteredData] = useState([]);
const ff = filteredData.map(item=> item).filter(user=>user.day == selectedDate);

useEffect(() => {
  fetichData();
}, []);

const fetichData = async () => {
  try {
    const response = await fetch(`https://api.etradingcrm.uz/api/Attendance/All?sort=day&day${selectedDate}`);
    console.log(response);
    const responseData = await response.json();
    const sortedData = responseData.sort((a, b) => a.day.localeCompare(b.day));
    console.log(sortedData, "sortData");
    setFilteredData(sortedData);
  } catch (error) {
    console.log(error);
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
            <div>
    

      
      
    </div>


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
              Bor {trueDat.length} ta / {(trueDat.length)/(allDat.length)*100} %
            </span>
            <span className="spend">
              Yo'q {falseDat.length} ta / {(falseDat.length)/(allDat.length)*100} %
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

export default Attendance;
