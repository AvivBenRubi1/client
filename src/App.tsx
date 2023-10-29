import React, { useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import MapComponent from "./components/MapComponent";
import Frame from "./components/MapComponent/DataComponent/frame";

function App() {
  
    type Data = {
        longitude: any,
        latitude: any,
        altitude: any,
        serial_number: any,
        device_type: any
    };
    
    const newData: Data[] = [
        {
            longitude:108,
            latitude: 55,
            altitude: 55,
            serial_number: 55,
            device_type:55
        },
        {
            longitude:55555,
            latitude: 55,
            altitude: 55,
            serial_number: 55,
            device_type:55
        },
        {
            longitude:55,
            latitude: 55,
            altitude: 55,
            serial_number: 55,
            device_type:55
        },
        {
            longitude:55,
            latitude: 55,
            altitude: 55,
            serial_number: 55,
            device_type:55
        }
    ]


  return (
    <div className="App">

      <Grid container direction={"row"}>
        <Grid item xs={3}><Frame newData={newData} /></Grid>
        <Grid item xs={8}><MapComponent /></Grid>

        
      </Grid>
    </div>
  );
}

export default App;
