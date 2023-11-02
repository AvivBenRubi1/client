import Telemetry from "../dtos/telemetry";
import ControllerData from "./controller";
import DroneData from "./drone";
import HomeData from "./home";

export default class TelemetryCollection {
    droneData: DroneData;
    homeData: HomeData;
    controllerData: ControllerData;
    
    constructor(telemetry: Telemetry) {
        this.droneData = new DroneData(telemetry);
        this.homeData = new HomeData(telemetry);
        this.controllerData = new ControllerData(telemetry);
    }
}