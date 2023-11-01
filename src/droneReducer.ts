import { useReducer } from "react";
import DroneData, { droneFrame } from "./models/drone.model";

export const reducer = (state: droneFrame, action: any): droneFrame => {
  if (state.drones.length === 0) {
    state.drones.push(action.data);
  } else {
    let flag = false;
    state.drones.forEach((element) => {
      if (element.serial_number == action.data.serial_number) {
        element.altitude = action.data.altitude;
        element.device_type = action.data.device_type;
        element.latitude = action.data.latitude;
        element.longitude = action.data.longitude;
        flag = true;
      }
    });
    if (!flag) state.drones.push(action.data);
  }
  state.map = action.map
  //   console.log(state, action);
  return state;
};
