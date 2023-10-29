
import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/MapComponent/Map.css";
import "leaflet/dist/leaflet.css";
import { Grid } from "@mui/material";
import { socket } from "./socket";
import SensorData from "./dtos/sensor-data.dto";
import DroneData from "./components/MapComponent/marker-data-models/drone.data";
import ControllerData from "./components/MapComponent/marker-data-models/controller.data";
import HomeData from "./components/MapComponent/marker-data-models/home.data";
import MapManager from "./components/MapComponent/map-manager";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import Frame from "./components/MapComponent/DataComponent/frame";

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

  type Data = {
    longitude: any,
    latitude: any,
    altitude: any,
    serial_number: any,
    device_type: any
};

const newData: Data[] = [
    {
        longitude:108,
        latitude: 55,
        altitude: 55,
        serial_number: 55,
        device_type:55
    },
    {
        longitude:55555,
        latitude: 55,
        altitude: 55,
        serial_number: 55,
        device_type:55
    },
    {
        longitude:55,
        latitude: 55,
        altitude: 55,
        serial_number: 55,
        device_type:55
    },
    {
        longitude:55,
        latitude: 55,
        altitude: 55,
        serial_number: 55,
        device_type:55
    }
]


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
      {/* <Grid container direction={"row"}>
        <Grid item xs={3}><Frame newData={newData} /></Grid>
        <Grid item xs={8}><MapComponent /></Grid>

        
      </Grid> */}
    </div>
  );
}

export default App;
