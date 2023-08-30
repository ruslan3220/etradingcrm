import React, { useState,useEffect  } from 'react'
import { usePagination, Pagination } from "pagination-react-js"
import {MdDelete} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'
import {FaPlus}  from 'react-icons/fa'
import axios from 'axios';
import CurrentTime from '../CurrentTime'



const CreateUser = () => {


  const d = "Bearer"

  const tok = window.localStorage.token
  const tokenn = tok.slice(1, (tok.length) -1)


  const [query, setQuery] = useState("");
  
  
  const [items, setItems] = useState([]); 
  const { currentPage, entriesPerPage, entries } = usePagination(1, 10)
  // Hooks 
  const [ date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [password, setPassword ] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [phone , setPhone] = useState('');
  const [selectedOption , setSelectedOption] = useState('')
  const [role, setRole] = useState('')

  const [error, setError] = useState("")

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenn}`,
      },
    };
  
    axios.get('https://api.etradingcrm.uz/api/User/All' , config)
      .then(res => {
        const items = res.data;
        setItems(items);
      })
      .catch(err => console.log(err));
  }, []);



// API POST ADD EDIT USER


//CREATE USER


const handleRefreshClick = () => {
  window.location.reload();
};


  // Modal  

  const handleAdd = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block"
  }

  const handleCli = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"
  }

    const handleSubmit = async (event) => {
    event.preventDefault();
    
    const inputData = {
      'phone': (phone),
      'password': (password),
      'role' : parseInt(selectedOption),
    };
    console.log(inputData);
    try {

      const response = await fetch('https://api.etradingcrm.uz/api/User', {        
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenn}`,
          'accept': '*/*',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify(inputData)
      })
      if (response.ok) {
        handleRefreshClick();
      } else {
        throw new Error('Kerakli ma`lumotlarni to`ldiring!');
      }
  } catch (error) {
   setError("Kerakli ma`lumotlarni to`ldiring!")
  }
};




  const handlePhoneChange = (event) => {
   setPhone(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  // Del modal 





  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.etradingcrm.uz/api/User/${selectedItem.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokenn}`,
          }
        });
  

      if (response.ok) {
        const updatedItems = items.filter(item => item.id !== selectedItem.id  );
        setItems(updatedItems);

        setShowModal(false);
      } else {
        // Handle error response
        console.error('Delete request failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Delete request error:', error);
    }
  };

  
  const handleShowModal = item => {
    setSelectedItem(item);
    setShowModal(true);
  };
  
  const handleHideModal = () => {
    setShowModal(false);
  };


  // Edit modal 

  const handleEditClick = (item) => {
    setSelectedItems(item);
    setPhone(item.phone);
    setPassword(item.password);
    setShowEditModal(true);
  };




  const handleSaveClick = () => {
    const updatedItems = items.map((item) => {
      if (item.id === selectedItems.id) {
        return { ...item, phone, password , role};
      }
      return item;
    });
  
    const id = selectedItems.id;
    const data = JSON.stringify({
      id,
      phone: (phone),
      password: (password),
      role : parseInt(selectedOption),
    });
  
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${tokenn}`); 
  
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };
  
    fetch('https://api.etradingcrm.uz/api/User', requestOptions)
      .then((response) => response.text())
      .then((response) => {
        setItems(updatedItems);
        if (response.ok) {
          handleRefreshClick();
          setShowEditModal(false);
        } else {
          throw new Error('Kerakli ma`lumotlarni to`ldiring!');
        }
      })
      .catch(() => {setError("Kerakli ma`lumotlarni to`ldiring!")});
  };



  return (
    <div>
          <table>
            <thead>
              <tr className='th__title' style={{listStyle:"none"}}>
                  <td className='thItemName'><b>UserName</b></td>
                  <td className='thItemRole'><b>UserRole</b></td>
                  <td className='action'><b>Action</b></td>
              </tr>
            </thead>
          </table>

          <div className='input__div'>
                 <div>
                     <input className='searchInput' type="search" placeholder='Search . . .'                 
                     onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                 </div>



                 <div className="currentDateTime">
                   
                   <CurrentTime/>
             
                </div>

                 <button className='btnAdd' onClick={handleAdd} id="myBtn" ><b className='txtAdd'>Add</b><FaPlus color='white'/></button>
{/* Create Product */}

                <div id="myModal" className="modals">
                  <div style={{padding: "20px 0"}} className="modals-content">
                    <span onClick={handleCli} className="close">&times;</span>
                    <form className='modalForm' onSubmit={handleSubmit}>
                           <span className='addEmployeeTxt'>Product qo'shish</span>

                

                         <label className='modalFormLabel' htmlFor="phone">
                         UserName:
                           <input className='modalFormInput' type='text' name="phone" placeholder='UserName'  onChange={handlePhoneChange} />
                         </label>

                         <label className='modalFormLabel' htmlFor="password">
                          Password: 
                           <input  className='modalFormInput' placeholder='password' type="password" name='password' value={password}
                           onChange={handlePasswordChange}/>
                         </label>

                         <label className='modalFormLabel' htmlFor="role">
                           UserRole:
                             <select name="role" value={selectedOption} onChange={handleOptionChange}>
                              <option value={null}>UserRole</option>
                               <option value={1}>Owner</option>
                               <option value={2}>Admin</option>
                             </select>                                              
                             
                             </label>
                     
            

                         <button type='submit' className='modalFormBtn'>Save</button>
                         <div style={{color:"red"}}>{error}</div>

                       </form>
                  </div>
                </div>
          </div>






          <table className='tbody'>
       <tbody>
       {items.filter((row) => row.phone.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast,).map((item) => (
          <tr className='tr__title' key={item.id}>
            
             <td className='trItemName' component="th" scope="row">{item.phone}</td>
             <td className='trItemRole' align="right"><p>{item.role === 1 ? 'Owner' : item.role === 2 ? 'Admin' : ''}</p></td>
             <div className="trItemBtns">
              <button onClick={() => handleEditClick(item)} className='editBtn' align='right'>{<GrEdit/>}</button>
              <button  onClick={() => handleShowModal(item)} id='myButton' className='deleteBtn' align='right' >{<MdDelete/>} </button>
            </div>
             

          </tr>
        ))}
       </tbody>
      </table>

      <div>
      {showEditModal && ( 
        <div className='modal'>
          <div className='modal-content'>
          {/* Edit Product */}
  

                         <label className='modalFormLabel' htmlFor="phone">
                              UserName:
                              <input className='modalFormInput' type='text' name="phone" placeholder='UserName' value={phone}  onChange={(e) => setPhone(e.target.value)} />
                         </label>

                         <label className='modalFormLabel' htmlFor="password">
                              Password: 
                              <input  className='modalFormInput' placeholder='password' type="password" name='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                         </label>

                         <label className='modalFormLabel' htmlFor="role">
                              UserRole:
                              <select name="role" value={selectedOption}  onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value={null}>UserRole</option>
                                <option value={1}>Owner</option>
                                <option value={2}>Admin</option>
                             </select>                                                                           
                          </label>
          <button className='modalFormBtn' onClick={handleSaveClick }>Save</button>
                
          <div style={{color:"red"}}>{error}</div>
        </div>
        </div>
      )}
    </div>


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="deleteModalTxt">Rostdan ham {selectedItem.phone}ni o'chirmoqchimisiz?</h2>
            <button className="deleteModalYes" onClick={handleDelete}>Yes</button>
            <button className="deleteModalNo" onClick={handleHideModal}>No</button>
          </div>
        </div>
      )}

<div className="statistics">
    <span className="profit">Umumiy xodimlar soni: {35}</span>
    <span className='spend'>Umumiy oylik maosh: {"30 000 000"} UZS</span>

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
    </div>
  )
}

export default CreateUser
