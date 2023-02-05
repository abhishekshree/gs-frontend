import React from "react";
import { useEffect, useState } from 'react';
import { AdminAPIs } from "API/admin.js";
import DriverList from "components/driverList/driverList.js";
import { useHistory, useParams } from "react-router-dom";
import startRes from "assets/input.json"; //harcoded response to be removed

export default function Drivers() {
  const history = useHistory();
  const { id } = useParams();
  const userId = id;

  const [drivers, setDrivers] = useState([]) //list of drivers that fall under this admin
  const [driverInfo,setDriverInfo] = useState([])
  const [openTab, setOpenTab] = useState(1);

  const handleLoadDriver = async (driverId) => {
    if (!driverId)
      return
    history.push(`/admin/${userId}/driver/${driverId}`)
  }
  useEffect(() => {
    async function getDrivers(){
      const res = await AdminAPIs.getAdminDrivers(userId)
      const temp = res.map((driver) => driver.driver_id)
      setDrivers(temp)
      setDriverInfo(temp.map((driverId) => {
        return ({ driverId: driverId })
      }))
      console.log(temp)
    }
    getDrivers()
    console.log("hi")
    // --- Hardcoding ---
    // const drivers = Object.keys(startRes["Routes"].map((_,index) => userId?.toString()+"_"+index.toString()))
    // setDrivers(drivers)
    //   const temp = drivers.map((driverId) => {
    //     return ({ driverId: driverId })
    // })
    // setDriverInfo(temp)
    // ------------------

  }, []);

  return (
    <>
      <div className="flex flex-wrap h-screen p-2">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <DriverList drivers={driverInfo} handleLoadDriver={handleLoadDriver} setOpenTab={setOpenTab}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
