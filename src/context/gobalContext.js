import { AdminAPIs } from 'API/admin';
import React, { createContext, useState, useEffect } from 'react'
export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
    const [allDriverDestinations,setAllDriverDestinations] = useState(null);
    const [dayStarted,setDayStarted] = useState({"1":true});
    
    useEffect(() => {
        // const adminDayStarted = AdminAPIs.getAdminDayStarted();
        // setDayStarted(adminDayStarted);
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