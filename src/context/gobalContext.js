import React, { createContext, useState } from 'react'
export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
    const [allDriverDestinations,setAllDriverDestinations] = useState(null);
    const [dayStarted,setDayStarted] = useState(false);
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