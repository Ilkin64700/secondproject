import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "antd";
import Info from "../Product/Info/Info";
import SkeletonCard from "./SkeletonCard";
import { LangContext } from "../../../Context/LangContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import  "../../../Sass/product.scss";
import { Link } from "react-router-dom";
import { BasketContext } from "../../../Context/BasketContext";

const ProductTwo = () => {
  const {basket,setBasket}=useContext(BasketContext)

  const { language, setLanguage, weblanguages } = useContext(LangContext);
  const [product, setProduct] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false)


  const AddBasket = (item) => {
    setBasket([...basket, item]);
  };

  console.log("basket", basket);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => console.log(error));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className="row m-2">
        <div className="product-header">
          <h2>Products</h2>
          <div className="basket">
            {!!basket.length && <div className="basket-count">
              {basket.length}
            </div>}
            <button className="btn btn-warning">
             <Link to="/basketproduct">
             <i className="bi bi-cart4"></i>
             </Link>
            </button>
          </div>
        </div>
        {product.map((item) =>
          loading ? (
            <SkeletonCard />
          ) : (
            <div key={item.id} className="col-2">
              <div>
                <div className="card p-2 m-2">
                  <img
                    src={item.image}
                    width="100px"
                    height="100px"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {weblanguages[language].cardtitle}
                    </h5>
                    <p className="card-text">
                      {item.title.length > 10 ? (
                        <Tooltip placement="top" title={item.title}>
                          {item.title.slice(0, 10)}...
                        </Tooltip>
                      ) : (
                        item.title
                      )}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setId(item.id);
                        setShow(!show);
                      }}
                    >
                      {weblanguages[language].info}
                    </button>
                    
                    <button
                      onClick={() => {
                        AddBasket(item);
                      }}
                      className="btn btn-primary ms-4"
                    >
                      AddBasket
                    </button>
                    <label>AddProduct</label>
                    <input checked={true} onChange={(e)=>{console.log(setCheck("check",e.target.value))}} type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {show ? (
        <Info
          show={show}
          setShow={setShow}
          product={product}
          setProduct={setProduct}
          id={id}
        />
      ) : null}
    </>
  );
};

export default ProductTwo;
