import { AdminAPIs } from 'API/admin.js';
import React, { createContext, useState, useEffect } from 'react'
export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
    const [allDriverDestinations,setAllDriverDestinations] = useState({});
    const [dayStarted,setDayStarted] = useState({});
    
    // useEffect(() => {
    //     const getGlobalVariables = async () => {
    //         const adminDayStarted = await AdminAPIs?.getAdminDayStarted();
    //         setDayStarted(adminDayStarted);
    //         console.log(adminDayStarted);
    //     }
    //     getGlobalVariables();
    // }, []);

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