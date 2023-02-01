import React from "react";
import { useState, useEffect, useContext } from 'react';

import Map from "views/admin/Map.js";
import SwipeableEdgeDrawer from "components/BottomDrawer/SwipeableEdgeDrawer.js";
import { GlobalContext } from "context/gobalContext.js";
import { AdminAPIs } from "API/admin.js";
import { useParams } from "react-router-dom";
import DraggableList from "components/List/DraggableList.js";
import DynamicPoint from "components/modals/DynamicPoint";

export default function Admin(props) {
  const {allDriverDestinations,setAllDriverDestinations} = useContext(GlobalContext);
  const { id } = useParams();
  const userId = id;

  const [drivers,setDrivers] = useState([]) //list of drivers that fall under this admin
  const [openTab, setOpenTab] = useState(1);
  const [driverId,setDriverId] = useState(null); //current driver id in the input
  const [destinations,setDestinations] = useState([]); //current driver destinations
  const [items, setItems] = useState([]); //list items
  const [currLocation,setCurrLocatoin] = useState({latitude: 12.9140182, longitude: 77.5747463});
  const [open, setOpen] = useState(false); //swipeable edge drawer open
  const [openDynamicPoint,setOpenDynamicPoint] = useState(false); //dynamic point drawer open
  const [markerSelected,setMarkerSelected] = useState(0); //marker selected in the map
  const [selectedDestInfo,setSelectedDestInfo] = useState({}); //selected destination info

  const handleChangeDriverId = (e) => {
    if(e.target.value)
      setDriverId(e.target.value);
  }

  const handleLoadDriver = () => {
    if(!driverId)
      return

    const temp = allDriverDestinations[userId][driverId]?.map((dest,i) => { //need to change this to get from backend
      return({
        ...dest,
        id: i+1
      })
    })
    setDestinations(temp);
    setItems(temp);
    console.log("items in admin ->",items)
  }

  const handleDynamicPoint = () => {
    if(!driverId){
      //add error notification
      console.log("Please select a driver")
      return
    }
    setOpenDynamicPoint(true);
  }

  useEffect(() => {
    // async function getDrivers(){
    //   const res = await AdminAPIs.getAdminDrivers(userId)
    //   setDrivers(res)
    //   console.log(res)
    // }
    // getDrivers()
    const drivers = Object.keys(allDriverDestinations[userId])
    setDrivers(drivers)
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
            <div class="mb-3 xl:w-96">
              <select class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                value={driverId}
                onChange={handleChangeDriverId}
                >
                  <option selected>Choose Driver ID</option>
                  {drivers?.map((dId) => <option value={dId}>{dId}</option>)}
              </select>
            </div>
            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleLoadDriver}>
              Show
            </button>
          </div>
          <div>
            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleDynamicPoint}>
              Add Points
            </button>
          </div>
        </div>
        <DynamicPoint showModal={openDynamicPoint} setShowModal={setOpenDynamicPoint}/>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {destinations?.length>0 && 
                  (<Map 
                    currLocation= {currLocation} 
                    destinations={destinations} 
                    zoom_level={12} 
                    travel_mode="truck"
                    setOpen={setOpen}
                    setMarkerSelected={setMarkerSelected}
                    setSelectedDestInfo={setSelectedDestInfo}
                  />)
                  }
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {
                  items?.length>0 &&
                  <DraggableList 
                    destinations={destinations} 
                    setDestinations={setDestinations} 
                    items={items} 
                    setItems={setItems}
                    allDriverDestinations={allDriverDestinations}
                    setAllDriverDestinations={setAllDriverDestinations}
                    adminId={userId}
                    driverId={driverId}
                  />
                  } 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwipeableEdgeDrawer open={open} setOpen={setOpen} markerSelected={markerSelected} setMarkerSelected={setMarkerSelected} selectedDestInfo={selectedDestInfo}/>
    </>
  );
}
