import SensorData from "../../../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class ControllerData implements MarkerData {
  longitude: number;
  latitude: number;
  serial_number: string;

  private constructor(sensorData: SensorData) {
    this.latitude = sensorData.app_lat;
    this.longitude = sensorData.app_lon;
    this.serial_number = sensorData.serial_number;
  }

  static TryCreateControllerData(sensorData: SensorData): ControllerData | undefined {
    if(!sensorData.app_lat || sensorData.app_lat === 0 || sensorData.app_lon === 0) {
      return;
    }
      return new ControllerData(sensorData)
  }


  getDetails(): string {
    return `all details`
  }
}
