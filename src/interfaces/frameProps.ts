import DroneData from "../models/drone"
import { Map as LeafletMap } from "leaflet";

export default interface FrameProps {
    droneData: DroneData
    leafletMap: LeafletMap
  }