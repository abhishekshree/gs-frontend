import react from 'react'
import { BrowserRouter, Route, Switch, Redirect, useParams } from "react-router-dom";
import Admin from "layouts/Admin.js"
import { AdminAPIs } from "API/admin.js"
import { useEffect, useState } from 'react';
import { useStore } from "store/store.js";

export default function AdminRouter(props){
    const { dayStarted,setDayStarted } = useStore()
    const { id } = useParams();
    const userId = id;
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const getDayStarted = async () => {
            const adminDayStarted = await AdminAPIs?.getAdminDayStarted();
            console.log(adminDayStarted);
            setDayStarted(adminDayStarted);
            setIsLoading(false)
        }
        getDayStarted();
    }, []);
    
    return(
        <Route>
            {
                (!isLoading) && (
                    dayStarted[Number(userId)] ? 
                    <Admin/> : 
                    <Redirect to={"/admin/"+userId.toString()+"/start"} />
            )}
        </Route>
    )
}
