import React from "react";
import { useState, useEffect, useContext } from 'react';

import Map from "views/admin/Map.js";
import { driverDestinations } from "constants.js";
import BottomDrawer from "../../components/BottomDrawer/BottomDrawer.js"
import SwipeableEdgeDrawer from "components/BottomDrawer/SwipeableEdgeDrawer.js";
import { GlobalContext } from "context/gobalContext.js";

export default function Admin(props) {
  const {allDriverDestinations,setAllDriverDestinations} = useContext(GlobalContext);
  const {role,userId} = props;

  const [openTab, setOpenTab] = useState(1);
  const [driverId,setDriverId] = useState(null);
  const [destinations,setDestinations] = useState([]);
  const [currLocation,setCurrLocatoin] = useState({lat: 12.9140182, lng: 77.5747463});
  const [deliveryLocation,setDeliveryLocation] = useState({lat: 12.9414398, lng: 77.5454111});
  const [open, setOpen] = useState(false);
  const [markerSelected,setMarkerSelected] = useState(0);

  const handleChangeDriverId = (e) => {
    if(e.target.value)
      setDriverId(e.target.value);
  }

  const handleLoadDriver = () => {
    setDestinations(allDriverDestinations[driverId]?.map((dest,i) => {
      return({
        ...dest,
        markerId: i+1
      })
    }))
  }

  useEffect(() => {
    setAllDriverDestinations(driverDestinations)
  }, []);

  return (
    <>
      <div className="flex flex-wrap h-screen">
        <div className="w-full h-1/6">
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
          <div class="p-2 flex">
            <input type="text" placeholder="Driver User Id" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline mr-2" value={driverId} onChange={handleChangeDriverId}/>
            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleLoadDriver}>
              Show
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {destinations.length>0 && 
                  (<Map 
                    currLocation= {currLocation} 
                    deliveryLocation= {deliveryLocation} 
                    destinations={destinations} 
                    zoom_level={12} 
                    travel_mode="truck"
                    setOpen={setOpen}
                    setMarkerSelected={setMarkerSelected}
                  />)
                  }
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  List of Destinations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwipeableEdgeDrawer open={open} setOpen={setOpen} markerSelected={markerSelected} setMarkerSelected={setMarkerSelected}/>
    </>
  );
}
