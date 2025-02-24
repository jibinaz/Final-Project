"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

export default function OSMMap() {
  const [cameraLocations, setCameraLocations] = useState([]);

  
  const greenIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  
  const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    const fetchCameraLocations = () => {
      fetch("http://127.0.0.1:5000/status") // Replace with your Flask API endpoint
        .then((res) => res.json())
        .then((data) => {
          setCameraLocations(data.camera_locations || []);
        })
        .catch((error) => console.error("Error fetching camera locations:", error));
    };

    fetchCameraLocations();
    const interval = setInterval(fetchCameraLocations, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <MapContainer center={[9.963668, 76.409627]} zoom={14} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render multiple markers dynamically */}
        {cameraLocations.map((location, index) => (
          <Marker key={index} position={[location.latitude, location.longitude]} icon={location.animal_detected ? redIcon : greenIcon}>
            <Popup>
              {location.animal_detected ? "⚠️ Animal Detected!" : "✅ No Animal Detected"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
