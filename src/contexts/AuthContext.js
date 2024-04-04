import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginData,setLoginData]=useState({})
  const [isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem('login') === 'true')
  // console.log("loginData",loginData)
  // console.log("isAuthenticated",isAuthenticated)
  


  const login = (data) => {
    localStorage.setItem('login', 'true');
    setLoginData(data)
    setIsAuthenticated(true) 
  };

  const logout = () => {
    localStorage.setItem('login', 'false');
    setIsAuthenticated(false)    
  };
  
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth1 = () => {
  return useContext(AuthContext);
};


// const [isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem('login') === 'true'):
//  Yahaan useState() hook ka upyog karke isAuthenticated state aur uski setter
//   function setIsAuthenticated banayi gayi hai, jiska default value localStorage
//    se check kiya jata hai ki 'login' ki key ka value 'true' hai ya nahi.