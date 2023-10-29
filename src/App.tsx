
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./components/BaseMap/Map.css";
import "leaflet/dist/leaflet.css";
import { Grid } from "@mui/material";
import { socket } from "./socket";
import SensorData from "./dtos/sensor-data.dto";
import DroneData from "./components/BaseMap/marker-data-models/drone.data";
import ControllerData from "./components/BaseMap/marker-data-models/controller.data";
import HomeData from "./components/BaseMap/marker-data-models/home.data";
import MapManager from "./components/BaseMap/map-manager";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";

import Frame from "./components/MapComponent/DataComponent/frame";

import BaseMap from "./components/BaseMap";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  const [position, setPosition] = useState<[number, number] | undefined>();
  let mapManager: MapManager;

  useEffect(() => {
    if (leafletMap) {
      mapManager = new MapManager(leafletMap);
      setPosition([31.681579, 35.007935])
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
    //mapManager.setView(position, 8)
  };

  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={3}>
          <Frame newData={newData} setPosition={handleClick} />
        </Grid>
        <Grid item xs={9} className="map-wrapper" style={{ left: "26rem" }}>
          <BaseMap setLeafletMap={setLeafletMap} />
          {/* <MapContainer
            center={[31.681579, 35.007935]}
            zoom={8}
            className="map"
            ref={setLeafletMap} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer> */}
        </Grid>

      </Grid>

    </div>
  );
}

export default App;
