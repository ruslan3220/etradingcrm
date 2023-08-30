import React, { useState, useEffect } from "react";
import { usePagination, Pagination } from "pagination-react-js";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import CurrentTime from "../../CurrentTime";
import { Link } from "react-router-dom";
import "../../owner/productPrice/ProductPrice.css"


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddProductPrice = () => {

  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);

  const [query, setQuery] = useState("");

  const [items, setItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);

  const { currentPage, entriesPerPage, entries } = usePagination(1, 8);

  // Hooks
  const [date, setDate] = useState();
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
  const [description, setDesctiption] = useState("");
  const [price, setPrice] = useState("");
  const [select, setSelect] = useState("");
  const [category, setCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [optionChange, setOptionChange] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [foundOption, setFoundOption] = useState('');

  const [error, setError] = useState("")
console.log(error, "errr");
  const a = window.localStorage.token;


  const [productssold, setProductssold] = useState([]);



  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://api.etradingcrm.uz/api/Product/All?isOnSale=true'
        );

        if (response.ok) {
          const data = await response.json();
          setProductssold(data);
        } else {
          console.log('Failed to fetch products');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.etradingcrm.uz/api/Product/All")
      .then((res) => {
        setItems(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const obj = items.data;
  const arr = [];

  for (const i in obj) {
    if (Object.hasOwnProperty.call(obj, i)) {
      const element = obj[i];
      arr.push(element);
    }
  }
  // const [selectedProduct, setSelectedProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductChange = (event) => {
    event.preventDefault();
    setSelectedProduct(event.target.value)
  }
  

  const filteredProducts = arr.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductSelect = (event) => {
    const productId = event.target.value;
    setSelectedProduct(productId);
  };

  
  const handleSaleButtonClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      'Authorization', `Bearer ${tokenn}`,
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("productId", `${selectedProduct}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://api.etradingcrm.uz/api/Product/Sale", requestOptions)
    .then((response) => {
      response.text()
      if (response.ok) {
        handleRefreshClick();
      } else {
        throw new Error('Kerakli ma`lumotlarni to`ldiring!');
      } 
    })
    .then((result) => console.log(result))
    .catch( () => {
      setError("Kerakli ma`lumotlarni to`ldiring!");
    })
  };

  const [userIds, setUserIds] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch(
          "https://api.etradingcrm.uz/api/Product/All"
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const data = await response.json();
        const ids = data.map((user) => user.id);
        setUserIds(ids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserIds();
  }, []);

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const photoResponses = [];
        for (const userId of userIds) {
          const response = await fetch(`https://api.etradingcrm.uz/api/ProductPhoto/${userId}`);
  
          if (response.ok) {
            const photoData = await response.blob();
            const photoObject = URL.createObjectURL(photoData);
            photoResponses.push({ id: userId, url: photoObject });
          } else {
            photoResponses.push({ id: userId, url: null });
          }
        }
        setUserPhotos(photoResponses);
      } catch (error) {
        console.log(error);;
      }
    };
  
    if (userIds.length > 0) {
      fetchUserPhotos();
    }
  }, [userIds]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputData = {
      name: name,
      description: description,
      price: parseInt(price),
      category: parseInt(selectedOption),
    };

    try {
      const response = await fetch("https://api.etradingcrm.uz/api/Product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenn}`,
          accept: "*/*",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(inputData),
      })
      if (response.ok) {
        handleRefreshClick();
      } else {
        throw new Error('Kerakli ma`lumotlarni to`ldiring!');
      }
        } catch (err) {
          setError("Kerakli ma`lumotlarni to`ldiring!");
        }
        };
  
        // const handleWarning = () => {
        //   console.log("duddddddiiiiiiiiiiiiii");
        //   if (error) {
        //     return <div className="warning">{error}</div>;
        //   }
        //   return null;
        // };


  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDesctiption(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

    fetch("http://api.etradingcrm.uz/api/Employee/Update", requestOptions)
      .then((response) => response.text())
      .then(() => {
        setItems(updatedItems);
        setShowEditModal(false);
      })
      .catch((error) => console.log("error", error));
  };

  const productAll = arr.map((item) => item).length;

  const totelPriceAll = arr.map((item) => item.price);
  const priceAll = totelPriceAll.reduce(
    (oldValue, currentValue) => oldValue + currentValue,
    0
  );

  return (
    <div>
      <div className="input__divBlue">
        <div>
          <input
            className="searchInput"
            type="search"
            placeholder="Search . . ."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>

        <div className="currentDateTime">
          <CurrentTime />
        </div>
        <div className="ProductBtns">
        <button onClick={handleOpenModal} className="btnAddSale">
            <b>Sale</b>
            </button>

            <button
          className="btnAddWhite"
          handleAddExit={handleAdd}
          onClick={handleAdd}
          id="myBtn"
        >
          <b className="txtAddBlue">Add</b>
          <FaPlus className="FaPlusColor" />
        </button>
        </div>

        {modalOpen && (
          <div className="modal">
            <div style={{width:"800px", height:"200"}}  className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>

{/* <div className="selectionInput">
                <input
                  className="selectionInputSearch"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onInput={handleSearch}
                />
                <select
                  className="selectionInputSelect"
                  value={selectedProduct}
                  onChange={handleProductChange}
                >
                  <option selected value={null}>
                    Maxsulotlar
                  </option>
                  {filteredProducts.map((product) => (
                    <option
                      className="ProductSelectionOption"
                      key={product.productId}
                      value={product.id}
                    >
                      {product.name}
                    </option>
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
              <button onClick={handleSaleButtonClick}>Sale </button>
              <div style={{color:"red"}}>{error}</div>
            </div>
          </div>
        )}

      
        {/* Create Product */}

        <div id="myModal" className="modals">
          <div style={{ padding: "20px 0" }} className="modals-content">
            <span onClick={handleCli} className="close">
              &times;
            </span>
            <form className="modalForm" onSubmit={handleSubmit}>
              <span className="addEmployeeTxt">Product qo'shish</span>
              <label className="modalFormLabel" htmlFor="name">
                Name:
                <input
                  className="modalFormInput"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="description">
                Description:
                {/* <input className='modalFormInput' placeholder='description' type="text" name='description' value={description} onChange={handleLastNameChange}/> */}
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="price">
                Price:
                <input
                  className="modalFormInput"
                  placeholder="price"
                  type="number"
                  name="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="option">
                Category:
                <select
                  name="category"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value={4}>Piece</option>
                  <option value={1}>Metr</option>
                  <option value={2}>KvadratMetr</option>
                  <option value={3}>Kilogram</option>
                </select>
              </label>



              <button type="submit" className="modalFormBtn">
                Save
              </button>
            <div style={{color:"red"}}>{error}</div>
            </form>
          </div>
        </div>
      </div>
      <div className="products">
        <div className="productsItem">
          {productssold
            .filter((row) => row.name.toLowerCase().includes(query))
            .slice(entries.indexOfFirst, entries.indexOfLast)
            .filter((item) => userPhotos.some((photo) => photo.id === item.id))
            .map((item) => (
              <Link
                key={item.id}
                className="PdpLink"
                to={`PdpAdmin/${item.id}`}
              >
                <div className="product">
                  {userPhotos.map((photo) => {
                    if (photo.id === item.id) {
                      return (
                       <div>
                         <img
                          key={photo.id}
                          src={photo.url}
                          style={{width: "230px", height: "200px"  }}
                        />
                       </div>
                      );
                    }
                    return null;
                  })}
                  <p className="productName">{item.name}</p>
                  <span className="productPrice">{item.price} UZS</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div>
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">{/* Edit Employee */}</div>
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
        <span className="profit">Sotuvdagi maxsulotlar soni: {productssold.length}</span>
      </div>

      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={productssold.length}
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

export default AddProductPrice;
