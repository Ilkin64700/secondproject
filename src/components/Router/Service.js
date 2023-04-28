import React, { useContext, useRef, useState } from "react";
import { LangContext } from "../../Context/LangContext";

const Service = () => {
  const { language, setLanguage, weblanguages } = useContext(LangContext);
  const [title, setTitle] = useState("");
  const [bodytext, setBodyText] = useState("");
  const testRef = useRef();

  const add = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        bodytext: bodytext,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   testRef.current.focus();
  // }, []);

  return (
    <form onSubmit={add}>
      <div className="form-group w-25">
        <label>{weblanguages[language].servicetitle}</label>
        <input
          // autoFocus={true}
          // ref={testRef}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="form-control"
          type="text"
        />
        <label>{weblanguages[language].servicebody}</label>
        <input
          onChange={(e) => setBodyText(e.target.value)}
          value={bodytext}
          className="form-control"
          type="text"
        />
        <button className="btn btn-primary w-100 mt-2">
          {weblanguages[language].add}
        </button>
      </div>
    </form>
  );
};

export default Service;
