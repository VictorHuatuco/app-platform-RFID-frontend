export class VehiclePag {
  id: number;
  eventType: string;
  deviceName: string;
  sn: string;
  detectionRegion: string;
  detectionRegionName: string;
  eventTime: Date | null;
  licensePlate: string;
  licensePlateSnapshot: string;
  licensePlateFullSnapshot: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleColor: string;
  vehicleSnapshot: string;
  alarmType: string;
  direction: string;
  countryRegion: string;
  plateType: string;
  plateColor: string;
  car?: {
    image: string;
    video?: string;
    licensePlateImage: string;
  };
  owner?: {
    name: string;
    dni: string;
    studentCode: string;
  };
}
