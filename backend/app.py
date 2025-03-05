from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import requests

app = Flask(__name__)
CORS(app)

# Store multiple camera locations and their detection status
camera_locations = [
    {"id": 0, "latitude": 9.963668, "longitude": 76.409627, "animal_detected": False},  # ESP32-CAM
    {"id": 1, "latitude": 9.964500, "longitude": 76.410500, "animal_detected": False},  # Laptop Webcam
]

# ESP32-CAM Stream URL
ESP32_STREAM_URL = "http://192.168.96.1:81/stream"

# Laptop Webcam
cap = cv2.VideoCapture(0)  # 0 -> Default webcam


def generate_webcam_feed():
    """Capture frames from the laptop webcam and stream as MJPEG."""
    while True:
        success, frame = cap.read()
        if not success:
            break
        _, buffer = cv2.imencode(".jpg", frame)
        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" +
               buffer.tobytes() + b"\r\n")


@app.route("/webcam_feed")
def webcam_feed():
    """Serve the laptop webcam feed."""
    return Response(generate_webcam_feed(), mimetype="multipart/x-mixed-replace; boundary=frame")


@app.route("/esp32_feed")
def esp32_feed():
    """Proxy the ESP32-CAM feed."""
    def generate():
        with requests.get(ESP32_STREAM_URL, stream=True) as r:
            for chunk in r.iter_content(chunk_size=1024):
                yield chunk

    return Response(generate(), mimetype="multipart/x-mixed-replace; boundary=frame")


@app.route("/update", methods=["POST"])
def update_detection():
    """Update detection status for a camera."""
    data = request.json
    
    # Handle detection results format
    if "detections" in data:
        detection_results = data["detections"]
        updated_cameras = []
        
        for detection in detection_results:
            if "camera_id" in detection and "status" in detection:
                camera_id = detection["camera_id"]
                status = detection["status"]
                
                # Find the camera and update its status
                for cam in camera_locations:
                    if cam["id"] == camera_id:
                        # Set animal_detected based on status
                        # TRUE if status is "DETECTED", FALSE for "NO_DETECTION" or "ERROR"
                        animal_detected = status == "DETECTED"
                        
                        

                        # Only update if the status changes
                        if cam["animal_detected"] != animal_detected:
                            cam["animal_detected"] = animal_detected
                            print(f"[UPDATE] Camera {cam['id']} detection status changed to {animal_detected}")
                        
                        updated_cameras.append(cam["id"])
                        break
        
        print(f"[UPDATE] Updated cameras: {updated_cameras}")
          


@app.route("/status", methods=["GET"])
def get_status():
    """Fetch the status of camera detections."""
    return jsonify({"camera_locations": camera_locations}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
