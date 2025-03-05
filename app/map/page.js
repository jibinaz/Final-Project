"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import("react-leaflet").then((mod) => mod.ZoomControl), { ssr: false });

export default function OSMMap() {
  const [cameraLocations, setCameraLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

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


  const fetchCameraLocations = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/status");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      
      const data = await res.json();
      setCameraLocations(data.camera_locations || []);
      setLastUpdate(new Date().toLocaleTimeString());
      console.log(data.camera_locations);
    } catch (error) {
      console.error("Error fetching camera locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCameraLocations();
    const interval = setInterval(fetchCameraLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 right-4 z-10 bg-white p-3 rounded-md shadow-md">
        <h3 className="font-bold text-lg">Camera Status</h3>
        {loading ? (
          <p>Updating...</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">Last updated: {lastUpdate}</p>
            <div className="mt-2">
              {cameraLocations.map((cam) => (
                <div key={cam.id} className="flex items-center gap-2 mb-1">

                  <span className={`w-3 h-3 rounded-full ${cam.animal_detected ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  <span>Camera {cam.id}: {cam.animal_detected ? '⚠️ Alert' : '✅ Clear'}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={fetchCameraLocations}
              className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Refresh Now
            </button>
          </>
        )}
      </div>
      
      <MapContainer 
        center={[9.964, 76.409]} 
        zoom={18} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />

        {cameraLocations.map((location) => (
          <Marker 
            key={`marker-${location.id}-${location.animal_detected}`} 
            position={[location.latitude, location.longitude]} 
            icon={location.animal_detected ? redIcon : greenIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">Camera {location.id}</h3>
                <p className={location.animal_detected ? "text-red-600 font-semibold" : "text-green-600"}>
                  {location.animal_detected ? "⚠️ Animal Detected!" : "✅ No Animal Detected"}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Lat: {location.latitude.toFixed(6)}, Lon: {location.longitude.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
