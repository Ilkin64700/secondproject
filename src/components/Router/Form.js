import React, { useContext, useState } from "react";
import { LangContext } from "../../Context/LangContext";

const Form = () => {
  const {language, setLanguage,weblanguages} = useContext(LangContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [list, setlist] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    list.push({
      title: title,
      description: description,
    });
    setlist(list);
    setTitle("")
    setDescription("")
  };

  // console.log("111111111", list.map((item)=>item));


  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="form-control m-2 w-50 bg-primary"
      >
        <label className="mt-2 text-white">{weblanguages[language].servicetitle}  </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        <label className="mt-2 text-white"> {weblanguages[language].servicebody} </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-warning mt-3 w-100">{weblanguages[language].add}</button>
      </form>
    </div>
  );
};

export default Form;
