import React from "react";
import { useContext } from "react";
import { Context }  from "../../Context/Context";

const Home = () => {
  
  // const test = useContext(ThemeContext)
  const {theme,setTheme}=useContext(Context)


  console.log("themeee",theme)

  return (
    <div>
     {theme}
    </div>
  );
};

export default Home;
