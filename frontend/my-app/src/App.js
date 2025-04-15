import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const API_BASE_URL = "http://localhost:9099"; // Đổi nếu backend chạy port khác

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
};

function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (location) {
      fetch(`${API_BASE_URL}/api/v1/geocode?lat=${location.lat}&lon=${location.lng}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Response from backend:", data);
            const displayName = data.display_name || "Không tìm được địa chỉ";
            setAddress(displayName);
          })
          .catch((err) => console.error("Error fetching address:", err));
    }
  }, [location]);

  return (
      <div style={{ padding: "20px" }}>
        <h2>Chọn vị trí để đặt hàng</h2>
        <MapContainer center={[10.7769, 106.7009]} zoom={13} style={{ height: "400px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {location && <Marker position={location} />}
          <LocationPicker setLocation={setLocation} />
        </MapContainer>
        {location && (
            <div>
              <p><strong>Toạ độ:</strong> {location.lat}, {location.lng}</p>
              <p><strong>Địa chỉ:</strong> {address}</p>
              <button onClick={() => alert(`Đặt hàng tại:\n${address}`)}>Đặt hàng</button>
            </div>
        )}
      </div>
  );
}

export default App;
