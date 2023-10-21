"use client";

import "./Map.css";
import "leaflet/dist/leaflet.css";

import { LatLngExpression } from "leaflet";
import {
  MapContainer,
//   Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import { useState } from "react";

import MapMarker from "./MapMarker";

export default function Map() {
  return (
    <div className="map-wrapper">
      <MapContainer center={[31.681579, 35.007935]} zoom={8} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapMarker/>
      </MapContainer>
    </div>
  );
}
