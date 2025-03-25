import cv2
import time
import numpy as np
import serial
import requests
from ultralytics import YOLO
import threading

# Load YOLOv8 model
model = YOLO("best.pt")

# ESP32-CAM URL (Replace with actual IP)
ESP32_CAM_URL = "http://192.168.135.181/stream"

# Flask server URL
FLASK_SERVER_URL = "http://127.0.0.1:5000/update"

# Set up serial communication with ESP32
# ser = serial.Serial('COM7', 115200, timeout=1)
time.sleep(2)  # Allow time for serial connection

# Define camera sources
cameras = [
    {"id": 0, "source": ESP32_CAM_URL, "name": "ESP32-CAM", "last_status": False, "frame": None, "cap": None},  # ESP32-CAM
    {"id": 1, "source": 0, "name": "Laptop Webcam", "last_status": False, "frame": None, "cap": None}  # Laptop webcam
]

# Flag to control threads
running = True

def capture_frames(cam):
    """Thread function to continuously capture frames from a camera"""
    global running
    
    source = cam["source"]
    cap = cv2.VideoCapture(source)
    cam["cap"] = cap
    
    if not cap.isOpened():
        print(f"[ERROR] Failed to open camera: {cam['name']}")
        return
    
    print(f"[INFO] Started capture thread for {cam['name']}")
    
    while running:
        ret, frame = cap.read()
        if ret:
            cam["frame"] = frame
        else:
            print(f"[WARNING] Failed to get frame from {cam['name']}")
        
        # Small sleep to prevent excessive CPU usage
        time.sleep(0.01)
    
    # Clean up
    cap.release()

def detect_animals():
    global running
    last_detection_time = 0
    
    # Start capture threads for each camera
    capture_threads = []
    for cam in cameras:
        thread = threading.Thread(target=capture_frames, args=(cam,))
        thread.daemon = True
        thread.start()
        capture_threads.append(thread)
    
    # Give time for cameras to initialize
    time.sleep(2)
    
    try:
        while running:
            current_time = time.time()
            
            # Display camera feeds continuously
            for cam in cameras:
                if cam["frame"] is not None:
                    display_frame = cam["frame"].copy()
                    cv2.imshow(cam["name"], display_frame)
            
            # Process detections every 5 seconds
            if current_time - last_detection_time >= 5:
                detection_results = []
                print("[INFO] Running detection...")
                
                for cam in cameras:
                    frame = cam["frame"]
                    animal_detected = False
                    
                    if frame is not None:
                        # Create a copy for detection visualization
                        detection_frame = frame.copy()
                        
                        results = model(frame, conf=0.1, verbose=False)  # Lowered confidence threshold and disabled logging
                        
                        # Collect performance metrics
                        metrics = model.metrics
                        with open('perf.csv', 'a') as f:
                            f.write(f"{current_time},{metrics}\n")
                        for result in results:
                            for box in result.boxes:
                                class_id = int(box.cls[0])
                                confidence = box.conf[0]
                                detected_animal = model.names[class_id].lower()
                                x1, y1, x2, y2 = map(int, box.xyxy[0])
                                color = (0, 0, 255) if detected_animal in ["tiger", "elephant"] else (0, 255, 0)
                                cv2.rectangle(detection_frame, (x1, y1), (x2, y2), color, 2)
                                cv2.putText(detection_frame, f"{detected_animal} ({confidence:.2f})", (x1, y1 - 10),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
                                if detected_animal in ["tiger", "elephant"]:
                                    animal_detected = True
                        
                        status = "DANGER" if animal_detected else "CLEAR"
                        detection_results.append({"camera_id": cam["id"], "status": status ,"emoji": "🚨" if animal_detected else "✅"})
                        
                        # Show the detection frame
                        # cv2.imshow(cam["name"], detection_frame)
                    else:
                        detection_results.append({"camera_id": cam["id"], "status": "ERROR","emoji": "❌"})
                
                # Send data to Flask server
                try:
                    response = requests.post(FLASK_SERVER_URL, json={"detections": detection_results})
                    print(f"[INFO] Server response code: {response.status_code}")
                except requests.RequestException:
                    print("[ERROR] Could not send detection results to server")
                
                # print("\nJSON DUMP\n",json.dumps(detection_results, indent=2))
                last_detection_time = current_time  # Update the last detection time
            
                print("[INFO] Results: ",end="")
                for result in detection_results:
                    print(f"{cameras[result['camera_id']]["name"]}: {result['emoji']} {result['status']}" ,end=" | ")
                print("\n")
            # Check for quit key press (small wait provides smoother video feed)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    
    finally:
        # Clean up resources
        running = False
        for thread in capture_threads:
            thread.join(timeout=1.0)
        cv2.destroyAllWindows()
        for cam in cameras:
            if cam["cap"] is not None:
                cam["cap"].release()

if __name__ == "__main__":
    detect_animals()