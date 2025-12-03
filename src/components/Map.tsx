
'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// This is to fix the default icon issue with webpack
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const position: L.LatLngExpression = [29.62362449411336, 52.49681712854327]; // Dakeh Aboali Location

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Only initialize the map if the container ref is available and a map instance doesn't already exist.
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(position, 16);
      mapInstanceRef.current = map; // Store the map instance

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(position, { icon }).addTo(map)
        .bindPopup('دکه ابوعلی <br /> اینجا منتظرتونیم!')
        .openPopup();
    }

    // Cleanup function to run when the component is unmounted
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  // The div that will contain the map.
  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default Map;

