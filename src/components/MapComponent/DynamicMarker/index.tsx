import { MutableRefObject, useMemo, useRef } from "react";
import L from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Socket } from "socket.io-client";

import Coordinate from "../../../interfaces/Coordinate";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function DynamicMarker() {
  //const MapMarker = ({markerPos, socket}: {markerPos: Coordinate, socket: Socket}) => {
  //const markerRef: MutableRefObject<any> = useRef(null);

  // socket.on('getCoordinatesRT', (newCoord: Coordinate) => {
  //     const marker: L.Marker = markerRef.current;
  //     if (marker !== null) {
  //         console.log(`got new coordinate: `, newCoord);
  //         marker.setLatLng(L.latLng(newCoord.lat, newCoord.long));
  //     }
  // })
  // socket.on('getNewCoordinate', (newCoord: Coordinate) => {
  //     const marker: L.Marker = markerRef.current;
  //     if (marker !== null) {
  //         marker.setLatLng(L.latLng(newCoord.lat, newCoord.long));
  //     }
  // })

  var myIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/786/786912.png",
    iconSize: [70, 70], // size of the icon
  });

  const map = useMapEvents({
    click: (e) => {
      const newMarker: L.Marker = L.marker(e.latlng, { icon: myIcon }).addTo(
        map
      );
      console.log(newMarker);
      // socket.emit('getCoordinatesRT', ([{lat: markerPos.lat, lng: markerPos.long}, {lat: e.latlng.lat, lng: e.latlng.lng}]))
    },
  });

  // const eventHandlers = useMemo(() => ({
  //     click() {
  //         socket.emit('getNewCoordinate');
  //     },
  // }), [socket]);

  // return (
  //     <Marker ref={markerRef} eventHandlers={eventHandlers} position={[markerPos.lat, markerPos.long]}>
  //         <Popup>
  //             A pretty CSS3 popup. <br /> Easily customizable.
  //         </Popup>
  //     </Marker>
  // );

  return null;
}

export default DynamicMarker;
