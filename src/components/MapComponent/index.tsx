"use client";

import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LatLngExpression, imageOverlay } from "leaflet";
import { MapContainer, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { Map } from "leaflet";
import droneImage from "../../images/red_drone.png";
import { socket } from "../../socket";
import DynamicMarker from "./DynamicMarker";
import DroneData from "../../dtos/drone-data.dto";

export default function MapComponent() {
  const [map, setMap] = useState<Map | null>(null);
  const markerRef = useRef(null);

  useEffect(() => {
    socket.on("drone-data", (droneData: DroneData) => {
      DynamicMarker(droneImage,droneData,map);
    });
  });

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[31.681579, 35.007935]}
        zoom={8}
        className="map"
        ref={setMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
