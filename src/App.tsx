import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/MapComponent/Map.css";
import "leaflet/dist/leaflet.css";

import { socket } from "./socket";
import SensorData from "./dtos/sensor-data.dto";
import DroneData from "./components/MapComponent/marker-data-models/drone.data";
import ControllerData from "./components/MapComponent/marker-data-models/controller.data";
import HomeData from "./components/MapComponent/marker-data-models/home.data";
import MapManager from "./components/MapComponent/map-manager";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  let mapManager: MapManager;
  useEffect(() => {
    if(leafletMap)
        mapManager = new MapManager(leafletMap);
    socket.on("drone-data", (sensorData: SensorData) => {
      if(!mapManager) {
        return;
      }
      const droneData = DroneData.TryCreateDroneData(sensorData);
      const controllerData = ControllerData.TryCreateControllerData(sensorData);
      const homeData = HomeData.TryCreateHomeData(sensorData);
      mapManager.updateMap(droneData, controllerData, homeData)
    });
  });

  return (
    <div className="App">
      <div className="map-wrapper">
        <MapContainer
          center={[31.681579, 35.007935]}
          zoom={8}
          className="map"
          ref={setLeafletMap} >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
