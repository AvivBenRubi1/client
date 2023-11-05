import TelemetryCollection from "../models/telemetryCollection";

export default class TelemetryManager {
    private readonly serialTelemetryCollection: Map<string, TelemetryCollection>;

    constructor() {
        this.serialTelemetryCollection = new Map<string, TelemetryCollection>();
    }

    onTelemetry(telemetryCollection :TelemetryCollection) {

    }
}