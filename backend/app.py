from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import cv2
import requests

app = Flask(__name__)
CORS(app)

class Camera:
    def __init__(self, id, latitude, longitude):
        self.id = id
        self.latitude = latitude
        self.longitude = longitude
        self.animal_detected = False
    
    def to_json(self):
        return {
            "id": self.id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "animal_detected": self.animal_detected
        }

camera_locations = [
    Camera(0, 9.963668, 76.409627),  
    Camera(1, 9.964500, 76.410500),  
]


ESP32_STREAM_URL = "http://192.168.135.1:81/stream"


cap = cv2.VideoCapture(0)  


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
    
    print(data)
    # Handle detection results format
    if "detections" in data:
        detection_results = data["detections"]
        # updated_cameras = []
        
        for detection in detection_results:
            if "camera_id" in detection and "status" in detection:
                camera_id = detection["camera_id"]
                status = detection["status"]
                
                # Find the camera and update its status
                for cam in camera_locations:
                    if cam.id == camera_id:
                        if status == "CLEAR":
                            cam.animal_detected = False
                        if status == "DANGER":
                            cam.animal_detected = True
                        if status == "ERROR":
                            cam.animal_detected = False
                        break
        
        print("[UPDATE] Updated camera status")
    
    return jsonify({"success": True}), 200
          


@app.route("/status", methods=["GET"])
def get_status():
    values = [camera.to_json() for camera in camera_locations]
    print(values)
    """Fetch the status of camera detections."""
    return jsonify({
        "camera_locations": [camera.to_json() for camera in camera_locations]
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
