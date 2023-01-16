import React from 'react'
import './App.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useState,useEffect } from 'react';
import Map from "./Map.js"
import { destinations } from './constants';
import SwipeableEdgeDrawer from './components/SwipeableEdgeDrawer';

function App() {
  const [scrnDim,setScrnDim] = useState({w:0,h:0});
  const [currLocation,setCurrLocatoin] = useState({lat: 12.9140182, lng: 77.5747463});
  const [deliveryLocation,setDeliveryLocation] = useState({lat: 12.9414398, lng: 77.5454111});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrnDim({w: window.screen.width, h: window.screen.height});
    }
    // setCurrLocation // use set timeout to timely update the drivers geolocation
  },[])

  return (
    <div className="App">
      {/* <div style={{width:scrnDim.w,height:scrnDim.h}}> */}
        <SwipeableEdgeDrawer />
        <Map currLocation= {currLocation} deliveryLocation= {deliveryLocation} destinations={destinations} zoom_level={12} travel_mode="truck" />
      {/* </div> */}
    </div>
  );
}

export default App;
