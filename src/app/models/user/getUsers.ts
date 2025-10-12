import { ErrorModel } from "../error";
import { User } from "./user";
import { UserPag } from "./userPag";

export class GetUsers {
  rows: User[];
  page: number;
  records: number;
  total: number;
  error: ErrorModel;
}
