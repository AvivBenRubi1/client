import { Map as LeafletMap } from "leaflet";
import DynamicMarker from "./dynamicMarker";
import MarkerData from "../../interfaces/marker-data.interface";


export default class MarkersManager<T extends MarkerData> {
  private readonly leafletMap: LeafletMap;
  private readonly image: string;
  private readonly serialMarkerMap: Map<string, DynamicMarker<T>>;

  constructor(leafletMap: LeafletMap, image: string) {
    this.leafletMap = leafletMap;
    this.image = image;
    this.serialMarkerMap = new Map<string, DynamicMarker<T>>();
  }

  setMarkerData(markerData: T) {
    if(markerData.latitude === 0 || markerData.longitude === 0) {
      return;
    }
    let dynamicMarker = this.serialMarkerMap.get(markerData.serial_number);
    if (dynamicMarker === undefined) {
      let marker = new DynamicMarker<T>(
        this.leafletMap,
        this.image,
        markerData
      );
      this.serialMarkerMap.set(markerData.serial_number, marker);
    } else {
      dynamicMarker.updateData(markerData);
    }
  }
}
