import react from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from "context/gobalContext.js";
import Admin from "./Admin.js"
import Start from "./Start.js"

export default function AdminRouter(props){
    const {dayStarted} = useContext(GlobalContext);
    const {role,userId} = props;

    return(
        <BrowserRouter>
            <Switch>
                <Route>
                    {dayStarted ? <Admin role={role} userId={userId}/> : <Redirect to={"/admin/"+userId.toString()+"/start"} />}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}