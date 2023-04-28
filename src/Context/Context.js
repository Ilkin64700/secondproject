import { createContext, useEffect, useState } from "react";
import React from "react";

 export const Context = createContext();

 
// export default context;

const Provider = ({ children }) => {



  // useEffect(() => {
  //   if (theme==null) {
  //     setTheme("light")
  //   }
  //   else {
  //     localStorage.getItem("theme_mode")
  //   }
  // }, [])
  

  useEffect(() => {
   document.body.classList.add(theme)
   localStorage.setItem("theme_mode","light")
  }, [])

  useEffect(() => {
  if (localStorage.getItem("theme_mode")) {
    setTheme(localStorage.getItem("theme_mode"))
  }
  }, [])
  

  const [theme, setTheme] = useState(localStorage.getItem("theme_mode"))

  



  const data = {
    theme,setTheme
  };

  return (
  <Context.Provider value={data}>
    {children}
  </Context.Provider>
  )

}
export default Provider
