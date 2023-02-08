import React, { useEffect, useState } from 'react';

import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MapIcon from '@mui/icons-material/Map';
import { DriverAPIs } from 'API/driver.js';
import SwipeableEdgeDrawer from 'components/BottomDrawer/SwipeableEdgeDrawer.js';
import DraggableList from 'components/List/DraggableList.js';
import { useParams } from 'react-router-dom';
import { useStore } from 'store/store.js';
import Map from 'views/admin/Map.js';

export default function DriverInfo() {
  const { allDriverDestinations, setAllDriverDestinations } = useStore();

  const { id, dId } = useParams();
  const userId = id;
  const driverId = dId;

  const [openTab, setOpenTab] = useState(1);
  const [destinations, setDestinations] = useState([]); // current driver destinations
  const [items, setItems] = useState([]); // list items
  const [setCompletedDest] = useState([]); // completed destinations
  const [currLocation, setCurrLocatoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false); // swipeable edge drawer open
  const [markerSelected, setMarkerSelected] = useState(0); // marker selected in the map
  const [selectedDestInfo, setSelectedDestInfo] = useState({}); // selected destination info

  useEffect(() => {
    async function getDriverPath() {
      setIsLoading(true);
      const res = await DriverAPIs.getDriverPath(dId);
      if (!res) {
        return;
      }
      const completed = []; const
        notCompleted = [];
      for (let i = 0; i < res.length; i += 1) {
        if (res[i].delivered === true) {
          completed.push(res[i]);
        } else {
          notCompleted.push(res[i]);
        }
      }
      setCompletedDest(completed);
      setCurrLocatoin(completed[completed.length - 1]);
      setDestinations(notCompleted.map((dest, i) => ({
        ...dest,
        id: i + 1,
      })));
      setItems(notCompleted.map((dest, i) => ({
        ...dest,
        id: i + 1,
      })));
      setIsLoading(false);
    }
    getDriverPath();
  }, [dId]);

  return (
    <>
      <div className="flex flex-wrap h-screen p-2">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  `text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${
                    openTab === 1
                      ? 'text-white bg-lightBlue-600'
                      : 'text-lightBlue-600 bg-white'}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link2"
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
                  `text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${
                    openTab === 2
                      ? 'text-white bg-lightBlue-600'
                      : 'text-lightBlue-600 bg-white'}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <FeaturedPlayListIcon />
                {' '}
                Destinations
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  {(!isLoading)
                    && (
                    <Map
                      currLocation={currLocation}
                      destinations={destinations}
                      zoom_level={12}
                      travel_mode="truck"
                      setOpen={setOpen}
                      setMarkerSelected={setMarkerSelected}
                      setSelectedDestInfo={setSelectedDestInfo}
                    />
                    )}
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  {
                    items?.length > 0
                    && (
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
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwipeableEdgeDrawer
        open={open}
        setOpen={setOpen}
        markerSelected={markerSelected}
        setMarkerSelected={setMarkerSelected}
        selectedDestInfo={selectedDestInfo}
      />
    </>
  );
}
