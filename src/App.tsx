
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./components/BaseMap/Map.css";
import "leaflet/dist/leaflet.css";
import { Grid } from "@mui/material";
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
import Frame from "./components/MapComponent/DataComponent/frame";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  const [position, setPosition] = useState<[number, number] | undefined>();

  useEffect(() => {

    if (!leafletMap) {
      return;
    }

    let dronesManager = new MarkersManager<DroneData>(leafletMap, DroneImage);
    let homesManager = new MarkersManager<HomeData>(leafletMap, HomeImage);
    let controllersManager = new MarkersManager<ControllerData>(leafletMap, ControllerImage);

    socket.on("dji_telemetry", (sensorData: SensorData) => {
      let droneData = new DroneData(sensorData);
      dronesManager.setMarkerData(droneData);
      homesManager.setMarkerData(new HomeData(sensorData));
      controllersManager.setMarkerData(new ControllerData(sensorData))
    });

  });

  type Data = {
    longitude: any,
    latitude: any,
    altitude: any,
    serial_number: any,
    device_type: any
  };

  const newData: Data[] = [
    {
      longitude: 31.681579,
      latitude: 35.007935,
      altitude: 35.007935,
      serial_number: 55,
      device_type: 55
    }
  ]

  const handleClick = (longitude: number, altitude: number) => {
    setPosition([longitude, altitude]);
    console.log("App", [longitude, altitude])
    leafletMap?.setView([longitude, altitude],13);
    //mapManager.setView(position, 8)
  };

  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={3}>
          <Frame newData={newData} setPosition={handleClick} />
        </Grid>
        <Grid item xs={9} style={{left:"26rem"}}>
        <BaseMap setLeafletMap={setLeafletMap} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
