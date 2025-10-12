import { ErrorModel } from "../error";
import { AuthUser } from "./authUser";

export class GetUserValidate {
  error: ErrorModel;
  data: AuthUser;
}
