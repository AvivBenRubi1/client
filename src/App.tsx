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
import { log } from "console";
import AbstractMarkersManager from "./components/BaseMap/MarkerManagement/abstractMarkersManager";
import TelemetryCollection from "./models/telemetryCollection";

function App() {
  const [markersManager, setMarkerManager] = useState<AbstractMarkersManager>();
  const [leafletMap, setLeafletMap] = useState<LeafletMap>();
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!leafletMap) return;
    setMarkerManager(new AbstractMarkersManager(leafletMap));
  }, [leafletMap]);

  useEffect(() => {
    if (!(markersManager && leafletMap)) return;

    const onTelemetry = (telemetry: Telemetry) => {
      let telemetryCollection = new TelemetryCollection(telemetry);
      console.log(telemetry);

      markersManager.setTelemetryCollection(telemetryCollection);

      dispatch(telemetryCollection);
    };

    socket.on("dji_telemetry", onTelemetry);
    return () => {
      socket.off("dji_telemetry", onTelemetry);
    };
  }, [markersManager, leafletMap]);

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });

  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={3}>
          {leafletMap && <SideBar state={state} map={leafletMap} />}
        </Grid>
        <Grid xs={3} item>
          <BaseMap setLeafletMap={setLeafletMap} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
