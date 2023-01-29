import React from 'react'
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as ttservices from "@tomtom-international/web-sdk-services";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useState, useRef } from "react";
import { api_key } from "constants.js"
import "../../App.css"

function Map({ currLocation, deliveryLocation, destinations, zoom_level, travel_mode,setOpen,setMarkerSelected }) {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  
  function handleMarkerClick(e){
    setOpen("true");
    setMarkerSelected(Number(e.target.id)); //setMarkerSelected(marker_id) TBD
  }
  

  function handleMarkerDeselect(e){
    console.log("deselect");
  }

  function create_delivery_marker(location) {
    const marker_el = document.createElement("div");
    marker_el.id = location.markerId.toString();
    marker_el.className = 'marker-delivery';
    const popup = new tt.Popup({ offset: 20 }).setHTML(
      `Location Number:${location.markerId}`
    );
    const marker = new tt.Marker({ id:location.markerId, element: marker_el, anchor: "bottom" })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map)
      .setPopup(popup)
      // .onClose(handleMarkerDeselect);
    marker_el.addEventListener('click',(e)=>handleMarkerClick(e));
    return marker;
  }

  function create_driver_marker(location) {
    const marker_el = document.createElement("div");
    marker_el.className = 'marker-driver';
    const marker = new tt.Marker({ element: marker_el, anchor: "bottom" })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);

    return marker;
  }

  const create_route = (locations, i) => {
    ttservices.services
      .calculateRoute({
        key: api_key,
        locations,
      })
      .then((routeData) => {
        const features = routeData.toGeoJson().features;
        features.forEach((feature, index) => {
          const routeLayer = map.addLayer({
            id: "route" + i + index,
            type: "line",
            source: {
              type: "geojson",
              data: feature,
            },
            paint: {
              "line-color": `red`,
              "line-opacity": 0.8,
              "line-width": 6,
              "line-dasharray": [1, 0, 1, 0],
            }
          });
          console.log(routeLayer);
          routeLayer.on('click', (e) => {
            routeLayer.setPaintProperty('line-color', 'blue');
            console.log('Layer clicked at:', e);
        });
        });
      });
  };

  useEffect(() => {
    let map = tt.map({
      key: api_key,
      container: mapElement.current,
      center: [77.5747463, 12.9140182],
      zoom: zoom_level,
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    setMap(map);
    return () => map.remove();
  }, [destinations]);

  useEffect(() => {
    console.log("-->",destinations)
    if (map) {
      console.log("hi")
      map.on("load", () => {
        destinations.forEach((location) => {
          create_delivery_marker(location);
        });
        create_driver_marker(currLocation);
        const locations = destinations.map((location) => [location.longitude, location.latitude])
        locations.unshift([currLocation.longitude, currLocation.latitude])
        for (let i = 0; i < locations.length; i += 150){
          if (i + 150 > locations.length) {
            create_route(locations.slice(i), i)
          }
          create_route(locations.slice(i, i + 150), i)
        }
      });
    }
    else {
      console.log("error loading map"); //Add better error handling function
    }
  },[map]);

  return (
    <div className="map_wrapper">
      <div
        ref={mapElement}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
export default Map;