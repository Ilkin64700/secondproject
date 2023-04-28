import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

const Info = ({show,setShow,product,setProduct,id}) => {

const [infoModalData,setInfoModalData]=useState()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((response) => setInfoModalData(response))
      .catch((error) => console.log(error));
  },);

  return (
    <div
      onClick={() => {
        setShow(false);
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
              onClick={() => setShow(false)}
              className="closeicon"
            />
          </div>
        </div>
        <div className="formcontent">
          <label>Title</label>
          <input
            value={infoModalData?.title}
            type="text"
          />
          <label>Category</label>
          <input
            value={infoModalData?.category}
            type="text"
            cols="60"
          ></input>
          <label>Price</label>
          <input
            value={infoModalData?.price}
            type="number"
          />
          <div className="product-rate">
            <label>Rate</label>
            <input
              value={infoModalData?.rating.rate}
              type="number"
            />
          </div>
          <div className="product-count">
            <label>Count</label>
            <input
              value={infoModalData?.rating.count}
              type="number"
            />
          </div>
          <button
            onClick={() => {
              setShow(false);
            }}
            className="savebutton"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Info


