import SensorData from "../../../dtos/sensor-data.dto";
import DroneData from "../marker-data-models/drone.data";
import DynamicMarker from "./dynamic-marker";
import 
export default class MarkersCollection {
  private droneMarker?: DynamicMarker;
  private controllerMarker?: DynamicMarker;
  private homeMarker?: DynamicMarker;

  constructor(sensorData: SensorData, map: L.Map) {
   if(DroneData.isValid(sensorData)) {
    // TODO Implement
    // this.droneMarker = new DynamicMarker(new DroneData(sensorData))
   }
  }
}
