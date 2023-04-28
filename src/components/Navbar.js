import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";
import { LangContext } from "../Context/LangContext";

const Navbar = ({ Tabs }) => {
  const { theme, setTheme } = useContext(Context);
  const { language, setLanguage, weblanguages } = useContext(LangContext);
  const [bgcolorindex, setBgColorIndex] = useState(-1);

  


  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (theme === "light") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme_mode", theme);
  }, [theme]);

  useEffect(() => {
   localStorage.setItem("localization",language)
  }, [language])
  

  // useEffect(() => {
  //  setLanguage(JSON.parse(localStorage.getItem("localization")))
  // }, [])
  

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <button
            className="btn btn-dark me-2"
            onClick={() => {
              changeTheme();
            }}
          >
            {theme}
          </button>
          <button className="btn btn-primary me-2" onClick={() => setLanguage("eng")}>English</button>
          <button className="btn btn-warning" onClick={() => setLanguage("aze")}>Azerbaijan</button>
          {/* <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
            <option value="English">English</option>
            <option value="Azerbaijan">Azerbaijan</option>
          </select> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {Tabs.map((item, index) => (
                <li className="nav-item">
                  <Link
                    onClick={() => {
                      setBgColorIndex(index);
                    }}
                    to={item.path}
                    className={`nav-link ${
                      bgcolorindex === index ? "bgcolor" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
