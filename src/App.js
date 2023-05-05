import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./components/Router/Home";
import Service from "./components/Router/Service";
import Form from "./components/Router/Form";
import User from "./components/Router/User";
import Employee from "./components/Router/Employee";
import Product from "./components/Router/Product/Product";
import ProductTwo from "./components/Router/Product/ProductTwo";
import { Context } from "./Context/Context";
import { useContext, useState } from "react";
import { LangContext } from "./Context/LangContext";
import BasketProduct from "./components/Router/Product/BasketProduct";
 
function App() {
const {theme,setTheme}=useContext(Context)
const { language, setLanguage, weblanguages } = useContext(LangContext);
const [basket, setBasket] = useState([]);



  const Tabs = [
    { path: "/home", element: <Home />, name: weblanguages[language]?.home},
    { path: "/service", element: <Service />, name: weblanguages[language]?.service},
    { path: "/form", element: <Form />, name: weblanguages[language]?.form},
    { path: "/user", element: <User />, name: weblanguages[language]?.user },
    { path: "/employee", element: <Employee />, name: weblanguages[language]?.employee },
    { path: "/product", element: <Product />, name: weblanguages[language]?.product },
    { path: "/producttwo", element: <ProductTwo basket={basket} setBasket={setBasket} />, name: weblanguages[language]?.producttwo },
  ];

   

  return (
    <div className={`App ${theme}`}>
        <Navbar Tabs={Tabs} />
        <Routes>
          {Tabs.map((item, index) => (
            <>
              <Route path={item.path} element={item.element} />
            </>
          ))}
          {/* <Route path='/' element={<Navigate to="/home" replace/>}/> */}
          <Route path="/producttwo/basketproduct" element={<BasketProduct basket={basket}/>}/>
        </Routes>
    </div>
  );
}

export default App;
