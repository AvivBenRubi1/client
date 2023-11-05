import logo108 from "../../assets/images/108.png";
import { Grid, Card } from "@mui/material";
import FramesList from "./FramesList";
import { droneFrame } from "../../models/drone";

export default function SideBar({ map, frame }: { map: L.Map, frame: droneFrame }) {
  
  return (
    <div>
      <Grid container style={{ display: "flex" }} direction="column">
        <img
          src={logo108}
          alt="108"
          style={{ height: "5vw", width: "5vw", alignSelf: "center", marginTop:"1vw " }}
        />
        <FramesList frame={frame} map={map} />
      </Grid>
    </div>
  );
}
