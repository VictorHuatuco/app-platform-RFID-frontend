import { VehiclePag } from './VehiclePag';

export class GetVehicles {
  page: number;
  records: number;
  total: number;
  rows: Array<VehiclePag>;
  error: Error;
}
