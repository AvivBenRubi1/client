import ControllerData from "../models/controller";
import DroneData from "../models/drone";
import HomeData from "../models/home";
import L from "leaflet";

export default interface FrameProps {
  map: L.Map;
  droneData: DroneData;
  // controlerData:ControllerData
  // homeData: HomeData
}
