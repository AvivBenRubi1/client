import { Map as LeafletMap } from "leaflet";
import MarkersCollection from "./component-warpers/markers-collection";
import DroneData from "./marker-data-models/drone.data";
import ControllerData from "./marker-data-models/controller.data";
import HomeData from "./marker-data-models/home.data";

export default class MapManager {
  private serialMarkerMap: Map<string, MarkersCollection>;

  constructor(private leafletMap: LeafletMap) {
    this.serialMarkerMap = new Map<string, MarkersCollection>();
  }

  updateMap(
    droneData?: DroneData,
    controllerData?: ControllerData,
    homeData?: HomeData
  ) {
    let serial_number;
    if (droneData) {
      serial_number = droneData.serial_number;
    } else if (controllerData) {
      serial_number = controllerData.serial_number;
    } else if (homeData) {
      serial_number = homeData.serial_number;
    } else {
      throw "No data pram !!!";
    }

    let markersCollection = this.serialMarkerMap.get(serial_number);

    if (markersCollection !== undefined) {
      markersCollection.updateMarkersData(droneData, controllerData, homeData);
    } else {
      let markersCollection = new MarkersCollection(
        this.leafletMap,
        droneData,
        controllerData,
        homeData
      );
      this.serialMarkerMap.set(serial_number, markersCollection);
    }
  }
}
