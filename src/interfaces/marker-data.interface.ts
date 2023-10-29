import SensorData from "../dtos/sensor-data.dto";

export default interface MarkerData {
  serial_number: string;
  longitude: number;
  latitude: number;
  
  getDetails(): string;
}
