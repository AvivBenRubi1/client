import antenaIcon from "../assets/images/antenna.png";
import L, { Map as LeafletMap } from "leaflet";

export interface AntennaData {
    antenna_name: string;
    site_name: string;
    unit: number;
    latitude: number;
    longitude: number;
    geo: Array<[number, number]>;
    status: boolean;
}
export const getIcon = (icon: string) => L.icon({
    iconUrl: icon,
    iconSize: [30, 30], // size of the icon
});

export class Antenna {
    antenna_data: AntennaData
    antenna_marker: L.Marker


    constructor(map: LeafletMap, data: AntennaData) {
        this.antenna_data = data


        const antennaPosition = new L.LatLng(data?.latitude, data?.longitude)
        const a = new L.Marker(antennaPosition, {
            icon: getIcon(antenaIcon)
        }).bindPopup(
            `unit ${this.antenna_data.unit} site name ${this.antenna_data.site_name} antenna ${this.antenna_data.antenna_name}`
        )

        const poly = {
            coordinates: [this.antenna_data.geo],
            type: 'Polygon'
        } as GeoJSON.Polygon
        L.geoJSON(poly, {
            style: function () {
                return { color: "#ffffff", opacity: 0.4 }
            }
        }).addTo(map)

        this.antenna_marker = a
        map.addLayer(a)

    }

    update(antenna: AntennaData) {

        const antennaPosiotion = new L.LatLng(antenna.latitude, antenna.longitude)
        this.antenna_marker = this.antenna_marker.setLatLng(antennaPosiotion)
        this.antenna_data = antenna
    }
}