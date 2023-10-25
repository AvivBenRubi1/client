import React, { useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import MapComponent from "./components/MapComponent";
import Frame from "./components/MapComponent/DataComponent/frame";

function App() {
  

  return (
    <div className="App">

      <Grid container direction={"row"}>
        <Grid item xs={3}><Frame /></Grid>
        <Grid item xs={8}><MapComponent /></Grid>


      </Grid>
    </div>
  );
}

export default App;
