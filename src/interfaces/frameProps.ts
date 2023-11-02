import ControllerData from "../models/controller";
import DroneData from "../models/drone"
import HomeData from "../models/home";
import { Map as LeafletMap } from "leaflet";

export default interface FrameProps {
    droneData: DroneData
    // controlerData:ControllerData
    // homeData: HomeData
    leafletMap: LeafletMap
  }