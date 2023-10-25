import SensorData from "../../../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class HomeData implements MarkerData {
  longitude: number;
  latitude: number;
  serial_number: string;
  device_type: string;

  private constructor(sensorData: SensorData) {
    this.latitude = sensorData.latitude_home;
    this.longitude = sensorData.longitude_home;
    this.serial_number = sensorData.serial_number;
    this.device_type = sensorData.device_type;
  }

  static TryCreateHomeData(sensorData: SensorData): HomeData | undefined {
    if(!sensorData.latitude_home || sensorData.latitude_home === 0 || sensorData.longitude_home === 0) {
      return;
    }
    return new HomeData(sensorData);
  }

  getDetails(): string {
    return `all details`
  }
}
