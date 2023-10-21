'use client'

import './Map.css'
import 'leaflet/dist/leaflet.css'

import { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

export default function Map() {
    const position: LatLngExpression = [100, -0.09]

    return (
        <div className='map-wrapper'>
            <MapContainer center={[31.681579, 35.007935]} zoom={8} className='map'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}