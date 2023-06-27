import React, { useContext, useEffect, useState } from "react";
import customerslist from "../customers-list.json";
import { LangContext } from "../../Context/LangContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const User = () => {
  // const {page : currentRoutePage} =useParams();
  // const navigate=useNavigate();

  const [searchParams,setSearchParams] = useSearchParams()
  
  // console.log("searchParams",searchParams.get("limit"))


  const { language, setLanguage, weblanguages } = useContext(LangContext);

  const optionValues = [10,20,50,100];
  const [currentPage, setcurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(optionValues[0]);
  const userLastIndex = currentPage * userPerPage;
  const userFirstIndex = userLastIndex - userPerPage;
  const [currentUserData, setCurrentUserData] = useState(customerslist);
  const [buttonColorIndex, setButtonColorIndex] = useState(0);


  useEffect(() => {
    setCurrentUserData(customerslist.slice(userFirstIndex, userLastIndex));
  }, [currentPage, userPerPage, userFirstIndex, userLastIndex]);

  useEffect(() => {
    const dropdownColorIndex = Math.ceil(
      currentPage - 1
    );
    setButtonColorIndex(dropdownColorIndex);
    // console.log("dropdown",dropdownColorIndex)
  }, [currentPage]);

  const pageCountList = [];
  for (let i = 1; i <= Math.ceil(customerslist.length / userPerPage); i++) {
    pageCountList.push(i);
  }


  const prevButton = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
      // navigate(`../${currentRoutePage - 1}`)
      setButtonColorIndex(currentPage - 2);
    }
  };

  const nextButton = () => {
    if (currentPage !== 10) {
      setcurrentPage(currentPage + 1);
      // navigate(`../${currentRoutePage + 1}`)
      setButtonColorIndex(currentPage);
    }
  };


  const selectValueChange = (e) => {
    const selectOptionNumberList = customerslist.slice(0, e.target.value);
    setCurrentUserData(selectOptionNumberList);
  };

  const handleChange = (e) => {
    setuserPerPage(e.target.value);
    setcurrentPage(1)
  };


  return (
    <>
      <table className="tablestyle">
        <thead>
          <tr>
            <th>#</th>
            <th>{weblanguages[language].name}</th>
            <th>{weblanguages[language].email}</th>
            <th>{weblanguages[language].location}</th>
            <th>{weblanguages[language].phone}</th>
            <th>{weblanguages[language].totalexpenses}</th>
            <th>{weblanguages[language].totalorders}</th>
          </tr>
        </thead>
        {currentUserData?.map((item, index) => (
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.location}</td>
              <td>{item.phone}</td>
              <td>{item.total_spend}</td>
              <td>{item.total_orders}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className="button-list">
        <div className="leftcontent">
          <p>{weblanguages[language].selecttextfirstpart}{userPerPage}{weblanguages[language].selecttextsecondpart}</p>
          <select
            className="select"
            value={userPerPage}
            onChange={(e) => {
              selectValueChange(e);
              handleChange(e);
            }}
          >
            {optionValues.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="rightcontent">
          <button
            onClick={() => {
              prevButton();
            }}
            className="button-previous"
          >
            {currentPage !== 1 ? "Previous" : null}
          </button>
          {pageCountList.map((item, index) => (
            <button
              className={`button-item ${
                buttonColorIndex === index ? "buttonbgcolor" : ""
              }`}
              onClick={(e) => {
                setcurrentPage(item);
                setButtonColorIndex(index);
              }}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              nextButton();
            }}
            className="button-next">
              {currentPage * userPerPage !== 100 ? "Next" : null}
          </button>
        </div>
      </div>
    </>
  );
};

export default User;



//Object.keys(data[0]).map(item,index)
