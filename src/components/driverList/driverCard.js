import React from "react";

export default function DriverCard({props,handleLoadDriver}) {
    const handleClickView = () => {
        handleLoadDriver(props.driverId)
    }

    return (
        <div className="w-full md:w-6/12 lg:w-3/12 mb-12 px-4 shadow-lg rounded-lg bg-white bg-blueGray-50"> 
            <div className="px-6 py-6">
                <img
                    alt=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    className="rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                    <p className="mt-1 text-base text-blueGray-600 uppercase font-semibold">
                      {"Driver Id : " + props.driverId}
                    </p>
                    <div>
                        <button className="text-lightBlue-500 background-transparent font-bold uppercase px-8 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={handleClickView}>
                            View Path
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
