import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import * as ttservices from '@tomtom-international/web-sdk-services';
// eslint-disable-next-line camelcase
import { api_key as API_KEY } from 'constants.js';
import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';

function Map({
  currLocation,
  destinations,
  zoom_level,
  setOpen,
  setMarkerSelected,
  setSelectedDestInfo,
}) {
  const mapElement = useRef();
  const [map, setMap] = useState(null);

  function handleMarkerClick(e) {
    setMarkerSelected(Number(e.target.id)); // setMarkerSelected(marker_id) TBD
    setSelectedDestInfo(destinations[Number(e.target.id) - 1]);
    setOpen('true');
  }

  function createDeliveryMarker(location) {
    const markerEl = document.createElement('div');
    markerEl.id = location.id.toString();
    markerEl.className = 'marker-delivery';
    const popup = new tt.Popup({ offset: 20 }).setHTML(
      `Location Number:${location.id}`,
    );
    const marker = new tt.Marker({ id: location.id, element: markerEl, anchor: 'bottom' })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map)
      .setPopup(popup);
      // .onClose(handleMarkerDeselect);
    markerEl.addEventListener('click', (e) => handleMarkerClick(e));
    return marker;
  }

  function createDriverMarker(location) {
    const markerEl = document.createElement('div');
    markerEl.className = 'marker-driver';
    const marker = new tt.Marker({ element: markerEl, anchor: 'bottom' })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);

    return marker;
  }

  const createRoute = (locations, i) => {
    ttservices.services
      .calculateRoute({
        key: API_KEY,
        locations,
      })
      .then((routeData) => {
        const { features } = routeData.toGeoJson();
        features.forEach((feature, index) => {
          const routeLayer = map.addLayer({
            id: `route${i}${index}`,
            type: 'line',
            source: {
              type: 'geojson',
              data: feature,
            },
            paint: {
              'line-color': 'red',
              'line-opacity': 0.8,
              'line-width': 6,
              'line-dasharray': [1, 0, 1, 0],
            },
          });
          routeLayer.on('click', () => {
            routeLayer.setPaintProperty('line-color', 'blue');
          });
        });
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const map = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: [77.5747463, 12.9140182],
      // eslint-disable-next-line camelcase
      zoom: zoom_level,
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    setMap(map);
    return () => map.remove();
  }, [destinations]);

  useEffect(() => {
    if (map) {
      createDriverMarker(currLocation);
      map.on('load', () => {
        destinations.forEach((location) => {
          createDeliveryMarker(location);
        });
        createDriverMarker(currLocation);
        const locations = destinations.map((location) => [location.longitude, location.latitude]);
        locations.unshift([currLocation.longitude, currLocation.latitude]);
        for (let i = 0; i < locations.length; i += 150) {
          if (i + 150 > locations.length) {
            createRoute(locations.slice(i), i);
          }
          createRoute(locations.slice(i, i + 150), i);
        }
      });
    } else {
      console.log('error loading map'); // Add better error handling function
    }
  }, [map, currLocation]);

  return (
    <div className="map_wrapper">
      <div
        ref={mapElement}
        className="absolute top-0 left-0 w-full"
        style={{ height: 'calc(100vh - 14vh)' }}
      />
    </div>
  );
}
export default Map;
