// components/Map.js
"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";

const Map = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false, // Disable server-side rendering for Leaflet
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function OSMMap() {
  const position = [9.963668, 76.409627]; // Default coordinates (latitude, longitude)

  return (
    <div className="h-screen w-full">
      <Map center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty popup! <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  );
}
	