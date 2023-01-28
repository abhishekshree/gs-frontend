import { AdminAPIs } from 'API/admin';
import React, { createContext, useState, useEffect } from 'react'
export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
    const [allDriverDestinations,setAllDriverDestinations] = useState({});
    const [dayStarted,setDayStarted] = useState({});
    
    useEffect(() => {
        const adminDayStarted = AdminAPIs.getAdminDayStarsted();
        setDayStarted(adminDayStarted);
    }, []);

    return (
        <GlobalContext.Provider 
            value={{
                allDriverDestinations,
                setAllDriverDestinations,
                dayStarted,
                setDayStarted
             }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider