import { Grid, ListItem } from "@mui/material";
import Frame from "./frame";
import { droneFrame } from "../../../models/drone";
import List from "@mui/material/List";

export default function FramesList({ map, frame }: { map: L.Map, frame: droneFrame }) {
  return (
    <Grid container style={{ display: "flex" }} direction="column">
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        // style={{ overflowY: "auto", overflowX: "hidden" }}
        aria-label="contacts"
      >
        {frame.drones.map((drone) => (
          <ListItem key={drone.serial_number}>
            <Frame props={{ map: map, droneData: drone }} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
