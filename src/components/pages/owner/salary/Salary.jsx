import { generateTestData, usePagination, Pagination } from "pagination-react-js"
import CurrentTime from '../../CurrentTime';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Salary = () => {
  const [query, setQuery] = useState(""); 
  const [ date, setDate] = useState();
  const { currentPage, entriesPerPage, entries } = usePagination(1, 11)

  const tok = window.localStorage.token
  const tokenn = tok.slice(1, (tok.length) -1)

//   const salaryAll = users.map(item => item.salary)
// const totalSalary = salaryAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);

// const totalDebtSummsAll = users.map(item => item.totalDebtSumms)
// const totalDebtAll = totalDebtSummsAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);


// Batafsil 

const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpenSalary, setIsModalOpenSalary] = useState(false);
const [isModalOpenAvans, setIsModalOpenAvans] = useState(false);
const [userDetails, setUserDetails] = useState(null);
const [userSalary, setUserSalary] = useState(null);
const [userAvans, setUserAvans] = useState(null);

useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://api.etradingcrm.uz/api/Employee/All');
      const items = response.data.filter(items => items.isDeleted === false);
    setUsers(items);
  } catch (error) {
    console.error('Foydalanuvchilar olishda xatolik yuz berdi:', error);
  }
};
// const totalSalary = items.reduce((total, item) => total + item.salary, 0);
const fetchUserDetails = async (userId) => {
  try {
    const response = await axios.get(`https://api.etradingcrm.uz/api/EmployeeDebt/All`);
    setUserDetails(response.data);
  } catch (error) {
    console.error('Foydalanuvchi ma`lumotlarini olishda xatolik yuz berdi:', error);
  }
};
const fetchUserSalary = async (userId) => {
  try {
    const response = await axios.get(`https://api.etradingcrm.uz/api/EmployeeSalary/${userId}`);
    setUserSalary(response.data);
  } catch (error) {
    console.error('Foydalanuvchi ma`lumotlarini olishda xatolik yuz berdi:', error);
  }
};
const fetchUserAvans = async (userId) => {
  try {
    const response = await axios.get(`https://api.etradingcrm.uz/api/EmployeeDebt/${userId}`);
    setUserSalary(response.data);
  } catch (error) {
    console.error('Foydalanuvchi ma`lumotlarini olishda xatolik yuz berdi:', error);
  }
};

const handleOpenModal = async (user) => {
  setSelectedUser(user);
  setIsModalOpen(true);
  await fetchUserDetails(user.id);
};
const handleRefreshClick = () => {
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setIsModalOpenSalary(false);
  setIsModalOpenAvans(false);
  setSelectedUser(null);
  setUserDetails(null);
  setUserSalary(null);
  setUserAvans(null);
};

// Salary 
const handleOpenSalary = async (user) => {
  setSelectedUser(user);
  setIsModalOpenSalary(true);
  await fetchUserSalary(user.id);
};
// Avans 
const handleOpenAvans = async (user) => {
  setSelectedUser(user);
  setIsModalOpenAvans(true);
  await fetchUserAvans(user.id);
};




// POST SALARY 
const [summs, setSumms] = useState('');
const handleSaveUser = async () => {

  const inputData = {
    "employeeId": selectedUser.id,
    'summs': parseInt(summs),
  };
  console.log(inputData);
  try {
    const response = await fetch('https://api.etradingcrm.uz/api/EmployeeSalary', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenn}`,
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    });
    const data = await response.json();
    console.log(data);
} catch (error) {
  console.error(error);
}
};

const handleNameChange = (event) => {
  setSumms(event.target.value);
};


// POST AVANS 
const [description, setDescription] = useState('');

const handleSaveUserAvans = async () => {

  const inputData = {
    employeeId: selectedUser.id,
    summs: Number(summs),
    description: (description),
  };
  console.log(inputData);
  try {
    const response = await fetch('https://api.etradingcrm.uz/api/EmployeeDebt', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenn}`,
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
    console.log(response)
} catch (error) {
  console.error(error);
}
// handleRefreshClick()
};


const handleDescriptionChange = (event) => {
  setDescription(event.target.value);
};



  return (
        <div>

    <div className="employeesTable">
      <table>
        <th>
      <tr className='th__title'>
        <td className='thItem'>Ismi</td>
        <td className='thItem'>Lavozimi</td>
        <td className='thItem'>Ish Haqi</td>
        <td className='thItem'>Avans</td>
        <td className='thItem'>Avans Tarixi</td>
      </tr>


    </th>

    <div className='input__div'>
                 <div className=''>
                     <input className='searchInput' type="search" placeholder='Workers name' 
                     
                     onChange={(e) => setQuery(e.target.value.toLowerCase())}
                     />
                 </div>

                 <div className="currentDateADDSALARY">
                   
                      <CurrentTime />
                
                 </div>
             
            {/* Create Salary */}
                 
             </div>
    <tbody>
    

    {users.filter((row) => row.name.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast).map((row) => (
           <tr className='tr__title' key={row.id}>
        <td key={row.id} className='trItem' component="th" scope="row">
          {row.name}
        </td>
        <td className='trItem' align="right">{row.position}</td>
        <td className='trItem' align='right'>{row.salary}</td>
        <td className='trItem' align="right">{row.totalDebtSumms}</td>
        <td className='trItemSalary' align='right'>
        <div className="AddSalaryBtns">
          <button className="salaryDetails" onClick={() => handleOpenModal(row)}>Batafsil</button>
        </div>
        <td/>

        {/* Batafsil modal  */}


        {isModalOpen && selectedUser && selectedUser.id === row.id && (
  <div className="modalbat">
    <div className="modalbat-content">
      {selectedUser.debts ? (
        <div className="AvansModalList"> 
          <h3 className="AvansModalListName">{selectedUser.name}</h3>
          <ol className="AvansList">{selectedUser.debts.map((item,index) => (
   
            <li key={index} className="AvansListItem">
              <b className="AvansListItemNum">{index+1}<b>.</b> </b>          
              <span className="AvansListItemTxt">Avans: {item.summs}</span>  
              <span className="AvansListItemTxt AvansListItemTxtDescriptiom">Izoh: {item.description}</span> 
              <span className="AvansListItemTxt">Date: {item.createdDate.slice(0,10)}</span>              
            </li>

          ))}</ol>
        </div>
      ) : (
        <p>No debts information available</p>
      )}
      <button className="SalaryModalCloseBtn" onClick={handleCloseModal}>Yopish</button>
    </div>
  </div>
)}
      

        </td>
      </tr>
    ))}
    </tbody>

    <div className="statistics">
    {/* <span className="profit">Umumiy ish haqi {totalSalary} UZS / 100%</span>
    <span className='spend'>Umumiy avans {totalDebtAll} / {(totalDebtAll/totalSalary*100).toFixed(4)}%</span> */}

     </div>
       
<Pagination 
  entriesPerPage={entriesPerPage.get}
  totalEntries={users.length}
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
    navNextCustom: "pagination-item"
  }}
  showFirstNumberAlways={true}
  showLastNumberAlways={true}
  navStart="&#171;" 
  navEnd="&#187;" 
  navPrev="&#x2039;" 
  navNext="&#x203a;" 
  navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7"}}
  navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7"}}
/>
      
  
  </table> 
</div> 


</div>

  )
}

export default Salary
