import { Grid, Card, popoverClasses, ListItem, ListItemButton, ListItemIcon, ListItemText, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import FrameProps from "../../../interfaces/frameProps";
import alert from "../../../assets/images/warning.png"

function Frame({ props }: { props: FrameProps }) {
  let droneData = props.droneData;
  // let homeData = props.homeData;
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

<Accordion>
              <AccordionSummary>
                Drone Details
              </AccordionSummary>
              <AccordionDetails>
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
        </ListItemButton>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                Home Details
              </AccordionSummary>
              <AccordionDetails>
              <ListItemButton>
          <ListItemIcon>
            <img src={alert} alt="drone alert" width={"35vw"} />
          </ListItemIcon>
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
                Controller Details
              </AccordionSummary>
              <AccordionDetails>
              <ListItemButton>
          <ListItemIcon>
            <img src={alert} alt="drone alert" width={"35vw"} />
          </ListItemIcon>
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
