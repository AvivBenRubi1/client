import Telemetry from "../dtos/telemetry";
import ControllerData from "./controller";
import DroneData from "./drone";
import HomeData from "./home";

export default class TelemetryCollection {
    status: string;
    droneData: DroneData;
    homeData: HomeData;
    controllerData: ControllerData;
    constructor(telemetry: Telemetry) {
        this.status = telemetry.status;
        this.droneData = new DroneData(telemetry);
        this.homeData = new HomeData(telemetry);
        this.controllerData = new ControllerData(telemetry);
    }
}