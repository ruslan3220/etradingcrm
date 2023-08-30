import React, { useState,useEffect  } from 'react'
import { usePagination, Pagination } from "pagination-react-js"
import {MdDelete} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'
import {FaPlus}  from 'react-icons/fa'
import axios from 'axios';
import CurrentTime from '../../CurrentTime'





const StoreRoom   = () => {

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


  useEffect(() => {
    axios.get('https://api.etradingcrm.uz/api/Storage/All')
      .then(res => {
        const items = res.data;
        // console.log(res.data);
        setItems(items);
   


      })
      .catch(err => console.log(err));
  }, []);







  return (
    <div>
          <table>
            <thead>
              <tr className='th__title' style={{listStyle:"none"}}>
                  <td className='thItemName'><b>Nomi</b></td>
                  <td className='thItemAmount'><b>Miqdori</b></td>
                  <td className='thItemDescription'><b>Izoh</b></td>
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


          </div>


          <table className='tbody'>
       <tbody>
       {items.filter((row) => row.product.name.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast,).map((item) => (
          <tr className='tr__title' key={item.id}>
            
             <td className='trItemName' component="th" scope="row">{item.product.name}</td>
             <td className='trItemAmount' align="right">{item.amount}</td>
             <td className='trItemDescription' align="right">{item.description}</td>
             

          </tr>
        ))}
       </tbody>
      </table>


        

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

export default StoreRoom
