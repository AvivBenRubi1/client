import Telemetry from "../dtos/telemetry";

export default interface MarkerData {
  serial_number: string;
  longitude: number;
  latitude: number;
  
  getDetails(): string;
}
