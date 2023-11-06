import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import L, { Map as LeafletMap } from "leaflet";
import { socket } from "./connections/socket";
import Telemetry from "./dtos/telemetry";
import BaseMap from "./components/BaseMap";
import EnemyDroneImage from "./assets/images/red_drone.png";
import FriendDroneImage from "./assets/images/green_drone.png";
import DroneImage from "./assets/images/red_drone.png";
import HomeImage from "./assets/images/home.png";
import ControllerImage from "./assets/images/controller.png";
import MarkerData, { ClassificationType, MarkerTypes } from "./interfaces/markerData";
import { AppContext, useAppContext } from "./context";
import "./App.css";
import "./components/BaseMap/index.css";
import "leaflet/dist/leaflet.css";

const buildSerialId = (serialNumber: string, type: MarkerTypes) => {
  return `${serialNumber}_${type}`
}

const mapTelemetryToMarkerData = (telemetry: Telemetry, type: MarkerTypes): MarkerData => {
  return {
    altitude: type === 'drone' ? telemetry.altitude : type === 'home' ? 0 : 0,
    latitude: type === 'drone' ? telemetry.latitude : type === 'home' ? telemetry.latitude_home : telemetry.app_lat,
    longitude: type === 'drone' ? telemetry.longitude : type === 'home' ? telemetry.longitude_home : telemetry.app_lon,
    classification: telemetry.status as ClassificationType,
    type,
    serial_number: telemetry.serial_number,
    getDetails: () => ''
  }
}

const getIcon = (icon: string) => L.icon({
  iconUrl: icon,
  iconSize: [40, 40], // size of the icon
});


type TypeOfClassificationImage = {
  [key in ClassificationType]: string
}

type TypeOfTypeImage = {
  [key in MarkerTypes]: string
}

const classToImageDict = {
  'enemy': EnemyDroneImage,
  'friend': FriendDroneImage,
  'unauthorized': ControllerImage,
} as TypeOfClassificationImage

const typeToImageDict = {
  'drone': FriendDroneImage,
  'home': HomeImage,
  'controller': ControllerImage,
} as TypeOfTypeImage


function App() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap>();
  const {markers, setMarker, setDroneData, droneData} = useAppContext()

  useEffect(() => {
    if (!leafletMap) return;

    const onTelemetry = (telemetry: Telemetry) => {
      const homeSerial = buildSerialId(telemetry.serial_number, 'home')
      const droneSerial = buildSerialId(telemetry.serial_number, 'drone')
      const controllerSerial = buildSerialId(telemetry.serial_number, 'controller')

      const newDroneMarker = mapTelemetryToMarkerData(telemetry, 'drone')
      const newControllerMarker = mapTelemetryToMarkerData(telemetry, 'controller')
      const newHomeMarker = mapTelemetryToMarkerData(telemetry, 'home')

      const droneMarker = markers[droneSerial]
      const controllerMarker = markers[controllerSerial]
      const homeMarker = markers[homeSerial]

      const homePosition = new L.LatLng(newHomeMarker.latitude, newHomeMarker.longitude)
      const dronePosition = new L.LatLng(newDroneMarker.latitude, newDroneMarker.longitude)
      const controllerPosition = new L.LatLng(newControllerMarker.latitude, newControllerMarker.longitude)

      setDroneData(telemetry)
      
      if(!homeMarker){
        const h = new L.Marker(homePosition, { icon: getIcon(typeToImageDict['home']) }).bindPopup(
          'stam'
        );
        leafletMap.addLayer(h);
        setMarker({
          mapData: h,
          metadata: newHomeMarker
        })
      } else {
        homeMarker.metadata = newHomeMarker
        homeMarker.mapData.setLatLng(homePosition)
        setMarker(homeMarker)
      }

      if(!droneMarker){
        const d = new L.Marker(dronePosition, { icon: getIcon(typeToImageDict['drone']) }).bindPopup(
          'drone'
        );
        leafletMap.addLayer(d);
        setMarker({
          mapData: d,
          metadata: newDroneMarker
        })
      } else {
        droneMarker.metadata = newHomeMarker
        droneMarker.mapData.setLatLng(dronePosition)
        setMarker(droneMarker)
      }

      if(!controllerMarker){
        const c = new L.Marker(controllerPosition, { icon: getIcon(typeToImageDict['controller']) }).bindPopup(
          'controller'
        );
        leafletMap.addLayer(c);
        setMarker({
          mapData: c,
          metadata: newControllerMarker
        })
      } else {
        controllerMarker.metadata = newControllerMarker
        controllerMarker.mapData.setLatLng(controllerPosition)
        setMarker(controllerMarker)
      }
    };

    socket.on("dji_telemetry", onTelemetry);
    return () => {
      socket.off("dji_telemetry", onTelemetry);
    };
  }, [markers, leafletMap, droneData]);


  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={3}>
          {/* {leafletMap && <SideBar frame={state} map={leafletMap} />} */}
        </Grid>
        <Grid xs={3} item>
          <BaseMap setLeafletMap={setLeafletMap} />
        </Grid>
      </Grid>
    </div>
  );
}

export default () => {
  return <AppContext>
    <App/>
  </AppContext>
};
