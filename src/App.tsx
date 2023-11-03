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

function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);

  const [dronesManager, setDronesManager] = useState<MarkersManager<DroneData>>();
  const [homesManager, setHomesManager] = useState<MarkersManager<HomeData>>();
  const [controllersManager, setControllersManager] = useState<MarkersManager<ControllerData>>();

  const [state, dispatch] = useReducer(reducer, { drones: [],  map: leafletMap });
  const [dataFrame, setDataFrame] = useState<droneFrame>({drones:[], map:leafletMap});

  useEffect(() => {
    if (!leafletMap) {
      return;
    }

    setDronesManager(new MarkersManager<DroneData>(leafletMap, DroneImage));
    setHomesManager(new MarkersManager<DroneData>(leafletMap, HomeImage));
    setControllersManager(new MarkersManager<ControllerData>(
      leafletMap,
      ControllerImage
    ));

  }, [leafletMap]);

  useEffect(() => {
    if (!(dronesManager && homesManager && controllersManager)) return

    const onTelemetry = (sensorData: Telemetry) => {
      let droneData = new DroneData(sensorData);
      let homeData = new HomeData(sensorData);
      let controllerData = new ControllerData(sensorData);

      dronesManager.setMarkerData(droneData);
      homesManager.setMarkerData(homeData);
      controllersManager.setMarkerData(controllerData);
      // console.log(droneData, homeData,new ControllerData(sensorData) );

      dispatch({ data: droneData, map: leafletMap });
      setDataFrame({drones:[droneData], map:leafletMap})
    }

    socket.on("dji_telemetry", onTelemetry);
    return () => { socket.off("dji_telemetry", onTelemetry) }

  }, [dronesManager, homesManager, controllersManager])

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });

  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={3}>
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
