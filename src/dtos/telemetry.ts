export default interface Telemetry {
  pkt_len?: number;
  unk?: number;
  version?: number;
  sequence_number?: number;
  state_info?: number;
  serial_number?: string;
  drone_longitude?: number;
  drone_latitude?: number;
  drone_altitude?: number;
  height?: number;
  volocity_north?: number;
  volocity_east?: number;
  volocity_up?: number;
  d_1_angle?: number;
  gps_time?: number;
  remote_latitude?: number;
  remote_longitude?: number;
  departure_longitude?: number;
  departure_latitude?: number;
  drone_model?: string;
  uuid_len?: number;
  uuid?: string;
  crc_packet?: string;
  crc_calculated?: string;
  status?: string;
  number_in_squad?: string
  packet_uuid: string;
  antenna_name: string;
  drone_distance?: number
}
