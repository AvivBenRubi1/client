import { MutableRefObject, useMemo, useRef } from "react";
import L from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";



import Coordinate from "../../../interfaces/Coordinate";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

function DynamicMarker({ image, firstCoordinate }: { image: string, firstCoordinate: Coordinate }) {
  const markerRef: MutableRefObject<any> = useRef(null);

  let myIcon = L.icon({
    iconUrl: image,
    iconSize: [30, 30], // size of the icon
  });

  function changeLocation(coordinate: Coordinate) {
    const marker: L.Marker = markerRef.current;
    if (marker !== null) {
      console.log(`got new coordinate: `, coordinate);
      marker.setLatLng(L.latLng(coordinate.lat, coordinate.long));
    }
  }
  setInterval(()=> {
    firstCoordinate.lat+=0.002;
    firstCoordinate.long+=0.002;
    changeLocation(firstCoordinate)},2000);

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

  return (
  <Marker ref={markerRef} icon={myIcon} position={[firstCoordinate.lat, firstCoordinate.long]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  );
}

export default DynamicMarker;
