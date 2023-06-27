import React, { useContext, useEffect, useReducer } from "react";
import { Tooltip } from "antd";
import Info from "../Product/Info/Info";
import SkeletonCard from "./SkeletonCard";
import { LangContext } from "../../../Context/LangContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../Sass/product.scss";
import { Link, Route, Routes } from "react-router-dom";

// const reducer = (state, setState) => {
//   switch (setState.type) {
//     case "PRODUCT":
//       return {
//         ...state,
//         product: setState.product,
//       };
//     case "LOADING":
//       return {
//         ...state,
//         loading: setState.loading,
//       };
//     case "ID":
//       return {
//         ...state,
//         id: setState.id,
//       };
//     case "SHOW":
//       return {
//         ...state,
//         show: setState.show,
//       };
//     case "BASKET":
//       return {
//         ...state,
//         basket: setState.basket,
//       };
//     case "SEARCH":
//       return {
//         ...state,
//         search: setState.search,
//       };
//     case "INFOMODAlDATA":
//       return {
//         ...state,
//         infoModalData: setState.infoModalData,
//       };
//     case "BASKETPRODUCTITEMS":
//       return {
//         ...state,
//         basketproductitems: setState.basketproductitems,
//       };
//     default:
//   }
// };

const ProductTwo = ({ location, background }) => {
  const { language, setLanguage, weblanguages } = useContext(LangContext);
  // const [product, setProduct] = useState([]);
  // const [id, setId] = useState();
  // const [show, setShow] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState("");
  // const [basket, setBasket] = useState([]);

  // const [state, setState] = useReducer(reducer, {
  //   loading: false,
  //   product: [],
  //   id: 0,
  //   show: false,
  //   basket: [],
  //   search: "",
  //   infoModalData: null,
  //   basketproductitems: [],
  // });

  const [state, setState] = useReducer((prevState,newState)=>({...prevState,...newState}), {
    loading: false, 
    product: [],
    id: 0,
    show: false,
    basket: [],
    search: "",
    infoModalData: null,
    basketproductitems: [],
  });


  const AddBasket = (e, item) => {
    if (e.target.checked) {
      // setBasket([...basket, item]);
      setState({
        // type: "BASKET",
        basket: [...state.basket, item],
      });
    } else {
      const uncheckedbasket = state.basket.filter(
        (basket) => basket.id !== item.id
      );
      setState({
        // type: "BASKET",
        basket: uncheckedbasket,
      });
    }
  };

  // const addButtonBasket = (item) => {
  //   setState([...state.basket, item]);
  // };

  const loadProduct = async () => {
    // setLoading(true);
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok && response.status === 200) {
      const data = await response.json();
      // setProduct(data);
      // setLoading(false);

      setState({ 
        // type: "PRODUCT",
         product: data });

      setState({
        // type: "LOADING",
        loading: false,
      });
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  // const SearchProduct=(e)=>{
  //   e.preventDefault();
  //   setSearch(e.target.value);
  //   if(search.length>0)
  //   {
  //     product.filter((productitem)=>{
  //       return productitem.title.match(search);

  //     })
  //   }
  // }
  // console.log("1111",SearchProduct)

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

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]);

  return ( 
    <>
      {
        background && (
          <Routes>
        <Route
          path={location.pathname + "/info"}
          element={<Info state={state} setState={setState} />}
        ></Route>
      </Routes>
        )
      }
      <div className="row m-2">
        <div className="product-header">
          <h2>Products</h2>
          <input
            type="search"
            placeholder="Search"
            value={state.search}
            onChange={(e) => {
              setState({
                // type: "SEARCH",
                search: e.target.value,
              });
            }}
          />
          <div className="basket">
            {!!state.basket.length && (
              <div className="basket-count">{state.basket.length}</div>
            )}
            <button className="btn btn-warning">
              <Link to="basketproduct">
                <i className="bi bi-cart4"></i>
              </Link>
            </button>
          </div>
        </div>
        {state.product
          .filter((productitem) =>
            productitem.title.toLowerCase().includes(state.search.toLowerCase())
          )
          .map((item, index) =>
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
                            // type: "ID",
                            id: item.id,
                          });
                          setState({
                            // type: "SHOW",
                            show: true,
                          });
                        }}
                      >
                        <Link to="./info" state={{background:location}}>
                          {weblanguages[language].info}
                        </Link>
                      </button>

                      <button
                        onClick={() => {
                          // addButtonBasket(item);
                        }}
                        className="btn btn-primary ms-4"
                      >
                        AddBasket
                      </button>
                      <div className="checkedproduct">
                        <label>AddProduct</label>
                        <input
                          type="checkbox"
                          checked={state.basket
                            .map((product) => product.id)
                            .includes(item.id)}
                          onChange={(e) => AddBasket(e, item)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      {state.show ? (location.pathname ==="/producttwo/info"  ? <Info state={state} setState={setState}/> : null) : null}
    </>
  );
};

export default ProductTwo;

// localStorage.getItem("basket") || []
