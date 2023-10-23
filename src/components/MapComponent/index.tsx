"use client";

import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import droneImage from '../../images/red_drone.png';
import {socket} from "../../socket";
import DynamicMarker from "./DynamicMarker";
import DroneData from "../../dtos/drone-data.dto";
import Coordinate from "../../interfaces/Coordinate";

export default function MapComponent() {
  const markerRef = useRef(null);
  const firstCoordinate: Coordinate = {lat:31.681579, long:35.007935}
  useEffect(() => {
    socket.on("drone-data", (droneData: DroneData) => {
      console.log(droneData);
    });
  });

  return (
    <div className="map-wrapper">
      <MapContainer center={[31.681579, 35.007935]} zoom={8} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DynamicMarker firstCoordinate={firstCoordinate} image={droneImage}/>
      </MapContainer>
    </div>
  );
}
