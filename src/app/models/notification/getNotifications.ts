import { ErrorModel } from "../error";
import { NotificationModel } from "./notification";

export class GetNotifications {
  rows: NotificationModel[];
  page: number;
  records: number;
  total: number;
  error: ErrorModel;
}
