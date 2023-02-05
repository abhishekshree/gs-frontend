import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MapIcon from "@mui/icons-material/Map";
import { DriverAPIs } from "API/driver.js";
import { driverDestinations } from "constants";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "store/store.js";
import Map from "views/driver/Map.js";
import DestinationList from "./DestinationsList";
import OTPModal from "./OTPmodal";
import SwipeableEdgeDrawer from "components/BottomDrawer/SwipeableEdgeDrawer.js";

const getAdminFromDriverId = (driverId) => {
  if (driverId?.length > 0) {
    let adminId = "";
    for (let i = 0; i < driverId.length; i++) {
      if (driverId[i] === "_") {
        break;
      }
      adminId += driverId[i];
    }
    return Number(adminId);
  }
};

export default function Driver(props) {
  const { allDriverDestinations } = useStore();
  const [openTab, setOpenTab] = React.useState(1);
  const { id } = useParams();
  const userId = id;
  const adminId = getAdminFromDriverId(userId);
  const [currLocation, setCurrLocation] = useState(null);
  const [deliveryLocation,setDeliveryLocation] = useState(null);
  const [showOTPModal, setShowOTPModal] = React.useState(false);
  const [destinations, setDestinations] = useState([]);
  const [completedDest, setCompletedDest] = useState([]);
  const [open,setOpen] = useState(false);
  const [markerSelected, setMarkerSelected] = useState(0); //marker selected in the map
  const [selectedDestInfo, setSelectedDestInfo] = useState({}); //selected destination info
  const [isLoading,setIsLoading] = useState(true);

  const handleDelivery = async () => {
    await DriverAPIs.generateOTP();
    setShowOTPModal("true");
  };

  const getDriverDestinations = async (userId) => {
    setIsLoading(true);
    const res = await DriverAPIs.getDriverPath(userId);
    if (!res) {
      return;
    }
    let completed = [],
      notCompleted = [];
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      if (res[i].delivered === true) {
        completed.push(res[i]);
      } else {
        notCompleted.push(res[i]);
      }
    }
    setDestinations(
      notCompleted?.map((dest, i) => {
        return {
          ...dest,
          locationId: i + 1,
        };
      })
    )
    console.log(completed[completed.length-1],notCompleted[0])
    setCurrLocation(completed[-1])
    if(res.length>1) 
      setDeliveryLocation(notCompleted[0]);
    setCompletedDest(completed);
    setIsLoading(false);
    console.log(currLocation,deliveryLocation)
  };

  useEffect(() => {
    getDriverDestinations(userId);
    //--- Hardocding ----
    // if(driverDestinations !== null){
    //   setDestinations(driverDestinations[userId]?.map((dest,i) => {
    //     return({
    //       ...dest,
    //       locationId: i+1
    //     })
    //   }))
    //   setCurrLocation({...driverDestinations[userId][0],locationId:0})
    //   setDeliveryLocation({...driverDestinations[userId][1],locationId:1});
    // }
    // ------------------
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <ul
          className="flex list-none flex-wrap pb-2 flex-row"
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
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              <MapIcon /> Map
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
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              <FeaturedPlayListIcon /> Destinations
            </a>
          </li>
        </ul>
      </div>
      <OTPModal
        showOTPModal={showOTPModal}
        setShowOTPModal={setShowOTPModal}
        destinations={destinations}
        setDestinations={setDestinations}
        deliveryLocation={deliveryLocation}
        setDeliveryLocation={setDeliveryLocation}
        completedDest={completedDest}
        setCompletedDest={setCompletedDest}
        userId={userId}
        adminId={adminId}
        allDriverDestinations={allDriverDestinations}
      />
      <div className="flex flex-col min-w-screen break-words bg-white w-full">
        <div className="">
          <div className={openTab === 1 ? "block" : "hidden"} id="link1">
            <div className="w-full h-full">
              {(!isLoading) && 
              <Map
                currLocation={currLocation}
                deliveryLocation={deliveryLocation}
                destinations={destinations}
                zoom_level={12}
                travel_mode="truck"
                completedDest={completedDest}
                isLoading={isLoading}
              />}
            </div>
            <div className="flex justify-center w-screen">
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 lg:w-1/4 h-auto mt-1"
                type="button"
                onClick={handleDelivery}
              >
                Deliver
              </button>

              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 lg:w-1/4 h-auto mt-1 ml-2"
                type="button"
                onClick={handleDelivery}
              >
                Logout
              </button>
            </div>
          </div>
          <div className={openTab === 2 ? "block" : "hidden"} id="link2">
            <DestinationList
              completedDest={completedDest}
              deliveryLocations={destinations}
            />
          </div>
        </div>
        <SwipeableEdgeDrawer open={open} setOpen={setOpen} markerSelected={markerSelected} setMarkerSelected={setMarkerSelected} selectedDestInfo={selectedDestInfo} />
      </div>
    </div>
  );
}
