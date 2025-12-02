
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// This is to fix the default icon issue with webpack
// It's a workaround for a known issue with react-leaflet and Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
  });
}


const MapComponent = () => {
  const position: L.LatLngExpression = [29.6393, 52.5155]; // Shiraz, Mosalla Nezhad St

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
