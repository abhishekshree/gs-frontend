import react from 'react'
import { BrowserRouter, Route, Switch, Redirect, useParams } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from "context/gobalContext.js";
import Admin from "./Admin.js"
import Start from "./Start.js"
import { useStore } from "store/store.js";

export default function AdminRouter(props){
    // const {dayStarted} = useContext(GlobalContext);
    const { dayStarted } = useStore()
    const { id } = useParams();
    const userId = id;
    
    return(
        <Route>
            {
                dayStarted && (
                    dayStarted[Number(userId)] ? 
                    <Admin/> : 
                    <Redirect to={"/admin/"+userId.toString()+"/start"} />
            )}
        </Route>
    )
}