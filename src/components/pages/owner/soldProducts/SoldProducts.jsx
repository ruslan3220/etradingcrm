import React, { useState, useEffect } from "react";
import { usePagination, Pagination } from "pagination-react-js";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import CurrentTime from "../../CurrentTime";

const SoldProducts = () => {
  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };



  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);

  const [query, setQuery] = useState("");

  const [items, setItems] = useState([]);
  const { currentPage, entriesPerPage, entries } = usePagination(1, 11);
  // Hooks
  const [date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [fil, setFil] = useState(items);
  const [month, setMonth] = useState("");


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

  useEffect(() => {
    axios
      .get("https://api.etradingcrm.uz/api/BSProduct/All?Category=2")
      .then((res) => {
        const items = res.data;
        setItems(items);
        setFil(items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const defaultMonthValue = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    setMonth(defaultMonthValue);
  }, []);

  const handleMonth = (e) => {
    const filtee = e.target.value;
    setMonth(filtee);
    const filteredData = items.filter((item) => {
      const itemDate = item.createdDate.slice(0, 7);
      return itemDate === filtee;
    });
    setFil(filteredData);
  };

  
  const totalDebtSummsAll = fil.map(item => item.amount)
  const totalDebtAll = totalDebtSummsAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);

  const totelPriceAll = fil.map(item => item.totalPrice)
  const priceAll = totelPriceAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);

 
  return (
    <div>
      <table>
        <thead>
          <tr className="th__title" style={{ listStyle: "none" }}>
            <td className="thItemName">
              <b>Nomi</b>
            </td>
            <td className="thItemAmount">
              <b>Miqdori</b>
            </td>
            <td className="thItemDescription">
              <b>Izoh</b>
            </td>
            <td className="thItemPrice">
              <b>Narxi</b>
            </td>
            <td className="thItemTotalPrice">
              <b>Umumiy narx</b>
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
            className="inputDate"
            type="month"
            value={month}
            onChange={handleMonth}
          />
        </div>

        <div className="currentDateTime">
          <CurrentTime />
        </div>



      </div>

      <table className="tbody">
        <tbody>
          {fil
            .filter((row) => row.product.name.toLowerCase().includes(query))
            .slice(entries.indexOfFirst, entries.indexOfLast)
            .map((item) => (
              <tr className="tr__title" key={item.id}>
                <td className="trItemName" component="th" scope="row">
                  {item.product.name}
                </td>
                <td className="trItemAmount" align="right">
                  {item.amount}
                </td>
                <td className="trItemDescription" align="right">
                  {item.description}
                </td>
                <td className="trItemPrice" align="right">
                  {item.price}
                </td>
                <td className="trItemTotalPrice" align="right">
                  {item.totalPrice}
                </td>                
              </tr>
            ))}
        </tbody>
      </table>


      <div className="statistics">
        <span className="profit">Sotilgan tovarlar: {totalDebtAll} ta</span>
        <span className="spend">Umumiy narx: {priceAll} UZS</span>
      </div>

      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={fil.length}
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

export default SoldProducts;
