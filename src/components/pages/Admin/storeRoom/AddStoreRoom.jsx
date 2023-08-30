import React, { useState,useEffect  } from 'react'
import { usePagination, Pagination } from "pagination-react-js"
import {MdDelete} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'
import {FaPlus}  from 'react-icons/fa'
import axios from 'axios';
import CurrentTime from '../../CurrentTime'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const AddStoreRoom   = () => {


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
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState('');
  const [selectedOption , setSelectedOption] = useState('')

  const [error, setError] = useState("")
  
  useEffect(() => {
    axios.get('https://api.etradingcrm.uz/api/Storage/All')
      .then(res => {
        const items = res.data;
        // console.log(res.data);
        setItems(items);
   


      })
      .catch(err => console.log(err));
  }, []);



// API POST ADD PRODUCT


const [productst, setProductst] = useState([]);
const [selectedProduct, setSelectedProduct] = useState('');
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  fetch('https://api.etradingcrm.uz/api/Product/All')
    .then(response => response.json())
    .then(data => setProductst(data))
    .catch(error => console.log(error));
}, []);

const handleProductChange = (event) => {
  setSelectedProduct(event.target.value);
};

const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

const filteredProducts = productst.filter(product => {
  return product.name.toLowerCase().includes(searchTerm.toLowerCase());
});


//CREATE PRODUCT



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
      'productId' : parseInt(selectedOption),
      'description': (description),
      'amount': parseInt(amount),

    };
    
  
    
    try {
      
      
      const response = await fetch('https://api.etradingcrm.uz/api/Storage', {
        
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenn}`,
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(inputData)
      });
      if (response.ok) {
        handleRefreshClick();
       } else {
         throw new Error('Kerakli ma`lumotlarni to`ldiring!');
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





  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  // Del modal 





  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.etradingcrm.uz/api/Storage/${selectedItem.id}`, {
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
        console.error('Delete request failed:', response.status, response.statusText);
      }
    } catch (error) {
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
    setAmount(item.amount);
    setDescription(item.description);
    setShowEditModal(true);
  };

  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };


  const handleSaveClick = () => {
    const updatedItems = items.map((item) => {
      if (item.id === selectedItems.id) {
        return { ...item, amount, description };
      }
      return item;
    });
  
    const id = selectedItems.id;
    const data = JSON.stringify({
      id,
      amount,
      description
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
  
    fetch('https://api.etradingcrm.uz/api/Storage', requestOptions)
      .then((response) => response.text())
      .then(() => {
        setItems(updatedItems);
        setShowEditModal(false);
      })
      .catch((error) => console.log('error', error));
     
  };



  return (
    <div>
          <table>
            <thead>
              <tr className='th__title' style={{listStyle:"none"}}>
                  <td className='thItemName'><b>Nomi</b></td>
                  <td className='thItemAmount'><b>Miqdori</b></td>
                  <td className='thItemDescription'><b>Izoh</b></td>
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

                             <label className="modalFormLabel" htmlFor="option">
                                Product:
                                   {/* <div className="ProductSelection">
                                   <input className="ProductSelectionSearch" type="text" placeholder="Search" value={searchTerm} onInput={handleSearch} />
                                   <select className="ProductSelectionSelect" name="productId" value={selectedOption} onChange={handleOptionChange}>
                                    <option className="ProductSelectionOption" value={null}>Maxsulotlar</option>
                                     {filteredProducts.map(product => (
                                  
                                       <option className="ProductSelectionOption" key={product.productId} value={product.id}>{product.name}</option>
                                     ))}
                                   </select>
                                 </div> */}
                                 <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={filteredProducts.map(item => item.name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />

                              </label>                

                         <label className='modalFormLabel' htmlFor="description">
                         Description:
                           <textarea name="description" cols="30" rows="10" value={description} onChange={handleDescriptionChange} />
                         </label>

                         <label className='modalFormLabel' htmlFor="amount">
                          Amount: 
                           <input  className='modalFormInput' placeholder='Amount' type="text" name='number' value={amount}
                           onChange={handleAmountChange}/>
                         </label>
                     
            

                         <button type='submit' className='modalFormBtn'>Save</button>

                         {handleWarning()}
                       </form>
                  </div>
                </div>
          </div>






          <table className='tbody'>
       <tbody>
       {items.filter((row) => row.product.name.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast,).map((item) => (
          <tr className='tr__title' key={item.id}>
            
             <td className='trItemName' component="th" scope="row">{item.product.name}</td>
             <td className='trItemAmount' align="right">{item.amount}</td>
             <td className='trItemDescription' align="right">{item.description}</td>
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
  
                
                        <label className='modalFormLabel' htmlFor="amount">
                          Miqdori:
                          <input className='modalFormInput' placeholder='Amount' type="number" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        </label>

                        <label className='modalFormLabel' htmlFor="name">
                          Izoh:  
                          <textarea name="description" id="" cols="30" rows="10" value={description} placeholder="Description"  onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>

          <button className='modalFormBtn' onClick={handleSaveClick }>Save</button>
        </div>
        </div>
      )}
    </div>


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="deleteModalTxt">Rostdan ham {selectedItem.product.name}ni o'chirmoqchimisiz?</h2>
            <button className="deleteModalYes" onClick={handleDelete}>Yes</button>
            <button className="deleteModalNo" onClick={handleHideModal}>No</button>
          </div>
        </div>
      )}

        

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

export default AddStoreRoom
