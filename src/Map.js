import React from 'react'
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as ttservices from "@tomtom-international/web-sdk-services";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useState, useRef } from "react";
import { api_key } from "./constants.js"

function Map({ currLocation, deliveryLocation, destinations, zoom_level, travel_mode }) {
    const mapElement = useRef();
    const [map, setMap] = useState(null); 
    const [waypoints,setWayPoints] = useState(destinations);

    function create_delivery_marker(location) {
        const marker_el = document.createElement("div");
        marker_el.className = 'marker-delivery';
        // const popup = new tt.Popup({ offset: 20 }).setText(location.name);
        const marker = new tt.Marker({ element: marker_el, anchor: "bottom" })
        .setLngLat([location.lng, location.lat])
        .addTo(map);

        return marker;
    }

    function createRoute () {
        console.log(currLocation)
        const routeOptions = {
          key: api_key,
          locations: [
            [currLocation.lng, currLocation.lat],
            [deliveryLocation.lng, deliveryLocation.lat],
          ],
          travelMode: travel_mode,
          vehicleCommercial: true,
          vehicleHeading: 0,
        };
        
        ttservices.services.calculateRoute(routeOptions).then((response) => {
          // routeOptions.locations.map((store) => 
          //    new tt.Marker().setLngLat(store).addTo(map.current)
          // );
          // if(map.current === undefined)
          //   console.log("hi")
          var geojson = response.toGeoJson();
          map.addLayer({
            id: "route" + Math.random(100000),
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            paint: {
              "line-color": "#0f8ae2",
              "line-width": 8,
            },
          });
     
          var bounds = new tt.LngLatBounds();
          geojson.features[0].geometry.coordinates.forEach(function (point) {
            bounds.extend(tt.LngLat.convert(point)); // creates a bounding area
          });
          map.fitBounds(bounds, {
            duration: 300,
            padding: 50,
            maxZoom: 14,
          }); // zooms the map to the searched route
        });
    }

    useEffect(() => {
        let map = tt.map({
        key: api_key,
        container: mapElement.current,
        center: [77.5747463,12.9140182],
        zoom: zoom_level,
        });
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
        setMap(map);
        return () => map.remove();
    }, []);
    
    useEffect(() => {
        if (map) {
          map.on("load", () => {
            createRoute()
            create_delivery_marker(currLocation,map)
            create_delivery_marker(deliveryLocation,map)
          });
        }
        else{
            console.log("error loading map"); //Add better error handling function
        }
      }, [map]);

    return (
      // <div className="map_wrapper">
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
      // </div>
    );
  }
  export default Map;