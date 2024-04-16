import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    return userDataFromStorage ? JSON.parse(userDataFromStorage) : {};
  });
  const [isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem('login') === 'true')
  // console.log("userData",userData)
  // console.log("isAuthenticated",isAuthenticated)
  


  const login = (data) => {
    localStorage.setItem('login', 'true');
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(data)
    setIsAuthenticated(true) 
  };

  const logout = () => {
    localStorage.setItem('login', 'false');
    setIsAuthenticated(false)    
  };
  

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth1 = () => {
  return useContext(AuthContext);
};


