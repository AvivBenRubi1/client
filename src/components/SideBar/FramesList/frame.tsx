import { Grid, Card, popoverClasses, ListItem, ListItemButton, ListItemIcon, ListItemText, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import alert from "../../../assets/images/warning.png"
import home from "../../../assets/images/home.png"
import controller from "../../../assets/images/controller.png"
import drone from "../../../assets/images/red_drone.png"

function Frame({ props }: { props: any }) {
  let droneData = props.droneData;
  let map = props.map;
  return (
    <Card
      style={{
        backgroundColor: "#f338385e",
        marginBottom: "1vw",
        padding: "0.3vw",
        width: "21vw",
        maxHeight: "25vw",
        overflowY: "auto",
        overflowX: "hidden",
        marginRight: "-7vw"
      }}
      onClick={(e) => {
        map.setView([droneData.latitude, droneData.longitude], 13);
      }}
    >
      <Accordion>
        <AccordionSummary>
            <img src={alert} alt="drone alert" width={"40vw"}/>
            <ListItemText primary={`Device Type `} secondary={droneData.drone_device_type} style={{paddingLeft:"1vw"}} />
            <ListItemText primary={`Serial Number `} secondary={droneData.serial_number} />
        </AccordionSummary>
      </Accordion>
          <Accordion>
            <AccordionSummary>
            <Grid container  spacing={1} direction={"row"}>
                <Grid item>
                  <img src={drone} alt="home alert" width={"20vw"} />
                </Grid>
                <Grid item>  Drone Details</Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <ListItemButton>
                <Grid container direction={"column"}>
                  <ListItemText primary={`Latitude `} secondary={droneData.drone_latitude} />
                  <ListItemText primary={`Longitude `} secondary={droneData.drone_longitude} />
                  <ListItemText primary={`Altitude `} secondary={droneData.drone_altitude} />
                </Grid>
              </ListItemButton>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Grid container  spacing={1} direction={"row"}>
                <Grid item>
                  <img src={home} alt="home alert" width={"20vw"} />
                </Grid>
                <Grid item>  Home Details</Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <ListItemButton>
                <Grid container direction={"column"}>
                  <ListItemText primary={`Latitude `} secondary={droneData.latitude} />
                  <ListItemText primary={`Longitude `} secondary={droneData.longitude} />
                  <ListItemText primary={`Altitude `} secondary={droneData.altitude} />
                </Grid>
                {/* <Grid container direction={"column"}>
          <ListItemText primary={`Latitude `} secondary={homeData.latitude} />
          <ListItemText primary={`Longitude `} secondary={homeData.longitude} />
          <ListItemText primary={`Serial Number `} secondary={homeData.serial_number} />
          </Grid> */}
              </ListItemButton>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
            <Grid container  spacing={1} direction={"row"}>
                <Grid item>
                  <img src={controller} alt="home alert" width={"20vw"} />
                </Grid>
                <Grid item>Controller Details</Grid>
              </Grid>
              
            </AccordionSummary>
            <AccordionDetails>
              <ListItemButton>
                <Grid container direction={"column"}>
                  <ListItemText primary={`Latitude `} secondary={droneData.latitude} />
                  <ListItemText primary={`Longitude `} secondary={droneData.longitude} />
                  <ListItemText primary={`Altitude `} secondary={droneData.altitude} />
                </Grid>
                {/* <Grid container direction={"column"}>
          <ListItemText primary={`Latitude `} secondary={homeData.latitude} />
          <ListItemText primary={`Longitude `} secondary={homeData.longitude} />
          <ListItemText primary={`Serial Number `} secondary={homeData.serial_number} />
          </Grid> */}
              </ListItemButton>
            </AccordionDetails>
          </Accordion>
    </Card>
  );
}

export default Frame;
