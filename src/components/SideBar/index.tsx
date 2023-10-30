import logo108 from "../../assets/images/108.png";
import { Grid, Card } from "@mui/material";
import FramesList from "./FramesList";
import FrameProps from "../../interfaces/frame-props.interface";

export default function SideBar() {
  return (
    <div>
      <Grid container style={{ display: "flex" }} direction="column">
        <img
          src={logo108}
          alt="108"
          style={{ height: "5vw", width: "5vw", alignSelf: "center" }}
        />
        {/* <FramesList frames={frames} /> */}
      </Grid>
    </div>
  );
}
