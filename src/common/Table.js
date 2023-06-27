import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../Context/LangContext";

const Table = ({
  jsondata,
  hasAge,
  haslocation,
  hastotalexpenses,
  hastotalorders,
}) => {
  // const {page : currentRoutePage} =useParams();
  // const navigate=useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();

  // console.log("searchParams",searchParams.get("limit"))

  const { language, setLanguage, weblanguages } = useContext(LangContext);

  const optionValues = [10, 20, 50, 100];
  const [currentPage, setcurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(optionValues[0]);
  const userLastIndex = currentPage * userPerPage;
  const userFirstIndex = userLastIndex - userPerPage;
  const [currentUserData, setCurrentUserData] = useState(jsondata);
  const [buttonColorIndex, setButtonColorIndex] = useState(0);
  const totalpages = 10;
  const visiblepages=3;

  // const data = UseData("/users")

  useEffect(() => {
    setCurrentUserData(jsondata.slice(userFirstIndex, userLastIndex));
  }, [jsondata, currentPage, userPerPage, userFirstIndex, userLastIndex]);

  useEffect(() => {
    const dropdownColorIndex = Math.ceil(currentPage - 1);
    setButtonColorIndex(dropdownColorIndex);
    // console.log("dropdown",dropdownColorIndex)
  }, [currentPage]);

  const showallpagenumbers = () => {
    const pageCountList = [];
    let startpage=currentPage - Math.floor(visiblepages/2);
    startpage=Math.max(startpage,1)
    const endpage=Math.min(startpage + visiblepages-1,totalpages)

    for (let i = startpage; i <= endpage; i++) {
      pageCountList.push(
        <button key={i}
        className={`button-item ${
          buttonColorIndex === (i-1) ? "buttonbgcolor" : ""
        }`}
        onClick={(e) => {
          setcurrentPage(i);
          setButtonColorIndex(i-1);
        }}
      >
        {i}
      </button>
      );
    }
    return  pageCountList
  };

  const prevButton = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
      setButtonColorIndex(currentPage - 2);
    }
  };

  const nextButton = () => {
    const nextpage=currentPage+1
    if (nextpage <=totalpages) {
      setcurrentPage(nextpage);
      setButtonColorIndex(currentPage);
    }
  };

  const selectValueChange = (e) => {
    const selectOptionNumberList = jsondata.slice(0, e.target.value);
    console.log("selectOptionNumberList", selectOptionNumberList);
    setCurrentUserData(selectOptionNumberList);
  };

  const handleChange = (e) => {
    setuserPerPage(e.target.value);
    setcurrentPage(1);
  };

  return (
    <>
      <table className="tablestyle">
        <thead>
          <tr>
            <th>#</th>
            <th>{weblanguages[language].name}</th>
            <th>{weblanguages[language].email}</th>
            <th>{weblanguages[language].phone}</th>
            {hasAge ? <th>{weblanguages[language].age} </th> : null}
            {haslocation ? <th>{weblanguages[language].location}</th> : null}
            {hastotalexpenses ? (
              <th>{weblanguages[language].totalexpenses}</th>
            ) : null}
            {hastotalorders ? (
              <th>{weblanguages[language].totalorders}</th>
            ) : null}
          </tr>
        </thead>
        {currentUserData?.map((item, index) => (
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.name || item.firstName + " " + item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              {hasAge ? <td>{item.age}</td> : null}
              {haslocation ? <td>{item.location}</td> : null}
              {hastotalexpenses ? <td>{item.total_spend}</td> : null}
              {hastotalorders ? <td>{item.total_orders}</td> : null}
            </tr>
          </tbody>
        ))}
      </table>
      <div className="button-list">
        <div className="leftcontent">
          <p>
            {weblanguages[language].selecttextfirstpart}
            {userPerPage}
            {weblanguages[language].selecttextsecondpart}
          </p>
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
         {showallpagenumbers()}
          <button
            onClick={() => {
              nextButton();
            }}
            className="button-next"
          >
            {currentPage * userPerPage !== 100 ? "Next" : null}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
