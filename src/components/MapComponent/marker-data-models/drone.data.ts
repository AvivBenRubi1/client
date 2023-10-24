import SensorData from "../../../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class DroneData implements MarkerData {
  longitude: number;
  latitude: number;
  altitude: number;
  serial_number: string;
  device_type: string;

  constructor(sensorData: SensorData) {
    this.latitude = sensorData.latitude;
    this.longitude = sensorData.longitude;
    this.altitude = sensorData.altitude;
    this.serial_number = sensorData.serial_number;
    this.device_type = sensorData.device_type;
  }

  static isValid(sensorData: SensorData): boolean {
    return sensorData.latitude != 0 && sensorData.longitude != 0;
  }

  getDetails(): string {
    return `all details`;
  }
}
