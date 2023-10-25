import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import L, { LatLng, Map, icon } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerData from "../interfaces/marker-data.interface";

export default class DynamicMarker<T extends MarkerData> {
  private readonly marker: L.Marker;

  constructor(
    private readonly image: string,
    private readonly map: Map | null,
    private markerData: T,
  ) {
    const markerIcon = L.icon({
      iconUrl: image,
      iconSize: [30, 30], // size of the icon
    });

    const position = new L.LatLng(markerData.latitude, markerData.longitude);
    this.marker = new L.Marker(position, { icon: markerIcon }).bindPopup(
      markerData.getDetails()
    );
    map?.addLayer(this.marker);
  }

  updateMarkerData(markerData: T) {
    const position = new L.LatLng(markerData.latitude, markerData.longitude);
    this.marker.setLatLng(position);
    this.marker.bindPopup(markerData.getDetails());
    this.markerData = markerData;
  }

  dispose() {
    this.map?.removeLayer(this.marker);
  }
  // getDroneDetails(): string {
  //   return `Serial Number: ${this.droneData.serial_number}
  //   Latitude: ${this.droneData.latitude}
  //   Longitude: ${this.droneData.longitude}
  //   Drone Type: ${this.droneData.device_type}`;
  // }

  // const markerElement = (
  //   <Marker
  //     icon={markerIcon}
  //     position={[droneData.latitude, droneData.longitude]}
  //   >
  //     <Popup>
  //       A pretty CSS3 popup. <br /> Easily customizable.
  //     </Popup>
  //   </Marker>
  // );

  // function changeLocation(lat: number, long: number) {
  //   console.log(`got new coordinate: lat:${lat} long:${long}`);
  //   marker.setLatLng(new L.LatLng(lat, long));
  // }

  // setInterval(() => {
  //   droneData.latitude += 0.002;
  //   droneData.longitude += 0.002;
  //   changeLocation(droneData.latitude, droneData.longitude);
  // }, 2000);

  // const map = useMapEvents({
  //   click: (e) => {
  //     const newMarker: L.Marker = L.marker(e.latlng, { icon: myIcon }).addTo(
  //       map
  //     );
  //     console.log(newMarker);
  //     // socket.emit('getCoordinatesRT', ([{lat: markerPos.lat, lng: markerPos.long}, {lat: e.latlng.lat, lng: e.latlng.lng}]))
  //   },
  // });

  // const eventHandlers = useMemo(() => ({
  //     click() {
  //         socket.emit('getNewCoordinate');
  //     },
  // }), [socket]);

  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  //   iconUrl: require("leaflet/dist/images/marker-icon.png"),
  //   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  // });
}
