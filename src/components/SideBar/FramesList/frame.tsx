import { Grid, Card, popoverClasses, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FrameProps from "../../../interfaces/frame-props.interface";
import alert from "../../../assets/images/warning.png"

function Frame({ props }: { props: FrameProps }) {
  let droneData = props.droneData;
  let map = props.leafletMap;

  return (
    <Card
      style={{
        backgroundColor: "#f338385e",
        marginBottom: "1vw",
        padding: "0.3vw",
        width:"21vw",
        maxHeight: "20vw",
        overflowY: "auto",
        overflowX:"hidden",
        marginRight: "-7vw"
      }}
      onClick={(e) => {
        map.setView([droneData.latitude, droneData.longitude], 13);
      }}
    >

        <ListItemButton>
          <ListItemIcon>
            <img src={alert} alt="drone alert" width={"35vw"} />
          </ListItemIcon>
          <Grid container direction={"column"}>
          <ListItemText primary={`Latitude `} secondary={droneData.latitude} />
          <ListItemText primary={`Longitude `} secondary={droneData.longitude} />
          <ListItemText primary={`Altitude `} secondary={droneData.altitude} />
          <ListItemText primary={`Serial Number `} secondary={droneData.serial_number} />
          <ListItemText primary={`Device Type `} secondary={droneData.device_type} />
          </Grid>
          {/* <Grid container direction={"column"}>

          
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
          </Grid></Grid> */}
        </ListItemButton>





    </Card>
  );
}

export default Frame;
