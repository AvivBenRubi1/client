import DynamicMarker from "./dynamic-marker";

import SensorData from "../../../dtos/sensor-data.dto";
import DroneData from "../marker-data-models/drone.data";
import ControllerData from "../marker-data-models/controller.data";
import HomeData from "../marker-data-models/home.data";

import droneImage from "../../../images/red_drone.png";
import controllerImage from "../../../images/controller.png";
import homeImage from "../../../images/home.png";

export default class MarkersCollection {
  private droneMarker?: DynamicMarker<DroneData>;
  private controllerMarker?: DynamicMarker<ControllerData>;
  private homeMarker?: DynamicMarker<HomeData>;

  private readonly map: L.Map;

  constructor(
    map: L.Map,
    droneData?: DroneData,
    controllerData?: ControllerData,
    homeData?: HomeData
  ) {
    this.map = map;

    if (droneData)
      this.droneMarker = new DynamicMarker(droneImage, map, droneData);

    if (controllerData) {
      this.controllerMarker = new DynamicMarker(
        controllerImage,
        map,
        controllerData
      );
    }

    if (homeData) {
      this.homeMarker = new DynamicMarker(homeImage, map, homeData);
    }
  }

  updateMarkersData(
    droneData?: DroneData,
    controllerData?: ControllerData,
    homeData?: HomeData
  ) {
    if (droneData) {
      if (this.droneMarker) {
        this.droneMarker.updateMarkerData(droneData);
      } else {
        this.droneMarker = new DynamicMarker(droneImage, this.map, droneData);
      }
    }

    if (controllerData) {
      if (this.controllerMarker) {
        this.controllerMarker.updateMarkerData(controllerData);
      } else {
        this.controllerMarker = new DynamicMarker(
          controllerImage,
          this.map,
          controllerData
        );
      }
    }

    if (homeData) {
      if (this.homeMarker) {
        this.homeMarker.updateMarkerData(homeData);
      } else {
        this.homeMarker = new DynamicMarker(homeImage, this.map, homeData);
      }
    }
  }

  dispose(): void {
    this.droneMarker?.dispose();
    this.homeMarker?.dispose();
    this.controllerMarker?.dispose();
  }
}
