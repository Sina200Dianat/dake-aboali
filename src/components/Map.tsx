'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// This is to fix the default icon issue with webpack
// by explicitly setting the path to the images that Next.js will serve from the public directory.
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const position: L.LatLngExpression = [29.6393, 52.5155]; // Shiraz, Mosalla Nezhad St

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // Use a ref to hold the map instance. This is crucial.
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Check if the map container is available and if the map has NOT been initialized yet.
    if (mapContainerRef.current && !mapRef.current) {
      // Create the map instance and store it in the ref
      const map = L.map(mapContainerRef.current, {
        center: position,
        zoom: 16,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      // Add the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add the marker with the corrected icon
      L.marker(position, { icon }).addTo(map)
        .bindPopup('دکه ابوعلی <br /> خیابان مصلی نژاد');
    }

    // The cleanup function is the most important part for fixing this bug.
    // It will be called when the component is unmounted.
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // This properly destroys the Leaflet map instance
        mapRef.current = null;  // Clear the ref
      }
    };
  }, []); // The empty dependency array ensures this runs only once on mount and cleans up on unmount.

  // The div that will contain the map.
  return (
    <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default Map;
