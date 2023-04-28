import React, { useContext } from "react";
import { BasketContext } from "../../../Context/BasketContext";

const BasketProduct = () => {
  const { basket, setBasket } = useContext(BasketContext);

  return (
    <>
    <div>
        <h2>Checkout</h2>
       <div className="cardlist">
       {basket.map((item, index) => (
        <div class="card" style={{ width: "18rem" }}>
          <img
            src={item.image}
            width="100px"
            height="100px"
            class="card-img-top"
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
