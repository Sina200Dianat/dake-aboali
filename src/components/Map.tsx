
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

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

const MapComponent = () => {
  const position: L.LatLngExpression = [29.6393, 52.5155]; // Shiraz, Mosalla Nezhad St

  const MapContainer = useMemo(() => dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    {
      ssr: false,
      loading: () => <div className="h-full w-full bg-muted animate-pulse" />
    }
  ), []);

  const TileLayer = useMemo(() => dynamic(
    () => import('react-leaflet').then(mod => mod.TileLayer),
    { ssr: false }
  ), []);

  const Marker = useMemo(() => dynamic(
    () => import('react-leaflet').then(mod => mod.Marker),
    { ssr: false }
  ), []);
  
  const Popup = useMemo(() => dynamic(
    () => import('react-leaflet').then(mod => mod.Popup),
    { ssr: false }
  ), []);


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
