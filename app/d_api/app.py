from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store multiple camera locations
camera_locations = [
    {"latitude": 9.963668, "longitude": 76.409627, "animal_detected": False},
    {"latitude": 9.964500, "longitude": 76.410500, "animal_detected": True},
    {"latitude": 9.965300, "longitude": 76.411300, "animal_detected": False}
]

@app.route("/update", methods=["POST"])
def update_detection():
    data = request.json
    if "index" in data and "animal_detected" in data:
        idx = data["index"]
        if 0 <= idx < len(camera_locations):
            camera_locations[idx]["animal_detected"] = data["animal_detected"]
            return jsonify({"message": "Status updated", "status": camera_locations}), 200
        return jsonify({"error": "Invalid index"}), 400
    return jsonify({"error": "Invalid data"}), 400

@app.route("/status", methods=["GET"])
def get_status():
    return jsonify({"camera_locations": camera_locations}), 200

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host="0.0.0.0", port=5000, debug=True)
