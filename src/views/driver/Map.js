import React from 'react'
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as ttservices from "@tomtom-international/web-sdk-services";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useState, useRef } from "react";
import { api_key } from "constants.js"
import "../../App.css"

function Map({ currLocation, deliveryLocation, destinations, zoom_level, travel_mode, completedDest }) {
    const mapElement = useRef();
    const [map, setMap] = useState(null); 
    const [waypoints,setWayPoints] = useState(destinations);

    function create_delivery_marker(location) {
        const marker_el = document.createElement("div");
        marker_el.className = 'marker-delivery';
        marker_el.id=deliveryLocation.locationId
        // const popup = new tt.Popup({ offset: 20 }).setText(location.name);
        const marker = new tt.Marker({ element: marker_el, anchor: "bottom" })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);

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

    function createRoute () {
        const routeOptions = {
          key: api_key,
          locations: [
            [currLocation.longitude, currLocation.latitude],
            [deliveryLocation.longitude, deliveryLocation.latitude],
          ],
          travelMode: travel_mode,
          vehicleCommercial: true,
          vehicleHeading: 0,
        };
        
        ttservices.services.calculateRoute(routeOptions).then((response) => {
          var geojson = response.toGeoJson();
          map.addLayer({
            id: "route" + deliveryLocation.locationId,
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
          console.log("creating driver route")
        });
    }

    const handleDeleteRoute = (routeId) => {
      map?.removeLayer(["route" + routeId]);
      document.getElementById(routeId?.toString())?.remove();
    }
    useEffect(() => {
      if(completedDest.length>0)
        handleDeleteRoute(completedDest[completedDest.length-1]?.locationId)
    },[completedDest])

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
          createRoute()
          create_driver_marker(currLocation,map)
          create_delivery_marker(deliveryLocation,map)
        }
        else{
            console.log("error loading map"); //Add better error handling function
        }
      }, [map,currLocation,deliveryLocation]);

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