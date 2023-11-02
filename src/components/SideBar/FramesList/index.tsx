import { Grid, ListItem } from "@mui/material";
import FrameProps from "../../../interfaces/frameProps";
import Frame from "./frame";
import { droneFrame } from "../../../models/drone";
import List from '@mui/material/List';

export default function FramesList({ frames }: { frames: droneFrame }) {

  return (
    <Grid container style={{ display: "flex" }} direction="column">
      <List
        sx={{
          width: '100%', maxWidth: 360, bgcolor: 'background.paper'
        }}
        style={{ overflowY: "auto", overflowX: "hidden" }}
        aria-label="contacts"
      >
        {frames.drones.map((frame) => (
          <ListItem key={frame.serial_number}>
            <Frame props={{ droneData: frame, leafletMap: frames.map }} />
          </ListItem>
        ))}
      </List>

    </Grid>
  );
}
