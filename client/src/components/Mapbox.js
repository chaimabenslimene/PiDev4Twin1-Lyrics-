import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken =
  'pk.eyJ1IjoieWVzc2luZTk5NyIsImEiOiJjbGgxeWNreHkwb2ptM2tvaHgwNmJmOHVmIn0.15WcHCezNiXvyOmIIIFHCQ';

const coordinates = [
  [10.2689573, 36.8940485],
  [10.2419855, 36.8763089],
  [10.1886875, 36.8453963],
  [10.6946992, 36.4524279],
  [9.8408618, 37.2811055],
  [8.0991981, 33.9187144],
];

const MapboxExample = ({ id }) => {
  const [eta, setEta] = useState('');
  const [distance, setDistance] = useState('');
  useEffect(() => {
    let startIdx, endIdx;
    do {
      startIdx = Math.floor(Math.random() * coordinates.length);
      endIdx = Math.floor(Math.random() * coordinates.length);
    } while (startIdx === endIdx);

    const start = coordinates[startIdx];
    const end = coordinates[endIdx];

    if (start === end) {
      // If the randomly selected start and end are the same,
      // select two new indices and corresponding coordinates.
      do {
        startIdx = Math.floor(Math.random() * coordinates.length);
        endIdx = Math.floor(Math.random() * coordinates.length);
      } while (startIdx === endIdx);

      start = coordinates[startIdx];
      end = coordinates[endIdx];
    }
    // const bounds = new mapboxgl.LngLatBounds(start, end);
    const map = new mapboxgl.Map({
      container: id,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: start,
    });

    map.on('error', (error) => {
      console.log(error);
    });

    map.on('load', () => {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Get the duration and distance from the API response
          const duration = data.routes[0].duration;

          const durationInHours = Math.floor(duration / 3600);
          const durationInMinutes = Math.floor((duration % 3600) / 60);
          const durationInSeconds = Math.floor(duration % 60);
          const distance = data.routes[0].distance;
          const kilometers = Math.floor(distance / 1000);
          const meters = Math.ceil((distance % 1000) / 100);
          // Convert duration from seconds to minutes
          const durationMinutes = Math.round(duration / 60);
          if (durationInHours > 0)
            setEta(`${durationInHours}h:${durationInMinutes}m`);
          else setEta(`${durationInMinutes}m`);
          setDistance(`${kilometers}.${meters} km`);
          // Add duration and distance to the map
          // const popup = new mapboxgl.Popup()
          //   .setLngLat(end)
          //   .setHTML(
          //     `<p>ETA: ${durationInHours}h:${durationInMinutes}m</p><p>${kilometers}.${meters} km</p>`
          //   )
          //   .addTo(map);

          // Get the intermediate coordinates along the route
          const coords = data.routes[0].geometry.coordinates;
          // console.log(coords);

          const bounds = new mapboxgl.LngLatBounds();

          // Create an array to hold the intermediate coordinates
          const intermediateCoords = [];

          // Iterate through each coordinate in the array
          coords.forEach((coord) => {
            // Create a new LngLat object for the current coordinate
            const lngLat = new mapboxgl.LngLat(coord[0], coord[1]);
            // Add the LngLat object to the bounds object
            bounds.extend(lngLat);

            // Add the LngLat object to the intermediateCoords array
            intermediateCoords.push(lngLat.toArray());
          });

          // Add the start and end points to the intermediateCoords array
          intermediateCoords.unshift(start);
          intermediateCoords.push(end);
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: intermediateCoords,
              },
            },
          });
          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#888',
              'line-width': 8,
            },
          });

          map.addLayer({
            id: 'start',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: start,
                },
              },
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#3887be',
            },
          });

          map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: end,
                },
              },
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#f30',
            },
          });
          map.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
          });
        });
    });
  }, []);

  return (
    <div
      id={id}
      style={{ width: '100%', height: '300px', alignContent: 'center' }}
    >
      {/* map will be loaded here */}
      <span>Durée: {eta}</span>
      <br />
      <span>{distance}</span>
    </div>
  );
};

export default MapboxExample;
