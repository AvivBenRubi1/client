import Telemetry from "../dtos/telemetry";
import ControllerData from "./controller";
import DroneData from "./drone";
import HomeData from "./home";

export default class TelemetryCollection {
    serial_number:string;
    status: string;
    droneData: DroneData;
    homeData: HomeData;
    controllerData: ControllerData;
    constructor(telemetry: Telemetry) {
        this.serial_number = telemetry.serial_number;
        this.status = telemetry.status;
        this.droneData = new DroneData(telemetry);
        this.homeData = new HomeData(telemetry);
        this.controllerData = new ControllerData(telemetry);
    }
}