import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/BaseMap/Map.css";
import "leaflet/dist/leaflet.css";

import { socket } from "./socket";
import SensorData from "./dtos/sensor-data.dto";
import DroneData from "./components/BaseMap/marker-data-models/drone.data";
import ControllerData from "./components/BaseMap/marker-data-models/controller.data";
import HomeData from "./components/BaseMap/marker-data-models/home.data";
import MapManager from "./components/BaseMap/map-manager";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import BaseMap from "./components/BaseMap";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  let mapManager: MapManager;

  useEffect(() => {
    if (leafletMap) {
      mapManager = new MapManager(leafletMap);
    }
    socket.on("sensor_data", (sensorData: SensorData) => {
      if (!mapManager) {
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
      <BaseMap setLeafletMap={setLeafletMap}/>
    </div>
  );
}

export default App;
