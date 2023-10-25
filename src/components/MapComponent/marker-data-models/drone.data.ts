import SensorData from "../../../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class DroneData implements MarkerData {
  longitude: number;
  latitude: number;
  altitude: number;
  serial_number: string;
  device_type: string;

  private constructor(sensorData: SensorData) {
    this.serial_number = sensorData.serial_number;
    this.latitude = sensorData.latitude;
    this.longitude = sensorData.longitude;
    this.altitude = sensorData.altitude;
    this.device_type = sensorData.device_type;
  }

  static TryCreateDroneData(sensorData: SensorData):DroneData | undefined {
    if(!sensorData.latitude || sensorData.latitude === 0 || sensorData.longitude === 0) {
      return;
    }
    return new DroneData(sensorData);
  }

  getDetails(): string {
    return `all details`;
  }
}
