import { Grid, ListItem } from "@mui/material";
import Frame from "./frame";
import { droneFrame } from "../../../models/drone";
import List from "@mui/material/List";
import TelemetryCollection from "../../../models/telemetryCollection";
import { stat } from "fs";

export default function FramesList({ map, state }: { map: L.Map, state:Array<TelemetryCollection>}) {
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
        {state.map((telemetryCollection) => (
          <ListItem key={telemetryCollection.serial_number}>
            <Frame props={{ map: map, droneData: telemetryCollection.droneData }} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
