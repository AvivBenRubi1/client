import { useAppContext } from "../../context"
import { Grid, Card, ListItemButton, ListItemText, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import alert from "../../assets/images/warning.png"
import home from "../../assets/images/home.png"
import controller from "../../assets/images/controller.png"
import drone from "../../assets/images/red_drone.png"

export default () => {
    const { markers } = useAppContext()

    return <div>
        {Object.keys(markers).map(key => {
            return <Card
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
                    // map.setView([droneData.latitude, droneData.longitude], 13);
                }}
            >
                <Accordion>
                    <AccordionSummary>
                        <img src={alert} alt="drone alert" width={"40vw"} />
                        <ListItemText primary={`Device Type `} secondary={markers[key].telemetryData.drone_model} style={{ paddingLeft: "1vw" }} />
                        <ListItemText primary={`Serial Number `} secondary={markers[key].telemetryData.serial_number} />
                    </AccordionSummary>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Grid container spacing={1} direction={"row"}>
                            <Grid item>
                                <img src={drone} alt="home alert" width={"20vw"} />
                            </Grid>
                            <Grid item>  Drone Details</Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListItemButton>
                            <Grid container direction={"column"}>
                                <ListItemText primary={`Latitude `} secondary={markers[key].telemetryData.drone_latitude} />
                                <ListItemText primary={`Longitude `} secondary={markers[key].telemetryData.drone_longitude} />
                                <ListItemText primary={`Altitude `} secondary={markers[key].telemetryData.drone_altitude} />
                            </Grid>
                        </ListItemButton>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Grid container spacing={1} direction={"row"}>
                            <Grid item>
                                <img src={home} alt="home alert" width={"20vw"} />
                            </Grid>
                            <Grid item>  Home Details</Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListItemButton>
                            <Grid container direction={"column"}>
                                <ListItemText primary={`Latitude `} secondary={markers[key].telemetryData.departure_latitude} />
                                <ListItemText primary={`Longitude `} secondary={markers[key].telemetryData.departure_longitude} />
                                {/* <ListItemText primary={`Altitude `} secondary={markers[key].telemetryData.altitude} /> */}
                            </Grid>
                        </ListItemButton>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Grid container spacing={1} direction={"row"}>
                            <Grid item>
                                <img src={controller} alt="home alert" width={"20vw"} />
                            </Grid>
                            <Grid item>Controller Details</Grid>
                        </Grid>

                    </AccordionSummary>
                    <AccordionDetails>
                        <ListItemButton>
                            <Grid container direction={"column"}>
                                <ListItemText primary={`Latitude `} secondary={markers[key].telemetryData.remote_latitude} />
                                <ListItemText primary={`Longitude `} secondary={markers[key].telemetryData.remote_longitude} />
                                {/* <ListItemText primary={`Altitude `} secondary={markers[key].telemetryData.altitude} /> */}
                            </Grid>
                        </ListItemButton>
                    </AccordionDetails>
                </Accordion>
            </Card>
        })}
    </div>
}