import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const LogoContext = createContext();
export const ApiProvider = ({ children }) => {
    const [headerImage, setHeaderImage] = useState({});

    useEffect(() => {
        const fetchHeaderImage = async () => {
            try {
                const response = await axios.get("http://20.207.207.62/api/header-logo");
                // console.log(response);
                setHeaderImage(response?.data?.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchHeaderImage();
    },[]);
    return(
        <LogoContext.Provider value={{headerImage}}>
            {children}
        </LogoContext.Provider>
    )
}

export const useLogoContext = () => useContext(LogoContext);
