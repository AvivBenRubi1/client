import { Grid } from "@mui/material";
import FrameProps from "../../../interfaces/frame-props.interface";
import Frame from "./frame";

export default function FramesList({frames}:{frames: Array<FrameProps>}) {
  return (
    <Grid container style={{ display: "flex" }} direction="column">
      <ul>
        {frames.map((frame) => (
          <li key={frame.droneData.serial_number}>
            <Frame props={frame} />
          </li>
        ))}
      </ul>
    </Grid>
  );
}
