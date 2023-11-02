import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import "./components/BaseMap/index.css";
import "leaflet/dist/leaflet.css";

import { Grid } from "@mui/material";
import { socket } from "./connections/socket";
import Telemetry from "./dtos/telemetry";
import DroneData from "./models/drone";
import ControllerData from "./models/controller";
import HomeData from "./models/home";
import { Map as LeafletMap } from "leaflet";
import BaseMap from "./components/BaseMap";
import MarkersManager from "./components/BaseMap/MarkerManagement/markersManager";

import DroneImage from "./assets/images/red_drone.png";
import HomeImage from "./assets/images/home.png";
import ControllerImage from "./assets/images/controller.png";
import SideBar from "./components/SideBar";
import { droneFrame } from "./models/drone";
import { reducer } from "./reducers/droneReducer";

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  const [dataFrame, setDataFrame] = useState<droneFrame>({drones:[], map:leafletMap});
  const [state, dispatch] = useReducer(reducer,{drones:[], map:leafletMap});


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

    socket.on("dji_telemetry",  (sensorData: Telemetry) => {
      let droneData = new DroneData(sensorData);
      dispatch({data:droneData, map:leafletMap});
      setDataFrame({drones:[droneData], map:leafletMap})
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
        <Grid item xs={3} style={{overflow:"hidden"}}>
          <SideBar frames={state} />
        </Grid>
        <Grid item>
          <BaseMap setLeafletMap={setLeafletMap} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
