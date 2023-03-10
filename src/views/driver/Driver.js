import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MapIcon from '@mui/icons-material/Map';
import { DriverAPIs } from 'API/driver.js';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStore } from 'store/store.js';
import Map from 'views/driver/Map.js';
import SwipeableEdgeDrawer from 'components/BottomDrawer/SwipeableEdgeDrawer.js';
import DestinationList from './DestinationsList';
import OTPModal from './OTPmodal';

const getAdminFromDriverId = (driverId) => {
  if (driverId?.length > 0) {
    let adminId = '';
    for (let i = 0; i < driverId.length; i += 1) {
      if (driverId[i] === '_') {
        break;
      }
      adminId += driverId[i];
    }
    return Number(adminId);
  }
  return null;
};

export default function Driver() {
  const history = useHistory();
  const { allDriverDestinations } = useStore();
  const [openTab, setOpenTab] = React.useState(1);
  const { id } = useParams();
  const userId = id;

  const adminId = getAdminFromDriverId(userId);

  const [currLocation, setCurrLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [showOTPModal, setShowOTPModal] = React.useState(false);
  const [destinations, setDestinations] = useState([]);
  const [completedDest, setCompletedDest] = useState([]);
  const [open, setOpen] = useState(false);
  const [setMarkerSelected] = useState(0); // marker selected in the map
  const [setSelectedDestInfo] = useState({}); // selected destination info
  const [isLoading, setIsLoading] = useState(true);

  const handleLogOut = () => {
    if (window !== undefined) window.localStorage.clear();
    history.push('/');
  };
  const handleDelivery = async () => {
    await DriverAPIs.generateOTP();
    setShowOTPModal('true');
  };

  // eslint-disable-next-line no-shadow
  const getDriverDestinations = async (userId) => {
    setIsLoading(true);
    const res = await DriverAPIs.getDriverPath(userId);
    if (!res) {
      return;
    }
    const completed = [];
    const notCompleted = [];
    for (let i = 0; i < res.length; i += 1) {
      if (res[i].delivered === true) {
        completed.push(res[i]);
      } else {
        notCompleted.push(res[i]);
      }
    }
    setDestinations(
      notCompleted?.map((dest, i) => ({
        ...dest,
        locationId: i + 1,
      })),
    );
    setCompletedDest(completed);
    setCurrLocation(completed[completed.length - 1]);
    if (res.length > 1) { setDeliveryLocation(notCompleted[0]); }
    setIsLoading(false);
  };

  useEffect(() => {
    getDriverDestinations(userId);
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
                `text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${openTab === 1
                  ? 'text-white bg-lightBlue-600'
                  : 'text-lightBlue-600 bg-white'}`
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              <MapIcon />
              {' '}
              Map
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                `text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${openTab === 2
                  ? 'text-white bg-lightBlue-600'
                  : 'text-lightBlue-600 bg-white'}`
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              <FeaturedPlayListIcon />
              {' '}
              Destinations
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
        getDriverDestinations={getDriverDestinations}
      />
      <div className="flex flex-col min-w-screen break-words bg-white w-full">
        <div className="">
          <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
            <div className="flex justify-center w-screen">
              <button
                className="cursor-pointer bg-emerald-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 lg:w-1/4 h-auto mt-1"
                type="button"
                onClick={handleDelivery}
              >
                Deliver
              </button>

              <button
                className="bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 lg:w-1/4 h-auto mt-1 ml-2"
                type="button"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
            <div className="w-full h-full">
              {(!isLoading)
                ? (
                  <Map
                    setOpen={setOpen}
                    setMarkerSelected={setMarkerSelected}
                    setDestInfoSelected={setSelectedDestInfo}
                    currLocation={currLocation}
                    deliveryLocation={deliveryLocation}
                    destinations={destinations}
                    zoom_level={12}
                    travel_mode="truck"
                    completedDest={completedDest}
                    isLoading={isLoading}
                  />
                ) : <div>...Loading</div>}
            </div>
          </div>
          <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
            <DestinationList
              completedDest={completedDest}
              deliveryLocations={destinations}
            />
          </div>
        </div>
        <SwipeableEdgeDrawer
          open={open}
          setOpen={setOpen}
          markerSelected={1}
          setMarkerSelected={setMarkerSelected}
          selectedDestInfo={deliveryLocation}
        />
      </div>
    </div>
  );
}
