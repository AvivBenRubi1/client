import SensorData from "../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class HomeData implements MarkerData {
  longitude: number;
  latitude: number;
  serial_number: string;
  device_type: string;

  constructor(sensorData: SensorData) {
    this.latitude = sensorData.latitude_home;
    this.longitude = sensorData.longitude_home;
    this.serial_number = sensorData.serial_number;
    this.device_type = sensorData.device_type;
  }

  getDetails(): string {
    return `Lat:${this.latitude}, Long:${this.latitude}, Serial:${this.serial_number},`;
  }
}
