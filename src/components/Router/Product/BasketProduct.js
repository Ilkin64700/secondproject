import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BasketProduct = () => {
  const navigate=useNavigate();


  const [basketproductitems, setBasketProductItems] = useState([]);


  useEffect(() => {
   const basketproducts=JSON.parse(localStorage.getItem("basket"))
   if(basketproducts){
    setBasketProductItems(basketproducts)
   }
  }, [])



  return (
    <>
      <div>
        <h2>Checkout</h2>
        <button onClick={()=>{navigate(-1)}}  className="btn btn-info backto ">
          Back to</button>
        <div className="cardlist">
          {basketproductitems?.map((item, index) => (
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={item.image}
                width="100px"
                height="100px"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BasketProduct;
