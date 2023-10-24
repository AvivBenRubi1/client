export default interface SensorData {
  pkt_len: number;
  unk: number;
  version: number;
  sequence_number: number;
  state_info: number;
  serial_number: string;
  longitude: number;
  latitude: number;
  altitude: number;
  height: number;
  v_north: number;
  v_east: number;
  v_up: number;
  d_1_angle: number;
  gps_time: number;
  app_lat: number;
  app_lon: number;
  longitude_home: number;
  latitude_home: number;
  device_type: string;
  uuid_len: number;
  uuid: string;
  crc_packet: string;
  crc_calculated: string;
}
