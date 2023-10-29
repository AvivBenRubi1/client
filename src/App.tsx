import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./components/BaseMap/Map.css";
import "leaflet/dist/leaflet.css";

import { socket } from "./socket";
import SensorData from "./dtos/sensor-data.dto";
import DroneData from "./models/drone.model";
import ControllerData from "./models/controller.model";
import HomeData from "./models/home.model";
import { Map as LeafletMap } from "leaflet";
import BaseMap from "./components/BaseMap";
import MarkersManager from "./components/BaseMap/markersManager";

import DroneImage from "./images/red_drone.png";
import HomeImage from "./images/home.png";
import ControllerImage from "./images/controller.png";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  useEffect(() => {

    if (!leafletMap) {
      return;
    }

    let dronesManager = new MarkersManager<DroneData>(leafletMap, DroneImage);
    let homesManager = new MarkersManager<HomeData>(leafletMap, HomeImage);
    let controllersManager = new MarkersManager<ControllerData>(leafletMap, ControllerImage);

    socket.on("dji_telemetry", (sensorData: SensorData) => {
      let droneData = new DroneData(sensorData);
      droneData.latitude = 31.960540;
      droneData.longitude = 34.836381;
      dronesManager.setMarkerData(droneData);

      let homeData = new HomeData(sensorData);
      homeData.latitude = 31.959365;
      homeData.longitude = 34.835887;
      homesManager.setMarkerData(homeData);

      controllersManager.setMarkerData(new ControllerData(sensorData))
    });

  });

  return (
    <div className="App">
      <BaseMap setLeafletMap={setLeafletMap} />
    </div>
  );
}

export default App;
