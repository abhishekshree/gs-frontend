import React from "react";
import { useState } from 'react';

export default function OTPModal({showOTPModal,setShowOTPModal,destinations,setDestinations,setDeliveryLocation,completedDest,setCompletedDest}){
    const [OTP,setOTP] = useState("");

    const handleChangeOTP = (e) => {
        setOTP(e.target.value)
    }
    
    const generateOTP = () => {
        console.log("new OTP generated")
    }

    const handleSubmitOTP = () => {
        //post request to submit OTP
        setOTP("")
        const response = { body: {valid: "true"}}; // post req response
        if(response.body.valid){
            console.log("delivery completed")
            if(destinations.length>1)
                setDeliveryLocation(destinations[1])
            else
            setDeliveryLocation({})
            setCompletedDest([...completedDest,destinations[0]])
            setDestinations(destinations.slice(1,))
        }
        else{
            console.log("Invalid OTP \n Re-enter correct OTP")
        }
    }

    return (
        <>
        {showOTPModal ? (
            <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        OTP
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowOTPModal(false)}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <input type="text" placeholder="OTP" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline mr-2" value={OTP} onChange={handleChangeOTP}/>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={generateOTP}
                    >
                        Generate Again
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmitOTP}
                    >
                        Submit
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>
    );
}