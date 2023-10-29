import { Grid, Card, popoverClasses } from "@mui/material";
import { useState } from "react";
import logo108 from "../../../assets/108.png";
import DroneData from "../../../models/drone.model";
import FrameProps from "../../../interfaces/frame-props.interface";


function Frame({props}: {props:FrameProps}) {
  let droneData = props.droneData;
  let map = props.leafletMap;

  return (
    <Card
      style={{
        backgroundColor: "#80808057",
        marginBottom: "3vw",
        padding: "0.9rem",
        maxHeight: "10vw",
        overflowY: "auto",
      }}
      onClick={(e) => {
       map.setView([droneData.latitude, droneData.latitude]);
      }}
    >
      <Grid container spacing={3} direction="row">
        <Grid item>Latitude</Grid>
        <Grid item>{droneData.latitude}</Grid>
      </Grid>
      <Grid container spacing={3} direction="row">
        <Grid item>Longitude</Grid>
        <Grid item>{droneData.longitude}</Grid>
      </Grid>
      <Grid container spacing={3} direction="row">
        <Grid item>Altitude</Grid>
        <Grid item>{droneData.altitude}</Grid>
      </Grid>
      <Grid container spacing={3} direction="row">
        <Grid item>Serial Number</Grid>
        <Grid item>{droneData.serial_number}</Grid>
      </Grid>
      <Grid container spacing={3} direction="row">
        <Grid item>Device Type</Grid>
        <Grid item>{droneData.device_type}</Grid>
      </Grid>
    </Card>
  );
}

export default Frame;
