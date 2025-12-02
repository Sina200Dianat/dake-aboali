
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issues with webpack
const iconRetinaUrl = '/images/marker-icon-2x.png';
const iconUrl = '/images/marker-icon.png';
const shadowUrl = '/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const Map = () => {
  const position: L.LatLngExpression = [35.7219, 51.3347]; // Default to Tehran

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          دکه ابوعلی
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
