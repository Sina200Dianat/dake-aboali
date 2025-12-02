
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  const position: L.LatLngExpression = [29.6393, 52.5155]; // Shiraz, Mosalla Nezhad St
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // The cleanup function is the key. When the component unmounts (e.g., due to hot-reloading),
    // we must properly remove the map instance to prevent initialization errors on remount.
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);


  return (
    <MapContainer 
        center={position} 
        zoom={16} 
        scrollWheelZoom={false} 
        className="h-full w-full"
        whenCreated={map => (mapRef.current = map)} // Store map instance on creation
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          دکه ابوعلی <br /> خیابان مصلی نژاد، جنب باغ عفیف آباد
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
