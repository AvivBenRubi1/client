import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./components/BaseMap/index.css";
import "leaflet/dist/leaflet.css";

import { Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { socket } from "./socket";
import SensorData from "./dtos/sensor-data.dto";
import DroneData from "./models/drone.model";
import ControllerData from "./models/controller.model";
import HomeData from "./models/home.model";
import { Map as LeafletMap } from "leaflet";
import BaseMap from "./components/BaseMap";
import MarkersManager from "./components/BaseMap/MarkerManagement/markersManager";

import DroneImage from "./assets/images/red_drone.png";
import HomeImage from "./assets/images/home.png";
import ControllerImage from "./assets/images/controller.png";
import Frame from "./components/SideBar/FramesList/frame";
import SideBar from "./components/SideBar";
import FrameProps from "./interfaces/frame-props.interface";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  
  useEffect(() => {
    if (!leafletMap) {
      return;
    }

    let dronesManager = new MarkersManager<DroneData>(leafletMap, DroneImage);
    let homesManager = new MarkersManager<HomeData>(leafletMap, HomeImage);
    let controllersManager = new MarkersManager<ControllerData>(
      leafletMap,
      ControllerImage
    );

    socket.on("dji_telemetry", (sensorData: SensorData) => {
      let droneData = new DroneData(sensorData);
      // let frame: FrameProps = { droneData: droneData, leafletMap: leafletMap };
      // setFrames([...frames, frame]);

      dronesManager.setMarkerData(droneData);
      let homeData = new HomeData(sensorData);
      homesManager.setMarkerData(homeData);
      controllersManager.setMarkerData(new ControllerData(sensorData));
    });
  });

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });

  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={1.5}>
          <SideBar/>
        </Grid>
        <Grid item>
          <BaseMap setLeafletMap={setLeafletMap} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
