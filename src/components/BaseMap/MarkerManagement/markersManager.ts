import { Map as LeafletMap } from "leaflet";
import DynamicMarker from "./dynamicMarker";
import MarkerData, { MarkerTypes, ClassificationType } from "../../../interfaces/markerData";
import EnemyDroneImage from "../../../assets/images/red_drone.png";
import FriendDroneImage from "../../../assets/images/green_drone.png";
import ControllerImage from "../../../assets/images/controller.png";
import HomeImage from "../../../assets/images/home.png";
import Telemetry from "../../../dtos/telemetry";

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

// const mapTelemetryToDroneMarkerData = (telemetry: Telemetry, type: MarkerTypes): MarkerData => {
//   return {
//     altitude: type === 'drone' ? telemetry.altitude : type === 'home' ? 0 : 0,
//     latitude: type === 'drone' ? telemetry.latitude : type === 'home' ? telemetry.latitude_home : telemetry.app_lat,
//     longitude: type === 'drone' ? telemetry.longitude : type === 'home' ? telemetry.longitude_home : telemetry.app_lon,
//     classification: telemetry.status as ClassificationType,
//     type,
//     serial_number: telemetry.serial_number,
//     getDetails: () => ''
//   }
// }

export default class MarkersManager<T extends MarkerData> {
  private readonly serialMarkerMap: Map<string, DynamicMarker<T>>;

  constructor(private leafletMap: LeafletMap) {
    this.serialMarkerMap = new Map<string, DynamicMarker<T>>();
  }

  setMarkerData(markerData: Telemetry) {
    if (
      !markerData?.drone_latitude ||
      markerData.drone_latitude === 0 ||
      markerData.drone_longitude === 0
    ) {
      return;
    }

    // const drone = mapTelemetryToDroneMarkerData(markerData, 'drone')
    // const controller = mapTelemetryToDroneMarkerData(markerData, 'controller')
    // const home = mapTelemetryToDroneMarkerData(markerData, 'home')

    // let dynamicMarkerDrone = this.serialMarkerMap.get(markerData.serial_number);
    // let dynamicMarkerHome = this.serialMarkerMap.get(markerData.serial_number);
    // let dynamicMarkerController = this.serialMarkerMap.get(markerData.serial_number);


    // if (dynamicMarkerDrone === undefined) {
    //   let marker = new DynamicMarker<T>(this.leafletMap, , markerData);
    //   this.serialMarkerMap.set(`${markerData.serial_number}_`, marker);
    // } else {
    //   dynamicMarkerDrone.updateData(markerData);
    // }

    // if (dynamicMarkerHome === undefined) {
    //   let marker = new DynamicMarker<T>(this.leafletMap, , markerData);
    //   this.serialMarkerMap.set(`${markerData.serial_number}_`, marker);
    // } else {
    //   dynamicMarkerHome.updateData(markerData);
    // }

    // if (dynamicMarkerDrone === undefined) {
    //   let marker = new DynamicMarker<T>(this.leafletMap, , markerData);
    //   this.serialMarkerMap.set(`${markerData.serial_number}_`, marker);
    // } else {
    //   dynamicMarkerDrone.updateData(markerData);
    // }
  }
}
