import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Info = ({state,setState,id,show}) => {
const navigate=useNavigate();

const [infoModalData,setInfoModalData]=useState()


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${state.id}`)
      .then((response) => response.json())
      .then((response) => setInfoModalData(response))
      .catch((error) => console.log(error));
  },);

  return (
    <div
      onClick={() => {
        // setState({
        //   type: "SHOW",
        //   show: false,
        // });
        navigate(-1)
      }}
      className="addmodal-overlay"
    >
      <div
        onClick={(e) => {
          // e.stopPropagation();
          navigate(-1)
        }}
        className="addmodal"
      >
        <div className="modalheader">
          <div className="modaltext">Info</div>
          <div className="modalicon">
            <IoCloseSharp
              onClick={() => 
                {
                  // setState({  type: "SHOW",show: false,});
                  navigate("/producttwo")
                }
              }
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
              // setState({
              //   type: "SHOW",
              //   show: false,
              // });
              navigate("/producttwo")
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


