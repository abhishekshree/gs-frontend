import React from "react";
import CallIcon from '@mui/icons-material/Call';

export default function DriverCard({props,handleLoadDriver}) {
    const handleClickView = () => {
        handleLoadDriver(props.driverId)
    }

    return (
        <div className="w-full md:w-6/12 lg:w-3/12 mb-12 px-4">
            <div className="px-6">
                <img
                    alt=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    className="rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Driver Name</h5>
                    <p className="mt-1 text-base text-blueGray-500 uppercase font-semibold">
                      {"Driver Id : " + props.driverId}
                    </p>
                    <h6 className="text-xl font-normal leading-normal mt-4 mb-2 text-blueGray-800">
                        Destinations:
                    </h6>
                    <div>
                        <button className="text-lightBlue-500 background-transparent font-bold uppercase px-8 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={handleClickView}>
                            View
                        </button>
                    </div>
                    <div className="mt-6">
                        <button
                            className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                        >
                            <CallIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}