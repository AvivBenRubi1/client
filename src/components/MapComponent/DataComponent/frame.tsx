import { Grid, Card } from "@mui/material";
import { useState } from "react";
import logo108 from "../../../assets/108.png"
import { log } from "console";


function Frame() {
    //dataList:Array<Array<[string, any]>>
    let data: Array<any> = [[
        ["longitude", 55],
        ["latitude", 55],
        ["altitude", 55],
        ["serial_number", 55],
        ["device_type", 55], ["longitude", 55],
        ["latitude", 55],
        ["altitude", 55],
        ["serial_number", 55],
        ["device_type", 55]
    ], [
        ["longitude", 55],
        ["latitude", 55],
        ["altitude", 55],
        ["serial_number", 55],
        ["device_type", 55]
    ], [
        ["longitude", 55],
        ["latitude", 55],
        ["altitude", 55],
        ["serial_number", 55],
        ["device_type", 55]
    ], [
        ["longitude", 55],
        ["latitude", 55],
        ["altitude", 55],
        ["serial_number", 55],
        ["device_type", 55]
    ], [
        ["longitude", 55],
        ["latitude", 55],
        ["altitude", 55],
        ["serial_number", 55],
        ["device_type", 55]
    ]]
    return (
        <Grid spacing={2}>
            <img src={logo108} alt="108" style={{ margin: "0.5rem", height: "5vw" }} />

            <Grid style={{ display: "flex", margin: "2vw" }} direction="column">
                {data && data.map((line) => (
                    <Card style={{ backgroundColor: "#80808057", marginBottom: "3vw", padding: "0.9rem", maxHeight: "10vw", overflowY: "auto" }}>
                        {line.map((miniLine: any) => (
                            <Grid container spacing={3} direction="row">
                                <Grid item>{miniLine[0]}</Grid>
                                <Grid item>{miniLine[1]}</Grid>
                            </Grid>
                        ))}
                        {/* <Grid container spacing={3} direction="row">
                            <Grid item>{line[0][0]}</Grid>
                            <Grid item>{line[0][1]}</Grid>
                        </Grid>
                        <Grid container spacing={3} direction="row">
                            <Grid item>longitude</Grid>
                            <Grid item>5</Grid>
                        </Grid>
                        <Grid container spacing={3} direction="row" >
                            <Grid item>latitude</Grid>
                            <Grid item>55</Grid>

                        </Grid>
                        <Grid container spacing={3} direction="row" >
                            <Grid item>altitude</Grid>
                            <Grid item>55</Grid>

                        </Grid><Grid container spacing={3} direction="row" >
                            <Grid item>serial_number</Grid>
                            <Grid item>55</Grid>

                        </Grid><Grid container spacing={3} direction="row" >
                            <Grid item>device_type</Grid>
                            <Grid item>55</Grid>
                        </Grid> */}

                    </Card>
                ))}


            </Grid ></Grid>)
}

export default Frame;