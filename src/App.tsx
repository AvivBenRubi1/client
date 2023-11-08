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
import AntennaImage from "./assets/images/antenna.png";
import ControllerImage from "./assets/images/controller.png";
import MarkerData, { ClassificationType, MarkerTypes } from "./interfaces/markerData";
import { AppContext, useAppContext } from "./context";
import "./App.css";
import "./components/BaseMap/index.css";
import "leaflet/dist/leaflet.css";
import { Marker } from "./models/marker";
import NewSideBar from "./components/SideBar/NewSideBar";
import { Polygon } from "./models/polygon";

const buildSerialId = (serialNumber: string, type: MarkerTypes) => {
  return `${serialNumber}_${type}`
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
  const { markers, setMarker, polygons } = useAppContext()

  useEffect(() => {
    if (!leafletMap) return;

    const onTelemetry = (telemetry: Telemetry) => {
      const marker = markers[telemetry.serial_number]

      if (!marker) {
        const newMarker = new Marker(leafletMap, telemetry)
        setMarker(newMarker)
      } else {
        marker.update(telemetry)
        setMarker(marker)
      }
    };

    socket.on("dji_telemetry", onTelemetry);
    socket.on("get_antenna", (polygon: Polygon) => {
      leafletMap.addLayer(new L.Marker(new L.LatLng(polygon.lat, polygon.long), {
        icon: L.icon({
          iconUrl: AntennaImage,
          iconSize: [30, 30],
        })
      }).bindPopup(
        'Unit 108 antenna'
      ))

      const poly = {
        coordinates: [polygon.geo],
        type: 'Polygon'
      } as GeoJSON.Polygon
      L.geoJSON(poly, {
        style: function () {
          return { color: "#4B0082", opacity: 0.4 }
        }
      }).addTo(leafletMap)
    });
    return () => {
      socket.off("dji_telemetry", onTelemetry);
      socket.off("get_antenna", onTelemetry);
    };
  }, [markers, leafletMap, polygons]);



  return (
    <div className="App">
      <Grid container direction={"row"}>
        <Grid item xs={3}>
          {/* {leafletMap && <SideBar frame={state} map={leafletMap} />} */}
          <NewSideBar />
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
    <App />
  </AppContext>
};
