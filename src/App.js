import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./components/Router/Home";
import Service from "./components/Router/Service";
import Form from "./components/Router/Form";
import Product from "./components/Router/Product/Product";
import ProductTwo from "./components/Router/Product/ProductTwo";
import { Context } from "./Context/Context";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "./Context/LangContext";
import BasketProduct from "./components/Router/Product/BasketProduct";
import Table from "./common/Table";
import customerlist from "./components/customers-list.json";

function App() {
  const [employee, setEmployee] = useState([]);

  const loadUser = async () => {
    const response = await fetch("https://dummyjson.com/users");
    if (response.ok && response.status === 200) {
      const data = await response.json();
      setEmployee(data.users);
    }
  };
  

 
  useEffect(()=>{
    loadUser();
  },[])


  const location = useLocation();
  const background = location.state && location.state.background;

  // console.log("location",location)

  const { language, setLanguage, weblanguages } = useContext(LangContext);


  const Tabs = [
    { path: "/home", element: <Home />, name: weblanguages[language]?.home },
    {
      path: "/service",
      element: <Service />,
      name: weblanguages[language]?.service,
    },
    { path: "/form", element: <Form />, name: weblanguages[language]?.form },
    {
      path: "/user",
      element: <Table hastotalexpenses={true} hastotalorders={true} haslocation={true} jsondata={customerlist} />,
      name: weblanguages[language]?.user,
    },
    {
      path: "/employee",
      element: <Table hasAge={true} jsondata={employee} />,
      name: weblanguages[language]?.employee,
    },
    {
      path: "/product",
      element: <Product />,
      name: weblanguages[language]?.product,
    },
    {
      path: "/producttwo",
      element: <ProductTwo location={location} background={background} />,
      name: weblanguages[language]?.producttwo,
    },
  ];

  return (
    <div className={`App `}>
      <Navbar Tabs={Tabs} />
      <Routes location={background || location}>
        {Tabs.map((item, index) => (
          <>
            <Route path={item.path} element={item.element} />
          </>
        ))}
        {/* <Route path='/' element={<Navigate to="/home" replace/>}/> */}
        <Route path="/producttwo/basketproduct" element={<BasketProduct />} />
      </Routes>
    </div>
  );
}

export default App;
