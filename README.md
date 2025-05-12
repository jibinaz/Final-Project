
# WildEye: Smart Wild Animal Detection & Alert Web App

**WildEye** is a smart web application that detects wild animals near forest roads using AI and alerts users via real-time map tracking. This system aims to minimize human-animal conflict and road accidents in wildlife-prone zones.

---

## About the Web App

This is a full-stack web application built with:

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Flask (Python)
- **Model Hosting:** Roboflow YOLOv8 model
- **Map Display:** OpenStreetMap (OSM) with real-time location updates
- **Hardware Interface:** ESP32-CAM + Microwave Motion Sensor + Buzzer

---

## OpenStreetMap Integration

The WildEye web app includes an **interactive OpenStreetMap** interface to visualize wild animal sightings:

- Animal detection (via ESP32-CAM) triggers a request to the backend.
- The backend processes the image using a YOLO model hosted on Roboflow.
- If an animal is detected:
  - The **location of the ESP32-CAM** is sent to the frontend.
  - The detected **animal's location is marked in red** on the map.
  - All **safe zones are marked in green**.
- Map updates occur in **real-time** using a WebSocket or periodic fetch method.

This helps users and authorities:
- Monitor live animal movement.
- Prevent vehicles from entering high-risk zones.
- Respond quickly with alerts.

---

## Folder Structure

```
Final-Project-main/
├── app/                  # Next.js frontend components
│   ├── map/              # Map UI using OpenStreetMap
│   ├── aboutus/, help/   # Informational pages
├── backend/              # Flask backend with model integration
│   └── app.py
├── public/               # Static assets (icons, SVGs)
├── requirements.txt      # Python packages
├── package.json          # Node.js packages
```

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python 3.6+
- Flask
- Roboflow account with hosted model
- ESP32-CAM and motion sensor setup

---

### 1. Backend Setup

```bash
cd backend
pip install -r ../requirements.txt
python app.py
```



### 2. Frontend Setup

```bash
cd Final-Project-main
npm install
npm run dev
```

> The frontend is built using Next.js and uses Tailwind CSS for styling.
> After running, open your browser and go to: [http://localhost:3000](http://localhost:3000)



### 3. Hardware Integration (ESP32-CAM)

- The microwave motion sensor detects activity and triggers the ESP32-CAM.
- The ESP32-CAM captures an image and sends it to the Flask backend.
- The backend processes the image with a YOLO model (hosted on Roboflow).
- If a wild animal is detected:
  - A buzzer is activated via GPIO.
  - The animal's location is sent to the frontend and displayed on the OpenStreetMap.

---

##  Features

- Real-time object detection using YOLOv8 (Roboflow)
- ESP32-CAM integration with motion-triggered capture
- Buzzer alert for wild animal presence
- OpenStreetMap showing red markers for danger zones, green for safe zones
- Modern, mobile-friendly web UI with live data updates

---

##  Screenshots



```md
![Live Map Interface](./public/assets/map-ui.png)
![Wild Animal Detection](./public/assets/detection.jpg)
```

---


