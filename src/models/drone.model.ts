import SensorData from "../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class DroneData implements MarkerData {
  longitude: number;
  latitude: number;
  altitude: number;
  serial_number: string;
  device_type: string;

  constructor(sensorData: SensorData) {
    this.serial_number = sensorData.serial_number;
    this.latitude = sensorData.latitude;
    this.longitude = sensorData.longitude;
    this.altitude = sensorData.altitude;
    this.device_type = sensorData.device_type;
  }

  getDetails(): string {
    return `Lat:${this.latitude}, Long:${this.latitude},
    Type:${this.device_type}, Serial:${this.serial_number},`;
  }
}

export interface droneFrame {
  drones: Array<DroneData>;
  map: any;
}
