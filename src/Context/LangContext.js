import { createContext, useEffect, useState } from "react";
import React from "react";

export const LangContext = createContext();

const LangProvider = ({ children }) => {
  const weblanguages = {
    eng: {
      servicetitle: "Title",
      servicebody: "Body",
      add: "Add",
      name:"Name",
      email:"Email",
      location:"Location",
      phone:"Phone",
      totalexpenses:"Total Expenses",
      totalorders:"Total Orders",
      selecttextfirstpart:"Showing 1 to ",
      selecttextsecondpart:" of entries",
      category:"Category",
      price:"Price",
      rate:"Rate",
      count:"Count",
      info:"Info",
      delete:"Delete",
      cardtitle:"Card Title",
      home:"Home",
      service:"Service",
      form:"Form",
      user:"User",
      employee:"Employee",
      product:"Product",
      producttwo:"ProductTwo"
    },
    aze: {
      servicetitle: "Başlıq",
      servicebody: "Əsas Hissə",
      add: "Əlavə et",
      name:"Ad",
      email:"Mail Ünvanı",
      location:"Məkan",
      phone:"Telefon",
      totalexpenses:"Ümumi Xərclər",
      totalorders:"Ümumi Sifarişlər",
      selecttextfirstpart:"1-dən  ",
      selecttextsecondpart:" qədər məlumatları göstər",
      category:"Kateqoriya",
      price:"Qiymət",
      rate:"Reytinq",
      count:"Sayı",
      info:"Məlumat",
      delete:"Sil",
      cardtitle:"Kard Başlığı",
      home:"Ana Səhifə",
      service:"Servis Xidməti",
      form:"Form Anketi",
      user:"İstifadəçi",
      employee:"İş xidmətləri",
      product:"Məhsul",
      producttwo:"İkinci Məhsul"
    },
  };


   useEffect(()=>{
    localStorage.setItem("localization","eng")
   },[])

   useEffect(()=>{
    
    if(localStorage.getItem("localization")){
      setLanguage(localStorage.getItem("localization"))
    }
   },[])
   const [language, setLanguage] = useState(localStorage.getItem("localization"));

   

  return (
    <LangContext.Provider value={{language, setLanguage,weblanguages}}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
