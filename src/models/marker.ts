import Telemetry from "../dtos/telemetry"
import L, { Map as LeafletMap } from "leaflet";
import EnemyDroneImage from "../assets/images/red_drone.png";
import FriendDroneImage from "../assets/images/green_drone.png";
import HomeImage from "../assets/images/home.png";
import ControllerImage from "../assets/images/controller.png";
import { ClassificationType, MarkerTypes } from "../interfaces/markerData";
// import MarkerData, { ClassificationType, MarkerTypes } from "./interfaces/markerData";

// export type Marker = {
//     serialId: string,
//     home: L.Marker,
//     drone: L.Marker,
//     controller: L.Marker,
//     getDetails: () => string
// } & Telemetry

export const getIcon = (icon: string) => L.icon({
    iconUrl: icon,
    iconSize: [40, 40], // size of the icon
});


type TypeOfClassificationImage = {
    [key in ClassificationType]: string
}

type TypeOfTypeImage = {
    [key in MarkerTypes]: string
}

const classToImageDict = {
    'enemy': EnemyDroneImage,
    'friend': FriendDroneImage,
    'unauthorized': ControllerImage,
} as TypeOfClassificationImage

const typeToImageDict = {
    'drone': FriendDroneImage,
    'home': HomeImage,
    'controller': ControllerImage,
} as TypeOfTypeImage

export class Marker {
    telemetryData: Telemetry
    home?: L.Marker
    drone?: L.Marker
    controller?: L.Marker

    constructor(map: LeafletMap, telemetry: Telemetry) {
        this.telemetryData = telemetry
        if (telemetry?.departure_latitude && telemetry?.departure_longitude) {
            const homePosition = new L.LatLng(telemetry.departure_latitude, telemetry.departure_longitude)
            const h = new L.Marker(homePosition, { icon: getIcon(typeToImageDict['home']) }).bindPopup(
                ''
            )
            this.home = h
            map.addLayer(h)
        }
        if (telemetry?.drone_latitude && telemetry?.drone_longitude) {

            const dronePosition = new L.LatLng(telemetry.drone_latitude, telemetry.drone_longitude)
            const d = new L.Marker(dronePosition, { icon: getIcon(typeToImageDict['drone']) }).bindPopup(
                ''
            )
            map.addLayer(d)
            this.drone = d
        }
        if (telemetry?.remote_longitude && telemetry?.remote_latitude) {
            const controllerPosition = new L.LatLng(telemetry.remote_latitude, telemetry.remote_longitude)
            const c = new L.Marker(controllerPosition, { icon: getIcon(typeToImageDict['controller']) }).bindPopup(
                ''
            )
            map.addLayer(c)
            this.controller = c
        }
    }

    update(telemetry: Telemetry) {
        if (telemetry?.departure_latitude && telemetry?.departure_longitude) {

            const homePosition = new L.LatLng(telemetry.departure_latitude, telemetry.departure_longitude)
            this.home = this.home?.setLatLng(homePosition)
        }
        if (telemetry?.drone_latitude && telemetry?.drone_longitude) {

            const dronePosition = new L.LatLng(telemetry.drone_latitude, telemetry.drone_longitude)
            this.drone = this.drone?.setLatLng(dronePosition)
        }
        if (telemetry?.remote_longitude && telemetry?.remote_latitude) {

            const controllerPosition = new L.LatLng(telemetry.remote_longitude, telemetry.remote_latitude)
            this.controller = this.controller?.setLatLng(controllerPosition)
        }

        this.telemetryData = telemetry
    }

    getDetails() {
        return ""
    }
}