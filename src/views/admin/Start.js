import React from "react";
import { useState,useContext } from 'react';
import Loading from "components/Loading/loading.js";
import { GlobalContext } from "context/gobalContext.js";
import { useHistory } from "react-router-dom";
import { AdminAPIs } from "API/admin.js"
import axios from "axios";

export default function Start(props) {
    // var axios = require('axios');
    var FormData = require('form-data');
    const {role,userId} = props;
    const {dayStarted,setDayStarted} = useContext(GlobalContext);
    const {allDriverDestinations,setAllDriverDestinations} = useContext(GlobalContext);
    const [loading,setLoading] = useState(false);
    const [file, setFile] = useState();
    const [nDrivers, setnDrivers] = useState(0);
    const [succInputMsg,setSuccInputMsg] = useState("hidden")
    const history = useHistory();

    const handleChangeNDrivers = (e) => {
        setnDrivers(e.target.value);
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    
    const handleUploadClick = async () => {
        if (!file) {
          return;
        }
        setLoading(true)

        var destinationsData = new FormData()
        destinationsData.append('file',file,"banglore_pickups.xlsx");
        destinationsData.append('no_of_drivers',nDrivers)
        destinationsData.append('admin_id',userId)
        const inputRes = await AdminAPIs.postAdminInput(destinationsData)
        if(!inputRes){
            setLoading(false);
            return
        }
        setSuccInputMsg("block");
        const startRes = await AdminAPIs.postAdminStart(userId)
        if(!startRes){
            setSuccInputMsg("hidden");
            setLoading(false);
            return
        }
        const tempAllDriverDestinations = allDriverDestinations;
        const thisAdminDriverDest = {}
        for (let i=0; i<inputRes.length; i++) {
            const driverId = userId.toString() + "_" + (i+1).toString();
            thisAdminDriverDest[driverId] = inputRes[i];
        }
        tempAllDriverDestinations[userId] = thisAdminDriverDest;
        console.log(tempAllDriverDestinations);
        setAllDriverDestinations(tempAllDriverDestinations);

        const temp = dayStarted;
        temp[userId] = true;
        setDayStarted(temp);
        const redirectUrl = "/admin/" + userId.toString() //to be removed
        history.replace(redirectUrl)
    };

    return (
        <div className="flex flex-wrap p-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                {
                    (!loading)&&(
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <div className="flex flex-wrap">
                                <div class="flex justify-center">
                                    <div class="mb-3 w-full mt-3">
                                        <label for="formFile" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">Drop Destinations File</label>
                                        <input class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div class="mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            No of Drives
                                        </label>
                                        <input
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value = {nDrivers}
                                            onChange = {handleChangeNDrivers}
                                    />
                                </div>
                                <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleUploadClick}>
                                    Start Journey
                                </button>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </form>
                    </div>
                    )
                }
                {
                    (loading)&&(
                        <>
                            <Loading />
                            <div className={succInputMsg}>
                                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-blueGray-800 ">
                                    Input Successful!
                                </p>
                                <p className="text-lg font-light leading-relaxed mt-6 mb-4 text-red-800">
                                    Waiting for the driver information
                                </p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
