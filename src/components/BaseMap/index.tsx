import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function BaseMap({setLeafletMap}: any)  {

    return (<div className="map-wrapper">
        <MapContainer
            center={[32.2686,35.5846]}
            zoom={8}
            maxZoom={16}
            className="map"
            ref={setLeafletMap} >
            <TileLayer url="http://localhost:3500/tiles/{z}/{x}/{y}.png" />
        </MapContainer>
    </div>)
}
export default React.forwardRef(BaseMap);