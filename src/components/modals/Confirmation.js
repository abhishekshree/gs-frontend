import React from "react"
import { AdminAPIs } from "API/admin.js"
import { useParams,useHistory } from "react-router-dom"
import { successNotification } from "components/alerts/Alerts"

export default function Confirmation({openModal,setOpenModal}) {
    const history = useHistory()
    const { id } = useParams()

    const handleYes = () => {
        const res = AdminAPIs.postDayEnd(id)
        if(!res)
            return
        if(window!==undefined){
            console.log("clearing local storage")
            window.localStorage.clear();
        }
        successNotification("Successfully Ended Journey","")
        history.replace(`/`)
    }
    const handleNo = () => {
        setOpenModal(false)
        console.log("NO")
    }
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
                className="flex flex-col min-w-0 break-words lg:w-1/2 shadow-lg rounded-lg bg-blueGray-100 border-0"
                style={{width:"20rem"}}
            >
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center flex justify-center">
                            <h4 className="text-blueGray-700 text-xl font-bold">End Journey</h4>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            type="submit"
                            className="cursor-pointer bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={handleYes}
                        >
                            YES
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer bg-red-700 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={handleNo}
                        >
                            NO
                        </button>
                    </div>
            </div>
        </div>
    )
}