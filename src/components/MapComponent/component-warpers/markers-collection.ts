import DynamicMarker from "./dynamic-marker";

import SensorData from "../../../dtos/sensor-data.dto";
import DroneData from "../marker-data-models/drone.data";
import ControllerData from "../marker-data-models/controller.data";
import HomeData from "../marker-data-models/home.data";

import droneImage from "../../../images/red_drone.png";
import controllerImage from "../../../images/controller.png";
import homeImage from "../../../images/home.png"

export default class MarkersCollection {

  private droneMarker?: DynamicMarker<DroneData>;
  private controllerMarker?: DynamicMarker<ControllerData>;
  private homeMarker?: DynamicMarker<HomeData>;

  private readonly map: L.Map;

  constructor(sensorData: SensorData, map: L.Map) {
    this.map = map;

    const droneData = DroneData.TryCreateDroneData(sensorData);
    const controllerData = ControllerData.TryCreateControllerData(sensorData);
    const homeData = HomeData.TryCreateHomeData(sensorData);

    if (droneData != null) {
      this.droneMarker = new DynamicMarker(droneImage, map, droneData)
    }
  
    if (controllerData != null) {
      this.controllerMarker = new DynamicMarker(controllerImage, map, controllerData);
    }
    
    if (homeData != null) {
      this.homeMarker = new DynamicMarker(homeImage, map, homeData);
    }
  }

  updateMarkersData(sensorData: SensorData) {
    const droneData = DroneData.TryCreateDroneData(sensorData);
    const controllerData = ControllerData.TryCreateControllerData(sensorData);
    const homeData = HomeData.TryCreateHomeData(sensorData);

    if (droneData != null) {
      if(this.droneMarker == null) {
        this.droneMarker = new DynamicMarker(droneImage, this.map, droneData);
      }
      else {
        this.droneMarker.updateMarkerData(droneData);
      }
    }
  
    if (controllerData != null) {
      if(this.controllerMarker == null) {
        this.controllerMarker = new DynamicMarker(controllerImage, this.map, controllerData);
      }
      else {
        this.controllerMarker.updateMarkerData(controllerData)
      }
    }
    
    if (homeData != null) {
      if(this.homeMarker == null) {
        this.homeMarker = new DynamicMarker(homeImage, this.map, homeData);
      }
      else {
        this.homeMarker.updateMarkerData(homeData);
      }
    }
  }

  dispose(): void {
    this.droneMarker?.dispose();
    this.homeMarker?.dispose();
    this.controllerMarker?.dispose();
  }

}
