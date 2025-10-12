import { ErrorModel } from "../error";
import { Alert } from "./alert";

export class GetAlerts {
    rows: Alert[];
    page: number;
    records: number;
    total: number;
    error: ErrorModel;
}
