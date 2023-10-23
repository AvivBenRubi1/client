import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import L, { LatLng, Map, icon } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import DroneData from "../../../dtos/drone-data.dto";

function DynamicMarker(image: string, droneData: DroneData, map: Map | null) {
  const markerIcon = L.icon({
    iconUrl: image,
    iconSize: [30, 30], // size of the icon
  });

  const marker: L.Marker = L.marker(
    new L.LatLng(droneData.latitude, droneData.longitude),
    { icon: markerIcon },);

  if(map != null) {
    marker.addTo(map)
    }
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

  return null;

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

export default DynamicMarker;
