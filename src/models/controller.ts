import Telemetry from "../dtos/telemetry";
import MarkerData from "../interfaces/markerData";

export default class ControllerData implements MarkerData {
  longitude: number;
  latitude: number;
  serial_number: string;

  constructor(sensorData: Telemetry) {
    this.latitude = sensorData.app_lat;
    this.longitude = sensorData.app_lon;
    this.serial_number = sensorData.serial_number;
  }

  getDetails(): string {
    return `Lat:${this.latitude}, Long:${this.latitude}, Serial:${this.serial_number}`;
  }
}
