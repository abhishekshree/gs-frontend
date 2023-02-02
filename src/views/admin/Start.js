import React from "react";
import { useState, useContext, useEffect } from 'react';
import Loading from "components/Loading/loading.js";
import { GlobalContext } from "context/gobalContext.js";
import { useHistory, useParams } from "react-router-dom";
import { AdminAPIs } from "API/admin.js"
import axios from "axios";
import startRes from "assets/example_response.json";
import { errorNotification } from "components/alerts/Alerts.js";


function filterAbsurdDestinations(destinations) {
    const avgLat = destinations.reduce((total, next) => total + next.latitude, 0) / destinations.length;
    const avgLng = destinations.reduce((total, next) => total + next.longitude, 0) / destinations.length;
    const filteredDestinations = destinations.filter((dest) => {
        const dist = Math.sqrt((dest.latitude - avgLat) ** 2 + (dest.longitude - avgLng) ** 2);
        if (dist >= 4.883620841) {
            errorNotification(`The Destination (${dest.latitude},${dest.longitude}) was too far away so routing to it was not possible`)
        }
        return dist < 4.883620841;
    })

    return filteredDestinations;
}


export default function Start(props) {
    // var axios = require('axios');
    var FormData = require('form-data');
    const { id } = useParams();
    const userId = id;
    const { dayStarted, setDayStarted } = useContext(GlobalContext);
    const { allDriverDestinations, setAllDriverDestinations } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const [nDrivers, setnDrivers] = useState(0);
    const [succInputMsg, setSuccInputMsg] = useState("hidden")
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
        destinationsData.append('file', file, "banglore_pickups.xlsx");
        destinationsData.append('no_of_drivers', nDrivers)
        destinationsData.append('admin_id', userId)
        // const inputRes = await AdminAPIs.postAdminInput(destinationsData)
        // if(!inputRes){
        //     setLoading(false);
        //     return
        // }
        // setSuccInputMsg("block");
        // const startRes = await  AdminAPIs.postAdminStart(userId)
        // console.log(startRes)
        // if(!startRes){
        //     setSuccInputMsg("hidden");
        //     setLoading(false);
        //     return
        // }
        const tempAllDriverDestinations = allDriverDestinations;
        const thisAdminDriverDest = {};
        for (let i = 0; i < startRes.length; i++) {
            const driverId = userId.toString() + "_" + (i + 1).toString();
            thisAdminDriverDest[driverId] = filterAbsurdDestinations(startRes[i]);
        }
        tempAllDriverDestinations[userId] = thisAdminDriverDest;

        setAllDriverDestinations(tempAllDriverDestinations);
        console.log(tempAllDriverDestinations);

        const temp = dayStarted;
        temp[userId] = true;
        setDayStarted(temp);
        console.log(temp)
        setLoading(false);
        const redirectUrl = "/admin/" + userId.toString() //to be removed
        history.replace(redirectUrl)
    };

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                            <div className="flex-auto p-5 lg:p-10">
                                {(!loading) &&
                                    <>
                                        <h4 className="text-2xl font-semibold">
                                            Start Journey
                                        </h4>
                                        <div className="relative w-full mb-3 mt-8">
                                            <label for="formFile" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">Drop Destinations File</label>
                                            <input class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                No of Drives
                                            </label>
                                            <input
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={nDrivers}
                                                onChange={handleChangeNDrivers}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="message"
                                            >
                                                Hub Node
                                            </label>
                                            <input
                                                rows="4"
                                                cols="80"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            />
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleUploadClick}
                                            >
                                                Start Journey
                                            </button>
                                        </div>
                                    </>
                                }
                                {
                                    (loading) && (
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
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-wrap p-4">
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
        </div> */}
        </>
    );
}
