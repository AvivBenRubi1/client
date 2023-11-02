export default class Telemetry {
  constructor(
    pkt_len: number,
    public unk: number,
    public version: number,
    public sequence_number: number,
    public state_info: number,
    public serial_number: string,
    public longitude: number,
    public latitude: number,
    public altitude: number,
    public height: number,
    public v_north: number,
    public v_east: number,
    public v_up: number,
    public d_1_angle: number,
    public gps_time: number,
    public app_lat: number,
    public app_lon: number,
    public longitude_home: number,
    public latitude_home: number,
    public device_type: string,
    public uuid_len: number,
    public uuid: string,
    public crc_packet: string,
    public crc_calculated: string
  ) {}
}
