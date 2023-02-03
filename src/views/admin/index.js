import react from 'react'
import { BrowserRouter, Route, Switch, Redirect, useParams } from "react-router-dom";
import Admin from "./Admin.js"
import { AdminAPIs } from "API/admin.js"
import { useEffect } from 'react';
import { useStore } from "store/store.js";

export default function AdminRouter(props){
    const { dayStarted,setDayStarted } = useStore()
    const { id } = useParams();
    const userId = id;

    useEffect(() => {
        const getDayStarted = async () => {
            const adminDayStarted = await AdminAPIs?.getAdminDayStarted();
            setDayStarted(adminDayStarted);
        }
        getDayStarted();
    }, []);
    
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
