
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const MapComponent = () => {
  const position: L.LatLngExpression = [29.6393, 52.5155]; // Shiraz, Mosalla Nezhad St

  useEffect(() => {
    // This is to fix the default icon issue with webpack
    // It's a workaround for a known issue with react-leaflet and Next.js
    // We do it in useEffect to ensure it only runs on the client
    if (typeof window !== 'undefined') {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: '/images/marker-icon-2x.png',
            iconUrl: '/images/marker-icon.png',
            shadowUrl: '/images/marker-shadow.png',
        });
    }
  }, []);

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false} className="h-full w-full">
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
