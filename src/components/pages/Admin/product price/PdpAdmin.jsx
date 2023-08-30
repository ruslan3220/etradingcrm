import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const PdpAdmin = () => {
  const { id } = useParams();
  const [sum, setSum] = useState("");
  const [sumAmount, setSumAmount] = useState("");
  const [product, setProduct] = useState(null);
  const [inputRows, setInputRows] = useState([
    { compositionId: "", amount: "" },
  ]);
  const [products, setProducts] = useState([]);

  const [productst, setProductst] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDel, setSearchTermDel] = useState("");
  const [selectedProductDelete, setSelectedProductDelete] = useState("");

  const [image, setImage] = useState("");

  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);



  // -----------------


    const handleRefreshClick = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };


  // -----------

  useEffect(() => {
    fetch("https://api.etradingcrm.uz/api/Product/All")
      .then((response) => response.json())
      .then((data) => setProductst(data))
      .catch((error) => console.log(error));
  }, []);

  const handleProductChange = (event) => {
    event.preventDefault();
    setSelectedProduct(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productst.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

// del
const [selectedCompositionId, setSelectedCompositionId] = useState(null);

const handleSearchDel = (event) => {
  setSearchTermDel(event.target.value);
};

const filteredProductsDel = productst.filter((product) => {
  return product.name.toLowerCase().includes(searchTermDel.toLowerCase());
});


const handleCompositionChange = (event) => {
  event.preventDefault();
  setSelectedCompositionId(event.target.value);
};

const handleDeleteAllCompositions = async () => {
  if (product && product.compositions) {
    const compositionIds = product.compositions;
    let selectedProductId = null;
    for (let i = 0; i < compositionIds.length; i++) {
      if (compositionIds[i].productId) {
        selectedProductId = compositionIds[i].productId;
        break;
      }
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization", `Bearer ${tokenn}`,
    );

    var raw = JSON.stringify([selectedCompositionId]);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.etradingcrm.uz/api/Composition?ProductId=${selectedProductId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  } 
  handleRefreshClick()
};

// get image

useEffect(() => {
  const fetchImage = async () => {
    try {
      const response = await fetch(
        `https://api.etradingcrm.uz/api/ProductPhoto/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  fetchImage();
}, [id]);

// Delete products

const handleProductChangeDelete = (event) => {
  event.preventDefault();
  setSelectedProduct(event.target.value);
};

const handleSearchDelete = (event) => {
  setSelectedProductDelete(event.target.value);
};



  useEffect(() => {
    fetch(`https://api.etradingcrm.uz/api/Product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.etradingcrm.uz/api/Product/All"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleChange = (evt) => {
    let rama = product.price;
    let num = evt.target.value;
    setSum(num * rama);
    setSumAmount(num);
  };

  // Selecttions

  const handleAddRow = () => {
    setInputRows([...inputRows, { compositionId: "", amount: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...inputRows];
    updatedRows.splice(index, 1);
    setInputRows(updatedRows);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...inputRows];
    updatedRows[index][name] = value;
    setInputRows(updatedRows);
  };


  const handleSave = async () => {
    try {
      const compositions = inputRows.map((row) => ({
        compositionId: parseInt(selectedProduct),
        amount: parseInt(row.amount),
      }));

      const payload = {
        productId: parseInt(id),
        compositionIds: compositions,
      };

      const response = await fetch(
        "https://api.etradingcrm.uz/api/Composition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log(data);

      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
    handleRefreshClick()
  };

  // Image POST

  const handleSaveImage = async () => {
    try {
      const fileInput = document.getElementById("imageInput");
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("image", file);
      formData.append("productId", product.id);

      const response = await fetch(
        "https://api.etradingcrm.uz/api/ProductPhoto",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuu");
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    handleRefreshClick()
  };

  return (
    <div className="pdpContainer">
      <div className="pdpItem">
      <div className="Pdp">
          <div className="PdpInformation">
            {image && (
              <img className="pdpImg" src={image} alt="Product Photo" />
            )}
            <div className="pdpInfo">
              <h3 className="pdpName">
                {" "}
                Maxsulot nomi: {product.name || "Product Name Not Available"}
              </h3>
              <span className="PdpPrice">
                <b>Maxsulot narxi:</b> {product.price}
              </span>
              <p className="pdpDescription">
                <b>Maxsulot tavsifi:</b> {product.description}
              </p>
            </div>
          </div>
          <div className="PdpListDetails">
            <ol className="pdpList">
              <b>Tarkibi:</b>
              {product.compositions.map((item) => (
                <li className="pdpListItem">
                  <div className="pdpListItemDetails">
                    <span className="pdpListItems">
                      {" "}
                      <b>Nomi:</b>
                      {item.compositionName}
                    </span>
                    <span className="pdpListItems">
                      {" "}
                      <b>Miqdori:</b>{" "}
                      {item.amount && sumAmount
                        ? item.amount * sumAmount
                        : item.amount}
                    </span>
                    <span className="pdpListItems">
                      {" "}
                      <b>Narxi:</b>
                      {item.price && sumAmount
                        ? item.price * sumAmount
                        : item.price}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <span className="pdpTotalPrice">Umumiy Narx: {sum} UZS</span>

            <input
              className="PdpNumber"
              type="number"
              onChange={handleChange}
            />
          </div>
        </div>

        

        <div className="PdpInputs">
          <div className="PdpInputPhoto">
            Rasm:
            <input
              className="photoInput"
              type="file"
              placeholder="Photo"
              id="imageInput"
              accept="image/*"
            />
            <button className="SalaryModalSaveBtn" onClick={handleSaveImage}>
              Save
            </button>
          </div>

          {inputRows.map((row, index) => (
            <div key={index}>
              {index === inputRows.length - 1 && (
                <button
                  className="removeInputBtn"
                  onClick={() => handleRemoveRow(index)}
                >
                  Remove
                </button>
              )}

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
              <input
                className="ProductAmountInput"
                placeholder="Miqdori"
                type="number"
                name="amount"
                value={row.amount}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
          ))}
          <div className="ProductinputBtns">
            <button className="SalaryModalSaveBtn" onClick={handleAddRow}>
              Add
            </button>
            <button className="SalaryModalSaveBtn" onClick={handleSave}>
              Save
            </button>
          </div>

          <div>



{/* <div className="selectionInput">
    <input
      className="selectionInputSearch"
      type="text"
      placeholder="Search"
      value={searchTermDel}
      onInput={handleSearchDel}
    />
    <select
      className="selectionInputSelect"
      value={selectedCompositionId}
      onChange={handleCompositionChange}
    >
      <option value={null}>Select a composition</option>
      {filteredProductsDel.map((product) => (
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
      options={filteredProductsDel.map(item => item.name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />

<button
  className="removeInputBtn"
  onClick={handleDeleteAllCompositions}
>
  Delete
</button>
</div>
        </div>
      </div>
      

    </div>
  );
};

export default PdpAdmin;
