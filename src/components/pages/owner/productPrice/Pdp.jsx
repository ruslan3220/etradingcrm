import React from "react";
import rvz from "../../../../assets/rvz.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Pdp = () => {
  const { id } = useParams();
  const [sum, setSum] = useState("");
  const [sumAmount, setSumAmount] = useState("");
  const [product, setProduct] = useState(null);
  const [inputRows, setInputRows] = useState([{ compositionId: "", amount: "" }]);
  const [products, setProducts] = useState([]);

  const [productst, setProductst] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [image, setImage] = useState("");

  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);





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





  useEffect(() => {
    fetch('https://api.etradingcrm.uz/api/Product/All')
      .then(response => response.json())
      .then(data => setProductst(data))
      .catch(error => console.log(error));
  }, []);

  const handleProductChange = (event) => {
    event.preventDefault()
    setSelectedProduct(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productst.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });


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
    setSumAmount(num)
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
            {product.compositions.map(item => (
                <li className="pdpListItem">
                    <div className="pdpListItemDetails">
                    <span className="pdpListItems"> <b>Nomi:</b>{item.compositionName}</span>
                    <span className="pdpListItems"> <b>Miqdori:</b> { item.amount && sumAmount ? item.amount * sumAmount : item.amount}</span>
                    <span className="pdpListItems"> <b>Narxi:</b>{item.price && sumAmount ? item.price * sumAmount : item.price}</span>
                    </div>
                </li>
                ))}
            </ol>
         
            <span className="pdpTotalPrice">Umumiy Narx: {sum} UZS</span>
              
            <input className="PdpNumber" type="number" onChange={handleChange} />
          </div>
          
        </div>
          </div>
    </div>
  );
};

export default Pdp;
