import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import L, { LatLng, Map, icon } from "leaflet";
import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import MarkerData from "../../../interfaces/markerData";

export default class DynamicMarker<T extends MarkerData> {
  private static DEFAULT_ICON_SIZE = 40;
  private readonly marker: L.Marker;

  constructor(
    private readonly map: L.Map,
    private readonly image: string,
    private markerData: T,
    private readonly iconSize?: number
  ) {

    if (iconSize === undefined) {
      iconSize = DynamicMarker.DEFAULT_ICON_SIZE;
    }

    const markerIcon = L.icon({
      iconUrl: image,
      iconSize: [iconSize, iconSize], // size of the icon
    });

    const position = new L.LatLng(markerData.latitude, markerData.longitude);
    this.marker = new L.Marker(position, { icon: markerIcon }).bindPopup(
      markerData.getDetails()
    );

    this.map.addLayer(this.marker);
  }

  updateData(markerData: T) {
    const position = new L.LatLng(markerData.latitude, markerData.longitude);
    this.marker.setLatLng(position);
    this.marker.bindPopup(markerData.getDetails());
    this.markerData = markerData;
  }

  dispose() {
    this.map.removeLayer(this.marker);
  }
}
