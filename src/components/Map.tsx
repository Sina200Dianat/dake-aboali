'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// This is to fix the default icon issue with webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});


const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const position: L.LatLngExpression = [29.6393, 52.5155]; // Shiraz, Mosalla Nezhad St

  useEffect(() => {
    // Initialize map only if the container exists and map instance is not already created.
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(position, 16);
      mapInstanceRef.current = map; // Store instance

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(position).addTo(map)
        .bindPopup('دکه ابوعلی <br /> خیابان مصلی نژاد، جنب باغ عفیف آباد');
    }

    // Cleanup function to run when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div ref={mapContainerRef} className="h-full w-full" />
  );
};

export default MapComponent;
