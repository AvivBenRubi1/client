import SensorData from "../../../dtos/sensor-data.dto";

export default interface MarkerData {
  longitude: number;
  latitude: number;

  getDetails(): string;
}
