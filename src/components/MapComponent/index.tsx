"use client";

import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LatLngExpression, imageOverlay } from "leaflet";
import { MapContainer, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";

import { socket } from "../../socket";
import DynamicMarker from "./component-warpers/dynamic-marker";
import SensorData from "../../dtos/sensor-data.dto";
import DroneData from "./marker-data-models/drone.data";
import MarkersCollection from "./component-warpers/markers-collection";

export default function MapComponent() {
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);

  const serialMarkerMap = new Map<string, MarkersCollection>();

  useEffect(() => {
    if(!leafletMap) {
      return;
    }
    socket.on("drone-data", (sensorData: SensorData) => {


      let markersCollection = serialMarkerMap.get(sensorData.serial_number);
      if (markersCollection === undefined) {
        markersCollection = new MarkersCollection(sensorData, leafletMap)
        serialMarkerMap.set(sensorData.serial_number, markersCollection);
      }

      else {
        markersCollection.updateMarkersData(sensorData);
      }
    }
    );
  });

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[31.681579, 35.007935]}
        zoom={8}
        className="map"
        ref={setLeafletMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
