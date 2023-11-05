import logo108 from "../../assets/images/108.png";
import { Grid, Card } from "@mui/material";
import FramesList from "./FramesList";
import { droneFrame } from "../../models/drone";
import TelemetryCollection from "../../models/telemetryCollection";

export default function SideBar({ map, state }: { map: L.Map, state:Array<TelemetryCollection>}) {
  
  return (
    <div>
      <Grid container style={{ display: "flex" }} direction="column">
        <img
          src={logo108}
          alt="108"
          style={{ height: "5vw", width: "5vw", alignSelf: "center", marginTop:"1vw " }}
        />
        <FramesList state={state} map={map} />
      </Grid>
    </div>
  );
}
