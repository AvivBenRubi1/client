import { useReducer } from "react";
import TelemetryCollection from "../models/telemetryCollection";


export const reducer = (state:Array<TelemetryCollection>, payload: TelemetryCollection): Array<TelemetryCollection> => {
  let isUpdated = false;
  let updatedState = state.map(telemetryCollection=> {
    if(telemetryCollection.serial_number === payload.serial_number) {
      isUpdated = true;
      return payload;
    }
    else return telemetryCollection;
  });

  if(!isUpdated) {
    updatedState.push(payload);
  }

  return updatedState;
};
