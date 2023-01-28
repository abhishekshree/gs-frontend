import React from "react";
import { useState, useEffect, useContext } from 'react';
import Map from "views/driver/Map.js";
import DestinationList from "./DestinationsList";
import OTPModal from "./OTPmodal";
import { driverDestinations } from "constants.js";
import { GlobalContext } from "context/gobalContext.js";
import { useParams } from "react-router-dom";

const getAdminFromDriverId = (driverId) => {
  if(driverId.length>0){
    let adminId = "";
    for(let i=0;i<driverId.length;i++){
      if(driverId[i]==="_"){
        break;
      }
      adminId += driverId[i];
    }
    return Number(adminId);
  }
}

export default function Driver(props) {
  const {allDriverDestinations} = useContext(GlobalContext);
  const [openTab, setOpenTab] = React.useState(1);
  const { id } = useParams();
  const userId = id;
  const adminId = getAdminFromDriverId(userId);
  // const {userId} = props;
  const [currLocation,setCurrLocatoin] = useState({latitude: 12.9140182, longitude: 77.5747463});
  const [deliveryLocation,setDeliveryLocation] = useState({latitude: 12.9414398, longitude: 77.5454111, locationId:1});
  const [showOTPModal, setShowOTPModal] = React.useState(false);
  const [destinations,setDestinations] = useState([]);
  const [completedDest,setCompletedDest] = useState([]);

  const handleDelivery = () => {
    setShowOTPModal("true");
  }

  useEffect(() => {
    // if(allDriverDestinations!==null && adminId in allDriverDestinations && userId in allDriverDestinations[adminId]){
    //   setDestinations(allDriverDestinations[adminId][userId]?.map((dest,i) => {
    //     return({
    //       ...dest,
    //       locationId: i+1
    //     })
    //   }))
    //  setDeliveryLocation({...allDriverDestinations[adminId][userId][0],locationId:1});
    // }
    if(driverDestinations !== null){ // allDriverDestinations !== null
      setDestinations(driverDestinations[userId]?.map((dest,i) => {
        return({
          ...dest,
          locationId: i+1
        })
      }))
      setDeliveryLocation({...driverDestinations[userId][0],locationId:1});
    }
  },[])

  return (
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-lightBlue-600"
                    : "text-lightBlue-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Map
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-lightBlue-600"
                    : "text-lightBlue-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2" 
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i>  Destinations
              </a>
            </li>
          </ul>
          <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleDelivery}>
            Deliver
          </button>
          <OTPModal 
            showOTPModal={showOTPModal} 
            setShowOTPModal={setShowOTPModal} 
            destinations={destinations} 
            setDestinations={setDestinations}
            deliveryLocation={deliveryLocation} 
            setDeliveryLocation={setDeliveryLocation}
            completedDest={completedDest}
            setCompletedDest={setCompletedDest}
            userId = {userId}
            adminId = {adminId}
            allDriverDestinations = {allDriverDestinations}
          />
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Map 
                    currLocation= {currLocation} 
                    deliveryLocation= {deliveryLocation} 
                    destinations={destinations} 
                    zoom_level={12} 
                    travel_mode="truck"
                    completedDest={completedDest} 
                  />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <DestinationList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
