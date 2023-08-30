import React, { useEffect, useState } from 'react';

const SelectProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    // API-dan productId va productName ma'lumotlarini olish
    fetch('https://api.etradingcrm.uz/api/Product/All')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div>
      <select value={selectedProduct} onChange={handleProductChange}>
        <option value="">Select a product</option>
        {products.map(product => (
          <option key={product.productId} value={product.id}>{product.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectProduct;








// import React, { useEffect, useState } from 'react';

// const SelectProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // API-dan productId va productName ma'lumotlarini olish
//     fetch('http://api.etradingcrm.uz/api/Product/All')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleProductChange = (event) => {
//     setSelectedProduct(event.target.value);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredProducts = products.filter(product => {
//     return product.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div>
//       <input type="text" placeholder="Search" value={searchTerm} onInput={handleSearch} />
//       <select value={selectedProduct} onChange={handleProductChange} >
//         <option value="">Select a product</option>
//         {filteredProducts.map(product => (
//           <option key={product.productId} value={product.id}>{product.name}</option>
//         ))}
//       </select>


//       <label htmlFor="product">
//         Product:  

//         <select value={selectedProduct} onChange={handleProductChange} >
//         <option value="">Select a product</option>
//         {filteredProducts.map(product => (
//           <option key={product.productId} value={product.id}>{product.name}</option>
//         ))}        
//       </select>

//         Amount: 
//       <input type="number"  />

//       </label>
//     </div>
//   );
// };

// export default SelectProduct;
















// import React, { useState } from 'react';

// const SelectProduct = () => {
//   const [items, setItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

//   const handleAddItem = () => {
//     setItems([...items, {}]);
//   };

//   const handleProductChange = (event) => {
//     setSelectedProduct(event.target.value);
//  };

//    const filteredProducts = products.filter(product => {
//     return product.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });
    

//   return (
//     <div>
//       <label htmlFor="product">
//         Product:
//         <select value={selectedProduct} onChange={handleProductChange}>
//           <option value="">Select a product</option>
//           {filteredProducts.map(product => (
//             <option key={product.productId} value={product.id}>{product.name}</option>
//           ))}
//         </select>
//         Amount:
//         <input type="number" />
//       </label>
//       <div>
//         <button onClick={handleAddItem}>Add Item</button>
//       </div>
//       {items.map((item, index) => (
//         <div key={index}>
//           {/* Additional item content */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SelectProduct;