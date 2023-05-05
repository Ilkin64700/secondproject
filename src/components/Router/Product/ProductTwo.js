import React, { useContext, useEffect, useReducer, useState } from "react";
import { Tooltip } from "antd";
import Info from "../Product/Info/Info";
import SkeletonCard from "./SkeletonCard";
import { LangContext } from "../../../Context/LangContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../Sass/product.scss";
import { Link } from "react-router-dom";

const reducer=(state,setState)=>{
  switch (setState.type) {
    case "PRODUCT":
      return {
        ...state,
        product:setState.product,
      };
      case "LOADING" :
        return {
          ...state,
          loading:setState.loading,
        };
        case "ID":
          return {
            ...state,
            id:setState.id
          };
          case "SHOW" :
          return {
            ...state,
            show:setState.show
          };
          case "BASKET":
            return {
              ...state,
              basket:setState.basket
            }
        default:
  }
}

const ProductTwo = ({basket,setBasket}) => {
  const {language, setLanguage, weblanguages } = useContext(LangContext);
  const [product, setProduct] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  // const [loading, setLoading] = useState(false);



const [state, setState] = useReducer(reducer,{
  loading:false,
  product:[],
  id:0,
  show:false,
})

  const AddBasket = (e, item) => {
    if (e.target.checked) {
      // setBasket([...basket, item]);
      setState({
        type:"BASKET",
        basket:[...state.basket,item]
      })
    } else {
      const uncheckedbasket = basket.filter((basket) => basket.id !== item.id);
      setBasket(uncheckedbasket);
    }
  };

  // console.log("basket", basket);

  
  const loadProduct=async()=>{
    // setLoading(true);
    const response= await fetch("https://fakestoreapi.com/products")
    if (response.ok && response.status===200) {
      const data=await response.json();
      // setProduct(data);
      // setLoading(false);

      setState({type:"PRODUCT",
      product:data})

      setState({
        type:"LOADING",
        loading:false
      })
    }
  }

  useEffect(() => {
   loadProduct();
  }, [])
  

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://fakestoreapi.com/products")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setProduct(response);
  //     })
  //     .catch((error) => console.log(error));
  //   setTimeout(() => {
  //     setLoading(false);
     
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("basket", JSON.stringify(basket));
  // }, [basket]);

  return (
    <>
      <div className="row m-2">
        <div className="product-header">
          <h2>Products</h2>
          <div className="basket">
            {!!basket.length && (
              <div className="basket-count">{basket.length}</div>
            )}
            <button className="btn btn-warning">
              <Link to="basketproduct">
                <i className="bi bi-cart4"></i>
              </Link>
            </button>
          </div>
        </div>
        {state.product?.map((item, index) =>
          state.loading ? (
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
                        setState({
                          type:"ID",
                          id:item.id,
                        })
                        setState({
                          type:"SHOW",
                          show:true
                        })
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
                    <div className="checkedproduct">
                    <label>
                      AddProduct
                      </label>
                      <input
                        type="checkbox"
                        checked={basket.map((product) => product.id).includes(item.id)}
                        onChange={(e) =>  AddBasket(e,item)}
                      />
                    </div>
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


// localStorage.getItem("basket") || []