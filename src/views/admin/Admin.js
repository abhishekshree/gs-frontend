import { useEffect, useState } from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MapIcon from '@mui/icons-material/Map';
import { AdminAPIs } from "API/admin.js";
import UnroutedList from "components/List/UnroutedList.js";
import DriverList from "components/driverList/driverList.js";
import DynamicPoint from "components/modals/DynamicPoint";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "store/store.js";
import startRes from "assets/input.json"; //harcoded response to be removed

export default function Admin(props) {
  // const { allDriverDestinations, setAllDriverDestinations } = useContext(GlobalContext);
  const { allDriverDestinations, setAllDriverDestinations } = useStore();
  const history = useHistory();
  const { id } = useParams();
  const userId = id;

  const {unroutedPoints} = useStore()

  const [drivers, setDrivers] = useState([]) //list of drivers that fall under this admin
  const [driverInfo,setDriverInfo] = useState([])
  const [openTab, setOpenTab] = useState(1);
  const [driverId, setDriverId] = useState(null); //current driver id in the input
  const [destinations, setDestinations] = useState([]); //current driver destinations
  const [items, setItems] = useState([]); //list items
  const [currLocation, setCurrLocatoin] = useState({ latitude: 12.9140182, longitude: 77.5747463 });
  const [open, setOpen] = useState(false); //swipeable edge drawer open
  const [openDynamicPoint, setOpenDynamicPoint] = useState(false); //dynamic point drawer open
  const [markerSelected, setMarkerSelected] = useState(0); //marker selected in the map
  const [selectedDestInfo, setSelectedDestInfo] = useState({}); //selected destination info

  const handleLoadDriver = async (driverId) => {
    if (!driverId)
      return
    history.push(`/driver/${driverId}`)
  }

  const handleDynamicPoint = () => {
    setOpenDynamicPoint(true);
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
                <AccountBoxIcon /> Drivers
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
                <MapIcon /> Unrouted Points
              </a>
            </li>
          </ul>
          
          <div>
            <div>
              <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleDynamicPoint}>
                Add Points
              </button>
            </div>
          </div>
        </div>
        <DynamicPoint adminId={userId} showModal={openDynamicPoint} setShowModal={setOpenDynamicPoint} />
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <DriverList drivers={driverInfo} handleLoadDriver={handleLoadDriver} setOpenTab={setOpenTab}/>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <UnroutedList deliveryLocations={unroutedPoints} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
