import React, {useEffect, useState } from "react";

const BasketProduct = ({basket}) => {

  // useEffect(() => {
  //  const basket=JSON.parse(localStorage.getItem("basket"))
  //  if(basket){
  //   setBasket(basket)
  //  }
  // }, [])
  

  return (
    <>
      <div>
        <h2>Checkout</h2>
        <div className="cardlist">
          {basket?.map((item, index) => (
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
