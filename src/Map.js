import React from 'react'
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as ttservices from "@tomtom-international/web-sdk-services";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useState, useRef } from "react";
// import { fromSeconds } from "from-seconds";
import { api_key } from "./constants.js"
import axios from "axios"

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
    let URL = `https://api.tomtom.com/routing/waypointoptimization/1?key=${api_key}`;
    // const optimize_routes = () => {
    //     const data = {
    //         waypoints: waypoints.map((location) => {
    //             return {
    //             point: {
    //                 latitude: location.lat,
    //                 longitude: location.lng,
    //             },
    //             };
    //         }),
    //         options: {
    //             travelMode: travel_mode,
    //             vehicleMaxSpeed: 0,
    //             vehicleCommercial: true,
    //             vehicleLoadType: ["otherHazmatGeneral"],
    //             traffic: "live",
    //             departAt: "now",
    //             outputExtensions: ["travelTimes", "routeLengths"],
    //             waypointConstraints: {
    //             originIndex: 0,
    //             destinationIndex: 0,
    //             },
    //         },
    //     };
    //     fetch(URL, {
    //     method: "POST",
    //     headers: { "Content-type": "application/json;charset=UTF-8" },
    //     body: JSON.stringify(data),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         const optimized_locations = data.summary.legSummaries.map((summary) => {
    //             return { ...waypoints[summary.originIndex], ...summary };
    //         });
    //         console.log(optimized_locations);
    //         optimized_locations.forEach((location, index) => {
    //             const start_time = new Date(location.departureTime).toLocaleString();
    //             const arrival_time = new Date(location.arrivalTime).toLocaleString();
    //             const distance_in_seconds = location.travelTimeInSeconds
    //             const start_at = location.originIndex;
    //             const end_at = location.destinationIndex;
    //             const popup = new tt.Popup({ offset: 50 }).setHTML(
    //               `<div class="popup">
    //               <h1>Location ${index}</h1>
    //               <br />
    //               <p>Current Point: ${waypoints[start_at].name}</p>
    //               <p>Departure Time: ${start_time}</p>
    //               <p>Next Stop: ${waypoints[end_at].name}</p>
    //               <p>Arrival Time:  ${arrival_time}<p>
    //               <p>Distance To next stop:  ${location.lengthInMeters / 1000}(km)</p>
    //               <p>Estimated Time To next stop:  ${
    //                 distance_in_seconds.hours
    //               } Hours, ${distance_in_seconds.minutes} Minutes</p>
    //               </div> `
    //             );
    //             create_delivery_marker(location).setPopup(popup);
    //         })
    //         create_route(optimized_locations);
    //     })
    // };

    // const create_route = async (locations) => {
    //     await ttservices.services
    //         .calculateRoute({
    //         key: api_key,
    //         locations,
    //         })
    //         .then((routeData) => {
    //         const features = routeData.toGeoJson().features;
    //         features.forEach((feature, index) => {
    //             map.addLayer({
    //             id: "route" + index,
    //             type: "line",
    //             source: {
    //                 type: "geojson",
    //                 data: feature,
    //             },
    //             paint: {
    //                 "line-color": `red`,
    //                 "line-opacity": 0.8,
    //                 "line-width": 6,
    //                 "line-dasharray": [1, 0, 1, 0],
    //             }
    //             });
    //         });
    //         });
    // };

    // function createAllRoutes(){
    //     let pts_covered = 0;
    //         while(pts_covered<waypoints.length){
    //             create_route(waypoints.slice(pts_covered,Math.min(pts_covered+150,waypoints.length)))
    //             pts_covered+=150    
    //         }       
    // }

    function createRoute () {
        console.log(currLocation)
        const routeOptions = {
          key: api_key,
          locations: [
            [currLocation.lng, currLocation.lat],
            [deliveryLocation.lng, deliveryLocation.lat],
          ],
          // travelMode: travel_mode,
          // vehicleCommercial: true,
          // vehicleHeading: 0,
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

    const getSnapFunction = () => {
      // const url = 'https://api.tomtom.com/snapToRoads/1';
      // const params = {
      //   points: `${currLocation.lng},${currLocation.lat};${deliveryLocation.lng},${deliveryLocation.lat}`,
      //   vehicleType: 'Truck',
      //   fields: '{projectedPoints{type,geometry{type,coordinates}'+
      //           ',properties{routeIndex,snapResult}}'+
      //           ',route{type,geometry{type,coordinates}'+
      //           ',properties{id,linearReference,speedLimits{value,unit,type}'+
      //           ',speedProfile{value,unit},address{roadName,roadNumbers}}'+
      //           ',frc,formOfWay,roadUse,laneInfo{numberOfLanes}'+
      //           ',heightInfo{height,chainage},trafficSigns{signType,chainage}'+
      //           ',trafficLight,confidence}}'+
      //           ',distances{total,road,offRoad}}',
      //   key: api_key,
      // };
      axios.get("https://api.tomtom.com/snap-to-roads/1/snap-to-roads?points=77.5747463,12.9140182;77.5454111,12.9414398&fields={projectedPoints{type,geometry{type,coordinates},properties{routeIndex}},route{type,geometry{type,coordinates},properties{id,speedRestrictions{maximumSpeed{value,unit}}}}}&key=y1Duis78asfADSQn9HYekaSyUw4siXLf").then((res) => 
      {
        console.log("done")
       console.log(res.data)
       res.data.route.forEach(
        (item) => {
          map.addLayer({
            id: Math.random().toString(),
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "LineString",
                      properties: {},
                      coordinates: item.geometry.coordinates
                    }
                  }
                ]
              }
            },
            layout: {
              "line-cap": "round",
              "line-join": "round"
            },
            paint: {
              "line-color": "#ff0000",
              "line-width": 2
            }
          });
        }
       )
         map.setCenter([parseFloat(77.5747463), parseFloat(12.9140182)]);
     }).catch((err) => console.log(err))
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
            // for (let d in waypoints) {
            //     create_delivery_marker(waypoints[d],map);
            // }
            createRoute()
            create_delivery_marker(currLocation,map)
            create_delivery_marker(deliveryLocation,map)
            // getSnapFunction()
          });
        }
        else{
            console.log("error loading map"); //Add better error handling function
        }
      }, [map]);

    return (
      <div className="map_wrapper">
        <div ref={mapElement} className="mapDiv" />
      </div>
    );
  }
  export default Map;