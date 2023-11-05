import ControllerData from "../../../models/controller";
import DroneData from "../../../models/drone";
import HomeData from "../../../models/home";
import MarkersManager from "./markersManager";

import EnemyDroneImage from "../../../assets/images/red_drone.png";
import FriendDroneImage from "../../../assets/images/green_drone.png";
import ControllerImage from "../../../assets/images/controller.png";
import HomeImage from "../../../assets/images/home.png";
import TelemetryCollection from "../../../models/telemetryCollection";
import { Map as LeafletMap } from "leaflet";

export default class AbstractMarkersManager {
  private readonly friendDrones: MarkersManager<DroneData>;
  private readonly enemyDrones: MarkersManager<DroneData>;
  private readonly controllers: MarkersManager<ControllerData>;
  private readonly homes: MarkersManager<HomeData>;

  constructor(leafletMap: LeafletMap) {
    this.friendDrones = new MarkersManager<DroneData>(leafletMap,FriendDroneImage);
    this.enemyDrones = new MarkersManager<DroneData>(leafletMap, EnemyDroneImage);
    this.controllers = new MarkersManager<ControllerData>(leafletMap, ControllerImage);
    this.homes = new MarkersManager<HomeData>(leafletMap, HomeImage);
  }

  setTelemetryCollection(telemetryCollection: TelemetryCollection) {
    if (telemetryCollection.status === "enemy") {
      this.enemyDrones.setMarkerData(telemetryCollection.droneData);
    } else {
      this.friendDrones.setMarkerData(telemetryCollection.droneData);
    }
    
    this.controllers.setMarkerData(telemetryCollection.controllerData);
    this.homes.setMarkerData(telemetryCollection.homeData);
  }
}
