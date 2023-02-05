import { AdminAPIs } from "API/admin.js";
import Loading from "components/Loading/loading.js";
import { useHistory, useParams } from "react-router-dom";
import startRes from "assets/input.json"; //harcoded response to be removed
import { errorNotification } from "components/alerts/Alerts.js";
import  { useState } from "react";
import { useStore } from "store/store.js";

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
    const history = useHistory();
    var FormData = require('form-data');
    const { id } = useParams();
    const userId = id;
    const { dayStarted, setDayStarted } = useStore();
    const { allDriverDestinations, setAllDriverDestinations, unroutedPoints, setUnroutedPoints } = useStore();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const [nDrivers, setnDrivers] = useState(0);
    const [hubNode, setHubNode] = useState(0);
    const [succInputMsg, setSuccInputMsg] = useState("hidden")

    const handleChangeNDrivers = (e) => {
        setnDrivers(e.target.value);
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleChangeHubNode = (e) => {
        setHubNode(e.target.value);
    }

    const handleUploadClick = async () => {
        if (!file) {
            return;
        }
        setLoading(true)

        var destinationsData = new FormData()
        destinationsData.append('file', file, "banglore_pickups.xlsx");
        destinationsData.append('no_of_drivers', nDrivers)
        destinationsData.append('admin_id', userId)
        // --- API call to submit input file ---
        const inputRes = await AdminAPIs.postAdminInput(destinationsData)
        if(!inputRes){
            setLoading(false);
            console.log("inputres not received")
            return
        }
        setSuccInputMsg("block");
        // --- API call to get output map for this admin---
        const startRes = await  AdminAPIs.postAdminStart(userId,hubNode)
        if(!startRes){
            console.log("startres not received")
            setSuccInputMsg("hidden");
            setLoading(false);
            return
        }
        // -------------------------------------
        setUnroutedPoints(startRes.unrouted_points)
        // const tempAllDriverDestinations = allDriverDestinations;
        // const thisAdminDriverDest = {};
        // for (let i = 0; i < startRes.Routes.length; i++) {
        //     const driverId = userId.toString() + "_" + (i + 1).toString();
        //     thisAdminDriverDest[driverId] = filterAbsurdDestinations(startRes.Routes[i]);
        // }
        // tempAllDriverDestinations[userId] = thisAdminDriverDest;
        // setAllDriverDestinations(tempAllDriverDestinations);

        let temp = dayStarted;
        temp[userId] = true;
        setDayStarted(temp);

        setLoading(false);
        const redirectUrl = "/admin/" + userId.toString() + "/drivers" //to be removed
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
                                            <label htmlFor="formFile" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Drop Destinations File</label>
                                            <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"
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
                                                value={hubNode}
                                                onChange={handleChangeHubNode}
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
                <img src={require("assets/img/startingJourney.gif").default} alt="nope" width="100px" height="auto"/>
            </div>
        </>
    );
}
