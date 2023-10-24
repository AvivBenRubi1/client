import SensorData from "../../../dtos/sensor-data.dto";
import MarkerData from "../interfaces/marker-data.interface";

export default class ControllerData implements MarkerData {
  longitude: number;
  latitude: number;
  serial_number: string;

  constructor(droneData: SensorData) {
    this.latitude = droneData.app_lat;
    this.longitude = droneData.app_lon;
    this.serial_number = droneData.serial_number;
  }

  getDetails(): string {
    return `all details`
  }
}
