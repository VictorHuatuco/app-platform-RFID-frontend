import { Owner } from '../owner/owner.model';

export interface Vehicle {
  id: string;
  image: string;
  imageCapturedByCam: string;
  video: string;
  videoCapturedByCam: string;
  licensePlateImage: string;
  licensePlateCapturedByCam: string;
  licensePlateValue: string;
  type: string;
  brand: string;
  color: string;
  owner: Owner;
  enteringTime: string;
  exitTime: string;
  duration: string;
}
