import { Redirect, Route, useParams } from "react-router-dom";
import { useStore } from "store/store.js";
import Admin from "./Admin.js";

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
