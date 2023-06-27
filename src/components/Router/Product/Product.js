import { Skeleton } from "antd";
import React, { useState, useEffect, useContext } from "react";
import Modal from "./Info/Modal";
import { LangContext } from "../../../Context/LangContext";

const Product = () => {
  const { language, setLanguage, weblanguages } = useContext(LangContext);

  // const [description, setDescription] = useState("");
  const [product, setProduct] = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedproduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((response) => {
          setProduct(response)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(true)
        });
   
  },[]);

  return (
    <div>
      {loading ? <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}> Loading...</div> :
      <section className="product">
      <div className="container">
        <div className="product-list">
          {product.map((item, index) => (
            <div className="product-item">
              <div className="product-image">
                <img src={item.image} alt="123" />
              </div>
              <label>{weblanguages[language].servicetitle}</label>
              <input value={item.title} type="text" />
              <label>{weblanguages[language].category}</label>
              <input value={item.category} type="text" />
              {/* <label>Description</label>
            <textarea value={item.description} onChange={(e)=>{setDescription(e.target.value)}}  cols="30" rows="10" /> */}
              <label>{weblanguages[language].price}</label>
              <input value={item.price} type="number" />
              <div className="product-rate">
                <label>{weblanguages[language].rate}</label>
                <input value={item.rating.rate} type="number" />
              </div>
              <div className="product-count">
                <label>{weblanguages[language].count}</label>
                <input value={item.rating.count} type="number" />
              </div>
              <div className="allbuttons">
                <button
                  onClick={() => {
                    setOpenModal(!openmodal);
                    setSelectedproduct(item);
                  }}
                  className="button-info"
                  type="button"
                >
                  {weblanguages[language].info}
                </button>
                <button className="button-delete" type="button">
                  {weblanguages[language].delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openmodal ? (
        <Modal
          setOpenModal={setOpenModal}
          selectedProduct={selectedProduct}
          product={product}
          setProduct={setProduct}
        />
      ) : null}
    </section>
      
      }
      
    </div>
  );
};

export default Product;
