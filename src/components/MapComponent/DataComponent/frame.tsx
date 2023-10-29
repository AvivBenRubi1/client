import { Grid, Card } from "@mui/material";
import { useState } from "react";
import logo108 from "../../../assets/108.png"


interface FrameProps {
    newData: {
        longitude: number;
        latitude: number;
        altitude: number;
        serial_number: string;
        device_type: string;
    }[];
    setPosition: (longitude: number, altitude: number) => void;

}

function Frame(props: FrameProps) {

    const {
        newData,
        setPosition
    } = props;

return (
    <div>
        <img src={logo108} alt="108" style={{ margin: "0.5rem", height: "5vw" }} onClick={(e) => { console.log(props.newData) }} />

        <Grid style={{ display: "flex", margin: "2vw", overflowX: "auto" }} direction="column">
            {props.newData && props.newData.map((line) => (
                <Card style={{ backgroundColor: "#80808057", marginBottom: "3vw", padding: "0.9rem", maxHeight: "10vw", overflowY: "auto" }}
                    onClick={(e) => {
                        setPosition(line?.longitude, line?.altitude);
                        //console.log([line?.longitude, line?.altitude])
                    }}
                >
                    <Grid container spacing={3} direction="row">
                        <Grid item>longitude</Grid>
                        <Grid item>{line?.longitude}</Grid>
                    </Grid>
                    <Grid container spacing={3} direction="row" >
                        <Grid item>latitude</Grid>
                        <Grid item>{line?.latitude}</Grid>

                    </Grid>
                    <Grid container spacing={3} direction="row" >
                        <Grid item>altitude</Grid>
                        <Grid item>{line?.altitude}</Grid>

                    </Grid><Grid container spacing={3} direction="row" >
                        <Grid item>serial_number</Grid>
                        <Grid item>{line?.serial_number}</Grid>

                    </Grid><Grid container spacing={3} direction="row" >
                        <Grid item>device_type</Grid>
                        <Grid item>{line?.device_type}</Grid>
                    </Grid>

                </Card>
            ))}


        </Grid> </div>)
}

export default Frame;