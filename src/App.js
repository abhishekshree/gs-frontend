import React from 'react'
import './App.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import * as ttapi from '@tomtom-international/web-sdk-services'
import * as tt from '@tomtom-international/web-sdk-maps';
import { useRef,useState,useEffect } from 'react';
import Map from "./Map.js"
import { destinations } from './constants';

function App() {

  const [currLocation,setCurrLocatoin] = useState({lat: 12.9140182, lng: 77.5747463});
  const [deliveryLocation,setDeliveryLocation] = useState({lat: 12.9414398, lng: 77.5454111});

  useEffect(() => {
    // setCurrLocation // use set timeout to timely update the drivers geolocation
  })

  return (
    <div className="App">
      GROW SIMPLEE
      <Map currLocation= {currLocation} deliveryLocation= {deliveryLocation} destinations={destinations} zoom_level={12} travel_mode="truck" />
    </div>
  );
}

export default App;
