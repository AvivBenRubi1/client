import Telemetry from "../dtos/telemetry";

export const markerTypes = ['controller', 'drone', 'home'] as const

// export const markerTypes = {
//   CONTROLLER : "controller",
//   DRONE: "drone",
//   HOME: "home"
// } as const;

export type MarkerTypes = (typeof markerTypes)[number];

export type ClassificationType = 'enemy' | 'friend' | 'unauthorized'

export default interface MarkerData {
  serial_number: string;
  altitude: number,
  longitude: number;
  latitude: number;
  type: MarkerTypes
  classification: ClassificationType
  
  getDetails(): string;
}

