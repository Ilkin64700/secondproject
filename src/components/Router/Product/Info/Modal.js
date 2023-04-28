import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({
  setOpenModal,
  product,
  selectedProduct,
  setProduct,
}) => {



  // console.log("rate", selectedProduct.rating.rate);
  // console.log("count", selectedProduct.rating.count);

  return (
    <div
      onClick={() => {
        setOpenModal(false);
      }}
      className="addmodal-overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="addmodal"
      >
        <div className="modalheader">
          <div className="modaltext">Info</div>
          <div className="modalicon">
            <IoCloseSharp
              onClick={() => setOpenModal(false)}
              className="closeicon"
            />
          </div>
        </div>
        <div className="formcontent">
          <label>Title</label>
          <input
            onChange={(event) => {
              const updatedProduct = product.map((item, i) => {
                if (item.id === selectedProduct.id) {
                  return {
                    ...item,
                    title: event.target.value,
                  };
                } else {
                  return item;
                }
              });
              setProduct(updatedProduct);
            }}
            value={
              product?.filter(
                (filtered) => filtered.id === selectedProduct.id
              )?.[0].title
            }
            type="text"
          />
          <label>Category</label>
          <input
            onChange={(event) => {
              const updatedProduct = product.map((item, i) => {
                if (item.id === selectedProduct.id) {
                  return {
                    ...item,
                    category: event.target.value,
                  };
                } else {
                  return item;
                }
              });
              setProduct(updatedProduct);
            }}
            value={
              product?.filter(
                (filtered) => filtered.id === selectedProduct.id
              )?.[0].category
            }
            type="text"
            cols="60"
          ></input>
          <label>Price</label>
          <input
            onChange={(event) => {
              const updatedProduct = product.map((item, i) => {
                if (item.id === selectedProduct.id) {
                  return {
                    ...item,
                    price: event.target.value,
                  };
                } else {
                  return item;
                }
              });
              setProduct(updatedProduct);
            }}
            value={
              product?.filter(
                (filtered) => filtered.id === selectedProduct.id
              )?.[0].price
            }
            type="number"
          />
          <div className="product-rate">
            <label>Rate</label>
            <input
              onChange={(event) => {
                const updatedProduct = product.map((item, i) => {
                  if (item.id === selectedProduct.id) {
                    return {
                      ...item,
                      rating: {
                        rate: event.target.value,
                      },
                    };
                  } else {
                    return item;
                  }
                });
                setProduct(updatedProduct);
              }}
              value={
                product?.filter(
                  (filtered) => filtered.id === selectedProduct.id
                )?.[0].rating.rate
              }
              type="number"
            />
          </div>
          <div className="product-count">
            <label>Count</label>
            <input
              onChange={(event) => {
                const updatedProduct = product.map((item, i) => {
                  if (item.id === selectedProduct.id) {
                    return {
                      ...item,
                      rating: {
                        count: event.target.value,
                      },
                    };
                  } else {
                    return item;
                  }
                });
                setProduct(updatedProduct);
              }}
              value={
                product?.filter(
                  (filtered) => filtered.id === selectedProduct.id
                )?.[0].rating.count
              }
              type="number"
            />
          </div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="savebutton"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
