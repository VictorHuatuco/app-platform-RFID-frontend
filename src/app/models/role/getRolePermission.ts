import { ErrorModel } from "../error";
import { RolePermission } from "./rolePermission";

export class GetRolePermission {
    data: Array<RolePermission>;
    error: ErrorModel;
}
